import React, { useEffect, useState } from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import { Tabla, StyledTableRow, StyledTableCell } from '../components/Tabla';
import { usuarioService } from '../services/usuarioService';
import { Busqueda } from '../components/Busqueda'
import Button from '@material-ui/core/Button';


const useStyles = makeStyles ({
    root:{
        color: "white",
        background: "#159D74",
        padding: "10px 24px",
        borderRadius: 2,
        textTransform: "none"
    }
  });


export const BotonPrimario = ({tituloBoton, funcion}) =>{
    const classes = useStyles();


    return (
             <Button className={classes.root} variant="contained" onClick={ funcion }>
              {tituloBoton}
            </Button>
    )
}