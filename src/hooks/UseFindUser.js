import { useState, useEffect } from 'react';
import axios from 'axios';
import { Usuario } from '../domain/usuario';
import { usuarioService } from '../services/usuarioService';
import { REST_SERVER_URL } from '../services/configuration';


export default function useFindUser() {

    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const findUser = async () => {
            
            if (window.localStorage.getItem("loggedUser")) {
                const logued = JSON.parse(window.localStorage.getItem("loggedUser"))
                
                const correo = logued.correo
                const password = logued.password
                
                const parameters = {
                    params: {
                        correo,
                        password
                    }
                }
                
                return await axios.post(`${REST_SERVER_URL}/login`, null, parameters)
                .then((usuarioJson) => {
                    setUser(usuarioAJson(usuarioJson.data));
                    setLoading(false);
                    
                }).catch((err) => {
                    setLoading(false);
                }
                )
            }else{
                setLoading(false);
            }
            
        }
      
        findUser();
    }, []);

    const usuarioAJson = (usuarioJSON) => {
        return Usuario.fromJson(usuarioJSON)
    }

    return {
        user,
        setUser,
        isLoading
    }
}