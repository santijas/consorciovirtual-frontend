export class Usuario {
    
    constructor(id, nombre, apellido, fechaNacimiento, dni, correo, tipo, ultimaModificacion){ 
      this.id = id
      this.nombre = nombre
      this.apellido = apellido
      this.fechaNacimiento = fechaNacimiento
      this.dni = dni
      this.correo = correo
      this.tipo = tipo
      this.ultimaModificacion = ultimaModificacion
    }

    esAdmin(){
      return this.tipo === "Administrador" || this.tipo === "Administrador_consorcio"
    }

    esPropietario(){
      return this.tipo === "Propietario"
    }

    nombreYApellido(){
      return this.nombre + " " + this.apellido
    }

    static fromJson(usuarioJSON) {
        return Object.assign(new Usuario(),
        usuarioJSON,
          { }
        )
      }

    toJSON() {
        return {
          ...this
        }
    }
}