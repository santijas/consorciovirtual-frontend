export class TelefonoUtil {
    
    constructor(id, nombre, servicio, telefono, anotacion){ 
      this.id = id
      this.nombre = nombre
      this.servicio = servicio
      this.telefono = telefono
      this.anotacion = anotacion
    }

    static fromJson(JSON) {
        return Object.assign(new TelefonoUtil(),
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