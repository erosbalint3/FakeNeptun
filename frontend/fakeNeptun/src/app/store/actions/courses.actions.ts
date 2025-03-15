import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CourseModel } from '../../models/course.model';
import { CourseSaveModel } from '../../models/Requests/course-save-request.model';
import { CourseDetailsModel } from '../../models/course-details.model';
import {UserModel} from "../../models/user.model";

export enum CoursesEventEnums {
  COURSE_LIST = 'Courses list',
  COURSE_LIST_SUCCESS = 'Courses list success',
  COURSE_LIST_FAILED = 'Courses list failed',
  COURSE_SAVE = 'Course save',
  COURSE_SAVE_SUCCESS = 'Course save success',
  COURSE_SAVE_FAILED = 'Course save failed',
  COURSE_REGISTER = 'Course register',
  COURSE_REGISTER_SUCCESS = 'Course register success',
  COURSE_REGISTER_FAILED = 'Course register failed',
  COURSE_REGISTER_LIST = 'Course register list',
  COURSE_REGISTER_LIST_SUCCESS = 'Course register list success',
  COURSE_REGISTER_LIST_FAILED = 'Course register list failed',
  COURSE_ABANDON = 'Course abandon',
  COURSE_ABANDON_SUCCESS = 'Course abandon success',
  COURSE_ABANDON_FAILED = 'Course abandon failed',
  COURSE_SAVE_DRAFT = 'Course save draft',
  COURSE_DELETE = 'Course delete',
  COURSE_DELETE_SUCCESS = 'Course delete success',
  COURSE_DELETE_FAILED = 'Course delete failed',
  COURSE_DETAILS = 'Course details',
  COURSE_DETAILS_SUCCESS = 'Course details success',
  COURSE_DETAILS_FAILED = 'Course details failed',
  CLEAR_STATE = 'Clear state',
  COURSE_APPROVE = 'Course approve',
  COURSE_APPROVE_SUCCESS = 'Course approve success',
  COURSE_APPROVE_FAILED = 'Course approve failed',
  COURSE_USERS = 'Course users',
  COURSE_USERS_SUCCESS = 'Course users success',
  COURSE_USERS_FAILED = 'Course users failed'
}

export const CourseActions = createActionGroup({
  source: 'Courses',
  events: {
    [CoursesEventEnums.COURSE_LIST]: props<{ studentEmail: string}>(),
    [CoursesEventEnums.COURSE_LIST_SUCCESS]: props<{ courses: CourseModel[]}>(),
    [CoursesEventEnums.COURSE_LIST_FAILED]: props<{ errorMessage: string }>(),
    [CoursesEventEnums.COURSE_SAVE]: props<{ courseSaveRequest: CourseSaveModel}>(),
    [CoursesEventEnums.COURSE_SAVE_SUCCESS]: emptyProps(),
    [CoursesEventEnums.COURSE_SAVE_FAILED]: props<{ errorMessage: string }>(),
    [CoursesEventEnums.COURSE_REGISTER]: props<{ courseCode: string, userEmail: string }>(),
    [CoursesEventEnums.COURSE_REGISTER_SUCCESS]: emptyProps(),
    [CoursesEventEnums.COURSE_REGISTER_FAILED]: props<{ errorMessage: string }>(),
    [CoursesEventEnums.COURSE_REGISTER_LIST]: emptyProps(),
    [CoursesEventEnums.COURSE_REGISTER_LIST_SUCCESS]: props<{ courses: CourseModel[] }>(),
    [CoursesEventEnums.COURSE_REGISTER_LIST_FAILED]: props<{ errorMessage: string }>(),
    [CoursesEventEnums.COURSE_ABANDON]: props<{ courseCode: string, userEmail: string }>(),
    [CoursesEventEnums.COURSE_ABANDON_SUCCESS]: emptyProps(),
    [CoursesEventEnums.COURSE_ABANDON_FAILED]: props<{ errorMessage: string }>(),
    [CoursesEventEnums.COURSE_SAVE_DRAFT]: props<{ courseSaveRequest: CourseSaveModel }>(),
    [CoursesEventEnums.COURSE_DELETE]: props<{ courseCode: string }>(),
    [CoursesEventEnums.COURSE_DELETE_SUCCESS]: emptyProps(),
    [CoursesEventEnums.COURSE_DELETE_FAILED]: props<{ errorMessage: string }>(),
    [CoursesEventEnums.COURSE_DETAILS]: props<{ courseCode: string }>(),
    [CoursesEventEnums.COURSE_DETAILS_SUCCESS]: props<{ courseDetails: CourseDetailsModel }>(),
    [CoursesEventEnums.COURSE_DETAILS_FAILED]: props<{ errorMessage: string }>(),
    [CoursesEventEnums.CLEAR_STATE]: emptyProps(),
    [CoursesEventEnums.COURSE_APPROVE]: props<{ courseCode: string }>(),
    [CoursesEventEnums.COURSE_APPROVE_SUCCESS]: emptyProps(),
    [CoursesEventEnums.COURSE_APPROVE_FAILED]: props<{ errorMessage: string }>(),
    [CoursesEventEnums.COURSE_USERS]: props<{ courseCode: string }>(),
    [CoursesEventEnums.COURSE_USERS_SUCCESS]: props<{ courseUsers: UserModel[] }>(),
    [CoursesEventEnums.COURSE_USERS_FAILED]: props<{ errorMessage: string }>()
  }
});
