import { ToastController } from '@ionic/angular';
import { Medico } from './../../../model/medico.model';
import { TokenService } from './../../../service/token.service';
import { MedicoService } from './../../../service/medico.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  medico: Medico = new Medico;
  citas = [];
  constructor(private medicoService: MedicoService,
              private toastCtrl: ToastController,
              private router: Router) { }

  ngOnInit() {
    this.medicoService.getMedico().subscribe((data: Medico)=>{
      this.medico = JSON.parse(JSON.stringify(data));
    });
    this.getTodayCitas()
    this.redirectToLogin(this.medico);
  }

  ionViewWillEnter(){
    this.medicoService.getMedico().subscribe((data: Medico)=>{
      this.medico = JSON.parse(JSON.stringify(data));
    });
    this.getTodayCitas();
  }

  redirectToLogin(medico: Medico){
    if(!medico){
      this.presentToastOptions('Error','No esta autenticado');
      this.router.navigateByUrl('/login');
    }
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

  getTodayCitas(){
    this.medicoService.getTodayCitasMedico().subscribe(data=>{
      this.citas = JSON.parse(JSON.stringify(data));
    })
  }

}
