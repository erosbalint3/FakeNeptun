import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoginRequest } from '../../models/Requests/login.request';
import { UserModel } from '../../models/user.model';
import { UserSaveRequest } from '../../models/Requests/UserSaveRequest';
import {PasswordChangeRequestModel} from "../../models/Requests/password-change-request.model";
import {ProfileDataChangeRequestModel} from "../../models/Requests/profile-data-change-request.model";

export enum UserEventEnums {
  LOGIN = 'User login',
  LOGIN_SUCCESS = 'User login success',
  LOGIN_FAILED = 'User login failed',
  REGISTER = 'User register',
  REGISTER_SUCCESS = 'User register success',
  REGISTER_FAILED = 'User register failed',
  CHANGE_PASSWORD = 'User change password',
  CHANGE_PASSWORD_SUCCESS = 'User change password success',
  CHANGE_PASSWORD_FAILED = 'User change password failed',
  CHANGE_PROFILE_DATA = 'User change profile data',
  CHANGE_PROFILE_DATA_SUCCESS = 'User change profile data success',
  CHANGE_PROFILE_DATA_FAILED = 'User change profile data failed',
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
    [UserEventEnums.CLEAR_STATE]: emptyProps(),
    [UserEventEnums.CHANGE_PASSWORD]: props<{ changePasswordRequest: PasswordChangeRequestModel }>(),
    [UserEventEnums.CHANGE_PASSWORD_SUCCESS]: emptyProps(),
    [UserEventEnums.CHANGE_PASSWORD_FAILED]: props<{ errorMessage: string }>(),
    [UserEventEnums.CHANGE_PROFILE_DATA]: props<{ changeProfileDataRequest: ProfileDataChangeRequestModel }>(),
    [UserEventEnums.CHANGE_PROFILE_DATA_SUCCESS]: props<{ user: UserModel }>(),
    [UserEventEnums.CHANGE_PROFILE_DATA_FAILED]: props<{ errorMessage: string }>()
  }
});
