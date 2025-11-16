import { CourseService } from './courses.service';
import Course from '../models/course';
import { CourseEnrollment } from '../models/course-enrollment';
import { FrequencyType } from '../enums/frequency-type.enum';

// Mock the models
jest.mock('../models/course');
jest.mock('../models/course-enrollment');

describe('CourseService', () => {
  let courseService: CourseService;
  const mockCourse = {
    courseCode: 'CS101',
    courseName: 'Introduction to CS',
    credits: 5,
    frequencyType: FrequencyType.WEEKLY,
    students: ['student@example.com'],
    teachers: ['teacher@example.com'],
    courseCalendar: [
      { startDate: new Date('2024-01-01'), endDate: new Date('2024-01-02') },
      { startDate: new Date('2024-01-08'), endDate: new Date('2024-01-09') },
    ],
  };

  beforeEach(() => {
    courseService = new CourseService();
    jest.clearAllMocks();
  });

  describe('listCourses', () => {
    it('should return courses for a student with attendance info', async () => {
      const studentEmail = 'student@example.com';
      const mockEnrollments = [
        {
          courseCode: 'CS101',
          studentEmail,
          classDate: new Date('2024-01-01'),
        },
      ];

      (Course.find as jest.Mock) = jest.fn().mockResolvedValue([mockCourse]);
      (CourseEnrollment.find as jest.Mock) = jest.fn().mockResolvedValue(mockEnrollments);

      const result = await courseService.listCourses(studentEmail);

      expect(Course.find).toHaveBeenCalled();
      expect(CourseEnrollment.find).toHaveBeenCalledWith({ studentEmail });
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
    });

    it('should return empty array when student has no courses', async () => {
      const studentEmail = 'nocourses@example.com';

      (Course.find as jest.Mock) = jest.fn().mockResolvedValue([]);
      (CourseEnrollment.find as jest.Mock) = jest.fn().mockResolvedValue([]);

      const result = await courseService.listCourses(studentEmail);

      expect(result).toEqual([]);
    });
  });

});
