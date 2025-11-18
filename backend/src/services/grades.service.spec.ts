import { GradesService } from './grades.service';
import Grade from '../models/grade';
import Course from '../models/course';

jest.mock('../models/grade');
jest.mock('../models/course');

describe('GradesService', () => {
  let gradesService: GradesService;
  const studentEmail = 'student@example.com';
  const courseCode = 'CS101';

  beforeEach(() => {
    gradesService = new GradesService();
    jest.clearAllMocks();
  });

  describe('listGrades', () => {
    it('should return list of grades for a student in a course', async () => {
      const mockGrades = [
        { studentEmail, courseCode, grade: 85, _id: '1' },
        { studentEmail, courseCode, grade: 90, _id: '2' },
      ];

      (Grade.find as jest.Mock) = jest.fn().mockResolvedValue(mockGrades);

      const result = await gradesService.listGrades(studentEmail, courseCode);

      expect(Grade.find).toHaveBeenCalledWith({ studentEmail, courseCode });
      expect(result).toEqual([85, 90]);
    });

    it('should return empty array when no grades found', async () => {
      (Grade.find as jest.Mock) = jest.fn().mockResolvedValue([]);

      const result = await gradesService.listGrades(studentEmail, courseCode);

      expect(result).toEqual([]);
    });
  });

  describe('getFinalGradeForCourse', () => {
    it('should calculate and return final grade', async () => {
      const mockCourse = { courseCode, courseName: 'Test Course' };
      const mockGrades = [
        { studentEmail, courseCode, grade: 80 },
        { studentEmail, courseCode, grade: 90 },
        { studentEmail, courseCode, grade: 85 },
      ];

      (Course.findOne as jest.Mock) = jest.fn().mockResolvedValue(mockCourse);
      (Grade.find as jest.Mock) = jest.fn().mockResolvedValue(mockGrades);

      const result = await gradesService.getFinalGradeForCourse(studentEmail, courseCode);

      expect(Course.findOne).toHaveBeenCalledWith({ courseCode });
      expect(Grade.find).toHaveBeenCalledWith({ studentEmail, courseCode });
      expect(result).toHaveProperty('finalGrade');
    });

    it('should return message when course not found', async () => {
      (Course.findOne as jest.Mock) = jest.fn().mockResolvedValue(null);

      const result = await gradesService.getFinalGradeForCourse(studentEmail, courseCode);

      expect(result).toEqual({ message: 'Course not found' });
    });

    it('should return message when no grades found', async () => {
      const mockCourse = { courseCode, courseName: 'Test Course' };

      (Course.findOne as jest.Mock) = jest.fn().mockResolvedValue(mockCourse);
      (Grade.find as jest.Mock) = jest.fn().mockResolvedValue([]);

      const result = await gradesService.getFinalGradeForCourse(studentEmail, courseCode);

      expect(result).toEqual({ message: 'No grades found for this course' });
    });
  });
});
