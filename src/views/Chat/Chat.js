import React, { useEffect, useState } from 'react'
import { Busqueda } from '../../components/Busqueda'
// import { StyledButtonPrimary } from '../../components/Buttons.js'
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles, Typography } from '@material-ui/core';
import { ListaChat } from '../../components/ListaChat.js';
import { EscrituraChat } from '../../components/EscrituraChat';

const useStyles = makeStyles ({
    root: {
        display: 'flex',
        marginLeft: 300,
        marginTop: 30,
        marginRight: 50,
        flexDirection: "column"
      },
      tittle:{
          textAlign: "left",
      },
      contenedorChat:{
        display: "flex",
        justifyContent: "space-between",
        marginTop: 20
      },
})

export const Chat = () => {
    
    const classes = useStyles();
    const [openSnackbar, setOpenSnackbar] = useState('')
    const [mensajeSnack, setMensajeSnack] = useState('')

    return (
      
      <div className={classes.root} >
        <Typography component="h2" variant="h5" className={classes.tittle}>
          Chat
        </Typography>
        <div className={classes.contenedorChat}> 
            <Busqueda holder="Buscá por mensaje" busqueda={""} />
        </div>
        <ListaChat/>
        <EscrituraChat/>
      
        {/* <SnackbarComponent snackColor={"#00A650"} openSnackbar={openSnackbar} mensajeSnack={mensajeSnack} handleCloseSnack={() => setOpenSnackbar(false)}/> */}
          
      </div>
    )
}