
import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles, Typography } from '@material-ui/core';
import { horaYMinutos, soloFecha } from '../utils/formats'; 
import { usuarioService } from '../services/usuarioService'


const useStyles = makeStyles ({
    root: {
        height: "50vh",
        backgroundColor: "rgb(232, 232, 232)",
        marginTop: "37px",
        display: "flex",
        flexDirection: "column-reverse",
        padding: "30px 20px",
        overflow: "auto",
        //Estos comandos son para que no se muestren la barra del overflow.
        scrollbarWidth: "none",         //En Firefox
        msOverflowStyle: "none",        // En Edge
            "&::-webkit-scrollbar": {   // En Chrome
                display: "none",
            },
      },
    mensajePropio: {
        display: "flex",
        flexDirection: "row-reverse",
        padding: "10px",
        fontFamily:"ProximaNovaNormal"
    },
    mensajePropioInterno: {
        backgroundColor: "#159D74",
        padding: "13px 16px",
        borderRadius: "8px 8px 0 8px",
        marginLeft: "10px",
        color: "white",
        fontFamily:"ProximaNovaNormal"
    },
    mensajeAjeno: {
        padding: "10px",
        fontFamily:"ProximaNovaNormal"
        
    },
    mensajeAjenoInterno: {
        display: "flex",
    },
    mensajeAjenoNombre:{
        color: "#159D74",
        fontWeight: "bold",
        textAlign: "start",
        marginBottom: "8px"
    },
    mensajeAjenoMensaje:{
        backgroundColor: "white",
        padding: "13px 16px",
        borderRadius: "0 8px 8px 8px",
        marginRight: "10px",
        fontFamily:"ProximaNovaNormal"
    },
    mensajeAjenoFechaHora: {
        fontSize: "0.9rem",
        paddingTop: "3px",
        color: "grey",
        fontFamily:"ProximaNovaNormal"
    },
    mensajeAjenoHora: {
        fontWeight: "bold",
        fontFamily:"ProximaNovaNormal"
    },

})

export const ListaChat = ({listaDeMensajes,userId}) => {
    const classes = useStyles();
    const [mensajes,setMensajes] = useState('')

    const getMensajes = async () => {
        setMensajes(listaDeMensajes)
    }




    const mensajeBloque = (mensaje) => {
        //SE TIENE QUE LIGAR CON EL ID DE USUARIO POSTA
        return userId === mensaje.idEmisor? 
            <div className={classes.mensajePropio} key={mensaje.id}>
                <span className={classes.mensajePropioInterno}>{mensaje.mensaje}</span>
                <span className={classes.mensajeAjenoFechaHora}>
                    <div>{soloFecha(mensaje.fechaYHora)}</div>
                    <div className={classes.mensajeAjenoHora}>{horaYMinutos(mensaje.fechaYHora)} hs</div>
                </span>
            </div>
        :    
            <div className={classes.mensajeAjeno} key={mensaje.id}>
                <div className={classes.mensajeAjenoNombre}>{mensaje.nombreEmisor}</div>
                <div className={classes.mensajeAjenoInterno}>
                    <span className={classes.mensajeAjenoMensaje}>{mensaje.mensaje}</span>
                    <span className={classes.mensajeAjenoFechaHora}>
                        <div>{soloFecha(mensaje.fechaYHora)}</div>
                        <div className={classes.mensajeAjenoHora}>{horaYMinutos(mensaje.fechaYHora)} hs</div>
                    </span> 
                </div>
            </div>       
    } 
    
    useEffect( ()  =>  {
        getMensajes()
    },)

    return (
        <div className={classes.root}>
            { mensajes && mensajes.map( mensaje => mensajeBloque(mensaje))
            }
        </div>
    )
}