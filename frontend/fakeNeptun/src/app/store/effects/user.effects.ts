import { Injectable } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserActions } from '../actions/user.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class UserEffects {
  constructor (
    private readonly actions$: Actions,
    private readonly userService: UserService
  ) {}

  readonly userLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.userLogin),
      switchMap(({ loginRequest }) =>
        this.userService.loginUser(loginRequest).pipe(
          map((user) => UserActions.userLoginSuccess({ user })),
          catchError((error: HttpErrorResponse) =>
            of(
              UserActions.userLoginFailed({
                errorMessage: error.message
              })
            )
          )
        )
      )
    )
  );
}
