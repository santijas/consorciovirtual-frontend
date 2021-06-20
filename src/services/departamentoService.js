import axios from 'axios'
import { REST_SERVER_URL } from './configuration'
import { Departamento } from '../domain/departamento'

class DepartamentoService {

    async getBySearch(palabraBuscada) {
        const listaJSON = await axios.get(`${REST_SERVER_URL}/departamentos`, {params:{ palabraBuscada }})
        return listaJSON.data
    }
    
    async create(user){
        await axios.put((`${REST_SERVER_URL}/departamentos/crear`), user.toJSON())
    }

    async update(user){
        await axios.put(`${REST_SERVER_URL}/departamentos/modificar`, user.toJSON())
        this.usuarioLogueado = user
    }

    async delete(id){
        axios.put(`${REST_SERVER_URL}/departamentos/eliminar/${id}`)
    }
}

export const departamentoService = new DepartamentoService()