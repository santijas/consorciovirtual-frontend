import axios from 'axios'
import { REST_SERVER_URL } from './configuration'
import { Departamento } from '../domain/departamento'
import { Usuario } from '../domain/usuario'

class DepartamentoService {

    async getBySearch(palabraBuscada) {
        const listaJSON = await axios.get(`${REST_SERVER_URL}/departamentos`, {params:{ palabraBuscada }})
        return listaJSON.data
    }
    
    async getById(id){
        const departamentoJson = await axios.get(`${REST_SERVER_URL}/departamento/${id}`)
         return Departamento.fromJson(departamentoJson.data)
    }

    async create(depto,propietario){
        depto.propietario = propietario
        console.log(Departamento.fromJson(depto) )
        await axios.put((`${REST_SERVER_URL}/departamento/crear`), Departamento.fromJson(depto).toJSON())
    }

    async update(depto,propietario,inquilino){
        depto.propietario = propietario
        depto.inquilino = inquilino
        console.log(Departamento.fromJson(depto) )
        await axios.put(`${REST_SERVER_URL}/departamento/modificar`, Departamento.fromJson(depto).toJSON())
    }

    async delete(id){
        axios.put(`${REST_SERVER_URL}/departamento/eliminar/${id}`)
    }
}

export const departamentoService = new DepartamentoService()