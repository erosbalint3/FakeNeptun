import { CourseModel } from '../../models/course.model';
import { CourseDetailsModel } from '../../models/course-details.model';
import { ActionReducer, createReducer, on } from '@ngrx/store';
import { CourseActions } from '../actions/courses.actions';
import { CourseSaveRequestModel } from '../../models/Requests/course-save-request.model';

export const courseFeatureKey = 'courses';

export interface CourseState {
  isLoading: boolean;
  courseList: CourseModel[];
  courseDetail?: CourseDetailsModel;
  courseSaveDraft?: CourseSaveRequestModel;
}

const initialState: CourseState = {
  isLoading: false,
  courseList: [],
  courseDetail: undefined,
  courseSaveDraft: undefined
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
  on(CourseActions.clearState, (_state) => ({ isLoading: false, courseList: [], courseDetail: undefined, courseSaveDraft: undefined }))
);
