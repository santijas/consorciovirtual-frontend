import axios from 'axios'
import { ExpensaDeDepartamento } from '../domain/expensa'
import { REST_SERVER_URL } from './configuration'

class ExpensaService {


    aJSON(JSON) {
        return ExpensaDeDepartamento.fromJson(JSON)
    }

    async getById(id){
        const Json = await axios.get(`${REST_SERVER_URL}/expensas/${id}`)
        return this.aJSON(Json.data)
    }

    async getBySearch(palabraBuscada) {
        const listaJSON = await axios.get(`${REST_SERVER_URL}/expensas`, {params:{ palabraBuscada }})
        return listaJSON.data
    }

    async create(periodo){
        await axios.post((`${REST_SERVER_URL}/expensas/createPorImporteDeGastos/${periodo}`))
    }

    async delete(periodo){
        axios.put(`${REST_SERVER_URL}/expensas/anular/${periodo}`)
    }
}

export const expensaService = new ExpensaService()