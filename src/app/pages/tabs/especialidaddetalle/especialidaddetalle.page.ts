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
  registradas: any[]=[];
  especialidadFormulario: FormGroup;
  submitted: boolean = false;
  registro: RegistroEspecialidad;
  constructor(private academiaService: AcademiaService, private formBuilder: FormBuilder, private toastCtrl: ToastController, private tokenService: TokenService) { 
    this.setFormulario();
  }

  ngOnInit() {
    this.getEspecialidades();
    this.getEspecialidadesRegistradas();
  }

  getEspecialidadesRegistradas(){
    this.academiaService.getEspecialidadesRegistradas().subscribe(data=>{
      this.registradas = JSON.parse(JSON.stringify(data));
      console.log('registradas: ', this.registradas);
    });
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
    this.academiaService.postRegistroEspecialidad(this.registro).subscribe(res=>{
      console.log('respuesta: ', res);
    }, error=>{
      if(error.status === 201){
        this.presentToastOptions('Exito','Especialidad registrada')
      }else{
        this.presentToastOptions('Error', 'Algo salio mal');
      }
    })
  }

  onSubmit(){
    this.submitted = true;
    if(!this.especialidadFormulario.valid){
      this.submitted = false;
      this.presentToastOptions('Error','Seleccione una especialidad');
    }else{
      this.addRegistro();
      this.especialidadFormulario.reset();
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
