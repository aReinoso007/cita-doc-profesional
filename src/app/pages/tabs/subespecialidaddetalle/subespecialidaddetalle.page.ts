import { RegistroSubespecialidad } from './../../../model/RegistroSubespecialidad.model';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AcademiaService } from 'src/app/service/academia.service';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TokenService } from 'src/app/service/token.service';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-subespecialidaddetalle',
  templateUrl: './subespecialidaddetalle.page.html',
  styleUrls: ['./subespecialidaddetalle.page.scss'],
})
export class SubespecialidaddetallePage implements OnInit {

  especialidadId: string;
  subespecialidades: any[]=[];
  registradas: any[]=[];
  registro: RegistroSubespecialidad;
  add: boolean = false;
  submitted: boolean = false;
  subespecialidadFormulario: FormGroup;

  constructor(private academiaService: AcademiaService, private toastCtrl: ToastController,
    private route: ActivatedRoute, private location: Location, private formBuilder: FormBuilder,
    private tokenService: TokenService) {
      this.setFormulario();
      this.especialidadId = this.route.snapshot.paramMap.get('id');
      
    }

  ngOnInit() {
    this.getSubespecialidades();
    this.getSubespecialidadesRegistradas();
  }

  share(slidingItem: IonItemSliding) {
    slidingItem.close();
  }

  getSubespecialidades(){
    this.academiaService.getSubespecialidades(this.especialidadId).subscribe(data=>{
      this.subespecialidades = JSON.parse(JSON.stringify(data));
    })
  }

  getSubespecialidadesRegistradas(){
    this.academiaService.getSubespecialidadesRegistradasPorEspecialidad(this.especialidadId).subscribe(data=>{
      this.registradas = JSON.parse(JSON.stringify(data));
      console.log('registradas: ', this.registradas);
    })
  }

  onSubmit(){
    this.submitted = true;
    if(!this.subespecialidadFormulario.valid){
      this.submitted = false;
      this.presentToastOptions('Error','Seleccione una subespecialidad');
    }else{
      this.addSubespecialdidad();
      this.subespecialidadFormulario.reset();
    }
  }

  goBack(){
    this.location.back();
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

  setFormulario(){
    this.subespecialidadFormulario = this.formBuilder.group({
      subespId: new FormControl('', Validators.required)
    })
  }

  addSubespecialdidad(){
    this.registro = new RegistroSubespecialidad(this.tokenService.getUserId(), Number(this.subespecialidadFormulario.get('subespId').value));
    console.log('a enviar: ', this.registro);
    this.academiaService.postRegistroSubespecialidad(this.registro).subscribe(res=>{
    }, error=>{
      console.log('error', error)
      if(error.status === 201){
        this.presentToastOptions('Exito','Registro exitoso');
        this.getSubespecialidades();
        this.getSubespecialidadesRegistradas();
        this.setBack();
      }else{
        this.presentToastOptions('Error','Algo salió mal');
      }
    })
  }

  deleteSubespecialidad(subId: number){

    this.academiaService.getSubespecialidadRegistroId(subId).subscribe(data=>{
      this.academiaService.postDeleteRegistroSubEspecialidad(Number(data)).subscribe(res=>{
        console.log('res: ', res)
        this.getSubespecialidadesRegistradas();
      });
    });
    this.getSubespecialidades();
  }


}
