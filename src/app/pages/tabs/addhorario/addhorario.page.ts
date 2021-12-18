import { ToastController } from '@ionic/angular';
import { Horario } from './../../../model/horario.model';
import { Component, OnInit } from '@angular/core';
import { MedicoService } from 'src/app/service/medico.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addhorario',
  templateUrl: './addhorario.page.html',
  styleUrls: ['./addhorario.page.scss'],
})
export class AddhorarioPage implements OnInit {
  registroId: string;
  constructor(private medicoService: MedicoService, private route: ActivatedRoute,
    private toastCtrl: ToastController,
    private location: Location) { 
      this.registroId= this.route.snapshot.paramMap.get('idReg');
      console.log('id registro: ', this.registroId);
  }

  ngOnInit() {
  }

  addHorario(registro_id: number, horario: Horario){
    this.medicoService.saveHorario(registro_id, horario)
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

  goBack(){
    this.location.back();
  }

}
