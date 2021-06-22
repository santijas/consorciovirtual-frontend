export class Gasto {
    
    constructor(id, rubro, titulo, importe, periodo){ 
      this.id = id
      this.rubro = rubro
      this.titulo = titulo
      this.importe = importe
      this.periodo = periodo
    }


    esComun = () =>{
     return this.tipo === "Común" 
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
