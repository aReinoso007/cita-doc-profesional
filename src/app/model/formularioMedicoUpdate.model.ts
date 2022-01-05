export class FormularioUpdateMedico{
    slogan: string;
    descripcion: string;
    numeroContacto: string;

    constructor(slogan?: string, descripcion?: string, numeroContacto?: string){
        this.slogan = slogan;
        this.descripcion = descripcion;
        this.numeroContacto = numeroContacto;
    }
}