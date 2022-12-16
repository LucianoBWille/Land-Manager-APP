import { Component, Injectable } from '@angular/core';
import { Land } from '../land.model';
import { LandService } from '../land.service';
import { catchError, finalize, of } from 'rxjs';

@Component({
  selector: 'app-land-list',
  templateUrl: './land-list.component.html',
  styleUrls: ['./land-list.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class LandListComponent {
  apiResponse: Land[] | undefined;

  constructor(private landService: LandService) {}

  ngOnInit(): void {
    this.loadLands();
  }

  public loadLands() {
    this.landService
      .getLands()
      .pipe(
        catchError((error) => {
          console.log(error);
          alert('Falha ao obter a lista de terrenos');
          return of([]);
        }),
        finalize(() => {})
      )
      .subscribe((res: Land[]) => {
        console.log('resposta =>', res);
        this.apiResponse = res;
      });
  }

  public deleteLand(id: string) {
    this.landService
      .delete(id)
      .pipe(
        catchError((error) => {
          console.log(error);
          alert('Falha ao deletar o terreno');
          return of([]);
        }),
        finalize(() => {})
      )
      .subscribe((res: any) => {
        console.log('resposta =>', res);
        alert('Terreno deletado com sucesso!');
        this.loadLands();
      });
  }
}
