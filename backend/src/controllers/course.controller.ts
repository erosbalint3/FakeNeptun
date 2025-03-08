import { Request, Response, NextFunction } from "express";
import { CourseService } from "../services/courses.service";

const courseService = new CourseService();

const listCourses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const response = await courseService.listCourses();
        res.status(200).json(response);
    } catch(error) {
        next(error);
    }
}


export default { listCourses };