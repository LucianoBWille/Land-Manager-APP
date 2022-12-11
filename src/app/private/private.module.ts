import { NgModule } from '@angular/core';
import { PrivateComponent } from './private/private.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { DeviceFormComponent } from './device/device-form/device-form.component';

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
    path: '**', component: PageNotFoundComponent
  },
];

@NgModule({
  declarations: [PrivateComponent, DeviceFormComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class PrivateModule {}
