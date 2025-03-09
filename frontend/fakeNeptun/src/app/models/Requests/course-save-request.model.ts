import { FrequencyType } from '../../enums/frequency-type.enum';

export interface CourseSaveModel {
  courseName: string;
  courseCredit: number;
  courseStudentCountLimit: number;
  courseRequirements: File | string;
  courseDescription: string;
  courseTeacher: string;
  courseCalendar: CourseSaveCalendarModel;
}

export interface CourseSaveCalendarModel {
  courseStartDate: Date;
  courseEndDate: Date;
  courseOccurrenceFrequencyValue: number;
  courseOccurrenceFrequencyType: FrequencyType;
  courseLastDate: Date;
}
