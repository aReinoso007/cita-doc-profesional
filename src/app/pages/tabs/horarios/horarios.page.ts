import { Router } from '@angular/router';
import { TokenService } from './../../../service/token.service';
import { Component, OnInit } from '@angular/core';
import { Clinica } from 'src/app/model/clinica.model';
import { MedicoService } from 'src/app/service/medico.service';
import { PopoverController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.page.html',
  styleUrls: ['./horarios.page.scss'],
})
export class HorariosPage implements OnInit {
  clinicas: any[] =[];
  constructor(private medicoService: MedicoService,
              private tokenService: TokenService,
              private router: Router, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.getClinicas();
  }

  ionViewWillEnter(){
    this.getClinicas();
  }

  getClinicas(){
    this.medicoService.getClinicasMedico().subscribe(data=>{
        this.clinicas = JSON.parse(JSON.stringify(data));
    });
  }

  getRegistroId(clinicaId: number){
    this.medicoService.getRegistroPorMedicoYClinica(this.tokenService.getUserId(), clinicaId);
  }

  getHorariosClinica(clinicaId: number){
    let id = this.getRegistroId(clinicaId);
    this.medicoService.getHorariosOrdenados(clinicaId);
  }

  verHorario(clinicaId: string){
    const url = '/tabs/horario/'+clinicaId;
    this.router.navigate([url]);
  }

  verificarDatosEnRegistro(cliId: number){
    var hrs =[];
    this.medicoService.getRegistroByMedicoYClinica(this.tokenService.getUserId(), cliId).subscribe(res=>{      
      this.medicoService.getHorariosOrdenados(res).subscribe((data)=>{
        hrs = JSON.parse(JSON.stringify(data));
        if(hrs.length > 0){
          this.presentToastOptions('Oops!', 'Elimine primero los registros de horario'); 
        }else{
          this.medicoService.deleteRegistroClinica(res).subscribe(r=>{
            this.getClinicas(); 
            this.presentToastOptions('¡Éxito!','Registro eliminado con éxito');     
          });
        }
      });
    })
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

  recargar(event){
    setTimeout(() => {
    
      this.getClinicas();
      event.target.complete();
    }, 2000);
  }

}
