import { TokenService } from './token.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medico } from '../model/medico.model';
import { Clinica } from '../model/clinica.model';

@Injectable({
  providedIn: 'root'
})



export class MedicoService {
  medicoApi = 'http://localhost:8090/api/private/medico';
  registroApi = 'http://localhost:8090/api/private/registro_clinica';
  clinicasApi = 'http://localhost:8090/api/public/clinica';
  constructor(private http: HttpClient,private tokenService: TokenService) { 
    
  }
  
  headers_obj = new HttpHeaders().set("Authorization","Bearer "+this.tokenService.getToken());
  getMedico(): Observable<Medico>{
    return this.http.get<Medico>(this.medicoApi+'/'+this.tokenService.getUserId(),{headers: this.headers_obj});
  }

  getPorMedicoYClinica(medicoId: number, clinicaId: number){

  }

  getClinicasMedico(): Observable<Clinica>{
    return this.http.get<Clinica>(this.clinicasApi+'/medico_clinica/?idMedico='+this.tokenService.getUserId());
  }
}
