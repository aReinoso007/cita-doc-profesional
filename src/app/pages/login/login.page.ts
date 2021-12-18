import { Login } from './../../model/login.model';
import { TokenService } from './../../service/token.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { ToastController } from '@ionic/angular';
import { MedicoService } from 'src/app/service/medico.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login: Login;
  email = '';
  password ='';
  errMessage ='';
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private toastController: ToastController,
    private medicoService: MedicoService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log('Token: ',this.tokenService.getDecodedAccessToken(this.tokenService.getToken()).userId);
  }

  onLogin(){
    this.login = new Login(this.email, this.password);
    console.log('login ', this.login);
    this.authService.login(this.login).subscribe(
      data=>{
        console.log('data', data);
        console.log('dataToken: ',data.token);
        this.tokenService.setToken(data.token);
      },
      err=>{
        this.errMessage = err.error.message;
        this.presentToast();
      }
    )
  }

  vaciar(){

  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.errMessage,
      duration: 2000,
      position:'middle'
    });
    toast.present();
  }

  verifyUserSignedin(){
    if(this.medicoService.getMedico()!=null) this.router.navigateByUrl('/tabs/dashboad');
  }

}
