import { Component, OnInit } from '@angular/core';
import { Clinica } from 'src/app/model/clinica.model';
import { ClinicaService } from 'src/app/service/clinica.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-addclinica',
  templateUrl: './addclinica.page.html',
  styleUrls: ['./addclinica.page.scss'],
})
export class AddclinicaPage implements OnInit {
  
  clinica: Clinica = new Clinica();
  clinicas: Clinica[] = [];
  constructor(private clinicaService: ClinicaService, private tokenService: TokenService) { }

  ngOnInit() {
    this.getClinicas();
  }

  getClinicas(){
    this.clinicaService.getAllClinicas().subscribe((data: Clinica)=>{
      console.log('Clinica raw data: ', data);
      this.clinicas = JSON.parse(JSON.stringify(data));
    })
  }

}
