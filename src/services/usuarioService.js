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

    async getAllUsers(palabraBuscada) {
        const listaJSON = await axios.get(`${REST_SERVER_URL}/usuarios`, {params:{ palabraBuscada }})
        return listaJSON.data
    }


    async createUser(user){
        console.log(user.toJSON())
        await axios.put((`${REST_SERVER_URL}/usuario/create`), user.toJSON())
    }

    async updateUser(user){
        await axios.put(`${REST_SERVER_URL}/usuario/modificar`, user.toJSON())
        this.usuarioLogueado = user
    }

    async deleteUser(id){
        return axios.delete(`${REST_SERVER_URL}/usuario/delete/${id}`)
    }

    usuariosPrueba = [
        new Usuario(1, "Jorge", "Bilboa"),
        new Usuario(1, "Miguel", "Cervantes"),
        new Usuario(1, "Patricio", "Dalton"),
    ]
}

export const usuarioService = new UsuarioService()