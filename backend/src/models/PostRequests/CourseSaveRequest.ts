import { FrequencyType } from '../../enums/frequency-type.enum';

export interface CourseSaveRequest {
  courseName: string;
  courseCredit: number;
  courseStudentCountLimit: number;
  courseRequirements: string;
  courseDescription: string;
  courseTeacher: string;
  courseCalendar: CourseCalendarSaveRequest;
}

export interface CourseCalendarSaveRequest {
  courseStartDate: Date;
  courseEndDate: Date;
  courseOccurrenceFrequencyValue: number;
  courseOccurrenceFrequencyType: FrequencyType;
  courseLastDate: Date;
}
