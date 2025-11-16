export interface CourseParticipationsSaveRequest {
  courseCode: string;
  courseStartDate: Date;
  courseStudentEmails: string[];
}
