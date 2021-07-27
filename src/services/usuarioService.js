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
        let respuesta = await axios.put((`${REST_SERVER_URL}/usuario/crear`), user.toJSON())
        console.log(respuesta)
        axios.post((`${REST_SERVER_URL}/enviarCorreo/usuarioNuevo`), user.toJSON())
    }

    async update(user){
        const idLogueado = JSON.parse(window.localStorage.getItem('loggedUser')).id
        await axios.put(`${REST_SERVER_URL}/usuario/modificar`, user.toJSON(), {params:  {idLogueado} })
    }

    async updatePassword(correo, password, newPassword){
        const parameters = {
            params: {
                correo,
                password,
                newPassword
            }
        }
        console.log(parameters)
        console.log("ANTES DEL ENDPOINT")
        await axios.put(`${REST_SERVER_URL}/usuario/modificarContrasenia`, null, parameters)
        console.log("DESPUÉS DEL ENDPOINT")
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

    async createInquilino(inquilino, deptoId){
        const response = await axios.put((`${REST_SERVER_URL}/inquilino/crear/${deptoId}`), inquilino.toJSON())
        console.log(response)
        axios.post((`${REST_SERVER_URL}/enviarCorreo/usuarioNuevo`), inquilino.toJSON())
        
    }

    async getInquilino(inquilinoId){
        const response = await axios.get(`${REST_SERVER_URL}/inquilino/${inquilinoId}` )
        return response.data
    }
}

export const usuarioService = new UsuarioService()