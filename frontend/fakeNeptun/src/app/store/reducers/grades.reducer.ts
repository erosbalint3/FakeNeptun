import {ActionReducer, createReducer, on} from "@ngrx/store";
import {GradesActions} from "../actions/grades.actions";
import {FinalGrade} from "../../models/grade.model";

export const gradeFeatureKey = 'grades';

export interface GradeState {
  isLoading: boolean;
  grades: number[];
  finalGrades: FinalGrade[];
}

const initialState: GradeState = {
  isLoading: false,
  grades: [],
  finalGrades: []
}

export const gradesReducer: ActionReducer<GradeState> = createReducer(
  initialState,
  on(GradesActions.gradesList, (_state) => ({ ..._state, isLoading: true })),
  on(GradesActions.gradesListSuccess, (_state, { grades }) => ({ ..._state, grades: grades, isLoading: false })),
  on(GradesActions.gradesListFailed, (_state) => ({ ..._state, isLoading: false })),
  on(GradesActions.gradesCreate, (_state) => ({ ..._state, isLoading: true })),
  on(GradesActions.gradesCreateSuccess, (_state) => ({ ..._state, isLoading: false })),
  on(GradesActions.gradesCreateFailed, (_state) => ({ ..._state, isLoading: false })),
  on(GradesActions.gradesFinalGradeList, (_state) => ({ ..._state, isLoading: true })),
  on(GradesActions.gradesFinalGradeListSuccess, (_state, { finalGrades }) => ({ ..._state, finalGrades: finalGrades, isLoading: false })),
  on(GradesActions.gradesFinalGradeListFailed, (_state) => ({ ..._state, isLoading: false }))
);
