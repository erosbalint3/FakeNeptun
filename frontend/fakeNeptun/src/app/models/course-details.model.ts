import { CompletionStatus } from '../enums/completion-status.enum';

export interface CourseDetailsModel {
  calendar: CourseCalendarModel;
  details: CourseDetailedInformationsModel;
}

export interface CourseCalendarModel {
  missedClassesCount: number;
  presentClassesCount: number;
  classDates: CourseDateTimeModel[];
}

export interface CourseDetailedInformationsModel {
  courseName: string;
  courseCode: string;
  courseCredit: number;
  courseStudentCountLimit: number;
  courseStudentCount: number;
  courseTeacher: string;
  courseCompletionStatus: CompletionStatus;
}

interface CourseDateTimeModel {
  startDate: Date;
  endDate: Date;
  length: number;
  presence: boolean;
}
