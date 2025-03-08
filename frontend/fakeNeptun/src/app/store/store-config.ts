import { userFeatureKey, userReducer } from './reducers/user.reducer';
import { courseFeatureKey, courseReducer } from './reducers/courses.reducer';
import { UserEffects } from './effects/user.effects';
import { CoursesEffects } from './effects/courses.effects';

export const REDUCERS = {
  [userFeatureKey]: userReducer,
  [courseFeatureKey]: courseReducer
};

export const EFFECTS = [
  UserEffects,
  CoursesEffects
];
