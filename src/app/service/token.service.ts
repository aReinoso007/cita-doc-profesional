import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

const TOKEN_KEY='AuthToken';
const USER_ID='AuthUserId';
const EMAIL = 'AuthEmail';
const NOMBRE ='AuthNombre';
const APELLIDO ='AuthApellido';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public logOut(): void{
    window.sessionStorage.clear();
  }

  public setToken(token: string): void{
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string{
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public setUserId(userId: string): void{
    window.sessionStorage.removeItem(USER_ID);
    window.sessionStorage.setItem(USER_ID, userId);
  }

  public getUserId(): string{
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
    return window.sessionStorage.getItem(NOMBRE)
  }

  public setApellido(apellido: string): void{
    window.sessionStorage.removeItem(APELLIDO);
    window.sessionStorage.setItem(APELLIDO, apellido);
  }

  public getApellido(): string{
    return window.sessionStorage.getItem(APELLIDO)
  }

  public getDecodedAccessToken(token: string): any{
    try{
      return jwt_decode(token);
    }catch(Error){
      return null;
    }
  }

}
