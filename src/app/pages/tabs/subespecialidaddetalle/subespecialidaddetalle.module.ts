import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubespecialidaddetallePageRoutingModule } from './subespecialidaddetalle-routing.module';

import { SubespecialidaddetallePage } from './subespecialidaddetalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SubespecialidaddetallePageRoutingModule
  ],
  declarations: [SubespecialidaddetallePage]
})
export class SubespecialidaddetallePageModule {}
