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
         
        // var socket = new SockJS('http://localhost:8080/ws-chat');
        // let stompClient = Stomp.over(socket);
        // stompClient.connect({}, function (frame) {
        //     console.log('CONECTADO: ' + frame);
        //     stompClient.subscribe('/topic/mensajes', function (string) {
        //        console.log(JSON.parse(string.body) );
        //     });
        // });

        this.webSocket = new WebSocket('ws://localhost:8080/chat')
        this.webSocket.onopen = (event) => {
            console.log("CONECTADO POR WS")
        }

        this.webSocket.onmessage = async  (event) => {
            const mensajes = JSON.parse(event.data);
            getMensajes()
        };
      
        this.webSocket.onclose = (event) => {
            console.log('Close: ', event);
        };  
    }

    sendMessage(mensaje){
        this.webSocket.send(JSON.stringify( {mensaje} ));
      }
    
    closeWebSocket() {
        this.webSocket.close();
    }

    async getMensajes(){
        const mensajesJson = await axios.get(`${REST_SERVER_URL}/mensajes`)
        return mensajesJson.data.map(mensaje => MensajeChat.fromJson(mensaje))
    }

    async enviarMensaje(mensaje,usuarioId){
        const mensajeAEnviar = new MensajeRequest(usuarioId,mensaje)
        await axios.post(`${REST_SERVER_URL}/mensajes/send`, mensajeAEnviar  )
        console.log("MENSAJE ENVIADO")
    }
}

export const chatService = new ChatService()