import React, { useEffect, useState, useContext } from 'react'
import { Busqueda } from '../../components/Busqueda'
// import { StyledButtonPrimary } from '../../components/Buttons.js'
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles, Typography } from '@material-ui/core';
import { ListaChat } from '../../components/ListaChat.js';
import { EscrituraChat } from '../../components/EscrituraChat';
import { chatService } from '../../services/chatService';
import { usuarioService } from '../../services/usuarioService';
import { MensajeChat } from '../../domain/mensajeChat';
import { UserContext } from '../../hooks/UserContext'; 
import useSnack from '../../hooks/UseSnack';
import { RootBox, SearchBox } from '../../components/Contenedores';


export const Chat = () => {
    const [mensajes,setMensajes] = useState('')
    // const {user, setUser} = useContext(UserContext);
    const [textoBusqueda, setTextoBusqueda] = useState('')
    const { user } = useContext(UserContext)

    // const [conexion, setConexion] = useSate(true)


  const getMensajes = async (string) => {
    let listaMensajes = await chatService.getMensajes(string)
    console.log("SE CARGA LISTA DE MENSAJES")
    setMensajes(listaMensajes)
  }

  const enviarMensaje = async (mensaje) => {
    await chatService.enviarMensaje(mensaje, user.id)
    console.log( JSON.parse(window.localStorage.getItem('loggedUser')) )
    //Se pone un delay ya que uno va por http y el otro por websocket
    setTimeout(() => chatService.sendMessage(mensaje), 500)
  }


  useEffect(() => {
    getMensajes(textoBusqueda)
    chatService.connect(getMensajes)

    return () => {
      chatService.closeWebSocket()
      console.log("WS DESCONECTADO")
    }
  }, [textoBusqueda])


  return (

    <RootBox>
      <Typography component="h2" variant="h5" className="tittle">
        Chat
      </Typography>

      <SearchBox>
        <Busqueda holder="Buscá por mensaje" busqueda={setTextoBusqueda} />
      </SearchBox>
      <ListaChat listaDeMensajes={mensajes} userId={user.id}/>
      <EscrituraChat enviarMensaje={enviarMensaje} />

      {/* <SnackbarComponent snackColor={"#00A650"} openSnackbar={openSnackbar} mensajeSnack={mensajeSnack} handleCloseSnack={() => setOpenSnackbar(false)}/> */}

    </RootBox>
  )
}