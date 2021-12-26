import { ToastController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AcademiaService } from './../../../service/academia.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';
import { RegistroEspecialidad } from 'src/app/model/registroEspecialidad.model';

@Component({
  selector: 'app-especialidaddetalle',
  templateUrl: './especialidaddetalle.page.html',
  styleUrls: ['./especialidaddetalle.page.scss'],
})
export class EspecialidaddetallePage implements OnInit {

  especialidades: any[]=[];
  especialidadFormulario: FormGroup;
  submitted: boolean = false;
  registro: RegistroEspecialidad;
  constructor(private academiaService: AcademiaService, private formBuilder: FormBuilder, private toastCtrl: ToastController, private tokenService: TokenService) { 
    this.setFormulario();
  }

  ngOnInit() {
    this.getEspecialidades();
  }

  getEspecialidades(){
    this.academiaService.getEspecialidadesDisponibles().subscribe(data=>{
      this.especialidades = JSON.parse(JSON.stringify(data));
    })
  }

  setFormulario(){
    this.especialidadFormulario = this.formBuilder.group({
      especialidadId: new FormControl('', Validators.required)
    })
  }

  addRegistro(){
    this.registro = new RegistroEspecialidad(this.tokenService.getUserId(), this.especialidadFormulario.get('especialidadId').value);
    console.log('Datos a registrar: ', this.registro);
  }

  onSubmit(){
    this.submitted = true;
    if(!this.especialidadFormulario.valid){
      this.submitted = false;
      this.presentToastOptions('Error','Seleccione una especialidad');
    }else{
      this.addRegistro();
      this.presentToastOptions('Exito','Especialidad agregada');
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

}
