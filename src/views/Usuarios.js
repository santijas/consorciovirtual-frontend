import React, { useEffect, useState } from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import { Tabla, StyledTableRow, StyledTableCell } from '../components/Tabla';
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

const ColumnasCustom = (dato) => <StyledTableRow key={dato.id}>
  <StyledTableCell component="th" scope="row">{dato.nombre +" "+ dato.apellido}</StyledTableCell>
  <StyledTableCell component="th" scope="row">{dato.correo}</StyledTableCell>
  <StyledTableCell component="th" scope="row">{dato.dni}</StyledTableCell>
  <StyledTableCell component="th" scope="row">Modificado hace {Math.floor(Math.random() * 10)} horas</StyledTableCell>
  <StyledTableCell component="th" scope="row">Propietario</StyledTableCell>
</StyledTableRow>

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
            <Tabla datos={usuarios} headers={headers} ColumnasCustom={ColumnasCustom}/>
         </div>

    )
}
