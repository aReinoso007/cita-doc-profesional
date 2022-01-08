import { FormularioUpdateMedico } from './../model/formularioMedicoUpdate.model';
import { Horario } from './../model/horario.model';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medico } from '../model/medico.model';
import { Clinica } from '../model/clinica.model';
import { Cita } from '../model/cita.model';
import { FormularioRegistroClinica } from '../model/formularioRegistroClinica.model';

@Injectable({
  providedIn: 'root'
})



export class MedicoService {
  medicoApi   = 'http://localhost:8090/api/private/medico';
  registroApi = 'http://localhost:8090/api/private/registro_clinica';
  clinicasApi = 'http://localhost:8090/api/public/clinica';
  horariosApi = 'http://localhost:8090/api/private/horario';
  citaApi     = 'http://localhost:8090/api/private/cita';
  constructor(private http: HttpClient,private tokenService: TokenService) { 
    
  }
  
  headers_obj = new HttpHeaders().set("Authorization","Bearer "+this.tokenService.getToken());
  getMedico(): Observable<Medico>{
    return this.http.get<Medico>(this.medicoApi+'/'+this.tokenService.getUserId(),{headers: this.headers_obj});
  }

  postEditMedico(form: FormularioUpdateMedico): Observable<any>{
    return this.http.post(this.medicoApi+'/update/'+this.tokenService.getUserId(),form ,{headers: this.headers_obj});
  }
  
  /*Devuelve el id del registro con el id del medico y la clinica
    esto sirve para poder listar los horarios de esa clinica, agregar, editar o borrar */
  getRegistroPorMedicoYClinica(medicoId: number, clinicaId: number): Observable<number>{
    return this.http.get<number>(this.registroApi+'/buscar/'+medicoId+'/'+clinicaId, {headers: this.headers_obj})
  }
  /*Esta funcion es la pepa */
  getRegistroByMedicoYClinica(medicoId: number, clinicaId: number): Observable<number>{
    return this.http.get<number>(this.registroApi+'/buscar2/'+medicoId+'/'+clinicaId, {headers: this.headers_obj})
  }

  getClinicasMedico(): Observable<Clinica>{
    return this.http.get<Clinica>(this.clinicasApi+'/medico_clinica/?idMedico='+this.tokenService.getUserId());
  }

  getHistorialCitas(id: number): Observable<Cita[]>{
    return this.http.get<Cita[]>(this.citaApi+'/historial/'+id);
  }

  postRegistroClinicaMedico(registro: FormularioRegistroClinica): Observable<any>{
    return this.http.post(this.registroApi, registro, {headers: this.headers_obj});
  }

  /*Esta seccion esta dedicada a los horarios */
  saveHorario(registroId: number, horario: Horario): Observable<any>{
    return this.http.post<any>(this.horariosApi+'/guardar/'+registroId, horario, {headers: this.headers_obj});
  }

  getHorariosOrdenados(registroId: number): Observable<Horario[]>{
    return this.http.get<Horario[]>(this.horariosApi+'/horario_ordenado/'+registroId, {headers: this.headers_obj});
  }
  
  deleteHorario(horarioId: number): Observable<any>{
    return this.http.post(this.horariosApi+'/delete',horarioId, {headers: this.headers_obj});
  }

  deleteRegistroClinica(regId: number): Observable<any>{
    return this.http.post(this.registroApi+'/delete', regId, {headers: this.headers_obj});
  }

  /*Seccion de citas */
  getTodayCitasMedico(): Observable<any>{
    return this.http.get(this.citaApi+'/hoy/'+this.tokenService.getUserId(), {headers: this.headers_obj});
  }


}
