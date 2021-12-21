import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuentadetallePage } from './cuentadetalle.page';

const routes: Routes = [
  {
    path: '',
    component: CuentadetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuentadetallePageRoutingModule {}
