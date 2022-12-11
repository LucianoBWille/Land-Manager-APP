import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { UserFormComponent } from '../private/user/user-form/user-form.component';

export const PUBLIC_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: UserFormComponent },
];

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [SharedModule, RouterModule.forChild(PUBLIC_ROUTES)],
})
export class PublicModule {}
