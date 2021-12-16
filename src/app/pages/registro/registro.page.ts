import { AuthService } from './../../service/auth.service';
import { PasswordValidator } from './../../validators/password.validator';
import { FormGroup, AbstractControl, NgForm, FormControl, Validators, ValidatorFn, ValidationErrors, FormBuilder } from '@angular/forms';
import { AfterContentChecked, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Medico } from 'src/app/model/medico.model';
import { SwiperComponent } from 'swiper/angular';
import { SwiperOptions } from 'swiper';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

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
    private formBuilder: FormBuilder
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
      return false;
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
    let message = '';
    this.submitted2 = true;
    if(!this.signupForm2.valid){
      return false;
    }else{
      await this.authServie.signUp(this.medico).subscribe(res=>{
        message = res;
        alert(message);
      })
    }
  } 
  
  togglePasswordMode() {
    this.passwordTypeInput  =  this.passwordTypeInput  ===  'text'  ?  'password'  :  'text';
    this.iconpassword  =  this.iconpassword  ===  'eye-off'  ?  'eye'  :  'eye-off';
    this.passwordEye.el.setFocus();
}

}
