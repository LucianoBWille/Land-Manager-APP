import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SPRING_API } from 'src/app/app.const';
import { LoginService } from 'src/app/public/login.service';
import { Land } from './land.model';

@Injectable({
  providedIn: 'root'
})
export class LandService {

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getHttpOptions(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      'Authorization': this.loginService.currentTokenValue || ''
    });
  }

  public getLands = (): Observable<Land[]> => {
    return this.http.get<Land[]>(SPRING_API + 'lands', {
      headers: this.getHttpOptions(),
    });
  }

  public getLand = (id: string): Observable<Land> => {
    return this.http.get<Land>(SPRING_API + 'lands/' + id, {
      headers: this.getHttpOptions(),
    });
  }

  public create = (land: Land): Observable<Land> => {
    land.ownerId = this.loginService.currentUserValue?.id || '';
    return this.http.post<Land>(SPRING_API + 'lands', land, {
      headers: this.getHttpOptions(),
    });
  }

  public update = (land: Land): Observable<Land> => {
    return this.http.put<Land>(`${SPRING_API}lands/${land.id}`, land, {
      headers: this.getHttpOptions(),
    });
  }

  public createOrUpdate = (land: Land): Observable<Land> => {
    return land.id ? this.update(land) : this.create(land);
  }

  public delete = (id: string): Observable<string> => {
    return this.http.delete<string>(`${SPRING_API}lands/${id}`, {
      headers: this.getHttpOptions(), responseType: 'text/plain' as 'json'
    });
  }
}
