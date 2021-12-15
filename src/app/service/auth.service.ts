import { Jwt } from './../model/jwt.model';
import { Observable } from 'rxjs';
import { Login } from './../model/login.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = 'http://localhost:8090//api/auth/';
  constructor(private http: HttpClient) { }

  public login(login: Login): Observable<Jwt>{
    return this.http.post<Jwt>(this.authURL+'medico_login',login);
  }

}
