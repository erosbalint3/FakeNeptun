import { CourseModel } from '../../models/course.model';
import { CourseDetailsModel } from '../../models/course-details.model';
import { ActionReducer, createReducer, on } from '@ngrx/store';
import { CourseActions } from '../actions/courses.actions';
import { CourseSaveModel } from '../../models/Requests/course-save-request.model';
import {UserModel} from "../../models/user.model";

export const courseFeatureKey = 'courses';

export interface CourseState {
  isLoading: boolean;
  courseList: CourseModel[];
  registerCourseList: CourseModel[];
  courseDetail?: CourseDetailsModel;
  courseSaveDraft?: CourseSaveModel;
  courseUsers?: UserModel[];
}

const initialState: CourseState = {
  isLoading: false,
  courseList: [],
  registerCourseList: [],
  courseDetail: undefined,
  courseSaveDraft: undefined,
  courseUsers: []
}

export const courseReducer: ActionReducer<CourseState> = createReducer(
  initialState,
  on(CourseActions.coursesList, (_state) => ({ ..._state, isLoading: true })),
  on(CourseActions.coursesListSuccess, (_state, { courses }) => ({ ..._state, courseList: courses, isLoading: false })),
  on(CourseActions.coursesListFailed, (_state) => ({ ..._state, isLoading: false })),
  on(CourseActions.courseSaveDraft, (_state, { courseSaveRequest}) => ({ ..._state, courseSaveDraft: courseSaveRequest })),
  on(CourseActions.courseDetails, (_state) => ({ ..._state, isLoading: true })),
  on(CourseActions.courseDetailsSuccess, (_state, { courseDetails }) => ({ ..._state, courseDetail: courseDetails, isLoading: false })),
  on(CourseActions.courseDetailsFailed, (_state) => ({ ..._state, isLoading: false })),
  on(CourseActions.clearState, (_state) => ({ isLoading: false, courseList: [], registerCourseList: [], courseDetail: undefined, courseSaveDraft: undefined })),
  on(CourseActions.courseRegisterList, (_state) => ({ ..._state, isLoading: true })),
  on(CourseActions.courseRegisterListSuccess, (_state, { courses }) => ({ ..._state, isLoading: false, registerCourseList: courses })),
  on(CourseActions.courseRegisterListFailed, (_state) => ({ ..._state, isLoading: false })),
  on(CourseActions.courseUsers, (_state) => ({ ..._state, isLoading: true })),
  on(CourseActions.courseUsersSuccess, (_state, { courseUsers }) => ({ ..._state, courseUsers, isLoading: false })),
  on(CourseActions.courseUsersFailed, (_state) => ({ ..._state, isLoading: false }))
);
