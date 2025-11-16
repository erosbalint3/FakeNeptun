import { model, Schema } from 'mongoose';

const CourseEnrollmentSchema = new Schema({
  courseCode: String,
  studentEmail: String,
  classDate: Date,
});

export const CourseEnrollment = model('CourseEnrollments', CourseEnrollmentSchema);
