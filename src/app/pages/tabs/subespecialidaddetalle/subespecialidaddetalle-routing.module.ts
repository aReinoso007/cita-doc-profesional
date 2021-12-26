import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubespecialidaddetallePage } from './subespecialidaddetalle.page';

const routes: Routes = [
  {
    path: '',
    component: SubespecialidaddetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubespecialidaddetallePageRoutingModule {}
