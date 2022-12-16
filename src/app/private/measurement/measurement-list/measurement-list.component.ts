import { Component, Injectable } from '@angular/core';
import { catchError, finalize, of } from 'rxjs';
import { Measurement } from '../measurement.model';
import { MeasurementService } from '../measurement.service';

@Component({
  selector: 'app-measurement-list',
  templateUrl: './measurement-list.component.html',
  styleUrls: ['./measurement-list.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class MeasurementListComponent {
  apiResponse: Measurement[] | undefined;

  constructor(private measurementService: MeasurementService) { }

  ngOnInit(): void {
    this.loadMeasurements("637f784711969418c6398ce0");
  }

  public loadMeasurements(deviceId?: string) {
    this.measurementService
      .getMeasurements(deviceId)
      .pipe(
        catchError((error) => {
          console.log(error);
          alert('Falha ao obter a lista de medições');
          return of([]);
        }),
        finalize(() => {})
      )
      .subscribe((res: Measurement[]) => {
        console.log('resposta =>', res);
        this.apiResponse = res;
      });
  }

  public deleteMeasurement(id: string) {
    this.measurementService
      .delete(id)
      .pipe(
        catchError((error) => {
          console.log(error);
          alert('Falha ao deletar a medição');
          return of([]);
        }),
        finalize(() => {})
      )
      .subscribe((res: any) => {
        console.log('resposta =>', res);
        alert('Medição deletada com sucesso!');
        this.loadMeasurements("637f784711969418c6398ce0");
      });
  }
}
