import { createFeatureSelector, createSelector } from '@ngrx/store';
import { courseFeatureKey, CourseState } from '../reducers/courses.reducer';

const selectFeature = createFeatureSelector<CourseState>(courseFeatureKey);

export const courseList$ = createSelector(selectFeature, ({ courseList }) => courseList);

export const registerCourseList$ = createSelector(selectFeature, ({ registerCourseList}) => registerCourseList);

export const courseDetails$ = createSelector(selectFeature, ({ courseDetail}) => courseDetail);

export const courseSaveDraft$ = createSelector(selectFeature, ({ courseSaveDraft }) => courseSaveDraft);
