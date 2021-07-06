import axios from 'axios'
import { REST_SERVER_URL } from './configuration'
import { Departamento } from '../domain/departamento'
import { usuarioService } from '../services/usuarioService';

class DepartamentoService {

    async getBySearch(palabraBuscada) {
        const idLogueado = usuarioService.usuarioLogueado.id
        const listaJSON = await axios.get(`${REST_SERVER_URL}/departamentos`, {params:{ palabraBuscada, idLogueado }})
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
        await axios.put(`${REST_SERVER_URL}/departamento/eliminar/${id}`)
    }

    async count(){
        const cantidad = await axios.get(`${REST_SERVER_URL}/cantidaddepartamentos`)
        return cantidad.data
    }
    
    async getByPropietarioId(id){
        const departamentoJson = await axios.get(`${REST_SERVER_URL}/departamentos/user/${id}`)
        console.log(departamentoJson.data)
        return departamentoJson.data
    }
}

export const departamentoService = new DepartamentoService()