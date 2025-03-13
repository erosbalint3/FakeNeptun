import courseController from "../controllers/course.controller";
import { Router } from "express";

const router: Router = Router();

router.get('/courses', courseController.listCourses);
router.get('/courses/registerList', courseController.listCoursesForRegistration);
router.put('/courses/register', courseController.registerForCourse);
router.post('/courses', courseController.createCourse);
router.post('/courses/abandon', courseController.abandonCourse);
router.put('/courses/approve', courseController.approveCourse);
router.delete('/courses/reject', courseController.rejectCourse);
router.get('/course/users', courseController.courseUsers);

export default router;