import { Component, OnInit } from '@angular/core';
import { MedicoService } from 'src/app/service/medico.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  constructor(private medicoService: MedicoService) { }

  ngOnInit() {
  }

  getHistorial(){
    
  }

}
