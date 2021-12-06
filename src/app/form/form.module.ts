import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormPage } from './form.page';
const routes: Routes =[
  {
    path:'',
    component: FormPage
  }
]

@NgModule({
  declarations: [FormPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)

  ]
})
export class FormModule { }
