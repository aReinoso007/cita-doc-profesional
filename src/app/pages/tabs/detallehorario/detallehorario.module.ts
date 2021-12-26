import { SwiperModule } from 'swiper/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallehorarioPageRoutingModule } from './detallehorario-routing.module';

import { DetallehorarioPage } from './detallehorario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwiperModule,
    DetallehorarioPageRoutingModule
  ],
  declarations: [DetallehorarioPage]
})
export class DetallehorarioPageModule {}
