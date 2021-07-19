export class Documento {
    
    constructor(id, titulo, autor, fechaCreacion, descripcion, enlaceDeDescarga, type){ 
      this.id = id
      this.titulo = titulo
      this.autor = autor
      this.fechaCreacion = fechaCreacion
      this.descripcion = descripcion
      this.enlaceDeDescarga = enlaceDeDescarga
      this.type = type
    }

    static fromJson(JSON) {
        return Object.assign(new Documento(),
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