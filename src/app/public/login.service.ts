import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SPRING_API } from '../app.const';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private currentTokenSubject: BehaviorSubject<string | null>;

  constructor(private http: HttpClient) {
    this.currentTokenSubject = new BehaviorSubject<string | null>(
      localStorage.getItem('token')
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

  public login = (username: string, password: string): Observable<any> => {
    const data = JSON.stringify({ name: username, password });

    return this.http.post(SPRING_API + 'users/login', data, {
      headers: this.getHttpOption(),
    });
  };

  public logout = () => {
    localStorage.removeItem('token');
    this.currentTokenValue = null;
  };
}
