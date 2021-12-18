import { Horario } from './../../../model/horario.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MedicoService } from 'src/app/service/medico.service';
import { TokenService } from 'src/app/service/token.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detallehorario',
  templateUrl: './detallehorario.page.html',
  styleUrls: ['./detallehorario.page.scss'],
})
export class DetallehorarioPage implements OnInit {
  id: string;
  horarios: any[]=[];
  constructor(private tokenService: TokenService, private medicoService: MedicoService,
  private route: ActivatedRoute, private location: Location) { 
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('id ',this.id);
  }

  ngOnInit() {
    this.verHorario(this.id);
  }

  verHorario(registroId: string){

    this.medicoService.getHorariosOrdenados(Number(registroId)).subscribe((data: Horario)=>{
      console.log('horarios: ', data);
      this.horarios = JSON.parse(JSON.stringify(data))
    });
  }

  goBack(){
    this.location.back();
  }

}
