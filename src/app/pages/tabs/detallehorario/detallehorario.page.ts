import { NavController, ToastController } from '@ionic/angular';
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
  horarios: any[]=[];
  constructor(private tokenService: TokenService, private medicoService: MedicoService,
  private route: ActivatedRoute, private location: Location,
  private router: Router,
  private toastCtrl: ToastController,
  public navCtrl: NavController) { 
    this.clinicaId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.verHorario();
    if(this.swiper){
      this.swiper.updateSwiper({});
    }  
  }

  ionViewWillEnter(){
   this.verHorario();
  }

  verHorario(){
    let cliId: number = Number(this.clinicaId);
    this.medicoService.getRegistroByMedicoYClinica(this.tokenService.getUserId(), cliId).subscribe(res =>{
      this.medicoService.getHorariosOrdenados(res).subscribe((data)=>{
        this.horarios = JSON.parse(JSON.stringify(data));
      }, error =>{
        console.log('Error ', error.message)
      });
    });
  }

  goBack(){
    this.location.back();
  }

  goToAdd(){
    let cliId: number = Number(this.clinicaId);
    var id = 0;
    this.medicoService.getRegistroPorMedicoYClinica(this.tokenService.getUserId(), cliId).subscribe((res)=>{
      id = JSON.parse(JSON.stringify(res));
      const url = '/tabs/horario/'+this.clinicaId+'/'+id;
      this.router.navigate([url]);
    });
  }

  deleteHorario(hId: number){
    this.medicoService.deleteHorario(hId).subscribe(res=>{
      this.presentToastOptions('¡Éxito!','Registro eliminado con éxito');
      this.verHorario();
    });
  }

  async presentToastOptions(header: string, message: string){
    const toast = await this.toastCtrl.create({
      header: header,
      message: message,
      position: 'top',
      duration: 2000
    });
    await toast.present();
  }


}
