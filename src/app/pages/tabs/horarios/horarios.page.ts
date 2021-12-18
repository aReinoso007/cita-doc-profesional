import { Router } from '@angular/router';
import { TokenService } from './../../../service/token.service';
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
  constructor(private medicoService: MedicoService,
              private tokenService: TokenService,
              private router: Router) { }

  ngOnInit() {
    this.getClinicas();
  }

  getClinicas(){
    this.medicoService.getClinicasMedico().subscribe((data: Clinica)=>{
        this.clinicas = JSON.parse(JSON.stringify(data));
    });
  }

  getRegistroId(clinicaId: number){
    this.medicoService.getRegistroPorMedicoYClinica(this.tokenService.getUserId(), clinicaId);
  }

  getHorariosClinica(clinicaId: number){
    let id = this.getRegistroId(clinicaId);
    console.log('id '+clinicaId);
    this.medicoService.getHorariosOrdenados(clinicaId);
  }

  verHorario(clinicaId: string){
    const url = '/tabs/horario/'+clinicaId;
    this.router.navigate([url]);
  }

}
