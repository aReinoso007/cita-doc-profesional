import { TokenService } from './token.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medico } from '../model/medico.model';

@Injectable({
  providedIn: 'root'
})



export class MedicoService {
  medicoApi = 'http://localhost:8090/api/private/medico';
  constructor(private http: HttpClient,private tokenService: TokenService) { 
    
  }
  
  headers_obj = new HttpHeaders().set("Authorization","Bearer "+this.tokenService.getToken());
  getMedico(): Observable<Medico>{
    return this.http.get<Medico>(this.medicoApi+'/'+this.tokenService.getUserId(),{headers: this.headers_obj});
  }
}
