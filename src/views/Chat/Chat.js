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

const useStyles = makeStyles({

})

export const Chat = () => {
    const classes = useStyles();
    const [mensajes,setMensajes] = useState('')
    const {user, setUser} = useContext(UserContext);

    // const [conexion, setConexion] = useSate(true)


  const getMensajes = async () => {
    let listaMensajes = await chatService.getMensajes()
    console.log("SE CARGA LISTA DE MENSAJES")
    setMensajes(listaMensajes)
  }

  const enviarMensaje = async (mensaje) => {
    await chatService.enviarMensaje(mensaje, usuarioService.usuarioLogueado.id)

    //Se pone un delay ya que uno va por http y el otro por websocket
    setTimeout(() => chatService.sendMessage(mensaje), 500)
  }


  useEffect(() => {
    getMensajes()
    chatService.connect(getMensajes)

    return () => {
      chatService.closeWebSocket()
      console.log("WS DESCONECTADO")
    }
  }, [])


  return (

    <RootBox>
      <Typography component="h2" variant="h5" className="tittle">
        Chat
      </Typography>

      <SearchBox>
        <Busqueda holder="Buscá por mensaje" busqueda={""} />
      </SearchBox>
      <ListaChat listaDeMensajes={mensajes} />
      <EscrituraChat enviarMensaje={enviarMensaje} />

      {/* <SnackbarComponent snackColor={"#00A650"} openSnackbar={openSnackbar} mensajeSnack={mensajeSnack} handleCloseSnack={() => setOpenSnackbar(false)}/> */}

    </RootBox>
  )
}