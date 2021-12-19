import { ToastController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Clinica } from 'src/app/model/clinica.model';
import { ClinicaService } from 'src/app/service/clinica.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-addclinica',
  templateUrl: './addclinica.page.html',
  styleUrls: ['./addclinica.page.scss'],
})
export class AddclinicaPage implements OnInit {
  
  clinica: Clinica = new Clinica();
  clinicas: Clinica[] = [];
  add: boolean = false;
  constructor(private clinicaService: ClinicaService, 
    private tokenService: TokenService, private location: Location, 
    private formBuilder: FormBuilder, private toastCtrl: ToastController) { 
      this.setFormulario();
    }

  clinicaForm: FormGroup
  submitted: boolean = false;
  ngOnInit() {
    this.getClinicas();
  }

  addClinica(){
    this.clinicaService.addClinica(this.clinica).subscribe(res=>{
      console.log('respuesta: ', res);
    })
  }

  getClinicas(){
    this.clinicaService.getAllClinicas().subscribe((data: Clinica)=>{
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

  onSubmit(){
    this.submitted = true;
    if(!this.clinicaForm.valid){
      this.presentToastOptions('Error', 'Debe llenar el formulario');
      return false;
    }else{

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
