import courseController from "../controllers/course.controller";
import { Router } from "express";

const router: Router = Router();

router.get('/courses', courseController.listCourses);

export default router;