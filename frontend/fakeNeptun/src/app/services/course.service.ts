import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseModel } from '../models/course.model';
import { CourseSaveRequestModel } from '../models/Requests/course-save-request.model';
import { CourseDetailsModel } from '../models/course-details.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private readonly http: HttpClient) {}

  listCourses(): Observable<CourseModel[]> {
    return this.http.get<CourseModel[]>('http://localhost:3000/api/courses');
  }

  createCourse(courseSaveRequest: CourseSaveRequestModel): Observable<void> {
    return this.http.post<void>('http://localhost:3000/api/courses', courseSaveRequest);
  }

  registerForCourse(courseCode: string, userEmail: string): Observable<void> {
    return this.http.post<void>('http://localhost:3000/api/courses/register', { courseCode: courseCode, userEmail: userEmail });
  }

  abandonCourse(courseCode: string, userEmail: string): Observable<void> {
    return this.http.post<void>('http://localhost:3000/api/courses/abandon', { courseCode: courseCode, userEmail: userEmail });
  }

  deleteCourse(courseCode: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/api/courses/${courseCode}`);
  }

  courseDetails(courseCode: string): Observable<CourseDetailsModel> {
    return this.http.get<CourseDetailsModel>(`http://localhost:3000/api/courses/${courseCode}`);
  }
}
