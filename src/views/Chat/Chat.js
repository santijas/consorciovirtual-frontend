import React, { useEffect, useState, useContext } from 'react'
import { Busqueda } from '../../components/Busqueda'
import {  Typography } from '@material-ui/core';
import { ListaChat } from '../../components/ListaChat.js';
import { EscrituraChat } from '../../components/EscrituraChat';
import { chatService } from '../../services/chatService';
import { UserContext } from '../../hooks/UserContext'; 
import { RootBox, SearchBox } from '../../components/Contenedores';
import NavBar from '../../components/NavBar';


export const Chat = () => {
    const [mensajes,setMensajes] = useState('')
    const [textoBusqueda, setTextoBusqueda] = useState('')
    const { user } = useContext(UserContext)

  const getMensajes = async (string) => {
    let listaMensajes = await chatService.getMensajes(string)
    setMensajes(listaMensajes)  
  }

  const enviarMensaje = async (mensaje) => {
    await chatService.enviarMensaje(mensaje, user.id)
    setTimeout(() => chatService.sendMessage(mensaje), 500)
  }

  const onReturn = () => {
    chatService.closeWebSocket()
  }

  useEffect(() => {
    getMensajes(textoBusqueda)
    chatService.connect(getMensajes)
    return () => {
      onReturn()
    }
  }, [textoBusqueda])

  useEffect( () => {
    return () => {
      if (mensajes) chatService.sendRegistry(mensajes[0]?.id,user?.id)
    }
  })

  return (

    <RootBox>
      <Typography component="h2" variant="h5" className="tittle">
        Chat
      </Typography>

      <SearchBox>
        <Busqueda holder="Buscá por mensaje" busqueda={setTextoBusqueda} />
      </SearchBox>
      <ListaChat listaDeMensajes={mensajes} userId={user?.id}/>
      <EscrituraChat enviarMensaje={enviarMensaje} />

      {/* <SnackbarComponent snackColor={"#00A650"} openSnackbar={openSnackbar} mensajeSnack={mensajeSnack} handleCloseSnack={() => setOpenSnackbar(false)}/> */}

    </RootBox>
  )
}