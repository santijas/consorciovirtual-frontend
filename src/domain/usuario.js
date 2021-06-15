export class Usuario {
    
    constructor(id, nombre, apellido, username, fechaNacimiento, dni, email){ 
      this.id = id
      this.nombre = nombre
      this.apellido = apellido
      this.username = username
      this.fechaNacimiento = fechaNacimiento
      this.dni = dni
      this.email = email
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


export class LoginUsuario {

    constructor(username, password){
        this.username = username
        this.password = password
    }

    toJSON() {
        return {
          ...this
        }
      }
}