import React, { useState } from 'react'
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';



const useStyles = makeStyles({
    
    paginador: {
        display: "flex",
        marginTop: "30px",
        position: "relative",
        width: "130px",
        height: "130px"
      },
      
      paginador_pagina: {

        position: "absolute",
        right: "calc(50% - 18px)",
        fontSize: "1.3rem",
        fontFamily: 'Oswald',
        padding: "4px 12px",
        borderRadius: "25px",
        fontWeight: "bold"
      },
      
      paginador_boton_siguiente: {
        position: "absolute",
        right: 0
      },
      
      paginador_boton_formato: {
        backgroundColor: "transparent",
          border: "2px solid",
          borderRadius: "5px",
          padding: "10px"
      }
  });


export const Paginador = ({posicionInicial, cantidadAMostrar, cantidadTotal, setPosicionInicial}) => {

    const [numeroDePagina, setNumeroDePagina] = useState(1)
    const classes = useStyles()

    const paginaAnterior = () => {
        setPosicionInicial(posicionInicial - cantidadAMostrar)
        let numeroDePaginaAnterior = numeroDePagina - 1
        setNumeroDePagina(numeroDePaginaAnterior)
    }

    const paginaSiguiente = () => {
        setPosicionInicial(posicionInicial + cantidadAMostrar)
        let numeroDePaginaSiguiente = numeroDePagina + 1
        setNumeroDePagina(numeroDePaginaSiguiente)
    }

    const cantidadDePaginas = () => {
        return Math.ceil(cantidadTotal/cantidadAMostrar)
    }

    const paginaInicial = () => {
        return numeroDePagina === 1
    }

    const paginaFinal = () => {
        return cantidadDePaginas() === numeroDePagina
    }

    const paginaUnica = () => {
        return cantidadDePaginas() === 1
    }

    

    return (
        <div className={classes.paginador}>
            { !paginaInicial() && 
            <button className={classes.paginador_boton_siguiente} onClick={() => paginaAnterior()} >
                Anterior
            </button> }
            
            { <div className={classes.paginador_pagina}>{numeroDePagina}</div> }
            
            { !paginaFinal() && 
            <button className={classes.paginador_boton_siguiente} onClick={() => paginaSiguiente()}>
                Siguiente
            </button> }
        </div>
    )
}
