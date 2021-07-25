import axios from 'axios'
import { Gasto } from '../domain/gasto'
import { REST_SERVER_URL } from './configuration'
import { usuarioService } from '../services/usuarioService';


class GastoService{

    gastoAJson(JSON) {
        return Gasto.fromJson(JSON)
    }

    async getBySearch(palabraBuscada) {
        const listaJSON = await axios.get(`${REST_SERVER_URL}/gastos`, {params:{ palabraBuscada }})
        return listaJSON.data
    }

    async getById(id){
        const JSON = await axios.get(`${REST_SERVER_URL}/gasto/${id}`)
        return this.gastoAJson(JSON.data)
    }

    async getByPeriod(periodo) {
        const listaJSON = await axios.get(`${REST_SERVER_URL}/gastos/periodo`, {params:{ periodo }})
        return listaJSON.data
    }

    async create(gasto, comprobante){
        const idLogueado = JSON.parse(window.localStorage.getItem('loggedUser')).id
        console.log(comprobante.toJSON())
        await axios.put((`${REST_SERVER_URL}/gastos/crear`), gasto.toJSON())
        await axios.post((`${REST_SERVER_URL}/documentos/createDeGasto/${idLogueado}`), comprobante.toJSON())
    }

    async update(gasto){
        const idLogueado = JSON.parse(window.localStorage.getItem('loggedUser')).id
        await axios.put((`${REST_SERVER_URL}/gasto/modificar`), gasto.toJSON(), {params:{ idLogueado }})
    }

    async delete(id){
        await axios.put(`${REST_SERVER_URL}/gasto/eliminar/${id}`)
    }
}

export const gastoService = new GastoService()