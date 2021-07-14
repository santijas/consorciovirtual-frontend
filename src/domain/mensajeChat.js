export class MensajeChat {
    
    fechaYHora
    id
    
    constructor(idEmisor, nombreEmisor, mensaje ){ 
        this.idEmisor = idEmisor;
        this.nombreEmisor = nombreEmisor;
        this.mensaje = mensaje;
    }

    static fromJson(JSON) {
        return Object.assign( new MensajeChat(), JSON,{ } )
    }

    toJSON() {
        return { ...this }
    }
}

export class MensajeRequest {
    constructor(idEmisor,mensaje){
        this.idEmisor = idEmisor
        this.mensaje = mensaje
    }

    toJSON() {
        return { ...this }
    }
}