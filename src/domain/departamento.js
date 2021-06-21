export class Departamento {

    constructor(id, propietario, inquilino, torre, piso, nroDepartamento, porcentajeExpensa,metrosCuadrados,estadoDeCuenta, nombrePropietario,nombreInquilino){ 
      this.id = id
      this.propietario = propietario
      this.inquilino = inquilino
      this.torre = torre
      this.piso = piso
      this.nroDepartamento = nroDepartamento
      this.porcentajeExp = porcentajeExpensa
      this.metrosCuadrados = metrosCuadrados
      this.nombrePropietario = nombrePropietario
      this.nombreInquilino = nombreInquilino
      // this.estadoDeCuenta = estadoDeCuenta
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