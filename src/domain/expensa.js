export class ExpensaDeDepartamento {

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