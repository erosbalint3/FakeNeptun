import { FrequencyType } from '../../enums/frequency-type.enum';

export interface CourseSaveRequestModel {
  details: CourseSaveDetailsModel;
  calendar: CourseSaveCalendarModel;
}

export interface CourseSaveDetailsModel {
  courseName: string;
  courseCredit: number;
  courseStudentCountLimit: number;
  courseRequirements: File | string;
  courseDescription: string
}

export interface CourseSaveCalendarModel {
  courseStartDate: Date;
  courseEndDate: Date;
  courseOccurrenceFrequencyValue: number;
  courseOccurrenceFrequencyType: FrequencyType;
}
