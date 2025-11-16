import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseModel } from '../models/course.model';
import { CourseSaveModel } from '../models/Requests/course-save-request.model';
import { CourseDetailsModel } from '../models/course-details.model';
import {UserModel} from "../models/user.model";
import {ParticipationSaveRequestModel} from "../models/Requests/participation-save-request.model";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private readonly http = inject(HttpClient);


  listCourses(studentEmail: string): Observable<CourseModel[]> {
    return this.http.get<CourseModel[]>('http://localhost:3000/api/courses', { params: { studentEmail: studentEmail }});
  }

  listCoursesForRegistration(): Observable<CourseModel[]> {
    return this.http.get<CourseModel[]>('http://localhost:3000/api/courses/registerList');
  }

  createCourse(courseSaveRequest: CourseSaveModel): Observable<void> {
    return this.http.post<void>('http://localhost:3000/api/courses', courseSaveRequest);
  }

  registerForCourse(courseCode: string, userEmail: string): Observable<void> {
    return this.http.put<void>('http://localhost:3000/api/courses/register', { courseCode: courseCode, studentEmail: userEmail });
  }

  abandonCourse(courseCode: string, userEmail: string): Observable<void> {
    return this.http.post<void>('http://localhost:3000/api/courses/abandon', { courseCode: courseCode, studentEmail: userEmail });
  }

  deleteCourse(courseCode: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/api/courses/reject`, { body: { courseCode: courseCode }});
  }

  courseDetails(courseCode: string): Observable<CourseDetailsModel> {
    return this.http.get<CourseDetailsModel>(`http://localhost:3000/api/courses/${courseCode}`);
  }

  approveCourse(courseCode: string): Observable<void> {
    return this.http.put<void>(`http://localhost:3000/api/courses/approve`, { courseCode: courseCode });
  }

  courseParticipations(courseCode: string): Observable<UserModel[]> {
    return this.http.get<UserModel[]>('http://localhost:3000/api/courses/users', { params: { courseCode: courseCode }})
  }

  saveCourseParticipations(participationSaveRequest: ParticipationSaveRequestModel): Observable<void> {
    return this.http.post<void>('http://localhost:3000/api/courses/users', participationSaveRequest);
  }
}
