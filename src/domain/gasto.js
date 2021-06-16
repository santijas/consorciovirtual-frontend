export class Gasto {
    
    constructor(id, tipo, titulo, monto, fecha){ 
      this.id = id
      this.tipo = tipo
      this.titulo = titulo
      this.monto = monto
      this.fecha = fecha
    }


    static fromJson(JSON) {
        return Object.assign(new Gasto(),
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
