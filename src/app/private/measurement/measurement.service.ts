import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EXPRESS_API } from 'src/app/app.const';
import { LoginService } from 'src/app/public/login.service';
import { Measurement } from './measurement.model';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getHttpOptions(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', 
      // 'Authorization
      'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyMSJ9.0TiNlxy3KV5dnhkgY9c-N2eBFnCSZ-MCyvbZd64FSLg"
    }); 
  }

  public getMeasurements = (deviceId?: string, page?: number, perPage?: number): Observable<Measurement[]> => {
    let params: string[] = [];
    if (page) params = params.concat(`page=${page}`);
    if (perPage) params = params.concat(`per_page=${perPage}`);

    console.log(params);

    return this.http.get<Measurement[]>(
      EXPRESS_API + 'measurements/all/'+ deviceId + (params.length > 0 ? '?' + params.join('&') : ''), {
        headers: this.getHttpOptions(),
      }
    );
  }

  public getMeasurement = (id: string): Observable<Measurement> => {
    return this.http.get<Measurement>(EXPRESS_API + 'measurements/' + id, {
      headers: this.getHttpOptions(),
    });
  }

  public create = (measurement: Measurement): Observable<Measurement> => {
    console.log(JSON.stringify(measurement))
    return this.http.post<Measurement>(EXPRESS_API + 'measurements', measurement, {
      headers: this.getHttpOptions(),
    });
  }

  // public update = (measurement: Measurement): Observable<Measurement> => {
  //   return this.http.put<Measurement>(
  //     `${EXPRESS_API}measurements/${measurement._id}`,
  //     measurement,
  //     {
  //       headers: this.getHttpOptions(),
  //     }
  //   );
  // }

  // public createOrUpdate = (measurement: Measurement): Observable<Measurement> => {
  //   if (measurement._id) {
  //     return this.update(measurement);
  //   } else {
  //     return this.create(measurement);
  //   }
  // }

  public delete = (id: string): Observable<string> => {
    return this.http.delete<string>(`${EXPRESS_API}measurements/${id}`, {
      headers: this.getHttpOptions(),responseType: 'text/plain' as 'json'
    });
  }
}
