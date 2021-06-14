import React, { useEffect, useState } from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import { Tabla, StyledTableRow, StyledTableCell } from '../components/Tabla';
import { usuarioService } from '../services/usuarioService';
import { Busqueda } from '../components/Busqueda'
import { BotonPrimario } from '../components/BotonPrimario'
import { useHistory } from 'react-router-dom';
import { Usuario } from '../domain/usuario';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles ({
    root: {
      display: 'flex',
      marginLeft: 300,
      flexDirection: "row",
      height: "100%"
    },
    tittle:{
        textAlign: "left",
    },
    form:{
        paddingTop:30,
        display:"flex",
        width: "70%",
    },
    buttonLog:{
        paddingTop:30,
        display:"flex",
        backgroundColor: "white",
        height: "100%",
        width: "30%"
    }
  });



export const AltaUsuario = () =>{
    const classes = useStyles();
    const [usuario, setUsuario] = useState([])
    let history = useHistory()

    const fetchUsuario = async () =>{
        let usuario = new Usuario()
        setUsuario(usuario)
    }

    
    useEffect( ()  =>  {
        fetchUsuario()
    },[])

    return (
        <div className={classes.root} >
            <div className={classes.form}>
                MAN
            </div>
            <div className={classes.buttonLog}>
                QUE
            </div>
            <Box heigth="75%">Buena</Box>
         </div>

    )
}
