import { FormularioUpdateMedico } from './../../../model/formularioMedicoUpdate.model';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Medico } from 'src/app/model/medico.model';
import { MedicoService } from 'src/app/service/medico.service';

@Component({
  selector: 'app-cuentadetalle',
  templateUrl: './cuentadetalle.page.html',
  styleUrls: ['./cuentadetalle.page.scss'],
})
export class CuentadetallePage implements OnInit {

  medico: Medico = new Medico();
  medForm: FormularioUpdateMedico;
  constructor(private location: Location, 
    private medicoService: MedicoService,
    private alrtCtrl: AlertController,
    private toastCtrl: ToastController) { }

  ngOnInit() {
    this.getData();
  }

  goBack(){
    this.location.back();
  }

  getData(){
    this.medicoService.getMedico().subscribe(data=>{
      this.medico = JSON.parse(JSON.stringify(data));
    })
  }

  async alertEditContacto(){
    const alert = this.alrtCtrl.create({
      header:'Editar número de contacto',
      subHeader: 'Ingrese el nuevo número',
      inputs:[
        {
          name: 'Número',
          placeholder: 'Ej. 09XXXXXXXX'
        }
      ],
      buttons:[
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: ()=>{
          }
        },
        {
          text:'Actualizar',
          handler: data=>{
            this.medForm = new FormularioUpdateMedico(this.medico.slogan, this.medico.descripcion, data.Número);
            this.updateMedicoData(this.medForm);
          }
        }
      ]
    });
    (await alert).present()
  }

  async alertEditSlogan(){
    const alert = this.alrtCtrl.create({
      header:'Editar slogan',
      subHeader: 'Máximo 20 caractéres',
      inputs:[
        {
          name: 'slogan',
          placeholder: 'Ej. Tu mejor elección!'
        }
      ],
      buttons:[
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: ()=>{
          }
        },
        {
          text:'Actualizar',
          handler: data=>{
            this.medForm = new FormularioUpdateMedico(data.slogan, this.medico.descripcion, this.medico.numeroContacto);
            this.updateMedicoData(this.medForm);
          }
        }
      ]
    });
    (await alert).present()
  }

  async alertEditDesc(){
    const alert = this.alrtCtrl.create({
      header:'Editar descripción',
      subHeader: 'Máximo 200 caractéres',
      inputs:[
        {
          name: 'Descripción',
          placeholder: 'Cuentanos lo que haces'
        }
      ],
      buttons:[
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: ()=>{
          }
        },
        {
          text:'Actualizar',
          handler: data=>{
            this.medForm = new FormularioUpdateMedico(this.medico.slogan, data.Descripción, this.medico.numeroContacto);
            this.updateMedicoData(this.medForm);
          }
        }
      ]
    });
    (await alert).present()
  }

  updateMedicoData(form: FormularioUpdateMedico){
    this.medicoService.postEditMedico(form).subscribe(res=>{
      this.getData();
    }, error =>{
      if(error === 200){
        this.presentToastOptions('Exito','Registro actualizado');
        this.getData();
        this.medForm = new FormularioUpdateMedico();
      }else{
        this.presentToastOptions('Error','Registro actualizado');
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

}
