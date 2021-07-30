import { Box, Typography, Avatar, makeStyles } from '@material-ui/core';
import { registroModificacionService } from '../services/registroModificacionService';
import { avatarColours } from '../utils/avatarColours';
import React, { useEffect, useState } from 'react'

const useStyles = makeStyles((theme) => ({
    tittle: {
        textAlign: "left",
        marginTop: 20,
        [theme.breakpoints.down("sm")]: {
            display:"none"
          }
    },
    spanAvatar: {
        margin: "2px 0 0 10px",
        textAlign: "left",
        fontWeight: "normal",
        fontStyle: "normal",
        fontSize: "18px",
        color: "rgba(0, 0, 0, 0,8)"
    },
    spanFecha: {
        margin: "2px 0 0 10px",
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: "12px",
        display: "flex",
        color: "rgba(0, 0, 0, 0.56)",
        fontFamily:"ProximaNovaNormal"
    },
    contenedorHistorial: {
        maxHeight: 510,
        height: 510,
        overflowY: "scroll",
        [theme.breakpoints.down("sm")]: {
            display:"none"
          }
    },
    sinCambios:{
        color: "rgba(0, 0, 0, 0.56)",
        fontSize: "15px",
        fontFamily:"ProximaNovaNormal",
        textAlign:"center",
        margin: "2px 0 0 10px",
    },

}));

export const Historial = ({ tipo, id, update }) => {
    const classes = useStyles()
    const [registrosModificacion, setRegistrosModificacion] = useState([])

    useEffect( ()  =>  {
        const fetchRegistrosModificacion = async () => {
            setRegistrosModificacion(await registroModificacionService.getByTipoYId(tipo, id))
        }
       
        fetchRegistrosModificacion()
    },[tipo, id, update])



    const filterFirstLetters = (name) => {
        return name.match(/\b(\w)/g).join('')
    }

    return (
        <Box display="flex" flexDirection="column" ml={5}>
            <Typography component="h5" variant="h6" className={classes.tittle}>
                Historial de cambios
            </Typography>
            <Box className={classes.contenedorHistorial} display="flex" flexDirection="column" mt={5}>

                {registrosModificacion.length === 0 ? 
                <Box display="flex" mb={3} >
                    <span className={classes.sinCambios}>Sin modificaciones.</span>
                </Box>
                :
                registrosModificacion.map((registro) => {
                    return (
                        <Box display="flex" mb={3} key={registro.id}>
                            <Avatar style={{ backgroundColor: avatarColours(registro.usuarioModificador) }} className={classes.avatar}>{filterFirstLetters(registro.usuarioModificador)}</Avatar>
                            <Box display="flex" flexDirection="column">
                                <span className={classes.spanAvatar}>{registro.usuarioModificador}</span>
                                <span className={classes.spanFecha}>{registro.fechaHoraModificacion}</span>
                            </Box>
                        </Box>
                    )
                })}
            </Box>
        </Box>
    )
}

