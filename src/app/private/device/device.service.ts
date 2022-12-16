import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EXPRESS_API } from 'src/app/app.const';
import { LoginService } from 'src/app/public/login.service';
import { Device } from './device.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getHttpOptions(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      // 'Authorization': this.loginService.currentTokenValue || '',
      'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyMSJ9.0TiNlxy3KV5dnhkgY9c-N2eBFnCSZ-MCyvbZd64FSLg"
    });
  }

  public getDevices = (page?: number, perPage?: number): Observable<Device[]> => {
    let params: string[] = [];
    if (page) params = params.concat(`page=${page}`);
    if (perPage) params = params.concat(`per_page=${perPage}`);

    console.log(params);

    return this.http.get<Device[]>(
      EXPRESS_API + 'devices' + (params.length > 0 ? '?' + params.join('&') : ''), {
        headers: this.getHttpOptions(),
      }
    );
  }

  public getDevice = (id: string): Observable<Device> => {
    return this.http.get<Device>(EXPRESS_API + 'devices/' + id, {
      headers: this.getHttpOptions(),
    });
  }

  public create = (device: Device): Observable<Device> => {
    console.log(JSON.stringify(device))
    return this.http.post<Device>(EXPRESS_API + 'devices', device, {
      headers: this.getHttpOptions(),
    });
  }

  public update = (device: Device): Observable<Device> => {
    return this.http.put<Device>(
      `${EXPRESS_API}devices/${device._id}`,
      device,
      {
        headers: this.getHttpOptions(),
      }
    );
  }

  public createOrUpdate = (device: Device): Observable<Device> => {
    return device._id ? this.update(device) : this.create(device);
  }

  public delete = (id: string): Observable<string> => {
    return this.http.delete<string>(EXPRESS_API + 'devices/' + id, { headers: this.getHttpOptions(),responseType: 'text/plain' as 'json'});
  }
}
