import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddclinicaPageRoutingModule } from './addclinica-routing.module';

import { AddclinicaPage } from './addclinica.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddclinicaPageRoutingModule
  ],
  declarations: [AddclinicaPage]
})
export class AddclinicaPageModule {}
