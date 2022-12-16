import { NgModule } from '@angular/core';
import { LandListComponent } from './land-list/land-list.component';
import { LandFormComponent } from './land-form/land-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LandService } from './land.service';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: LandListComponent },
  { path: 'new', component: LandFormComponent },
  { path: ':id', component: LandFormComponent },
];

@NgModule({
  declarations: [LandListComponent, LandFormComponent],
  imports: [ SharedModule, RouterModule.forChild(routes)],
  providers: [LandService]
})
export class LandModule { }
