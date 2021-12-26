import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddclinicaPage } from './addclinica.page';

const routes: Routes = [
  {
    path: '',
    component: AddclinicaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddclinicaPageRoutingModule {}
