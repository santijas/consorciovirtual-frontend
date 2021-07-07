import axios from 'axios'
import { Reclamo } from '../domain/reclamo'
import { REST_SERVER_URL } from './configuration'
import { usuarioService } from './usuarioService';

class ReclamoService {

    reclamoAJson(reclamoJSON) {
        return Reclamo.fromJson(reclamoJSON)
    }

    async getAll(busqueda) {
        const idLogueado = usuarioService.usuarioLogueado.id
        const listaJSON = await axios.get(`${REST_SERVER_URL}/reclamos/?palabraBuscada=${busqueda}`, {params:  {idLogueado}})
        return listaJSON.data
    }

    async getById(id) {
        const reclamo = await axios.get(`${REST_SERVER_URL}/reclamo/${id}`)
        return Reclamo.fromJson(reclamo.data)
    }

    async create(reclamo){
        await axios.post((`${REST_SERVER_URL}/reclamo/crear`), reclamo.toJSON())
    }

    async update(reclamo){
        const idLogueado = usuarioService.usuarioLogueado.id
        await axios.put(`${REST_SERVER_URL}/reclamo/modificar`, reclamo.toJSON(), {params:  {idLogueado} })
    }

    async delete(id){
        await axios.delete(`${REST_SERVER_URL}/reclamo/eliminar/${id}`)
    }

}

export const reclamoService = new ReclamoService()