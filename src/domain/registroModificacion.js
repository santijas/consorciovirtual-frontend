export class RegistroModificacion {
    
    constructor(fechaHoraModificacion, usuarioModificador){
      this.fechaHoraModificacion = fechaHoraModificacion
      this.usuarioModificador = usuarioModificador
    }

    static fromJson(JSON) {
        return Object.assign(new RegistroModificacion(),
            JSON,
          { }
        )
      }

    toJSON() {
        return {
          ...this
        }
    }
}
