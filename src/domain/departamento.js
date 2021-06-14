export class Departamento {

    constructor(id, idPropietario, idInquilino, torre, piso, nroDepto, porcentajeExp,m2){ 
      this.id = id
      this.idPropietario = idPropietario
      this.idInquilino = idInquilino
      this.torre = torre
      this.piso = piso
      this.nroDepto = nroDepto
      this.porcentajeExp = porcentajeExp
      this.m2 = m2
    }

    static fromJson(deptoJSON) {
      return Object.assign(new Departamento(),
      deptoJSON,
        { }
      )
    }

    toJSON() {
        return {
          ...this
        }
    }
}

export class DepartamentoVistaDTO {

    constructor(id, piso,letraNro, propietario, inquilino, actividad, estadoCuenta){
      this.id = id;
      this.piso = piso;
      this.letraNro = letraNro;
      this.propietario = propietario;
      this.inquilino =inquilino;
      this.actividad = actividad;
      this.estadoCuenta = estadoCuenta;
    }

    static fromJson(deptoVistaJSON) {
      return Object.assign(new DepartamentoVistaDTO(),
      deptoVistaJSON,
        { }
      )
    }

    toJSON() {
        return {
          ...this
        }
    }
}