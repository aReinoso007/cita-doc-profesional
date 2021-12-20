import { ToastController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Clinica } from 'src/app/model/clinica.model';
import { ClinicaService } from 'src/app/service/clinica.service';
import { TokenService } from 'src/app/service/token.service';
import { FormularioRegistroClinica } from 'src/app/model/formularioRegistroClinica.model';

@Component({
  selector: 'app-addclinica',
  templateUrl: './addclinica.page.html',
  styleUrls: ['./addclinica.page.scss'],
})
export class AddclinicaPage implements OnInit {
  
  clinica: Clinica = new Clinica();
  clinicas: Clinica[] = [];
  formulario: FormularioRegistroClinica;
  add: boolean = false;
  constructor(private clinicaService: ClinicaService, 
    private tokenService: TokenService, private location: Location, 
    private formBuilder: FormBuilder, private toastCtrl: ToastController) { 
      this.setFormulario();
      this.setFormularioRegistro();
    }

  clinicaForm: FormGroup;
  registroForm: FormGroup;
  submitted: boolean = false;
  submitted2: boolean = false;
  ngOnInit() {
    this.getClinicasDisponibles();
  }
  /*Esto es para agregar una nueva clinica */
  addClinica(){
    this.clinicaService.addClinica(this.clinica).subscribe(res=>{
      console.log('respuesta: ', res);
    })
  }

  addRegistro(){
    this.formulario = new FormularioRegistroClinica(Number(this.registroForm.get('clinicaId').value), this.tokenService.getUserId());
    
  }

  getClinicas(){
    this.clinicaService.getAllClinicas().subscribe((data: Clinica)=>{
      this.clinicas = JSON.parse(JSON.stringify(data));
    })
  }

  getClinicasDisponibles(){
    this.clinicaService.getClinicasDisponibles(this.tokenService.getUserId()).subscribe((data:Clinica[])=>{
      this.clinicas = JSON.parse(JSON.stringify(data));
    })
  }

  goBack(){
    this.location.back();
  }

  setAdd(){
    this.add = true;
  }

  setBack(){ this.add = false}

  setFormulario(){
    this.clinicaForm = this.formBuilder.group({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      contacto: new FormControl('', [Validators.maxLength(10), Validators.required])
    })
  }

  setFormularioRegistro(){
    this.registroForm = this.formBuilder.group({
      clinicaId: new FormControl('', Validators.required)
    })
  }

  onSubmitRegistro(){
    this.submitted2 = true;
    if(!this.registroForm.valid){
      this.presentToastOptions('Error', 'Debe seleccionar una clinica');
      this.submitted2 = false;
    }else{
      this.addRegistro();
      this.registroForm.reset();
    }
  }

  onSubmit(){
    this.submitted = true;
    if(!this.clinicaForm.valid){
      this.presentToastOptions('Error', 'Debe llenar el formulario');
      this.submitted = false;
    }else{
      this.clinicaForm.reset()
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
