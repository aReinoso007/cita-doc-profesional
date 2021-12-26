import { RegistroEspecialidad } from './../model/registroEspecialidad.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { Especialidad } from '../model/especialidad.model';

@Injectable({
  providedIn: 'root'
})
export class AcademiaService {

  especialidadAPI ='http://localhost:8090/api/public/especialidad';
  subespecialidadAPI ='http://localhost:8090/api/public/subespecialidad';
  registroEspeAPI='http://localhost:8090/api/private/medico_especialidad';
  registroSubEsAPI='http://localhost:8090/api/private/medico_subespecialidad';

  constructor(
    private tokenService: TokenService,
    private http: HttpClient
  ) { }

  getEspecialidadesDisponibles(): Observable<any>{
    return this.http.get(this.especialidadAPI+'/disponibles/'+ this.tokenService.getUserId());
  }

  postRegistroEspecialidad(registro: RegistroEspecialidad): Observable<any>{
    return this.http.post(this.registroEspeAPI, registro);
  }

  getSubespecialidades(){

  }

}
