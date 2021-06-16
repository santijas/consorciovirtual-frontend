export class Expensa {

    constructor(id, idDepartamento, idUsuario,
        idDocumento, valorTotalExpensa, valorExpensaExtraordinaria,
        valorExpensaDepartamento, periodo, fechaDePago ){ 
      this.id = id
      this.idDepartamento = idDepartamento
      this.idDocumento = idDocumento
      this.valorTotalExpensa = valorTotalExpensa
      this.valorExpensaExtraordinaria = valorExpensaExtraordinaria
      this.valorExpensaDepartamento = valorExpensaDepartamento
      this.periodo = periodo
      this.fechaDePago = fechaDePago
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