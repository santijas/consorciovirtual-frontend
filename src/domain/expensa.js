export class Expensa {

    constructor(id, valorDepartamentoComun, valorDepartamentoExtraordinaria, periodo, unidad, estado, montoAPagar){ 
      this.id = id
      this.valorDepartamentoComun = valorDepartamentoComun
      this.valorDepartamentoExtraordinaria = valorDepartamentoExtraordinaria
      this.periodo = periodo
      this.unidad = unidad
      this.estado = estado
      this.montoAPagar = montoAPagar
    }

    static fromJson(expensaJSON) {
      return Object.assign(new Expensa(),
      expensaJSON,
        { }
      )
    }

    toJSON() {
        return {
          ...this
        }
    }
}

export class ExpensaVistaDTO {

    constructor(id,periodo, departamento, tipoOrdinaria, valorTotalExpensa,estado ){ 
      this.id = id
      this.periodo = periodo
      this.departamento = departamento
      this.tipoOrdinaria = tipoOrdinaria
      this.valorTotalExpensa = valorTotalExpensa
      this.estado = estado
    }

    static fromJson(expensaVistaJSON) {
      return Object.assign(new ExpensaVistaDTO(),
      expensaVistaJSON,
        { }
      )
    }

    toJSON() {
        return {
          ...this
        }
    }
}