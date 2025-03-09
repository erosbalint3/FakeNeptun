import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CourseService } from '../../services/course.service';
import { CourseActions } from '../actions/courses.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class CoursesEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly courseService: CourseService
  ) {}

  readonly listCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.coursesList),
      switchMap(({studentEmail}) =>
        this.courseService.listCourses(studentEmail).pipe(
          map((courses) => CourseActions.coursesListSuccess({ courses: courses})),
          catchError((error: HttpErrorResponse) =>
            of(
              CourseActions.coursesListFailed({
                errorMessage: error.message
              })
            )
          )
        )
      )
    )
  );

  readonly listCoursesForRegistration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.courseRegisterList),
      switchMap(() =>
        this.courseService.listCoursesForRegistration().pipe(
          map((courses) => CourseActions.courseRegisterListSuccess({ courses: courses })),
          catchError((error: HttpErrorResponse) =>
            of(
              CourseActions.courseRegisterListFailed({
                errorMessage: error.message
              })
            )
          )
        )
      )
    )
  );

  readonly createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.courseSave),
      switchMap(({courseSaveRequest}) =>
        this.courseService.createCourse(courseSaveRequest).pipe(
          map(() => CourseActions.courseSaveSuccess()),
          catchError((error: HttpErrorResponse) =>
            of(
              CourseActions.courseSaveFailed({
                errorMessage: error.message
              })
            )
          )
        )
      )
    )
  );

  readonly registerForCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.courseRegister),
      switchMap(({ courseCode, userEmail }) =>
        this.courseService.registerForCourse(courseCode, userEmail).pipe(
          map(() => CourseActions.courseRegisterSuccess()),
          catchError((error: HttpErrorResponse) =>
            of(
              CourseActions.courseRegisterFailed({
                errorMessage: error.message
              })
            )
          )
        )
      )
    )
  );
}
