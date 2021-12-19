import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddclinicaPageRoutingModule } from './addclinica-routing.module';

import { AddclinicaPage } from './addclinica.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddclinicaPageRoutingModule
  ],
  declarations: [AddclinicaPage]
})
export class AddclinicaPageModule {}
