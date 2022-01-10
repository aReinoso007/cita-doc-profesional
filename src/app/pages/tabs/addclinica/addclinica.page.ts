import { ToastController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Clinica } from 'src/app/model/clinica.model';
import { ClinicaService } from 'src/app/service/clinica.service';
import { TokenService } from 'src/app/service/token.service';
import { FormularioRegistroClinica } from 'src/app/model/formularioRegistroClinica.model';
import { MedicoService } from 'src/app/service/medico.service';
import { Router } from '@angular/router';

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
    private medicoService: MedicoService,
    private router: Router,
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

  ionViewWillEnter(){
    this.getClinicasDisponibles();
  } 

  /*Esto es para agregar una nueva clinica */
  addClinica(){
    var id=0;
    this.clinicaService.addClinica(this.clinica).subscribe((res)=>{
      this.clinica = new Clinica();
      id = JSON.parse(JSON.stringify(res));
      this.addClinicaToRegistro(id);
      /*Esto es para poder agregar la direccion de la clinica */
      const url = '/tabs/clinicas/'+id;
      this.router.navigate([url]);
    });
  }

  addRegistro(){
    this.formulario = new FormularioRegistroClinica(Number(this.registroForm.get('clinicaId').value), this.tokenService.getUserId());
    this.medicoService.postRegistroClinicaMedico(this.formulario).subscribe(res=>{
    }, error=>{
      if(error.status === 201){
        this.getClinicasDisponibles();
        this.presentToastOptions('¡Éxito!','Clínica agregada con éxito');
      }else{
        this.presentToastOptions('¡Oh no!', 'Algo salió mal');
      }
    });
  }

  addClinicaToRegistro(clinicaId: number){
    this.formulario = new FormularioRegistroClinica(clinicaId, this.tokenService.getUserId());
    this.medicoService.postRegistroClinicaMedico(this.formulario).subscribe(res=>{
    }, error=>{
      if(error.status === 201){
        this.getClinicasDisponibles();
        this.presentToastOptions('¡Éxito!','Clínica agregada con éxito');
      }else{
        this.presentToastOptions('¡Oh no!', 'Algo salió mal');
      }
    });
  }

  getClinicas(){
    this.clinicaService.getAllClinicas().subscribe((data: Clinica)=>{
      this.clinicas = JSON.parse(JSON.stringify(data));
    })
  }

  getClinicasDisponibles(){
    this.clinicaService.getClinicasDisponibles(this.tokenService.getUserId()).subscribe((data:Clinica[])=>{
      this.clinicas = JSON.parse(JSON.stringify(data));
    }, error =>{
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
      this.submitted2 = false;
      this.presentToastOptions('¡Oops!', 'Debe seleccionar una clínica');
    }else{
      this.addRegistro();
      this.registroForm.reset();
    }
  }

  onSubmit(){
    this.submitted = true;
    if(!this.clinicaForm.valid){
      this.submitted = false;
      this.presentToastOptions('¡Oops!', 'Debe llenar el formulario');
    }else{
      this.addClinica();
      this.add = false;
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
