import {CourseStatus} from "../enums/course-status.enum";

export interface CourseModel {
  courseName: string;
  courseCode: string;
  courseCredit: number;
  courseStudentCount: number;
  courseStudentCountLimit: number;
  courseTeacher: string;
  courseCalendar: CourseListCalendarModel[];
  missedClasses: number;
  courseStatus: CourseStatus;
}

export interface CourseListCalendarModel {
  startDate: Date;
  endDate: Date;
  length: number;
  presence: boolean;
}
