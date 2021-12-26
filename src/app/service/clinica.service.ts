import { FormularioDireccionClinica } from './../model/FormularioDireccionClinica.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clinica } from '../model/clinica.model';

@Injectable({
  providedIn: 'root'
})
export class ClinicaService {
  clinicasApi = 'http://localhost:8090/api/public/clinica';
  registroDireccionAPI = 'http://localhost:8090/api/public/direccion_clinica';
  constructor(
    private http: HttpClient
  ) { }
  
  /*Lista todas las clinicas */
  getAllClinicas(): Observable<Clinica>{
    return this.http.get<Clinica>(this.clinicasApi);
  }

  getClinicasDisponibles(medicoId: number): Observable<Clinica[]>{
    return this.http.get<Clinica[]>(this.clinicasApi+'/disponibles/'+medicoId);
  }

  addClinica(clinica: Clinica): Observable<any>{
    return this.http.post(this.clinicasApi, clinica);
  }

  addRegistroDireccion(registro: FormularioDireccionClinica): Observable<any>{
    return this.http.post(this.registroDireccionAPI, registro);
  }

}
