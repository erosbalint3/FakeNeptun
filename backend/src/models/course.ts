import { model, Schema } from "mongoose";

const CourseSchema = new Schema({
    courseName: String,
    courseCode: String,
    courseCredit: Number,
    courseStudentCount: Number,
    courseStudentCountLimit: Number,
    courseTeacher: String,
    courseDescription: String,
    courseRequirements: String,
    courseStatus: String,
    courseCalendar: [{
        startDate: Date,
        endDate: Date,
        length: Number
    }],
    students: [String]
});

const Course = model('courses', CourseSchema);

export default Course;