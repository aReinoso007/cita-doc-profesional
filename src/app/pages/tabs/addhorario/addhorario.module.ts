import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddhorarioPageRoutingModule } from './addhorario-routing.module';

import { AddhorarioPage } from './addhorario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddhorarioPageRoutingModule
  ],
  declarations: [AddhorarioPage]
})
export class AddhorarioPageModule {}
