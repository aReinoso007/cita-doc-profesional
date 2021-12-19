export class Horario{
    public dia: string;
    public inicio: string;
    public fin: string;


    constructor(dia?: string, inicio?: string, fin?: string){
        this.dia = dia;
        this.inicio = inicio;
        this.fin = fin;
    }

    get _dia(){
        return this.dia;
    }
    set _dia(dia: string){
        this.dia = dia;
    }

    get _inicio(){
        return this.inicio;
    }

    set _inicio(inicio: string){
        this.inicio = inicio;
    }

    get _fin(){
        return this.fin;
    }

    set _fin(fin: string){
        this.fin = fin;
    }
}