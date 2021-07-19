export class Reclamo {
    
    constructor(id, autor, asunto, mensaje, fecha, estado, notas, ultimaModificacion){ 
      this.id = id
      this.autor = autor
      this.asunto = asunto
      this.mensaje = mensaje
      this.fecha = fecha
      this.estado = estado
      this.notas = notas || []
      this.ultimaModificacion = ultimaModificacion
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
