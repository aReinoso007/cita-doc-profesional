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
    private toastCtrl: ToastController,
    private medicoService: MedicoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.verifyUserSignedin();
  }

  onLogin(){
    this.login = new Login(this.email, this.password);
    this.authService.login(this.login).subscribe(
      data=>{
        this.tokenService.logOut();
        this.tokenService.setToken(data.token);
        this.router.navigateByUrl('/tabs/dashboard');
      },
      err=>{
        this.presentToastOptions('¡Oops!','Los datos son incorrectos');  
        console.log('error status: ', err.status)
        
      }
    )
  }

  vaciar(){
    
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

  verifyUserSignedin(){
    try {
      if(this.tokenService.getUserId() != null && this.medicoService.getMedico()!=null){
        this.router.navigateByUrl('/tabs/dashboard')
      } else if (this.medicoService.getMedico()==null){
        this.router.navigateByUrl('/login');
      } 
    } catch (error) {
      this.presentToastOptions('!Hola!','Bienvenido');
    }
  }
    
    
    

}
