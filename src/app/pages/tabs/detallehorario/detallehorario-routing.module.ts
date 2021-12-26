import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallehorarioPage } from './detallehorario.page';

const routes: Routes = [
  {
    path: '',
    component: DetallehorarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallehorarioPageRoutingModule {}
