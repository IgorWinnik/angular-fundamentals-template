import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as CoursesActions from './courses.actions';
import * as CoursesSelectors from './courses.selectors';
import { State } from '../index';
import { Course } from '@app/shared/models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesFacade {
  /* =======================
     Observables
  ======================= */

  isAllCoursesLoading$: Observable<boolean> = this.store.pipe(
    select(CoursesSelectors.isAllCoursesLoadingSelector)
  );

  isSingleCourseLoading$: Observable<boolean> = this.store.pipe(
    select(CoursesSelectors.isSingleCourseLoadingSelector)
  );

  isSearchingState$: Observable<boolean> = this.store.pipe(
    select(CoursesSelectors.isSearchingStateSelector)
  );

  /** ⬇️ FIX: null → [] */
  courses$: Observable<Course[]> = this.store.pipe(
    select(CoursesSelectors.getAllCourses),
    map(courses => courses ?? [])
  );

  /** ⬇️ FIX: null → [] */
  allCourses$: Observable<Course[]> = this.store.pipe(
    select(CoursesSelectors.getAllCourses),
    map(courses => courses ?? [])
  );

  /** ⬇️ FIX: залишаємо null-safe */
  course$: Observable<Course | null> = this.store.pipe(
    select(CoursesSelectors.getCourse)
  );

  /** ⬇️ FIX: null → '' */
  errorMessage$: Observable<string> = this.store.pipe(
    select(CoursesSelectors.getErrorMessage),
    map(error => error ?? '')
  );

  constructor(private store: Store<State>) {}

  /* =======================
     Methods to dispatch actions
  ======================= */

  getAllCourses(): void {
    this.store.dispatch(CoursesActions.requestAllCourses());
  }

  getSingleCourse(id: string): void {
    this.store.dispatch(CoursesActions.requestSingleCourse({ id }));
  }

  getFilteredCourses(searchValue: string): void {
    this.store.dispatch(
      CoursesActions.requestFilteredCourses({ searchValue })
    );
  }

  editCourse(body: Course, id: string): void {
    this.store.dispatch(
      CoursesActions.requestEditCourse({ body, id })
    );
  }

  createCourse(body: Course): void {
    this.store.dispatch(
      CoursesActions.requestCreateCourse({ body })
    );
  }

  deleteCourse(id: string): void {
    this.store.dispatch(
      CoursesActions.requestDeleteCourse({ id })
    );
  }
}
