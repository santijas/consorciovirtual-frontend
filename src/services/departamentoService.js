import axios from 'axios'
import { REST_SERVER_URL } from './configuration'
import { Departamento } from '../domain/departamento'
import { Usuario } from '../domain/usuario'

class DepartamentoService {

    historialPrueba = [
        new Usuario(1, "Jorge", "Bilboa"),
        new Usuario(1, "Miguel", "Cervantes"),
        new Usuario(1, "Patricio", "Dalton"),
    ]

    async getBySearch(palabraBuscada) {
        const listaJSON = await axios.get(`${REST_SERVER_URL}/departamentos`, {params:{ palabraBuscada }})
        return listaJSON.data
    }
    
    async getById(id){
        const departamentoJson = await axios.get(`${REST_SERVER_URL}/departamento/${id}`)
         return Departamento.fromJson(departamentoJson.data)
    }

     // A MODIFICAR PARA EL FINAL
    async create(depto,propietario){
        depto.propietario = propietario[0]
        await axios.put((`${REST_SERVER_URL}/departamento/crear`), Departamento.fromJson(depto).toJSON())
    }

    // A MODIFICAR PARA EL FINAL
    async update(depto,propietario,inquilino){
        if(!propietario) depto.propietario = propietario[0]
        if(inquilino!=null) depto.inquilino = inquilino[0]
        await axios.put(`${REST_SERVER_URL}/departamento/modificar`, Departamento.fromJson(depto).toJSON())
    }

    async delete(id){
        axios.put(`${REST_SERVER_URL}/departamento/eliminar/${id}`)
    }

    async count(){
        return await axios.get(`${REST_SERVER_URL}/cantidaddepartamentos`)
    }
}

export const departamentoService = new DepartamentoService()