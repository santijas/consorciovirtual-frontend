import axios from 'axios'
import { MensajeChat } from '../domain/mensajeChat'
import { REST_SERVER_URL } from './configuration'


class ChatService {

    mensajes = [
        new MensajeChat(1,"Pablo", "Es mía!!!", new Date()),
        new MensajeChat(2,"Santiago", "Hola vecinos cómo andan?", new Date()),
    ]

    getMensajes(){
        return this.mensajes
    }
}

export const chatService = new ChatService()