export class Gasto {
    
    constructor(id, rubro, titulo, importe, periodo){ 
      this.id = id
      this.rubro = rubro
      this.titulo = titulo
      this.importe = importe
      this.periodo = periodo
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
