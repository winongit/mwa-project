import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SigninService {
  private readonly API_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  signIn(user: User): Observable<any> {
    return this.http.post<any>('http://localhost:3000/users/auth/signin', user);
  }
}
