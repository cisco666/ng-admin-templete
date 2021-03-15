import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangeImageProfileComponent } from './change-image-profile.component';

const routes: Routes = [ {path: '', component: ChangeImageProfileComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangeImageProfileRoutingModule { }
