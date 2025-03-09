export interface CourseModel {
  courseName: string;
  courseCode: string;
  courseCredit: number;
  courseStudentCount: number;
  courseStudentCountLimit: number;
  courseTeacher: string;
  courseCalendar: CourseListCalendarModel[];
  missedClasses: number;
}

export interface CourseListCalendarModel {
  startDate: Date;
  endDate: Date;
  length: number;
  presence: boolean;
}
