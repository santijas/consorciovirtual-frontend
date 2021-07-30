import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react'

const useStyles = makeStyles((theme) =>({
    inputIcono: {
        position: "relative",
        right: 28,
        verticalAlign: "middle",
        cursor: "pointer"
    },
    inputBusqueda: {
        display: "flex",
        height: 48,
        width: 576,
        padding: 0,
        borderRadius: 6,
        boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
        border: "1px solid rgba(0, 0, 0, 0.25)",
        alignSelf: "stretch",
        background: "#FFFFFF",
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M14.2238 13.3752C15.341 12.0645 16.0153 10.3649 16.0153 8.50766C16.0153 4.36129 12.654 1 8.50766 1C4.36129 1 1 4.36129 1 8.50766C1 12.654 4.36129 16.0153 8.50766 16.0153C10.3649 16.0153 12.0645 15.341 13.3752 14.2238L17.9528 18.8013L18.8013 17.9528L14.2238 13.3752ZM8.50766 14.8153C5.02403 14.8153 2.2 11.9913 2.2 8.50766C2.2 5.02403 5.02403 2.2 8.50766 2.2C11.9913 2.2 14.8153 5.02403 14.8153 8.50766C14.8153 11.9913 11.9913 14.8153 8.50766 14.8153Z' fill='black' fill-opacity='0.8'/%3E%3C/svg%3E%0A")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "2%",
        paddingLeft: 40,
        '&:focus': {
            outline:"none",
            border: "1px solid rgba(0, 0, 0, 0.50)"
         },
         [theme.breakpoints.down("sm")]: {
            width: 380
          },

          '@media (max-width: 1000px)': {
            width: '100%',
            }
    },
    contenedorBusqueda: {

        

    }
}));

export const Busqueda = ({ busqueda, holder }) => {
    const [textoIngresado, setTextoIngresado] = useState('')
    const classes = useStyles();

    const handleChange = (value) => {
        setTextoIngresado(value)
    }

    return (
        <div className={classes.contenedorBusqueda}>
            <input className={classes.inputBusqueda} placeholder={holder} value={textoIngresado} onChange={(event) => handleChange(event.target.value)}  
             onKeyDown={(e) => {
                if (e.key === "Enter") {
                    busqueda(textoIngresado)
                }}}
            />
        </div>
    )
}
