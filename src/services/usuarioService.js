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

    async getUser(id){
        const usuarioJson = await axios.get(`${REST_SERVER_URL}/usuario/${id}`)
        return this.usuarioAJson(usuarioJson.data)
    }

    async getAllUsers() {
        const listaUsuariosJSON = await axios.get(`${REST_SERVER_URL}/usuarios`)
        return listaUsuariosJSON.data
    }

}

export const usuarioService = new UsuarioService()