import Grade from '../models/grade';
import Course from '../models/course';
import { CourseService } from './courses.service';

export class GradesService {
  constructor() {}

  private readonly courseService = new CourseService();

  async listGrades(studentEmail: string, courseCode: string) {
    const grades = await Grade.find({ studentEmail, courseCode });

    return grades.map((grade) => grade.grade);
  }

  async getFinalGradeForCourse(studentEmail: string, courseCode: string) {
    const course = await Course.findOne({ courseCode });
    if (!course) {
      return {
        message: 'Course not found',
      };
    }
    const grades = await Grade.find({ studentEmail, courseCode });
    if (grades.length === 0) {
      return {
        message: 'No grades found for this course',
      };
    }
    const finalGrade = grades.reduce((acc, grade) => acc + (grade.grade ?? 0), 0) / grades.length;
    return {
      courseName: course.courseName,
      courseCode: course.courseCode,
      finalGrade: finalGrade,
    };
  }

  async getFinalGradesForStudent(studentEmail: string) {
    const courses = await this.courseService.listCourses(studentEmail);
    const finalGrades = await Promise.all(
      courses.map(async (course) => {
        const grades = await Grade.find({ studentEmail, courseCode: course.courseCode });
        if (grades.length === 0) {
          return {
            courseName: course.courseName,
            courseCode: course.courseCode,
            finalGrade: null,
          };
        }
        const finalGrade = Math.round(
          grades.reduce((acc, grade) => acc + (grade.grade ?? 0), 0) / grades.length
        );
        return {
          courseName: course.courseName,
          courseCode: course.courseCode,
          finalGrade: finalGrade,
        };
      })
    );
    return finalGrades;
  }

  async saveGrade(grade: { studentEmail: string; courseCode: string; grade: number }) {
    const newGrade = new Grade({
      studentEmail: grade.studentEmail,
      courseCode: grade.courseCode,
      grade: grade.grade,
    });
    await newGrade.save();
    return {
      message: 'Grade saved successfully',
    };
  }
}
