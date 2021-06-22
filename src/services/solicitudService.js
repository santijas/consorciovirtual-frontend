import axios from 'axios'
import { SolicitudTecnica } from '../domain/solicitudTecnica'
import { REST_SERVER_URL } from './configuration'




class SolicitudService{

    solicitudAJson(solicitudJSON) {
        return SolicitudTecnica.fromJson(solicitudJSON)
    }

    async getAllSolicitudes() {
        const listaJSON = await axios.get(`${REST_SERVER_URL}/solicitudes`)
        return listaJSON.data
    }

    async getById(id) {
        const solicitud = await axios.get(`${REST_SERVER_URL}/solicitud/${id}`)
        return SolicitudTecnica.fromJson(solicitud.data)
    }

}

export const solicitudService = new SolicitudService()