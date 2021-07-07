import axios from 'axios'
import { REST_SERVER_URL } from './configuration'
import { Usuario } from "../domain/usuario";



class UsuarioService {
    
    usuarioLogueado = new Usuario()

    usuarioAJson(usuarioJSON) {
        return Usuario.fromJson(usuarioJSON)
    }
    
    async loguearUsuario(usuario){     
        const usuarioJson = await axios.post(`${REST_SERVER_URL}/login`, usuario.toJSON())
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
        const idLogueado = this.usuarioLogueado.id
        await axios.put(`${REST_SERVER_URL}/usuario/modificar`, user.toJSON(), {params:  {idLogueado} })
    }

    async delete(id){
        const idLogueado = this.usuarioLogueado.id
        await axios.delete(`${REST_SERVER_URL}/usuario/eliminar/${id}`,  {params:  {idLogueado} })
    }
}

export const usuarioService = new UsuarioService()