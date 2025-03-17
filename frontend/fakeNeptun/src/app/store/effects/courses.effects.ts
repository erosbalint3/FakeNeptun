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

  readonly abandonCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.courseAbandon),
      switchMap(({ courseCode, userEmail }) =>
        this.courseService.abandonCourse(courseCode, userEmail).pipe(
          map(() => CourseActions.courseAbandonSuccess()),
          catchError((error: HttpErrorResponse) =>
            of(
              CourseActions.courseAbandonFailed({
                errorMessage: error.message
              })
            )
          )
        )
      )
    )
  );

  readonly approveCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.courseApprove),
      switchMap(({ courseCode }) =>
        this.courseService.approveCourse(courseCode).pipe(
          map(() => CourseActions.courseApproveSuccess()),
          catchError((error: HttpErrorResponse) =>
            of(
              CourseActions.courseApproveFailed({
                errorMessage: error.message
              })
            )
          )
        )
      )
    )
  );

  readonly deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.courseDelete),
      switchMap(({ courseCode }) =>
        this.courseService.deleteCourse(courseCode).pipe(
          map(() => CourseActions.courseDeleteSuccess()),
          catchError((error: HttpErrorResponse) =>
            of(
              CourseActions.courseDeleteFailed({
                errorMessage: error.message
              })
            )
          )
        )
      )
    )
  );

  readonly courseUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.courseUsers),
      switchMap(({ courseCode }) =>
        this.courseService.courseParticipations(courseCode).pipe(
          map((users) => CourseActions.courseUsersSuccess({ courseUsers: users })),
          catchError((error: HttpErrorResponse) =>
            of(
              CourseActions.courseUsersFailed({
                errorMessage: error.message
              })
            )
          )
        )
      )
    )
  );

  readonly courseUsersSave$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.courseUsersSave),
      switchMap(({ request }) =>
        this.courseService.saveCourseParticipations(request).pipe(
          map(() => CourseActions.courseUsersSaveSuccess()),
          catchError((error: HttpErrorResponse) =>
            of(
              CourseActions.courseUsersSaveFailed({
                errorMessage: error.message
              })
            )
          )
        )
      )
    )
  );
}
