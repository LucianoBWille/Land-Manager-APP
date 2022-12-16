import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MeasurementService } from './measurement.service';
import { RouterModule, Routes } from '@angular/router';
import { MeasurementFormComponent } from './measurement-form/measurement-form.component';
import { MeasurementListComponent } from './measurement-list/measurement-list.component';

const routes: Routes = [
  { path: '', component: MeasurementListComponent },
  { path: 'new', component: MeasurementFormComponent },
  { path: ':id', component: MeasurementFormComponent },
];

@NgModule({
  declarations: [MeasurementListComponent, MeasurementFormComponent],
  imports: [
    SharedModule, RouterModule.forChild(routes)
  ],
  providers: [MeasurementService]
})
export class MeasurementModule { }
