export class Anuncio {

    constructor(id, titulo, descripcion, fechaCreacion, fechaVencimiento, nombreAutor, ultimaModificacion) {
        this.id = id
        this.titulo = titulo
        this.descripcion = descripcion
        this.fechaCreacion = fechaCreacion
        this.fechaVencimiento = fechaVencimiento
        this.nombreAutor = nombreAutor
        this.ultimaModificacion = ultimaModificacion
    }

    static fromJson(anuncioJSON) {
        return Object.assign(new Anuncio(),
        anuncioJSON,
          { }
        )
      }

    toJSON() {
        return {
          ...this
        }
    }
}