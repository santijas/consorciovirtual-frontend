export class Departamento {

    constructor(id, propietario, inquilino, torre, piso, nroDepartamento, porcentajeExpensa,metrosCuadrados, estadoDeCuenta, ultimaModificacion){ 
      this.id = id
      this.propietario = propietario
      this.inquilino = inquilino
      this.torre = torre
      this.piso = piso
      this.nroDepartamento = nroDepartamento
      this.porcentajeExpensa = porcentajeExpensa
      this.metrosCuadrados = metrosCuadrados
      this.estadoDeCuenta = estadoDeCuenta
      this.ultimaModificacion = ultimaModificacion
    }

    static fromJson(deptoJSON) {
      console.log("fromJson: " + deptoJSON)
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

export class DepartamentoConUsuarios {

    constructor(departamento, propietarioId, inquilinoId){
      this.departamento = departamento
      this.propietarioId = propietarioId;
      this.inquilinoId = inquilinoId;
    }

    toJSON() {
        return {
          ...this
        }
    }
}