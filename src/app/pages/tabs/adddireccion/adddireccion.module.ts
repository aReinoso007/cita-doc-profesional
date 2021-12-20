import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdddireccionPageRoutingModule } from './adddireccion-routing.module';

import { AdddireccionPage } from './adddireccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AdddireccionPageRoutingModule
  ],
  declarations: [AdddireccionPage]
})
export class AdddireccionPageModule {}
