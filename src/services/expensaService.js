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
        const idLogueado = JSON.parse(window.localStorage.getItem('loggedUser')).id
        const listaJSON = await axios.get(`${REST_SERVER_URL}/expensas`, {params:{ idLogueado, palabraBuscada }})
        return listaJSON.data
    }

    async create(periodo){
        await axios.get(`${REST_SERVER_URL}/expensas/createPorImporteDeGastos/`, {params:{ periodo }})
    }

    async createPrefijados(periodo, valorComunes, valorExtraordinarias){
        await axios.get(`${REST_SERVER_URL}/expensas/createPorImportePredefinido`, {params:{ periodo, importeComunes:valorComunes, importeExtraordinarias:valorExtraordinarias }})
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

    async pagarExpensa(idExpensa){
        const idLogueado = JSON.parse(window.localStorage.getItem('loggedUser')).id
        return await axios.put(`${REST_SERVER_URL}/expensas/pagar/${idExpensa}/${idLogueado}`)
    }
}

export const expensaService = new ExpensaService()