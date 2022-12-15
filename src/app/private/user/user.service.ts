import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SPRING_API } from 'src/app/app.const';
import { LoginService } from 'src/app/public/login.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private loginService: LoginService) {}

  getHttpOptions(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'authorization': this.loginService.currentTokenValue || ''
    });
  }

  public getUsers = (page?: number, perPage?: number): Observable<User[]> => {
    let params: string[] = [];
    if (page) params = params.concat(`page=${page}`);
    if (perPage) params = params.concat(`per_page=${perPage}`);

    console.log(params);

    return this.http.get<User[]>(
      SPRING_API + 'users' + (params.length > 0 ? '?' + params.join('&') : '')
    );
  };

  public getUser = (id: string): Observable<User> => {
    return this.http.get<User>(SPRING_API + 'users/' + id, {
      headers: this.getHttpOptions(),
    });
  };

  public create = (user: User): Observable<User> => {
    console.log(JSON.stringify(user))
    return this.http.post<User>(SPRING_API + 'users', user, {
      headers: this.getHttpOptions(),
    });
  };

  public update = (user: User): Observable<User> => {
    return this.http.put<User>(
      `${SPRING_API}users/${user.id}`,
      JSON.stringify(user),
      {
        headers: this.getHttpOptions(),
      }
    );
  };

  public createOrUpdate = (user: User): Observable<User> => {
    return user.id ? this.update(user) : this.create(user);
  };

  public delete = (id: string): Observable<string> => {
    return this.http.delete<string>(SPRING_API + 'users/' + id, { headers: this.getHttpOptions(),responseType: 'text/plain' as 'json'});
  }
}
