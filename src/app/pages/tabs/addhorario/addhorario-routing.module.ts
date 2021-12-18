import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddhorarioPage } from './addhorario.page';

const routes: Routes = [
  {
    path: '',
    component: AddhorarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddhorarioPageRoutingModule {}
