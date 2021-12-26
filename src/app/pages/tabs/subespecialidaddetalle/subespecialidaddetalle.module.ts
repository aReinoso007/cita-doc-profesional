import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubespecialidaddetallePageRoutingModule } from './subespecialidaddetalle-routing.module';

import { SubespecialidaddetallePage } from './subespecialidaddetalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubespecialidaddetallePageRoutingModule
  ],
  declarations: [SubespecialidaddetallePage]
})
export class SubespecialidaddetallePageModule {}
