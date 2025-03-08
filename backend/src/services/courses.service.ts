import Course from "../models/course";

export class CourseService {
    constructor() {}

    async listCourses() {
        const response = await Course.find();
        return Promise.resolve(response);
    }
}

