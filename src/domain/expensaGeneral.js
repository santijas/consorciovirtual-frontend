export class ExpensaGeneral {

    constructor(id, periodo, valorTotalExpensaComun, valorTotalExpensaExtraordinaria){ 
      this.id = id
      this.valorTotalExpensaComun = valorTotalExpensaComun
      this.valorTotalExpensaExtraordinaria = valorTotalExpensaExtraordinaria
      this.periodo = periodo
    }

    static fromJson(expensaJSON) {
      return Object.assign(new ExpensaGeneral(),
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