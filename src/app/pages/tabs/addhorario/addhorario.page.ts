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

  horarios: Horario[] =[];
  horario: Horario = new Horario();
  registroId: string;
  constructor(private medicoService: MedicoService, private route: ActivatedRoute,
    private toastCtrl: ToastController,
    private location: Location) { 
      this.registroId= this.route.snapshot.paramMap.get('idReg');
  }

  ngOnInit() {
  }

  async addHorario(){
    this.finFormated();
    this.inicioFormated();
    console.log('horario: ', this.horario);
    var regId: number = Number(this.registroId);
    this.medicoService.saveHorario(regId, this.horario).subscribe(res=>{
      console.log('status: ', res.status);
      if(res.status === 201 || res.status === undefined){
        this.presentToastOptions('En hora buena!', 'Registro exitoso' );
        this.goBack();
        this.horario = new Horario();
      }
    }, error=>{
      if(error.status === 201 || error.status === undefined){
        this.presentToastOptions('En hora buena!', 'Registro exitoso' );
        this.goBack();
        this.horario = new Horario();
      }else{
        this.presentToastOptions('Error',error.message);
        this.horario = new Horario();
      }
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

  goBack(){
    this.location.back();
  }

  addToArray(dia: string, inicio: string, fin: string){
    var h: Horario = new Horario();
    this.horarios.push(h);
    console.log('lista: ', this.horarios);
  }

  inicioFormated(){
    var timeFormat1 = this.horario.inicio.split('T')[1];
    var ini1 = timeFormat1.slice(0,6)
    var inif = ini1.concat('00');
    this.horario.inicio = inif;
  }

  finFormated(){
    var timeFormat2 = this.horario.fin.split('T')[1];
    var f1 = timeFormat2.slice(0,6)
    var fin = f1.concat('00');
    this.horario.fin = fin;
  }

}
