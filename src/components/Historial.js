import { Box, Typography, Avatar, makeStyles } from '@material-ui/core';
import { registroModificacionService } from '../services/registroModificacionService';
import {avatarColours} from '../utils/avatarColours';
import React, { useEffect, useState } from 'react'

const useStyles = makeStyles((theme) => ({
    tittle:{
        textAlign:"left",
        marginTop: 20
    },
    spanAvatar:{
        margin: "2px 0 0 10px",
        textAlign:"left",
        fontWeight: "normal",
        fontStyle: "normal",
        fontSize: "18px",
        color: "rgba(0, 0, 0, 0,8)"
    },
    spanFecha:{
        margin: "2px 0 0 10px",
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: "12px",
        display: "flex",
        color: "rgba(0, 0, 0, 0.56)"
    }
  }));

export const Historial = ({tipo, id, update}) => {
    const classes = useStyles()
    const [registrosModificacion, setRegistrosModificacion] = useState([])

    useEffect( ()  =>  {
        fetchRegistrosModificacion()
    },[update])

    const fetchRegistrosModificacion = async () => {
        setRegistrosModificacion(await registroModificacionService.getByTipoYId(tipo, id))
    }

    const filterFirstLetters = (name) => {
        return name.match(/\b(\w)/g).join('')
    } 

    return (
        <Box display="flex" flexDirection="column" ml={5}>
                    <Typography component="h5" variant="h6" className={classes.tittle}>
                        Historial de cambios
                    </Typography>
                    <Box display="flex" flexDirection="column" mt={5}>
                        {registrosModificacion.map((registro) => {return (
                            <Box display="flex" mb={3} key={registro.id}> 
                                <Avatar style={{backgroundColor: avatarColours(registro.usuarioModificador)} }  className={classes.avatar}>{filterFirstLetters(registro.usuarioModificador)}</Avatar>
                                <Box display="flex" flexDirection="column">
                                    <span className={classes.spanAvatar}>{registro.usuarioModificador}</span>
                                    <span className={classes.spanFecha}>{registro.fechaHoraModificacion}</span>
                                </Box>
                            </Box>
                         )})}
                    </Box>
                </Box>
    )
}

