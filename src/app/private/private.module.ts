import { NgModule } from '@angular/core';
import { PrivateComponent } from './private/private.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { LandFormComponent } from './land/land-form/land-form.component';
import { LandListComponent } from './land/land-list/land-list.component';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'land',
    loadChildren: () => import('./land/land.module').then((m) => m.LandModule),
  },
  {
    path: 'device',
    loadChildren: () => import('./device/device.module').then((m) => m.DeviceModule),
  },
  {
    path: 'measurement',
    loadChildren: () => import('./measurement/measurement.module').then((m) => m.MeasurementModule),
  },
  {
    path: '**', component: PageNotFoundComponent
  },
];

@NgModule({
  declarations: [PrivateComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class PrivateModule {}
