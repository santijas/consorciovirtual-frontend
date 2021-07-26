export class Factura {

    constructor(fechaFactura, tipoFactura, puntoDeVenta, numeroFactura, cuitProveedor, cuitReceptor, cae, importe){ 
      this.fechaFactura = fechaFactura
      this.tipoFactura = tipoFactura
      this.puntoDeVenta = puntoDeVenta
      this.numeroFactura = numeroFactura
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