import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EspecialidaddetallePage } from './especialidaddetalle.page';

const routes: Routes = [
  {
    path: '',
    component: EspecialidaddetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EspecialidaddetallePageRoutingModule {}
