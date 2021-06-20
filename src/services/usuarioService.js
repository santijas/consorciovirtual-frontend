import axios from 'axios'
import { REST_SERVER_URL } from './configuration'
import { Usuario } from "../domain/usuario";



class UsuarioService{
    
    usuarioLogueado = null

    usuarioAJson(usuarioJSON) {
        return Usuario.fromJson(usuarioJSON)
    }
    
    async loguearUsuario(login){     
        const usuarioJson = await axios.post(`${REST_SERVER_URL}/login`, login.toJSON())
        this.usuarioLogueado = this.usuarioAJson(usuarioJson.data)  
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
    }

    async update(user){
        await axios.put(`${REST_SERVER_URL}/usuario/modificar`, user.toJSON())
        this.usuarioLogueado = user
    }

    async delete(id){
        axios.put(`${REST_SERVER_URL}/usuario/eliminar/${id}`)
    }

    usuariosPrueba = [
        new Usuario(1, "Jorge", "Bilboa"),
        new Usuario(1, "Miguel", "Cervantes"),
        new Usuario(1, "Patricio", "Dalton"),
    ]
}

export const usuarioService = new UsuarioService()