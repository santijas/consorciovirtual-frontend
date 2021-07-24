import axios from 'axios'
import { REST_SERVER_URL } from './configuration'
import { Usuario } from "../domain/usuario";

class UsuarioService {
    
    usuarioLogueado = new Usuario()

    usuarioAJson(usuarioJSON) {
        return Usuario.fromJson(usuarioJSON)
    }

    async getById(id){
        const usuarioJson = await axios.get(`${REST_SERVER_URL}/usuario/${id}`)
        return this.usuarioAJson(usuarioJson.data)
    }

    async getBySearch(palabraBuscada) {
        const listaJSON = await axios.get(`${REST_SERVER_URL}/usuarios`, {params:{ palabraBuscada }})
        return listaJSON.data
    }

    async create(user){
        await axios.put((`${REST_SERVER_URL}/usuario/crear`), user.toJSON())
        axios.post((`${REST_SERVER_URL}/enviarCorreo/usuarioNuevo`), user.toJSON())
    }

    async update(user){
        const idLogueado = JSON.parse(window.localStorage.getItem('loggedUser')).id
        await axios.put(`${REST_SERVER_URL}/usuario/modificar`, user.toJSON(), {params:  {idLogueado} })
    }

    async delete(id){
        const idLogueado = JSON.parse(window.localStorage.getItem('loggedUser')).id
        await axios.delete(`${REST_SERVER_URL}/usuario/eliminar/${id}`,  {params:  {idLogueado} })
    }

    //ENDPOINTS INQUILINOS
    async getInquilinos(palabraBuscada) {
        const listaJSON = await axios.get(`${REST_SERVER_URL}/inquilinos`, { params:{ palabraBuscada } } )
        console.log("listaJSON.data: ",listaJSON.data)
        return listaJSON.data
    }

    async getInquilinosDeUsuario(palabraBuscada, idPropietario) {
        const listaJSON = await axios.get(`${REST_SERVER_URL}/inquilinos/${idPropietario}`, { params:{ palabraBuscada } } )
        console.log("listaJSON.data: ",listaJSON.data)
        return listaJSON.data
    }
}

export const usuarioService = new UsuarioService()