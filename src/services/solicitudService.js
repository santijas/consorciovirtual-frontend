import axios from 'axios'
import { SolicitudTecnica } from '../domain/solicitudTecnica'
import { REST_SERVER_URL } from './configuration'

class SolicitudService {

    solicitudAJson(solicitudJSON) {
        return SolicitudTecnica.fromJson(solicitudJSON)
    }

    async getAllSolicitudes(busqueda) {
        const idLogueado = JSON.parse(window.localStorage.getItem('loggedUser')).id
        const listaJSON = await axios.get(`${REST_SERVER_URL}/solicitudes/?palabraBuscada=${busqueda}`, {params:  {idLogueado} })
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
        const idLogueado = JSON.parse(window.localStorage.getItem('loggedUser')).id
        await axios.put(`${REST_SERVER_URL}/solicitud/modificar`, solicitud.toJSON(), {params:  {idLogueado} })
    }

    async delete(id){
        await axios.put(`${REST_SERVER_URL}/solicitud/eliminar/${id}`)
    }

    mandarCorreoNuevaNota(id){
        const idLogueado = JSON.parse(window.localStorage.getItem('loggedUser')).id
        axios.post(`${REST_SERVER_URL}/enviarCorreo/notaEnSolicitud/${id}/${idLogueado}`)
    }

}

export const solicitudService = new SolicitudService()