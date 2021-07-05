
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles, Typography } from '@material-ui/core';
import { StyledButtonPrimary } from './Buttons';

const useStyles = makeStyles ({
    root: {
        display: 'flex',
        width: '100%',
        marginTop: "20px",
        // height: "40px",
        justifyContent: "space-between",
      },
    input: {
        width: "calc(100% - 190px)",
        borderRadius: "4px",
        border: "2px solid rgb(232, 232, 232)",
        padding: "12px",
        outline: "none",
        fontSize: "0.85rem"
    },
    buttonDisabled: {
        background: "rgba(0, 0, 0 ,10%)",
    }
})



export const EscrituraChat = () => {
    const classes = useStyles();
    const [mensaje,setMensaje] = useState('')

    const validarMensaje = () => {
        return mensaje.length > 0
    }

    return (
        <div className={classes.root}>
            <input className={classes.input} placeholder="Escribí tu mensaje" onChange={(event) => setMensaje(event.target.value)}></input>
            { validarMensaje() && <StyledButtonPrimary onClick="" >Enviar mensaje</StyledButtonPrimary>}
            { !validarMensaje() && <StyledButtonPrimary disabled className={classes.buttonDisabled}>Enviar mensaje</StyledButtonPrimary>}
        </div>
    )
}