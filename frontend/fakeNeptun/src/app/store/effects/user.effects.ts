import { Injectable, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserActions } from '../actions/user.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class UserEffects {
  private readonly actions$ = inject(Actions);
  private readonly userService = inject(UserService);


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

  readonly changePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.userChangePassword),
      switchMap(({ changePasswordRequest }) =>
        this.userService.changePassword(changePasswordRequest).pipe(
          map(() => UserActions.userChangePasswordSuccess()),
          catchError((error: HttpErrorResponse) =>
            of(
              UserActions.userChangePasswordFailed({
                errorMessage: error.message
              })
            )
          )
        )
      )
    )
  );

  readonly changeProfileData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.userChangeProfileData),
      switchMap(({ changeProfileDataRequest }) =>
        this.userService.changeProfileData(changeProfileDataRequest).pipe(
          map((response) => UserActions.userChangeProfileDataSuccess({ user: response })),
          catchError((error: HttpErrorResponse) =>
            of(
              UserActions.userChangeProfileDataFailed({
                errorMessage: error.message
              })
            )
          )
        )
      )
    )
  );
}
