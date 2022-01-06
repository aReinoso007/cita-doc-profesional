export class RegistroSubespecialidad{
    medicoId: number;
    subespecialidadId: number;
    
    constructor(medicoId: number, subespecialidadId: number){
        this.medicoId = medicoId;
        this.subespecialidadId = subespecialidadId;
    }
}