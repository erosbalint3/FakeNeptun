import { UserModel } from '../../models/user.model';
import { ActionReducer, createReducer, on } from '@ngrx/store';
import { UserActions } from '../actions/user.actions';

export const userFeatureKey = 'users';

export interface UserState {
  isLoading: boolean;
  loggedInUser?: UserModel;
}


const initialState: UserState = {
  isLoading: false,
  loggedInUser: undefined
}

export const userReducer: ActionReducer<UserState> = createReducer(
  initialState,
  on(UserActions.userLogin, (_state) => ({ ..._state, isLoading: true })),
  on(UserActions.userLoginSuccess, (_state, { user }) => ({ ..._state, isLoading: false, loggedInUser: user })),
  on(UserActions.userLoginFailed, (_state) => ({ ..._state, isLoading: false })),
  on(UserActions.clearState, () => ({ isLoading: false, loggedInUser: undefined }))
);
