import axios from 'axios'
import { REST_SERVER_URL } from './configuration'
import { Departamento } from '../domain/departamento'

class DepartamentoService {

    async getAllDeptos(palabraBuscada) {
        const listaJSON = await axios.get(`${REST_SERVER_URL}/departamentos`, {params:{ palabraBuscada }})
        return listaJSON.data
    }
}

export const departamentoService = new DepartamentoService()