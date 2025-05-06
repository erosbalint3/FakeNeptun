import { userFeatureKey, userReducer } from './reducers/user.reducer';
import { courseFeatureKey, courseReducer } from './reducers/courses.reducer';
import { UserEffects } from './effects/user.effects';
import { CoursesEffects } from './effects/courses.effects';
import {gradeFeatureKey, gradesReducer} from "./reducers/grades.reducer";
import {GradesEffects} from "./effects/grades.effects";

export const REDUCERS = {
  [userFeatureKey]: userReducer,
  [courseFeatureKey]: courseReducer,
  [gradeFeatureKey]: gradesReducer
};

export const EFFECTS = [
  UserEffects,
  CoursesEffects,
  GradesEffects
];
