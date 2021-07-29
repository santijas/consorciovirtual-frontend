import axios from 'axios'
import { MensajeChat, MensajeRequest } from '../domain/mensajeChat'
import { REST_SERVER_URL } from './configuration'
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'
import { usuarioService } from './usuarioService'

class ChatService {

    webSocket
    stompClient = null;
    connect(getMensajes) {

        this.webSocket = new WebSocket('ws://localhost:8080/chat')
        this.webSocket.onopen = (event) => {
            console.log("Open /chat")
        }

        this.webSocket.onmessage = async  (event) => {
            // const mensajes = JSON.parse(event.data);
            getMensajes("")
        };
      
        this.webSocket.onclose = (event) => {
            console.log('Close /chat');
        };  
    }

    connectUsuarioWS(getMensajesSinLeer) {

        this.webSocket = new WebSocket('ws://localhost:8080/cantidad-mensajes')
        this.webSocket.onopen = (event) => {
            console.log("Open /cantidad-mensajes")
            getMensajesSinLeer()
        }

        this.webSocket.onmessage = async  (event) => {
            // const mensaje = JSON.parse(event.data);
            getMensajesSinLeer()
        };
      
        this.webSocket.onclose = (event) => {
            console.log('Close /cantidad-mensajes')
        };  
    }

    sendMessage(mensaje){
        this.webSocket.send(JSON.stringify( {mensaje} ));
      }
    
    closeWebSocket() {
        this.webSocket.close();
    }

    async getMensajes(palabraBuscada){
        const mensajesJson = await axios.get(`${REST_SERVER_URL}/mensajes`,{ params:{ palabraBuscada } } )
        return mensajesJson.data.map(mensaje => MensajeChat.fromJson(mensaje))
    }

    async enviarMensaje(mensaje,usuarioId){
        const mensajeAEnviar = new MensajeRequest(usuarioId,mensaje)
        await axios.post(`${REST_SERVER_URL}/mensajes/send`, mensajeAEnviar  )
    }

    async getCantidadDeMensajes(userId){
        let cantidadMensajes = await axios.post(`${REST_SERVER_URL}/mensajes/cantidad/${userId}`  )
        console.log("cantidadMensajesSinLeer: ",cantidadMensajes.data)
        return cantidadMensajes.data
    }

    async sendRegistry(mensajeId,userId){
        console.log("ultimo mensaje leido: ",mensajeId)
        await axios.post(`${REST_SERVER_URL}/mensajes/registro/${userId}/${mensajeId}`  )
    }
}

export const chatService = new ChatService()