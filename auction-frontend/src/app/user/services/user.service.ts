import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  signIn(user: User): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/users/auth/signin`, user)
      .pipe(catchError(this.handleError));
  }

  signup(user: User): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users/auth/signup`, user);
  }

  checkEmail(email: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users/checkEmail`);
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('picture', file);
    const req = new HttpRequest(
      'POST',
      `${this.baseUrl}/users/upload`,
      formData,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );

    return this.http.request(req);
  }

  handleError(error: any) {
    let errorMessage = '';
    errorMessage = `${error?.error?.message}`;
    return throwError(() => {
      return errorMessage;
    });
  }
}
