import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EspecialidaddetallePageRoutingModule } from './especialidaddetalle-routing.module';

import { EspecialidaddetallePage } from './especialidaddetalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EspecialidaddetallePageRoutingModule
  ],
  declarations: [EspecialidaddetallePage]
})
export class EspecialidaddetallePageModule {}
