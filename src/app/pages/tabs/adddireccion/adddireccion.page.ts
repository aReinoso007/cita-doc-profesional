import { FormularioDireccionClinica } from './../../../model/FormularioDireccionClinica.model';
import { Direccion } from './../../../model/direccion.model';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DireccionService } from 'src/app/service/direccion.service';
import { ClinicaService } from 'src/app/service/clinica.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-adddireccion',
  templateUrl: './adddireccion.page.html',
  styleUrls: ['./adddireccion.page.scss'],
})
export class AdddireccionPage implements OnInit {

  clinicaId: string;
  direccion: Direccion = new Direccion();
  direccionForm: FormGroup;
  formularioRegistro: FormularioDireccionClinica;
  submitted: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private direccionService: DireccionService,
    private clinicaService: ClinicaService,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private router: Router
  ) { 
    this.clinicaId = this.route.snapshot.paramMap.get('id');
    this.setFormulario();
  }

  ngOnInit() {
    console.log('clinica id: ', this.clinicaId);
  }

  setFormulario(){
    this.direccionForm = this.formBuilder.group({
      pais: new FormControl('', Validators.required),
      provincia: new FormControl('', Validators.required),
      ciudad: new FormControl('', Validators.required),
      callePrincipal: new FormControl('', Validators.required),
      calleSecundaria: new FormControl('', Validators.required),
      referencia: new FormControl('',Validators.required),

    });
  }

  saveDireccion(){
    var direccionId = 0;
    this.direccionService.saveDireccion(this.direccion).subscribe((res)=>{
      direccionId = JSON.parse(JSON.stringify(res));
      this.formularioRegistro = new FormularioDireccionClinica(Number(this.clinicaId), direccionId);
      this.clinicaService.addRegistroDireccion(this.formularioRegistro).subscribe(res=>{
      }, error=>{
        if(error.status == 201){
          this.formularioRegistro =null;
          this.presentToastOptions('Exito', 'Direccion registrada con exito');
        }else{
          this.presentToastOptions('Error', 'algo salio mal');
        }
      })
    }, error=>{
      if(error.status != 201){
        this.presentToastOptions('Error','No se pudo agregar la direccion');
      }
    });
    
  }

  onSubmit(){
    this.submitted = true;
    if(!this.direccionForm.valid){
      this.submitted = false;
      this.direccionForm.reset();
      this.presentToastOptions('Error','Todos los campos son obligatorios');
    }else{
      this.saveDireccion();
      this.direccionForm.reset();
      this.router.navigateByUrl('/tabs/horario');
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
