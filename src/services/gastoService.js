import axios from 'axios'
import { Gasto } from '../domain/gasto'
import { REST_SERVER_URL } from './configuration'


class GastoService{

    gastoAJson(JSON) {
        return Gasto.fromJson(JSON)
    }

    async getAll(palabraBuscada) {
        const listaJSON = await axios.get(`${REST_SERVER_URL}/gastos`, {params:{ palabraBuscada }})
        return listaJSON.data
    }

    async getGasto(id){
        const JSON = await axios.get(`${REST_SERVER_URL}/gasto/${id}`)
        return this.gastoAJson(JSON.data)
    }
}

export const gastoService = new GastoService()