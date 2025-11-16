import {Actions, createEffect, ofType} from "@ngrx/effects";
import {GradeService} from "../../services/grade.service";
import { Injectable, inject } from "@angular/core";
import {GradesActions} from "../actions/grades.actions";
import {catchError, map, of, switchMap} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable()
export class GradesEffects {
  private readonly actions$ = inject(Actions);
  private readonly gradesService = inject(GradeService);


  readonly listGrades$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GradesActions.gradesList),
      switchMap(({studentEmail, courseCode}) =>
        this.gradesService.listGrades(studentEmail, courseCode).pipe(
          map((grades) => GradesActions.gradesListSuccess({grades: grades})),
          catchError((error: HttpErrorResponse) =>
            of(
              GradesActions.gradesListFailed({
                errorMessage: error.message
              })
            )
          )
        )
      )
    )
  );

  readonly listFinalGrades$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GradesActions.gradesFinalGradeList),
      switchMap(({studentEmail}) =>
        this.gradesService.listFinalGrades(studentEmail).pipe(
          map((finalGrades) => GradesActions.gradesFinalGradeListSuccess({finalGrades: finalGrades})),
          catchError((error: HttpErrorResponse) =>
            of(
              GradesActions.gradesFinalGradeListFailed({
                errorMessage: error.message
              })
            )
          )
        )
      )
    )
  );

  readonly createGrade$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GradesActions.gradesCreate),
      switchMap(({ grade, studentEmail, courseCode }) =>
        this.gradesService.createGrade(grade, studentEmail, courseCode).pipe(
          map(() => GradesActions.gradesCreateSuccess()),
          catchError((error: HttpErrorResponse) =>
            of(
              GradesActions.gradesCreateFailed({
                errorMessage: error.message
              })
            )
          )
        )
      )
    )
  );

  readonly createFinalGrade$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GradesActions.gradesFinalGradeCreate),
      switchMap(({ grade, studentEmail, courseCode }) =>
        this.gradesService.createFinalGrade(grade, studentEmail, courseCode).pipe(
          map(() => GradesActions.gradesFinalGradeCreateSuccess()),
          catchError((error: HttpErrorResponse) =>
            of(
              GradesActions.gradesFinalGradeCreateFailed({
                errorMessage: error.message
              })
            )
          )
        )
      )
    )
  );
}
