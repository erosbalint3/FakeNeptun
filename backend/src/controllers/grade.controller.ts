import { Request, Response, NextFunction } from 'express';
import { GradesService } from '../services/grades.service';

const gradeService = new GradesService();

const listGrades = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { studentEmail, courseCode } = req.query;
    if (!studentEmail || !courseCode) {
      res.status(400).json({
        message: 'Missing studentEmail or courseCode',
      });
      return;
    }
    const response = await gradeService.listGrades(studentEmail as string, courseCode as string);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const getFinalGradesForStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const studentEmail =
      typeof req.query.studentEmail === 'string' ? req.query.studentEmail : undefined;
    if (!studentEmail) {
      res.status(400).json({
        message: 'Student email is undefined',
      });
      return;
    }
    const response = await gradeService.getFinalGradesForStudent(studentEmail);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const saveGrade = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { studentEmail, courseCode, grade } = req.body;
    if (!studentEmail || !courseCode || grade === undefined) {
      res.status(400).json({
        message: 'Missing studentEmail, courseCode or value',
      });
      return;
    }
    const response = await gradeService.saveGrade({ studentEmail, courseCode, grade });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export default { listGrades, getFinalGradesForStudent, saveGrade };
