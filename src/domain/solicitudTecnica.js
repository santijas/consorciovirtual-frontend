export class SolicitudTecnica {
    
    constructor(id, tipo, titulo, detalle, fecha, autor, estado, notas){ 
      this.id = id
      this.tipo = tipo
      this.titulo = titulo
      this.detalle = detalle
      this.fecha = fecha
      this.autor = autor
      this.estado = estado
      this.notas = notas || []
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
