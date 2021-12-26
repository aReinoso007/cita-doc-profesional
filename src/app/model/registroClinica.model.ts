import { Clinica } from "./clinica.model";
import { Medico } from "./medico.model";

export class RegistroClinica{
    registroClinicaId: number;
    medico: Medico;
    clinica: Clinica;
}