import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EspecialidaddetallePageRoutingModule } from './especialidaddetalle-routing.module';

import { EspecialidaddetallePage } from './especialidaddetalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EspecialidaddetallePageRoutingModule
  ],
  declarations: [EspecialidaddetallePage]
})
export class EspecialidaddetallePageModule {}
