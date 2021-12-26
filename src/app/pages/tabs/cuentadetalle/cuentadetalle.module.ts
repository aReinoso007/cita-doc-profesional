import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuentadetallePageRoutingModule } from './cuentadetalle-routing.module';

import { CuentadetallePage } from './cuentadetalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuentadetallePageRoutingModule
  ],
  declarations: [CuentadetallePage]
})
export class CuentadetallePageModule {}
