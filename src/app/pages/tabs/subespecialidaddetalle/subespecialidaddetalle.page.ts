import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AcademiaService } from 'src/app/service/academia.service';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-subespecialidaddetalle',
  templateUrl: './subespecialidaddetalle.page.html',
  styleUrls: ['./subespecialidaddetalle.page.scss'],
})
export class SubespecialidaddetallePage implements OnInit {

  especialidadId: string;
  subespecialidades: any[]=[];
  registradas: any[]=[];
  add: boolean = false;
  submitted: boolean = false;
  subespecialidadFormulario: FormGroup;
  constructor(private academiaService: AcademiaService, private toastCtrl: ToastController,
    private route: ActivatedRoute, private location: Location, private formBuilder: FormBuilder) {
      this.setFormulario();
      this.especialidadId = this.route.snapshot.paramMap.get('id');
    }

  ngOnInit() {
    this.getSubespecialidades();
  }

  getSubespecialidades(){
    this.academiaService.getSubespecialidades(this.especialidadId).subscribe(data=>{
      this.subespecialidades = JSON.parse(JSON.stringify(data));
    })
  }

  onSubmit(){
    this.submitted = true;
    if(!this.subespecialidadFormulario.valid){
      this.submitted = false;
      this.presentToastOptions('Error','Seleccione una subespecialidad');
    }else{
      this.presentToastOptions('Exito','Subespecialidad agregada con exito');
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

  }

}
