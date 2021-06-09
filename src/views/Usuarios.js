import React, { useEffect, useState } from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import { Tabla } from '../components/Tabla';
import { usuarioService } from '../services/usuarioService';


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
    }

  });

const headers = ["Nombre y apellido", "E-mail", "DNI", "Actividad", "Tipo de Cuenta"]

export const Usuarios = () =>{
    const classes = useStyles();
    const [usuarios, setUsuarios] = useState([])


    const fetchAllUsers = async (textoBusqueda) =>{
      const usuariosEncontrados = await usuarioService.getAllUsers()
      setUsuarios(usuariosEncontrados)
    }

    useEffect( ()  =>  {
      fetchAllUsers("")
    },[])

    return (
        <div className={classes.root} >
           <Typography component="h2" variant="h5" className={classes.tittle}>
             Usuarios
           </Typography>
            <Tabla datos={usuarios} headers={headers} />
         </div>

    )
}

