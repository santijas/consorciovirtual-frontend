import axios from 'axios'
import { TelefonoUtil } from '../domain/telefonoUtil'
import { REST_SERVER_URL } from './configuration'

class TelefonoUtilService{

    telefonoUtilAJson(JSON) {
        return TelefonoUtil.fromJson(JSON)
    }

    async getBySearch(palabraBuscada) {
        const listaJSON = await axios.get(`${REST_SERVER_URL}/contactosUtiles`, {params:{ palabraBuscada }})
        return listaJSON.data
    }

    async getById(id){
        const telefonoJson = await axios.get(`${REST_SERVER_URL}/contactosUtiles/${id}`)
        return this.telefonoUtilAJson(telefonoJson.data)
    }

    async create(nuevoTelefonoUtil){
        if(nuevoTelefonoUtil.anotacion == null){
            nuevoTelefonoUtil.anotacion = nuevoTelefonoUtil.servicio
        }
        const idLogueado = JSON.parse(window.localStorage.getItem('loggedUser')).id
        await axios.put((`${REST_SERVER_URL}/contactosUtiles/crear/${idLogueado}`), nuevoTelefonoUtil.toJSON())
    }

    async update(telefonoUtil){
        console.log(telefonoUtil);
        const idLogueado = JSON.parse(window.localStorage.getItem('loggedUser')).id
        await axios.put((`${REST_SERVER_URL}/contactosUtiles/modificar/${idLogueado}`), telefonoUtil.toJSON())
    }

    async delete(idTelefono){
        const idLogueado = JSON.parse(window.localStorage.getItem('loggedUser')).id
        await axios.delete(`${REST_SERVER_URL}/contactosUtiles/eliminar/${idTelefono}/${idLogueado}`)
    }

}

export const telefonoUtilService = new TelefonoUtilService()