import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/model/medico.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  medico: Medico = new Medico
  confirmar_contrasena: string = "";
  constructor() { }

  ngOnInit() {
  }

  onSubmit(){

  }

}
