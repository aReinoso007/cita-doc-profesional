export class FormularioRegistroClinica{
    clinicaId: number;
    medicoId: number;

    constructor(clinicaId: number, medicoId: number){
        this.clinicaId = clinicaId;
        this.medicoId = medicoId;
    }
}