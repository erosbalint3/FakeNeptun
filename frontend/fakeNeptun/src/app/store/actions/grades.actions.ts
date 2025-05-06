import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {FinalGrade} from "../../models/grade.model";

export enum GradesEventEnums {
  GRADES_LIST = 'Grades list',
  GRADES_LIST_SUCCESS = 'Grades list success',
  GRADES_LIST_FAILED = 'Grades list failed',
  GRADES_CREATE = 'Grades create',
  GRADES_CREATE_SUCCESS = 'Grades create success',
  GRADES_CREATE_FAILED = 'Grades create failed',
  GRADES_FINAL_GRADE_LIST = 'Grades final grade list',
  GRADES_FINAL_GRADE_LIST_SUCCESS = 'Grades final grade list success',
  GRADES_FINAL_GRADE_LIST_FAILED = 'Grades final grade list failed',
  GRADES_FINAL_GRADE_CREATE = 'Grades final grade create',
  GRADES_FINAL_GRADE_CREATE_SUCCESS = 'Grades final grade create success',
  GRADES_FINAL_GRADE_CREATE_FAILED = 'Grades final grade create failed'
}

export const GradesActions = createActionGroup({
  source: 'Grades',
  events: {
    [GradesEventEnums.GRADES_LIST]: props<{ studentEmail: string; courseCode: string }>(),
    [GradesEventEnums.GRADES_LIST_SUCCESS]: props<{ grades: number[] }>(),
    [GradesEventEnums.GRADES_LIST_FAILED]: props<{ errorMessage: string }>(),
    [GradesEventEnums.GRADES_CREATE]: props<{ grade: number; studentEmail: string; courseCode: string }>(),
    [GradesEventEnums.GRADES_CREATE_SUCCESS]: emptyProps(),
    [GradesEventEnums.GRADES_CREATE_FAILED]: props<{ errorMessage: string }>(),
    [GradesEventEnums.GRADES_FINAL_GRADE_LIST]: props<{ studentEmail: string }>(),
    [GradesEventEnums.GRADES_FINAL_GRADE_LIST_SUCCESS]: props<{ finalGrades: FinalGrade[] }>(),
    [GradesEventEnums.GRADES_FINAL_GRADE_LIST_FAILED]: props<{ errorMessage: string }>(),
    [GradesEventEnums.GRADES_FINAL_GRADE_CREATE]: props<{ grade: number; studentEmail: string; courseCode: string }>(),
    [GradesEventEnums.GRADES_FINAL_GRADE_CREATE_SUCCESS]: emptyProps(),
    [GradesEventEnums.GRADES_FINAL_GRADE_CREATE_FAILED]: props<{ errorMessage: string }>()
  }
});
