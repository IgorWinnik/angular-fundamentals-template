import { createFeatureSelector, createSelector } from '@ngrx/store';
import { coursesFeatureKey, CoursesState } from './courses.reducer';

/* =======================
   Feature selector
======================= */

export const selectCoursesState =
  createFeatureSelector<CoursesState>(coursesFeatureKey);

/* =======================
   Loading selectors
======================= */

export const isAllCoursesLoadingSelector = createSelector(
  selectCoursesState,
  (state) => state.isAllCoursesLoading
);

export const isSearchingStateSelector = createSelector(
  selectCoursesState,
  (state) => state.isSearchState
);

export const isSingleCourseLoadingSelector = createSelector(
  selectCoursesState,
  (state) => state.isSingleCourseLoading
);

/* =======================
   Data selectors
======================= */

export const getAllCourses = createSelector(
  selectCoursesState,
  (state) => state.allCourses
);

export const getCourse = createSelector(
  selectCoursesState,
  (state) => state.course
);

/* =======================
   Error selector
======================= */

export const getErrorMessage = createSelector(
  selectCoursesState,
  (state) => state.errorMessage
);
