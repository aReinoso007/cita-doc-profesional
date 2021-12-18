import { Medico } from './../../../model/medico.model';
import { TokenService } from './../../../service/token.service';
import { MedicoService } from './../../../service/medico.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  medico: Medico = new Medico;
  constructor(private medicoService: MedicoService,
              private tokenService: TokenService) { }

  ngOnInit() {
    this.medicoService.getMedico().subscribe((data: Medico)=>{
      
    })
  }

}
