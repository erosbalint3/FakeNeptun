import {HttpClient} from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import {Observable} from "rxjs";
import {FinalGrade} from "../models/grade.model";

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  private readonly http = inject(HttpClient);


  listGrades(studentEmail: string, courseCode: string): Observable<number[]> {
    return this.http.get<number[]>('http://localhost:3000/api/grades', { params: { courseCode: courseCode, studentEmail: studentEmail }});
  }

  listFinalGrades(studentEmail: string): Observable<FinalGrade[]> {
    return this.http.get<FinalGrade[]>('http://localhost:3000/api/grades/final', { params: { studentEmail: studentEmail }});
  }

  createGrade(grade: number, studentEmail: string, courseCode: string): Observable<void> {
    return this.http.post<void>('http://localhost:3000/api/grades', { grade: grade, studentEmail: studentEmail, courseCode: courseCode });
  }

  createFinalGrade(grade: number, studentEmail: string, courseCode: string): Observable<void> {
    return this.http.post<void>('http://localhost:3000/api/grades/final', { grade: grade, studentEmail: studentEmail, courseCode: courseCode });
  }
}
