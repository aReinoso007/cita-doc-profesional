export class FormularioDireccionClinica{
    clinicaId: number;
    direccionId: number;

    constructor(clinicaId: number, direccionId: number){
        this.clinicaId = clinicaId;
        this.direccionId = direccionId;
    }
}