import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY='AuthToken';
const USER_ID='AuthUserId';
const EMAIL = 'AuthEmail';
const NOMBRE ='AuthNombre';
const APELLIDO ='AuthApellido';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token='';
  constructor() { }

  async loadToken(){
    const token = await Storage.get({key: TOKEN_KEY});
    if(token && token.value){
      console.log('set token: ', token.value);
      this.token = token.value;
      this.isAuthenticated.next(true);
    }else{
      this.isAuthenticated.next(false);
    }
  }

  public logOut(): void{
    window.sessionStorage.clear();
    Storage.clear();
    this.isAuthenticated.next(false);
  }

  public setToken(token: string): void{
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    Storage.set({key: TOKEN_KEY, value: token});
    this.isAuthenticated.next(true);
  }

  public getToken(): string{
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public setUserId(userId: string): void{
    window.sessionStorage.removeItem(USER_ID);
    window.sessionStorage.setItem(USER_ID, userId);
  }

  public getUserId(): number{
    return this.getDecodedAccessToken(this.getToken()).userId;
  }

  public setEmail(email: string): void{
    window.sessionStorage.removeItem(EMAIL);
    window.sessionStorage.setItem(EMAIL, email);
  }

  public getEmail(): string{
    return window.sessionStorage.getItem(EMAIL);
  }

  public setNombre(nombre: string): void{
    window.sessionStorage.removeItem(NOMBRE);
    window.sessionStorage.setItem(NOMBRE, nombre);
  }

  public getNombre(): string{
    return this.getDecodedAccessToken(this.getToken()).nombre;
  }

  public setApellido(apellido: string): void{
    window.sessionStorage.removeItem(APELLIDO);
    window.sessionStorage.setItem(APELLIDO, apellido);
  }

  public getApellido(): string{
    return this.getDecodedAccessToken(this.getToken()).apellido;
  }

  public getProfesion(): string{
    return this.getDecodedAccessToken(this.getToken()).profesion;
  }


  public getDecodedAccessToken(token: string): any{
    try{
      return jwt_decode(token);
    }catch(Error){
      return null;
    }
  }

}
