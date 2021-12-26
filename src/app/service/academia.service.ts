import { RegistroEspecialidad } from './../model/registroEspecialidad.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { Especialidad } from '../model/especialidad.model';

@Injectable({
  providedIn: 'root'
})
export class AcademiaService {

  especialidadAPI ='http://localhost:8090/api/private/especialidad';
  subespecialidadAPI ='http://localhost:8090/api/public/subespecialidad';
  registroEspeAPI='http://localhost:8090/api/private/medico_especialidad';
  registroSubEsAPI='http://localhost:8090/api/private/medico_subespecialidad';

  constructor(
    private tokenService: TokenService,
    private http: HttpClient
  ) { }

  headers_obj = new HttpHeaders().set("Authorization","Bearer "+this.tokenService.getToken());

  /*Se muestran las especialidades que no han sido registradas por el medico */
  getEspecialidadesDisponibles(): Observable<any>{
    return this.http.get(this.especialidadAPI+'/disponibles/'+ this.tokenService.getUserId(), {headers: this.headers_obj});
  }
  /*Esto es para guardar el registro de especialidad */
  postRegistroEspecialidad(registro: RegistroEspecialidad): Observable<any>{
    return this.http.post(this.registroEspeAPI, registro, {headers: this.headers_obj});
  }

  /*Obtener las especialidades registradas por el medico */
  getEspecialidadesRegistradas(): Observable<any>{
    const opts = {params: new HttpParams({})}
    return this.http.get(this.especialidadAPI+'/registradas/'+this.tokenService.getUserId(), {headers: this.headers_obj})
  }


  /*Obtiene las subespecialidades no registradas por el medico */
  getSubespecialidades(){

  }

}
