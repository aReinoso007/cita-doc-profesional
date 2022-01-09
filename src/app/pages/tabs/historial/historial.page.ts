import { Cita } from './../../../model/cita.model';
import { Component, OnInit } from '@angular/core';
import { MedicoService } from 'src/app/service/medico.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {


  historialCitas : any[];
  constructor(private medicoService: MedicoService) { }

  ngOnInit() {
    this.getHistorial();
  }

  ionViewWillEnter(){
    this.getHistorial();
  }

  getHistorial(){
    this.medicoService.getHistorialCitas().subscribe((data: Cita[])=>{
      this.historialCitas = JSON.parse(JSON.stringify(data));
    })
  }

}
