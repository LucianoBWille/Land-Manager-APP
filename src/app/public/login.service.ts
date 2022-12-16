import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SPRING_API } from '../app.const';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../private/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private currentTokenSubject: BehaviorSubject<string | null>;
  private currentUserSubject: BehaviorSubject<User | null>;

  constructor(private http: HttpClient) {
    this.currentTokenSubject = new BehaviorSubject<string | null>(
      localStorage.getItem('token')
    );
    this.currentUserSubject = new BehaviorSubject<User | null>(
      localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null
    );
  }

  getHttpOption(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  public get currentTokenValue(): string | null {
    return this.currentTokenSubject.value;
  }

  public set currentTokenValue(token: string | null) {
    this.currentTokenSubject.next(token);
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public set currentUserValue(user: User | null) {
    this.currentUserSubject.next(user);
  }

  public login = (username: string, password: string): Observable<any> => {
    const data = JSON.stringify({ name: username, password });

    return this.http.post(SPRING_API + 'users/login', data, {
      headers: this.getHttpOption(),
    });
  };

  public logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentTokenValue = null;
    this.currentUserValue = null;
  };
}
