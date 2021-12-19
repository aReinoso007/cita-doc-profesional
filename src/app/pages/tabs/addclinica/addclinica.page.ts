import { Location } from '@angular/common';
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
  add: boolean = false;
  constructor(private clinicaService: ClinicaService, private tokenService: TokenService, private location: Location) { }

  ngOnInit() {
    this.getClinicas();
  }

  getClinicas(){
    this.clinicaService.getAllClinicas().subscribe((data: Clinica)=>{
      this.clinicas = JSON.parse(JSON.stringify(data));
    })
  }

  goBack(){
    this.location.back();
  }

  setAdd(){
    this.add = true;
  }

  setBack(){ this.add = false}

}
