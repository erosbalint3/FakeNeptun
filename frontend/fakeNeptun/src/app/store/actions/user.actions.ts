import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoginRequest } from '../../models/Requests/login.request';
import { UserModel } from '../../models/user.model';
import { UserSaveRequest } from '../../models/Requests/UserSaveRequest';

export enum UserEventEnums {
  LOGIN = 'User login',
  LOGIN_SUCCESS = 'User login success',
  LOGIN_FAILED = 'User login failed',
  REGISTER = 'User register',
  REGISTER_SUCCESS = 'User register success',
  REGISTER_FAILED = 'User register failed',
  CLEAR_STATE = 'Clear state'
}

export const UserActions = createActionGroup({
  source: 'Users',
  events: {
    [UserEventEnums.LOGIN]: props<{ loginRequest: LoginRequest}>(),
    [UserEventEnums.LOGIN_SUCCESS]: props<{ user: UserModel }>(),
    [UserEventEnums.LOGIN_FAILED]: props<{ errorMessage: string }>(),
    [UserEventEnums.REGISTER]: props<{ userSaveRequest: UserSaveRequest}>(),
    [UserEventEnums.REGISTER_SUCCESS]: emptyProps(),
    [UserEventEnums.REGISTER_FAILED]: props<{ errorMessage: string }>(),
    [UserEventEnums.CLEAR_STATE]: emptyProps()
  }
});
