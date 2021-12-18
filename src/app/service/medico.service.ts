import { Horario } from './../model/horario.model';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medico } from '../model/medico.model';
import { Clinica } from '../model/clinica.model';
import { Cita } from '../model/cita.model';

@Injectable({
  providedIn: 'root'
})



export class MedicoService {
  medicoApi   = 'http://localhost:8090/api/private/medico';
  registroApi = 'http://localhost:8090/api/public/registro_clinica';
  clinicasApi = 'http://localhost:8090/api/public/clinica';
  horariosApi = 'http://localhost:8090/api/private/horario';
  citaApi     = 'http://localhost:8090/api/public/cita';
  constructor(private http: HttpClient,private tokenService: TokenService) { 
    
  }
  
  headers_obj = new HttpHeaders().set("Authorization","Bearer "+this.tokenService.getToken());
  getMedico(): Observable<Medico>{
    return this.http.get<Medico>(this.medicoApi+'/'+this.tokenService.getUserId(),{headers: this.headers_obj});
  }
  /*Devuelve el id del registro con el id del medico y la clinica
    esto sirve para poder listar los horarios de esa clinica, agregar, editar o borrar */
  getRegistroPorMedicoYClinica(medicoId: number, clinicaId: number){
    return this.http.get(this.registroApi+'/buscar/'+medicoId+'/'+clinicaId)
  }

  getClinicasMedico(): Observable<Clinica>{
    return this.http.get<Clinica>(this.clinicasApi+'/medico_clinica/?idMedico='+this.tokenService.getUserId());
  }

  getAllClinicas(): Observable<Clinica>{
    return this.http.get<Clinica>(this.clinicasApi);
  }

  getHistorialCitas(id: number): Observable<Cita[]>{
    return this.http.get<Cita[]>(this.citaApi+'/historial/'+id);
  }

  addClinica(clinica: Clinica): Observable<any>{
    return this.http.get(this.clinicasApi);
  }

  saveHorario(registroId: number, horario: Horario): Observable<any>{
    return this.http.post<any>(this.horariosApi+'/'+registroId, horario, {headers: this.headers_obj});
  }

  getHorariosOrdenados(registroId: number): Observable<Horario[]>{
    return this.http.get<Horario[]>(this.horariosApi+'/fechas_ordenadas/'+registroId, {headers: this.headers_obj});
  }
}
