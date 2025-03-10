import { CourseSaveRequest } from "../models/PostRequests/CourseSaveRequest";
import Course from "../models/course";
import { FrequencyType } from "../enums/frequency-type.enum";
import { CourseStatus } from "../enums/course-status.enum";
import { CourseEnrollment } from "../models/course-enrollment";
import { RegisterRequest } from "models/PostRequests/RegisterRequest";

export class CourseService {
    constructor() {}

    async listCourses(studentEmail: string) {
        const courses = (await Course.find()).filter((course) => course.students.includes(studentEmail));
        const studentEnrollments = await CourseEnrollment.find({ studentEmail });

        const courseListWithPresence = courses.map((course) => {
            
            const enrollments = studentEnrollments.filter((enr) => enr.courseCode === course.courseCode);
            const attendedClasses = new Set(
                enrollments.map((enrollment) => enrollment.classDate?.toISOString())
            );
            const missedClasses = course.courseCalendar.filter((cal) => attendedClasses.has(cal.startDate?.toISOString())).length;

            return {
              courseName: course.courseName,
              courseCode: course.courseCode,
              courseCredit: course.courseCredit,
              courseStudentCount: course.courseStudentCount,
              courseStudentCountLimit: course.courseStudentCountLimit,
              courseTeacher: course.courseTeacher,
              courseDescription: course.courseDescription,
              courseRequirement: course.courseRequirements,
              courseStatus: course.courseStatus,
              courseCalendar: course.courseCalendar.map((classSession) => ({
                startDate: classSession.startDate,
                endDate: classSession.endDate,
                length: classSession.length,
                presence: attendedClasses.has(classSession?.startDate?.toISOString()) // Check if student attended
              })),
              missedClasses: missedClasses
            };
          });

        return Promise.resolve(courseListWithPresence);
    }

    async listCoursesForRegistration() {
        const courses = await Course.find();
        return Promise.resolve(courses);
    }

    async registerForCourse(registerRequest: RegisterRequest) {
        const course = await Course.findOne({ courseCode: registerRequest.courseCode });

        if (!course) {
            return {
                message: 'Course not found'
            };
        }

        course.students.push(registerRequest.studentEmail);
        course.courseStudentCount! += 1;

        course.save();
    }

    async abandonCourse(abandonRequest: RegisterRequest) {
        const course = await Course.findOne({ courseCode: abandonRequest.courseCode });

        if (!course) {
            return {
                message: 'Course not found'
            };
        }

        console.log(abandonRequest.studentEmail);

        console.log(course.students.filter((c) => c != abandonRequest.studentEmail));
        course.students = course.students.filter((c) => c != abandonRequest.studentEmail);
        course.courseStudentCount! -= 1;

        course.save();
    }

    async createCourse(course: CourseSaveRequest) {
        const occurrences = this.generateOccurrences(
            course.courseCalendar.courseStartDate,
            course.courseCalendar.courseEndDate,
            course.courseCalendar.courseOccurrenceFrequencyValue,
            course.courseCalendar.courseOccurrenceFrequencyType,
            course.courseCalendar.courseLastDate
        );
        const saveRequest = {
            courseName: course.courseName,
            courseCredit: course.courseCredit,
            courseStudentCountLimit: course.courseStudentCountLimit,
            courseTeacher: course.courseTeacher,
            courseDescription: course.courseDescription,
            courseRequirements: course.courseRequirements,
            courseStudentCount: 0,
            courseCode: this.generateCourseCode(),
            courseStatus: CourseStatus.PENDING,
            courseCalendar: occurrences,
            students: []
        };
        await Course.insertOne(saveRequest);
        return Promise.resolve();
    }


    private generateCourseCode() {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let courseCode = "";

        for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            courseCode += characters[randomIndex];
        }

        return courseCode;
    }

    private generateOccurrences = (
        startDate: Date,
        endDate: Date,
        frequency: number,
        frequencyType: FrequencyType,
        lastDate: Date
      ) => {
        let occurrences = [];
        let currentStart = new Date(startDate);
        let currentEnd = new Date(endDate);
        let lastCourseDate = new Date(lastDate);
      
        while (currentStart <= lastCourseDate) {
          occurrences.push({
            startDate: new Date(currentStart),
            endDate: new Date(currentEnd),
            length: (currentEnd.getTime() - currentStart.getTime()) / (1000 * 60 * 60), // Length in minutes
          });

          
          if (frequencyType === FrequencyType.DAILY) {
            currentStart.setDate(currentStart.getDate() + frequency);
            currentEnd.setDate(currentEnd.getDate() + frequency);
          } else if (frequencyType === FrequencyType.WEEKLY) {
            currentStart.setDate(currentStart.getDate() + frequency * 7);
            currentEnd.setDate(currentEnd.getDate() + frequency * 7);
          } else if (frequencyType === FrequencyType.MONTHLY) {
            currentStart.setMonth(currentStart.getMonth() + frequency);
            currentEnd.setMonth(currentEnd.getMonth() + frequency);
          }
        }
      
        return occurrences;
      };
}

