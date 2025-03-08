import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import { userFeatureKey, UserState } from '../reducers/user.reducer';

const selectFeature = createFeatureSelector<UserState>(userFeatureKey);

export const loggedInUser$ = createSelector(selectFeature, ({ loggedInUser }) => loggedInUser);
