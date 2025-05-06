import {createFeatureSelector, createSelector} from "@ngrx/store";
import {gradeFeatureKey, GradeState} from "../reducers/grades.reducer";

const selectFeature = createFeatureSelector<GradeState>(gradeFeatureKey);

export const gradeList$ = createSelector(selectFeature, ({ grades }) => grades);

export const finalGradeList$ = createSelector(selectFeature, ({ finalGrades }) => finalGrades);
