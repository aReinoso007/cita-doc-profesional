import { FormularioDireccionClinica } from './../model/FormularioDireccionClinica.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clinica } from '../model/clinica.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ClinicaService {
  /*clinicasApi = 'http://localhost:8090/api/public/clinica';
  registroDireccionAPI = 'http://localhost:8090/api/public/direccion_clinica';*/
  clinicasApi = 'http://www.citasmedicaspepitas.info/api/private/clinica';
  registroDireccionAPI = 'http://www.citasmedicaspepitas.info/api/public/direccion_clinica';
  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }
  headers_obj = new HttpHeaders().set("Authorization","Bearer "+this.tokenService.getToken());
  /*Lista todas las clinicas */
  getAllClinicas(): Observable<Clinica>{
    return this.http.get<Clinica>(this.clinicasApi, {headers: this.headers_obj});
  }

  getClinicasDisponibles(medicoId: number): Observable<Clinica[]>{
    return this.http.get<Clinica[]>(this.clinicasApi+'/disponibles/'+medicoId, {headers: this.headers_obj});
  }

  addClinica(clinica: Clinica): Observable<any>{
    return this.http.post(this.clinicasApi, clinica, {headers: this.headers_obj});
  }

  addRegistroDireccion(registro: FormularioDireccionClinica): Observable<any>{
    return this.http.post(this.registroDireccionAPI, registro);
  }

}
