import { ToastController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AcademiaService } from './../../../service/academia.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';
import { RegistroEspecialidad } from 'src/app/model/registroEspecialidad.model';
import { Location } from '@angular/common';

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
  add: boolean  = false;
  registro: RegistroEspecialidad;

  constructor(private academiaService: AcademiaService, private formBuilder: FormBuilder, 
    private toastCtrl: ToastController, private tokenService: TokenService,
    private location: Location, private router: Router) { 
    this.setFormulario();
  }

  ngOnInit() {
    this.getEspecialidades();
    this.getEspecialidadesRegistradas();
  }

  getEspecialidadesRegistradas(){
    this.academiaService.getEspecialidadesRegistradas().subscribe(data=>{
      this.registradas = JSON.parse(JSON.stringify(data));
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
    }, error=>{
      if(error.status === 201){
        this.presentToastOptions('Exito','Especialidad registrada')
        this.setBack();
        this.getEspecialidades();
        this.getEspecialidadesRegistradas();
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

  setAdd(){
    this.add = true;
  }

  setBack(){
    this.add = false;
  }

  goBack(){
    this.location.back();
  }

  verSubespecialidades(especialidadId: string){
    const url = '/tabs/cuenta/especialidades/'+especialidadId;
    this.router.navigate([url]);
  }

  verificarDatosEnRegistro(espId: number){

    var dat =[];
    this.academiaService.getSubespecialidadesRegistradasPorEspecialidad(espId.toString()).subscribe(data=>{
      dat = JSON.parse(JSON.stringify(data));
      if(dat.length > 0){
        this.presentToastOptions('Oops','Tienes datos registrados con esta especialidad');
      }else{
        this.academiaService.getEspecialidadRegistroId(espId).subscribe(res=>{
          this.deleteRegistroEspecialidad(Number(res));
        });
      }
    })
  }

  deleteRegistroEspecialidad(regId: number){
    this.academiaService.postDeleteRegistroEsp(regId).subscribe(res=>{
      this.getEspecialidadesRegistradas();
      this.getEspecialidades();
      this.presentToastOptions('Exito', 'Registro eliminado con exito');
    })
  }

}
