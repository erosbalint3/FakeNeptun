import { CourseSaveRequest } from '../models/PostRequests/CourseSaveRequest';
import Course from '../models/course';
import { FrequencyType } from '../enums/frequency-type.enum';
import { CourseStatus } from '../enums/course-status.enum';
import { CourseEnrollment } from '../models/course-enrollment';
import { RegisterRequest } from '../models/PostRequests/RegisterRequest';
import {
  CourseApproveRequest,
  CourseRejectRequest,
} from '../models/PostRequests/CourseApproveRequest';
import User from '../models/user';
import { CourseParticipationsSaveRequest } from '../models/PostRequests/CourseParticipationsSaveRequest';

export class CourseService {
  constructor() {}

  async listCourses(studentEmail: string) {
    const courses = (await Course.find()).filter((course) =>
      course.students.includes(studentEmail)
    );
    const studentEnrollments = await CourseEnrollment.find({ studentEmail });

    const courseListWithPresence = courses.map((course) => {
      const enrollments = studentEnrollments.filter((enr) => enr.courseCode === course.courseCode);
      const attendedClasses = new Set(
        enrollments.map((enrollment) => enrollment.classDate?.toISOString())
      );
      const missedClasses =
        course.courseCalendar.length -
        course.courseCalendar.filter((cal) => attendedClasses.has(cal.startDate?.toISOString()))
          .length;

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
          presence: attendedClasses.has(classSession?.startDate?.toISOString()),
        })),
        missedClasses: missedClasses,
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
        message: 'Course not found',
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
        message: 'Course not found',
      };
    }

    console.log(abandonRequest.studentEmail);

    console.log(course.students.filter((c) => c != abandonRequest.studentEmail));
    course.students = course.students.filter((c) => c != abandonRequest.studentEmail);
    course.courseStudentCount! -= 1;

    course.save();
  }

  async createCourse(course: CourseSaveRequest) {
    if (
      !course.courseName ||
      !course.courseCredit ||
      !course.courseDescription ||
      !course.courseRequirements ||
      !course.courseStudentCountLimit
    ) {
      throw new Error("Can't create course without necessary data!");
    }
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
      students: [],
    };
    await Course.insertOne(saveRequest);
    return Promise.resolve();
  }

  async approveCourse(courseRequest: CourseApproveRequest) {
    const course = await Course.findOne({ courseCode: courseRequest.courseCode });

    if (course) {
      course.courseStatus = CourseStatus.AVAILABLE;
      course.save();
    }

    return Promise.resolve();
  }

  async rejectCourse(courseRequest: CourseRejectRequest) {
    await Course.deleteOne({ courseCode: courseRequest.courseCode });
    return Promise.resolve();
  }

  async getCourseUsers(courseCode: string) {
    const course = await Course.findOne({ courseCode: courseCode });

    const users: any = [];

    if (course) {
      return Promise.all(
        course.students.map(async (us) => {
          const user = await User.findOne({ email: us });
          return Promise.resolve(user);
        })
      );
    }
  }

  async saveCourseParticipations(request: CourseParticipationsSaveRequest) {
    request.courseStudentEmails.forEach((email: string) => {
      const saveRequest = {
        courseCode: request.courseCode,
        studentEmail: email,
        classDate: request.courseStartDate,
      };

      CourseEnrollment.insertOne(saveRequest);
    });
    return Promise.resolve();
  }

  private generateCourseCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let courseCode = '';

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
    const startD = new Date(startDate);
    const endD = new Date(endDate);
    const lastD = new Date(lastDate);

    if (startD && endD && lastD) {
      while (startD <= lastD) {
        occurrences.push({
          startDate: new Date(startD),
          endDate: new Date(endD),
          length: (endD.getTime() - startD.getTime()) / (1000 * 60 * 60), // Length in minutes
        });

        if (frequencyType === FrequencyType.DAILY) {
          startD.setDate(startD.getDate() + frequency);
          endD.setDate(endD.getDate() + frequency);
        } else if (frequencyType === FrequencyType.WEEKLY) {
          startD.setDate(startD.getDate() + frequency * 7);
          endD.setDate(endD.getDate() + frequency * 7);
        } else if (frequencyType === FrequencyType.MONTHLY) {
          startD.setMonth(startD.getMonth() + frequency);
          endD.setMonth(endD.getMonth() + frequency);
        }
      }
    }
    return occurrences;
  };
}
