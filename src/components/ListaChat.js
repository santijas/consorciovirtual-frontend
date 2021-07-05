
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles, Typography } from '@material-ui/core';
import { formatDate } from '../utils/formats'; 
import { chatService } from '../services/chatService';

const iDusuarioHardcodeado = 1

const useStyles = makeStyles ({
    root: {
        height: "50vh",
        backgroundColor: "rgb(232, 232, 232)",
        marginTop: "37px",
        display: "flex",
        flexDirection: "column-reverse",
        padding: "30px 10px",
      },
    mensajePropio: {

    },
    mensajeAjeno: {

    }
})

export const ListaChat = ({mensajesFiltrados}) => {
    const classes = useStyles();
    const [mensajes,setMensajes] = useState('')
    const [idUsuario,setIdUsuario] = useState('')

    const getMensajes = async () => {
        let listaMensajes = await chatService.getMensajes()
        console.log(listaMensajes)
        setMensajes(listaMensajes)
    }

    const mensajeBloque = (mensaje) => {
        
        return iDusuarioHardcodeado == mensaje.idEmisor? 
            <div>
                <div>{mensaje.mensaje}</div>
            </div>
        :    
            <div>
                <div>{mensaje.nombreEmisor}</div>
                <div>
                    <span>{mensaje.mensaje}</span>
                    <span>
                        <div>{mensaje.fechaHora.toLocaleString()}</div>
                    </span> 
                </div>
            </div>    
             
    } 
    
    useEffect( ()  =>  {
        getMensajes()
    })

    return (
        <div className={classes.root}>
            {/* { mensajes && mensajes.map( mensaje => mensajeBloque(mensaje))
            } */}
        </div>
    )
}