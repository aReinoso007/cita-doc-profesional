import { DireccionClinica } from "./direccionClinica.model";

export class Clinica {
    clinicaId: number;
    nombreClinica: string;
    contacto: string;
    direccionClinicas: Array<DireccionClinica>;
}