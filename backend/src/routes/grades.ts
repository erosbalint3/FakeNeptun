import { Router } from 'express';
import gradeController from '../controllers/grade.controller';

const router: Router = Router();

router.get('/grades', gradeController.listGrades);
router.get('/grades/final', gradeController.getFinalGradesForStudent);
router.post('/grades', gradeController.saveGrade);

export default router;
