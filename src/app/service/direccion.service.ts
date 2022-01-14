import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Direccion } from '../model/direccion.model';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {
  //direccionAPI = 'http://localhost:8090/api/public/direccion';
  direccionAPI = 'http://www.citasmedicaspepitas.info/api/public/direccion';
  constructor(
    private http: HttpClient
  ) { }

    saveDireccion(direccion: Direccion): Observable<any>{
      return this.http.post(this.direccionAPI, direccion);
    }

}
