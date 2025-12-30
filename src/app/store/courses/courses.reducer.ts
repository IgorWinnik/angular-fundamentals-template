import { Action, createReducer, on } from '@ngrx/store';
import * as CoursesActions from './courses.actions';
import { Course } from '@app/shared/models/course.model';

/* =======================
   Feature key
======================= */

export const coursesFeatureKey = 'courses';

/* =======================
   State interface
======================= */

export interface CoursesState {
  allCourses: Course[] | null;
  course: Course | null;
  isAllCoursesLoading: boolean;
  isSingleCourseLoading: boolean;
  isSearchState: boolean;
  errorMessage: string | null;
}

/* =======================
   Initial state
======================= */

export const initialState: CoursesState = {
  allCourses: null,
  course: null,
  isAllCoursesLoading: false,
  isSingleCourseLoading: false,
  isSearchState: false,
  errorMessage: null,
};

/* =======================
   Reducer
======================= */

export const coursesReducer = createReducer(
  initialState,

  /* ===== All courses ===== */
  on(CoursesActions.requestAllCourses, (state) => ({
    ...state,
    isAllCoursesLoading: true,
    errorMessage: null,
  })),

  on(CoursesActions.requestAllCoursesSuccess, (state, { courses }) => ({
    ...state,
    allCourses: courses,
    isAllCoursesLoading: false,
    isSearchState: false,
  })),

  on(CoursesActions.requestAllCoursesFail, (state, { error }) => ({
    ...state,
    isAllCoursesLoading: false,
    errorMessage: error,
  })),

  /* ===== Single course ===== */
  on(CoursesActions.requestSingleCourse, (state) => ({
    ...state,
    isSingleCourseLoading: true,
    errorMessage: null,
  })),

  on(CoursesActions.requestSingleCourseSuccess, (state, { course }) => ({
    ...state,
    course,
    isSingleCourseLoading: false,
  })),

  on(CoursesActions.requestSingleCourseFail, (state, { error }) => ({
    ...state,
    isSingleCourseLoading: false,
    errorMessage: error,
  })),

  /* ===== Filtered courses ===== */
  on(CoursesActions.requestFilteredCourses, (state) => ({
    ...state,
    isSearchState: true,
  })),

  on(CoursesActions.requestFilteredCoursesSuccess, (state, { courses }) => ({
    ...state,
    allCourses: courses,
    isSearchState: true,
  })),

  on(CoursesActions.requestFilteredCoursesFail, (state, { error }) => ({
    ...state,
    errorMessage: error,
  })),

  /* ===== Delete course ===== */
  on(CoursesActions.requestDeleteCourseFail, (state, { error }) => ({
    ...state,
    errorMessage: error,
  })),

  /* ===== Edit course ===== */
  on(CoursesActions.requestEditCourseSuccess, (state, { course }) => ({
    ...state,
    course,
  })),

  on(CoursesActions.requestEditCourseFail, (state, { error }) => ({
    ...state,
    errorMessage: error,
  })),

  /* ===== Create course ===== */
  on(CoursesActions.requestCreateCourseSuccess, (state, { course }) => ({
    ...state,
    course,
  })),

  on(CoursesActions.requestCreateCourseFail, (state, { error }) => ({
    ...state,
    errorMessage: error,
  }))
);

/* =======================
   Reducer wrapper
======================= */

export function reducer(
  state: CoursesState | undefined,
  action: Action
): CoursesState {
  return coursesReducer(state, action);
}
