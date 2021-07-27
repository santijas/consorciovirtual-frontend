import axios from 'axios'
import { Gasto } from '../domain/gasto'
import { Factura } from '../domain/factura'
import { REST_SERVER_URL } from './configuration'
import { usuarioService } from '../services/usuarioService';


class GastoService{

    gastoAJson(JSON) {
        return Gasto.fromJson(JSON)
    }

    facturaAJson(JSON) {
        return Factura.fromJson(JSON)
    }

    async getBySearch(palabraBuscada) {
        const listaJSON = await axios.get(`${REST_SERVER_URL}/gastos`, {params:{ palabraBuscada }})
        return listaJSON.data
    }

    async getById(id){
        const JSON = await axios.get(`${REST_SERVER_URL}/gasto/${id}`)
        return [this.gastoAJson(JSON.data), JSON.data.idComprobante, JSON.data.tipoComprobante]
    }

    async getByPeriod(periodo) {
        const listaJSON = await axios.get(`${REST_SERVER_URL}/gastos/periodo`, {params:{ periodo }})
        return listaJSON.data
    }

    async getFacturaById(id) {
        const JSON = await axios.get(`${REST_SERVER_URL}/documentos/factura/${id}`)
        return this.facturaAJson(JSON.data)
    }

    async create(gasto){
        await axios.put((`${REST_SERVER_URL}/gastos/crear`), gasto.toJSON())
    }

    async createComprobante(comprobante){
        const idLogueado = JSON.parse(window.localStorage.getItem('loggedUser')).id
        await axios.post((`${REST_SERVER_URL}/documentos/createDeGasto/${idLogueado}`), comprobante.toJSON())
    }

    async update(gasto){
        const idLogueado = JSON.parse(window.localStorage.getItem('loggedUser')).id
        console.log(gasto.url)
        await axios.put((`${REST_SERVER_URL}/gasto/modificar`), gasto.toJSON(), {params:{ idLogueado}})
    }

    async delete(id){
        await axios.put(`${REST_SERVER_URL}/gasto/eliminar/${id}`)
    }

    async eliminarPosta(urlDeGasto){
        await axios.delete(`${REST_SERVER_URL}/gasto/eliminar`, {params:{ urlDeGasto }})
    }
}

export const gastoService = new GastoService()