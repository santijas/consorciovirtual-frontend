export class Factura {

    constructor(fechaFactura, numeroFactura, puntoDeVenta, cuitProveedor, cuitReceptor, cae, importe){ 
      this.fechaFactura = fechaFactura
      this.numeroFactura = numeroFactura
      this.puntoDeVenta = puntoDeVenta
      this.cuitProveedor = cuitProveedor
      this.cuitReceptor = cuitReceptor
      this.cae = cae
      this.importe = importe
      this.enlaceDeDescarga = ""
      this.type = "factura"
    }

    static fromJson(facturaJSON) {
      return Object.assign(new Factura(),
      facturaJSON,
        { }
      )
    }

    toJSON() {
        return {
          ...this
        }
    }
}