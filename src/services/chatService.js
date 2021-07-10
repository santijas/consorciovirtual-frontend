import axios from 'axios'
import { MensajeChat } from '../domain/mensajeChat'
import { REST_SERVER_URL } from './configuration'
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'

class ChatService {

    // sockjs = new SockJS('/ws-chat');
    webSocket
    stompClient = null;
    connect() {
         
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

        this.webSocket.onmessage = (event) => {
            const mensajes = JSON.parse(event.data);
            console.log("SE RECIBE: ", mensajes)
        };
      
        this.webSocket.onclose = (event) => {
            console.log('Close: ', event);
        };  
    }

    sendMessage(mensaje){
        this.webSocket.send(JSON.stringify(mensaje));
      }
    
    closeWebSocket() {
        this.webSocket.close();
    }

    async getMensajes(){
        const mensajesJson = await axios.get(`${REST_SERVER_URL}/mensajes`)
        return mensajesJson.data.map(mensaje => MensajeChat.fromJson(mensaje))
    }

}

export const chatService = new ChatService()