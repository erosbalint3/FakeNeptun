import { model, Schema } from "mongoose";

const GradeSchema = new Schema({
    grade: Number,
    studentEmail: String,
    courseCode: String
});

const Grade = model('grades', GradeSchema);
export default Grade;