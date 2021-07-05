export class MensajeChat {
    constructor(idEmisor, nombreEmisor, mensaje, fechaHora ){ 
        this.idEmisor = idEmisor;
        this.nombreEmisor = nombreEmisor;
        this.mensaje = mensaje;
        this.fechaHora = fechaHora;
    }

    static fromJson(JSON) {
        return Object.assign( new MensajeChat(), JSON,{ } )
    }

    toJSON() {
        return { ...this }
    }
}