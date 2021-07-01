import axios from 'axios'
import { Anuncio } from '../domain/anuncio'
import { REST_SERVER_URL } from './configuration'

class AnuncioService {

    anuncioAJson(anuncioJSON) {
        return Anuncio.fromJson(anuncioJSON)
    }

    async getAllAnuncios(busqueda) {
        const listaJSON = await axios.get(`${REST_SERVER_URL}/anuncios/?palabraBuscada=${busqueda}`)
        return listaJSON.data
    }

    async getById(id) {
        const anuncio = await axios.get(`${REST_SERVER_URL}/anuncio/${id}`)
        return Anuncio.fromJson(anuncio.data)
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

export const anuncioService = new AnuncioService()