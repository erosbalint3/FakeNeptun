import { Request, Response, NextFunction } from "express";
import { CourseService } from "../services/courses.service";

const courseService = new CourseService();

const listCourses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const studentEmail = req.query.studentEmail?.toString();

        if (!studentEmail) {
            res.status(400).json({ errorMessage: 'Student email is undefined' });
            return;
        }
        const response = await courseService.listCourses(studentEmail);
        res.status(200).json(response);
    } catch(error) {
        next(error);
    }
}

const createCourse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const response = await courseService.createCourse(req.body);
        res.status(200).json(response);
    } catch(error: any) {
        res.status(500).json({
            message: error.message
        });
        next(error);
    }
}

const listCoursesForRegistration = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const response = await courseService.listCoursesForRegistration();
        res.status(200).json(response);
    } catch(error) {
        next(error);
    }
}

const registerForCourse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const response = await courseService.registerForCourse(req.body);
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
        next(error);
    }
}

const abandonCourse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const response = await courseService.abandonCourse(req.body);
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
        next(error);
    }
}

const approveCourse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const response = await courseService.approveCourse(req.body);
        res.status(200).json(response);
    } catch(error: any) {
        res.status(500).json({
            message: error.message
        });
        next(error);
    }
}

const rejectCourse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const response = await courseService.rejectCourse(req.body);
        res.status(200).json(response);
    } catch(error) {
        next(error);
    }
}

const courseUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const response = await courseService.getCourseUsers(req.query?.courseCode?.toString() ?? '');
        res.status(200).json(response);
    } catch(error) {
        next(error);
    }
}

const saveCourseParticipations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const response = await courseService.saveCourseParticipations(req.body);
        res.status(200).json(response);
    } catch(error: any) {
        res.status(500).json({
            message: error.message
        });
        next(error);
    }
}

export default { listCourses, createCourse, listCoursesForRegistration, registerForCourse, abandonCourse, approveCourse, rejectCourse, courseUsers, saveCourseParticipations };