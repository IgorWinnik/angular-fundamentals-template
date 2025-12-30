import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap, withLatestFrom, tap } from 'rxjs';
import { CoursesService } from '@app/services/courses.service';
import * as CoursesActions from './courses.actions';
import { CoursesFacade } from './courses.facade';

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private coursesFacade: CoursesFacade,
    private router: Router
  ) {}

  /* =======================
     Get all courses
  ======================= */
  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestAllCourses),
      switchMap(() =>
        this.coursesService.getAll().pipe(
          map((courses) =>
            CoursesActions.requestAllCoursesSuccess({ courses })
          ),
          catchError((error) =>
            of(CoursesActions.requestAllCoursesFail({ error }))
          )
        )
      )
    )
  );

  /* =======================
     Filtered courses
  ======================= */
  filteredCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestFilteredCourses),
      withLatestFrom(this.coursesFacade.allCourses$),
      map(([{ searchValue }, courses]) => {
        const filteredCourses = courses?.filter((course) =>
          course.title.toLowerCase().includes(searchValue.toLowerCase())
        );
        return CoursesActions.requestFilteredCoursesSuccess({
          courses: filteredCourses,
        });
      })
    )
  );

  /* =======================
     Get specific course
  ======================= */
  getSpecificCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestSingleCourse),
      switchMap(({ id }) =>
        this.coursesService.getCourse(id).pipe(
          map((course) =>
            CoursesActions.requestSingleCourseSuccess({ course })
          ),
          catchError((error) =>
            of(CoursesActions.requestSingleCourseFail({ error }))
          )
        )
      )
    )
  );

  /* =======================
     Delete course
  ======================= */
  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestDeleteCourse),
      switchMap(({ id }) =>
        this.coursesService.deleteCourse(id).pipe(
          map(() => CoursesActions.requestAllCourses()),
          catchError((error) =>
            of(CoursesActions.requestDeleteCourseFail({ error }))
          )
        )
      )
    )
  );

  /* =======================
     Edit course
  ======================= */
  editCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestEditCourse),
      switchMap(({ id, body }) =>
        this.coursesService.editCourse(id, body).pipe(
          map((course) =>
            CoursesActions.requestEditCourseSuccess({ course })
          ),
          catchError((error) =>
            of(CoursesActions.requestEditCourseFail({ error }))
          )
        )
      )
    )
  );

  /* =======================
     Create course
  ======================= */
  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestCreateCourse),
      switchMap(({ body }) =>
        this.coursesService.createCourse(body).pipe(
          map((course) =>
            CoursesActions.requestCreateCourseSuccess({ course })
          ),
          catchError((error) =>
            of(CoursesActions.requestCreateCourseFail({ error }))
          )
        )
      )
    )
  );

  /* =======================
     Redirect effect
  ======================= */
  redirectToTheCoursesPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CoursesActions.requestCreateCourseSuccess,
          CoursesActions.requestEditCourseSuccess,
          CoursesActions.requestSingleCourseFail
        ),
        tap(() => {
          this.router.navigate(['/courses']);
        })
      ),
    { dispatch: false }
  );
}
