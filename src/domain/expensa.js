export class ExpensaDeDepartamento {

    constructor(id, valorDepartamentoComun, valorDepartamentoExtraordinaria, periodo, unidad, estado, montoAPagar, propietario, fechaDePago){ 
      this.id = id
      this.valorDepartamentoComun = valorDepartamentoComun
      this.valorDepartamentoExtraordinaria = valorDepartamentoExtraordinaria
      this.periodo = periodo
      this.unidad = unidad
      this.estado = estado
      this.montoAPagar = montoAPagar
      this.propietario = propietario
      this.fechaDePago = fechaDePago
    }

    static fromJson(expensaJSON) {
      return Object.assign(new ExpensaDeDepartamento(),
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