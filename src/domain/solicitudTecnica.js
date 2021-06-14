export class SolicitudTecnica {
    
    constructor(id, tipo, titulo, detalle, fecha, autor, estado){ 
      this.id = id
      this.tipo = tipo
      this.titulo = titulo
      this.detalle = detalle
      this.fecha = fecha
      this.autor = autor
      this.estado = estado
    }


    static fromJson(solicitudJSON) {
        return Object.assign(new SolicitudTecnica(),
        solicitudJSON,
          { }
        )
      }

    toJSON() {
        return {
          ...this
        }
    }
}
