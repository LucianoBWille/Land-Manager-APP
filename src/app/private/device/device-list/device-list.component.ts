import { Component, Injectable } from '@angular/core';
import { catchError, finalize, of } from 'rxjs';
import { Device } from '../device.model';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class DeviceListComponent {
    apiResponse: Device[] | undefined;
  
    constructor(private deviceService: DeviceService ) { }

    ngOnInit(): void {
      this.loadDevices();
    }

    public loadDevices() {
      this.deviceService
        .getDevices()
        .pipe(
          catchError((error) => {
            console.log(error);
            alert('Falha ao obter a lista de dispositivos');
            return of([]);
          }),
          finalize(() => {})
        )
        .subscribe((res: Device[]) => {
          console.log('resposta =>', res);
          this.apiResponse = res;
        });
    }

    public deleteDevice(id: string) {
      this.deviceService
        .delete(id)
        .pipe(
          catchError((error) => {
            console.log(error);
            alert('Falha ao deletar o dispositivo');
            return of([]);
          }),
          finalize(() => {})
        )
        .subscribe((res: any) => {
          console.log('resposta =>', res);
          this.loadDevices();
        });
    }
}
