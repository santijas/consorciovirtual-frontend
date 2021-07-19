export class Factura {

    constructor(fechaFactura, numeroFactura, puntoDeVenta, cuotProveedor, cuitReceptor, cae, importe){ 
      this.fechaFactura = fechaFactura
      this.numeroFactura = numeroFactura
      this.puntoDeVenta = puntoDeVenta
      this.cuotProveedor = cuotProveedor
      this.cuitReceptor = cuitReceptor
      this.cae = cae
      this.importe = importe
    }

    static fromJson(expensaJSON) {
      return Object.assign(new Factura(),
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