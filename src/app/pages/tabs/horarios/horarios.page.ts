import { Component, OnInit } from '@angular/core';
import { Clinica } from 'src/app/model/clinica.model';
import { MedicoService } from 'src/app/service/medico.service';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.page.html',
  styleUrls: ['./horarios.page.scss'],
})
export class HorariosPage implements OnInit {
  clinicas: any[] =[];
  constructor(private medicoService: MedicoService) { }

  ngOnInit() {
    this.getClinicas();
    console.log('clinicas: ',this.clinicas[0]);
  }

  getClinicas(){
    this.medicoService.getClinicasMedico().subscribe((data: Clinica)=>{
        console.log('data: ', data);
        this.clinicas = JSON.parse(JSON.stringify(data));
    })
  }

}
