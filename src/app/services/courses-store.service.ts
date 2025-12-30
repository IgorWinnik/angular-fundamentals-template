import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';
import { CoursesService } from './courses.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesStoreService {

  private courses$$ = new BehaviorSubject<any[]>([]);
  private isLoading$$ = new BehaviorSubject<boolean>(false);

  public courses$ = this.courses$$.asObservable();
  public isLoading$ = this.isLoading$$.asObservable();

  constructor(private coursesService: CoursesService) {}

  getAll(): void {
    this.isLoading$$.next(true);
    this.coursesService.getAll()
      .pipe(finalize(() => this.isLoading$$.next(false)))
      .subscribe((courses: any[]) => this.courses$$.next(courses));
  }

  createCourse(course: any): void {
    this.coursesService.createCourse(course).subscribe(() => {
      this.getAll();
    });
  }

  getCourse(id: string) {
    return this.coursesService.getCourse(id);
  }

  editCourse(id: string, course: any): void {
    this.coursesService.editCourse(id, course).subscribe(() => {
      this.getAll();
    });
  }

  deleteCourse(id: string): void {
    this.coursesService.deleteCourse(id).subscribe(() => {
      this.getAll();
    });
  }

  filterCourses(value: string): void {
    this.isLoading$$.next(true);

    this.coursesService.filterCourses({
      title: [value]
    })
    .pipe(finalize(() => this.isLoading$$.next(false)))
    .subscribe((courses: any[]) => this.courses$$.next(courses));
  }

  getAllAuthors() {
    return this.coursesService.getAllAuthors();
  }

  createAuthor(name: string) {
    return this.coursesService.createAuthor(name);
  }

  getAuthorById(id: string) {
    return this.coursesService.getAuthorById(id);
  }
}
