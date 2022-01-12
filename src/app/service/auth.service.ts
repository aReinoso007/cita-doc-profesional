import { Jwt } from './../model/jwt.model';
import { Observable, throwError } from 'rxjs';
import { Login } from './../model/login.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medico } from '../model/medico.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //authURL = 'http://localhost:8090/api/auth/';
  authURL = 'http://citadoc-env-1.eba-tere2tz5.sa-east-1.elasticbeanstalk.com/api/auth/';
  constructor(private http: HttpClient) { }

  public login(login: Login): Observable<Jwt>{
    return this.http.post<Jwt>(this.authURL+'medico_login',login);
  }

  public signUp(medico: Medico): Observable<any>{
    return this.http.post(this.authURL+'medico_registro', medico);
  }

}
