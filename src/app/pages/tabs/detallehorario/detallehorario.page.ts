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
  registroId: any;
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
    //this.getRegistroId();
  }

  verHorario(registroId: string){
    /*Esta funcion retorna los horarios para esa clinica*/
    this.medicoService.getHorariosOrdenados(Number(registroId)).subscribe((data: Horario)=>{
      this.horarios = JSON.parse(JSON.stringify(data))
    }, error =>{
      console.log('Error ', error.message)
    });
  }

  goBack(){
    this.location.back();
  }

  registrarHorario(){
    console.log('click');
  }

  getRegistroId(){
    let cliId: number = Number(this.clinicaId);
    return this.medicoService.getRegistroPorMedicoYClinica(this.tokenService.getUserId(), cliId).subscribe(id=>{
      console.log('first data: ', id);
      this.registroId = id.valueOf;
      //this.registroId = id.valueOf();
    })
  }

  goToAdd(){
    this.getRegistroId();
    console.log('idRegistro: ', this.registroId);
    /*const url = '/tabs/horario/'+this.clinicaId+'/'+this.registroId;
    this.router.navigate([url]);*/
  }

}
