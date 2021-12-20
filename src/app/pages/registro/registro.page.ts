import { ToastController } from '@ionic/angular';
import { AuthService } from './../../service/auth.service';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Medico } from 'src/app/model/medico.model';
import { SwiperComponent } from 'swiper/angular';
import Swiper, { SwiperOptions } from 'swiper';
import SwiperCore, { Navigation, Pagination} from 'swiper';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

SwiperCore.use([Pagination, Navigation])
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegistroPage implements OnInit{

  @ViewChild('swiper') swiper: SwiperComponent; 
  @ViewChild('passwordEyeRegister') passwordEye;
  config: SwiperOptions = {
    slidesPerView: 1,
    pagination: true
  }; 
  passwordTypeInput  =  'password';
  iconpassword  =  'eye-off';
  message = '';
  header = '';

  signupForm: FormGroup;
  signupForm2: FormGroup;
  submitted1 = false;
  submitted2 = false;

  ngOnInit(){
    if(this.swiper){
      this.swiper.updateSwiper({});
    }
  }

  medico: Medico = new Medico();

  constructor(
    private authServie: AuthService,
    private formBuilder: FormBuilder,
    public toastCotroller: ToastController,
    private router: Router,
    private location: Location
  ) { 
    this.setUpForm1();
    this.setUpForm2();
  }

  setUpForm1(){
    this.signupForm = this.formBuilder.group({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      recoveryEmail: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      descripcion: new FormControl('', Validators.required),
      numeroContacto: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      profesion: new FormControl('', Validators.required),
      slogan: new FormControl('', [Validators.required, Validators.maxLength(200)])
    });
  }

  setUpForm2(){
    this.signupForm2 = this.formBuilder.group({
      descripcion: new FormControl('', Validators.required),
      numeroContacto: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      profesion: new FormControl('', Validators.required),
      slogan: new FormControl('', [Validators.required, Validators.maxLength(200)])
    });
  }

  onSubmit1(){
    this.submitted1 = true;
    if(!this.signupForm.valid){
      this.submitted1 = false;
      this.presentToastOptions('Error', 'Debe llenar el formulario');
    }else{
      this.swiper.s_slideNextTransitionEnd;
    }
  }  

  get errCtrl1(){
    return this.signupForm.controls;
  }

  get errCtrl2(){
    return this.signupForm2.controls;
  }

  async onSubmit2(){
    this.submitted2 = true;
    if(!this.signupForm2.valid && !this.signupForm.valid){
      this.submitted2 = false;
      this.presentToastOptions('Error', 'Debe llenar el formulario');
      
    }else{
      this.authServie.signUp(this.medico).subscribe(res=>{
        console.log('status: ', res.status);
      }, error =>{
        if(error.status === 201){
          this.presentToastOptions('En hora buena!', 'Registro exitoso' );
          this.signupForm.reset();
          this.signupForm2.reset();
          this.router.navigateByUrl('/login');
        }else{
          this.presentToastOptions('Error',error.message);
          this.router.navigateByUrl('/login');
        }
      });
    }
  } 
  
  togglePasswordMode() {
    this.passwordTypeInput  =  this.passwordTypeInput  ===  'text'  ?  'password'  :  'text';
    this.iconpassword  =  this.iconpassword  ===  'eye-off'  ?  'eye'  :  'eye-off';
    this.passwordEye.el.setFocus();
  }

  async presentToastOptions(header: string, message: string){
    const toast = await this.toastCotroller.create({
      header: header,
      message: message,
      position: 'top',
      duration: 2000
    });
    await toast.present();
  }

  goBack(){
    this.location.back();
  }

}
