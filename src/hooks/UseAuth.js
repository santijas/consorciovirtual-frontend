import { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import { Usuario } from '../domain/usuario';
import { usuarioService } from '../services/usuarioService';
import { REST_SERVER_URL } from '../services/configuration';


export default function useAuth() {
    const { setUser } = useContext(UserContext);
    const [error, setError] = useState(null);

    const usuarioAJson = (usuarioJSON) => {
        return Usuario.fromJson(usuarioJSON)
    }

    const loginUser = async (correo, password) => {

        const parameters = {
            params: {
                correo,
                password
            }
        }

        const login = await axios.post(`${REST_SERVER_URL}/login`, null, parameters)
            .then((usuarioJson) => {

                const usuario = usuarioAJson(usuarioJson.data)
                setUser(usuario)
                saveLoguedStorage(correo, password, usuario.id)
                return usuario

            }).catch((err) => {
                setError(err.response.data);
            }
            )
        return login
    }

    const saveLoguedStorage = (correo, password, id) => {
        const user = { correo, password, id }
        window.localStorage.setItem('loggedUser', JSON.stringify(user))
    }


    return {
        loginUser,
        error
    }
}