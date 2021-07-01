import axios from 'axios'
import { SolicitudTecnica } from '../domain/solicitudTecnica'
import { REST_SERVER_URL } from './configuration'
class SolicitudService {

    solicitudAJson(solicitudJSON) {
        return SolicitudTecnica.fromJson(solicitudJSON)
    }

    async getAllSolicitudes(busqueda) {
        const listaJSON = await axios.get(`${REST_SERVER_URL}/solicitudes/?palabraBuscada=${busqueda}`)
        return listaJSON.data
    }

    async getById(id) {
        const solicitud = await axios.get(`${REST_SERVER_URL}/solicitud/${id}`)
        return SolicitudTecnica.fromJson(solicitud.data)
    }

    async create(solicitud){
        await axios.put((`${REST_SERVER_URL}/solicitud/crear`), solicitud.toJSON())
    }

    async update(solicitud){
        await axios.put(`${REST_SERVER_URL}/solicitud/modificar`, solicitud.toJSON())
    }

    async delete(id){
        axios.put(`${REST_SERVER_URL}/solicitud/eliminar/${id}`)
    }

}

export const solicitudService = new SolicitudService()