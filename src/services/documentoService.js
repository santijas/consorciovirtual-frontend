import axios from 'axios'
import { Documento } from '../domain/documento'
import { REST_SERVER_URL } from './configuration'

class DocumentoService{

    async getBySearch(palabraBuscada) {
        const listaJSON = await axios.get(`${REST_SERVER_URL}/documentos`, {params:{ palabraBuscada }})
        return listaJSON.data
    }

    async getById(id){
        const documentoJson = await axios.get(`${REST_SERVER_URL}/documentos/${id}`)
        return this.documentoAJson(documentoJson.data)
    }

    async getByIdParaABM(id){
        const documentoJson = await axios.get(`${REST_SERVER_URL}/documentos/paraABM/${id}`)
        return this.documentoAJson(documentoJson.data)
    }

    documentoAJson(JSON) {
        return Documento.fromJson(JSON)
    }

    async create(nuevoDocumento){
        const idLogueado = JSON.parse(window.localStorage.getItem('loggedUser')).id
        nuevoDocumento.type = "documento"
        nuevoDocumento.enlaceDeDescarga = this.darFormatoDeEnlaceDeDescarga(nuevoDocumento.enlaceDeDescarga)
        await axios.post((`${REST_SERVER_URL}/documentos/create/${idLogueado}`), nuevoDocumento.toJSON())
    }

    async update(nuevoDocumento){
        const idLogueado = JSON.parse(window.localStorage.getItem('loggedUser')).id
        nuevoDocumento.enlaceDeDescarga = this.darFormatoDeEnlaceDeDescarga(nuevoDocumento.enlaceDeDescarga)
        await axios.put((`${REST_SERVER_URL}/documentos/modificar/${idLogueado}`), nuevoDocumento.toJSON())
    }

    async delete(idDocumento){
        const idLogueado = JSON.parse(window.localStorage.getItem('loggedUser')).id
        await axios.delete(`${REST_SERVER_URL}/documentos/eliminar/${idDocumento}/${idLogueado}`)
    }

    darFormatoDeEnlaceDeDescarga(enlace){
        let enlaceFormateado
        if(enlace.includes("/")){
            enlaceFormateado = enlace;
        }else{
            enlaceFormateado = `archivos/documentosyfacturas/${enlace}`
        }
        return enlaceFormateado;
    }

}

export const documentoService = new DocumentoService()