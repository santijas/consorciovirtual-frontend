import React from 'react'
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles ({
    root:{
        color: "#BB0E0E",
        background: "rgba(187, 14 ,14 ,15%)",
        padding: "10px 24px",
        borderRadius: 2,
        textTransform: "none"
    }
  });


export const BotonSecundario = ({tituloBoton, funcion, style}) =>{
    const classes = useStyles();


    return (
             <Button style={style} className={classes.root} variant="contained" onClick={ funcion }>
              {tituloBoton}
            </Button>
    )
}