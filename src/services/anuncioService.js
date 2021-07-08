import axios from 'axios'
import { Anuncio } from '../domain/anuncio'
import { REST_SERVER_URL } from './configuration'
import { usuarioService } from './usuarioService';

class AnuncioService {

    anuncioAJson(anuncioJSON) {
        return Anuncio.fromJson(anuncioJSON)
    }

    async getAllAnuncios(busqueda) {
        const listaJSON = await axios.get(`${REST_SERVER_URL}/anuncios/?palabraBuscada=${busqueda}`)
        return listaJSON.data
    }

    async getById(id) {
        const anuncio = await axios.get(`${REST_SERVER_URL}/anuncios/${id}`)
        return Anuncio.fromJson(anuncio.data)
    }

    async create(anuncio){
        const idAutor = usuarioService.usuarioLogueado.id
        await axios.put((`${REST_SERVER_URL}/anuncios/crear/${idAutor}`), anuncio.toJSON())
    }

    async update(anuncio){
        const idAutor = usuarioService.usuarioLogueado.id
        await axios.put(`${REST_SERVER_URL}/anuncios/modificar/${idAutor}`, anuncio.toJSON())
    }

    async delete(id){
        const idLogueado = usuarioService.usuarioLogueado.id
        await axios.put(`${REST_SERVER_URL}/anuncios/eliminar/${id}?idLogueado=${idLogueado}`)
    }

}

export const anuncioService = new AnuncioService()