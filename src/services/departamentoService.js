import axios from 'axios'
import { REST_SERVER_URL } from './configuration'
import { Departamento, DepartamentoConUsuarios } from '../domain/departamento'
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

    async create(depto, propietarioId){
        const departamento = new DepartamentoConUsuarios(depto, propietarioId, null)
        await axios.put((`${REST_SERVER_URL}/departamento/crear`), departamento.toJSON())
    }

    async update(depto, propietarioId, inquilinoId){
        const departamento = new DepartamentoConUsuarios(depto, propietarioId, inquilinoId)
        const idLogueado = usuarioService.usuarioLogueado.id
        await axios.put(`${REST_SERVER_URL}/departamento/modificar`, departamento.toJSON(),  {params:  {idLogueado} })
    }

    async delete(id){
        const idLogueado = usuarioService.usuarioLogueado.id
        await axios.delete(`${REST_SERVER_URL}/departamento/eliminar/${id}`,  {params:  {idLogueado} })
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