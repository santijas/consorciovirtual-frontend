export class Reclamo {
    
    constructor(id, autor, asunto, mensaje, fecha, estado){ 
      this.id = id
      this.autor = autor
      this.asunto = asunto
      this.mensaje = mensaje
      this.fecha = fecha
      this.estado = estado
    }

    static fromJson(reclamoJSON) {
        return Object.assign(new Reclamo(),
        reclamoJSON,
          { }
        )
      }

    toJSON() {
        return {
          ...this
        }
    }
}
