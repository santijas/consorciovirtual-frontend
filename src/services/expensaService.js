import axios from 'axios'
import { ExpensaDeDepartamento } from '../domain/expensa'
import { ExpensaGeneral } from '../domain/expensaGeneral'
import { REST_SERVER_URL } from './configuration'

class ExpensaService {


    expensaDeptoAJSON(JSON) {
        return ExpensaDeDepartamento.fromJson(JSON)
    }

    expensaGeneralAJSON(JSON) {
        return ExpensaGeneral.fromJson(JSON)
    }

    async getById(id){
        const Json = await axios.get(`${REST_SERVER_URL}/expensas/${id}`)
        return this.expensaDeptoAJSON(Json.data)
    }

    async getBySearch(palabraBuscada) {
        const listaJSON = await axios.get(`${REST_SERVER_URL}/expensas`, {params:{ palabraBuscada }})
        return listaJSON.data
    }

    async create(periodo){
        await axios.get(`${REST_SERVER_URL}/expensas/createPorImporteDeGastos/`, {params:{ periodo }})
    }

    async delete(periodo){
        await axios.put(`${REST_SERVER_URL}/expensas/anular/${periodo}`)
    }

    async getByPeriodGeneral(periodo) {
        const JSON = await axios.get(`${REST_SERVER_URL}/expensageneral/periodo`, {params:{ periodo }})
        return this.expensaGeneralAJSON(JSON.data)
    }

    async getByPeriodDepto(periodo) {
        const listaJSON = await axios.get(`${REST_SERVER_URL}/expensadepto/periodo`, {params:{ periodo }})
        return listaJSON.data
    }

    async anularExpensas(periodo) {
        return await axios.get(`${REST_SERVER_URL}/expensas/anular`, {params:{ periodo }})
    }
}

export const expensaService = new ExpensaService()