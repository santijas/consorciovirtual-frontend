export class Usuario {
    
    constructor(id, nombre, apellido, username, fechaNacimiento, dni, correo, tipo){ 
      this.id = id
      this.nombre = nombre
      this.apellido = apellido
      this.username = username
      this.fechaNacimiento = fechaNacimiento
      this.dni = dni
      this.correo = correo
      this.tipo = tipo
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