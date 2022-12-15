import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceFormComponent } from './device-form/device-form.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { DeviceService } from './device.service';

const routes: Routes = [
  { path: '', component: DeviceListComponent },
  { path: 'new', component: DeviceFormComponent },
  { path: ':id', component: DeviceFormComponent },
];

@NgModule({
  declarations: [DeviceListComponent, DeviceFormComponent],
  imports: [ SharedModule, RouterModule.forChild(routes) ],
  providers: [DeviceService]
})
export class DeviceModule { }
