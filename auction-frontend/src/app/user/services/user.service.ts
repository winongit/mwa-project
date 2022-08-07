import { Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  signIn(user: User): Observable<any> {
    return this.http.post<any>('http://localhost:3000/users/auth/signin', user);
  }

  signup(user: User): Observable<any> {
    return this.http.post<any>('http://localhost:3000/users/auth/signup', user);
  }

  checkEmail(email: any): Observable<any> {
    return this.http.get<any>('http://localhost:3000/users/checkEmail');
  }
}
