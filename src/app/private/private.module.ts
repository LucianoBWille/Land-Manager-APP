import { NgModule } from '@angular/core';
import { PrivateComponent } from './private/private.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'land',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'device',
    loadChildren: () => import('./device/device.module').then((m) => m.DeviceModule),
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
