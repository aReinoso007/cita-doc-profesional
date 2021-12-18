import { Horario } from './../../../model/horario.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicoService } from 'src/app/service/medico.service';
import { TokenService } from 'src/app/service/token.service';
import { Location } from '@angular/common';
import Swiper, { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Navigation, Pagination} from 'swiper';

SwiperCore.use([Pagination, Navigation])
@Component({
  selector: 'app-detallehorario',
  templateUrl: './detallehorario.page.html',
  styleUrls: ['./detallehorario.page.scss'],
})
export class DetallehorarioPage implements OnInit {
  @ViewChild('swiper') swiper: SwiperComponent; 
  config: SwiperOptions = {
    slidesPerView: 1,
    pagination: true
  }; 
  clinicaId: string;
  registroId: number;
  horarios: any[]=[];
  constructor(private tokenService: TokenService, private medicoService: MedicoService,
  private route: ActivatedRoute, private location: Location,
  private router: Router) { 
    this.clinicaId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    if(this.swiper){
      this.swiper.updateSwiper({});
    }
    this.verHorario(this.clinicaId);
  }

  verHorario(registroId: string){
    /*Esta funcion retorna los horarios para esa clinica*/
    this.medicoService.getHorariosOrdenados(Number(registroId)).subscribe((data: Horario)=>{
      console.log('horarios: ', data);
      this.horarios = JSON.parse(JSON.stringify(data))
    });
  }

  goBack(){
    this.location.back();
  }

  registrarHorario(){
    console.log('click');
  }

  getRegistroId(){
    return this.medicoService.getRegistroPorMedicoYClinica(this.tokenService.getUserId(), Number(this.clinicaId)).subscribe(data=>{
      this.registroId = data;
    })
  }

  goToAdd(){
    this.getRegistroId();
    const url = '/tabs/horario/'+this.clinicaId+'/'+this.registroId;
    this.router.navigate([url]);
  }

}
