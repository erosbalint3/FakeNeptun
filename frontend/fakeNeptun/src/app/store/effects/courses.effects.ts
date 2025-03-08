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
      switchMap(() =>
        this.courseService.listCourses().pipe(
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
}
