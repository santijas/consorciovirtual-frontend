import axios from 'axios'
import { Gasto } from '../domain/gasto'
import { REST_SERVER_URL } from './configuration'


class GastoService{

    gastoAJson(JSON) {
        return Gasto.fromJson(JSON)
    }

    async getAll() {
        const listaJSON = await axios.get(`${REST_SERVER_URL}/gastos`)
        return listaJSON.data
    }

}

export const gastoService = new GastoService()