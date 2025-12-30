import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly apiUrl = 'http://localhost:4000/api';

  constructor(private http: HttpClient) {}

  // ===== COURSES =====
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/courses/all`);
  }

  createCourse(course: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/courses/add`, course);
  }

  editCourse(id: string, course: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/courses/${id}`, course);
  }

  getCourse(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/courses/${id}`);
  }

  deleteCourse(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/courses/${id}`);
  }

  filterCourses(filters: {
    title?: string[];
    description?: string[];
    duration?: string[];
    creationDate?: string[];
  }): Observable<any[]> {
    let params = new HttpParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value && value.length) {
        value.forEach(v => {
          params = params.append(key, v); // для масивів multiple query params
        });
      }
    });

    return this.http.get<any[]>(`${this.apiUrl}/courses/filter`, { params });
  }


  // ===== AUTHORS =====
  getAllAuthors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/authors/all`);
  }

  createAuthor(name: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/authors/add`, { name });
  }

  getAuthorById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/authors/${id}`);
  }
}
