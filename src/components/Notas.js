import { Typography, makeStyles } from '@material-ui/core';
import React, { useState, useEffect, useContext } from 'react'
import { TextField, List, ListItem, Button } from '@material-ui/core';
import { UserContext } from '../hooks/UserContext';
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';

const useStyles = makeStyles((theme) => ({
    tittle: {
        textAlign: "left",
        marginTop: 20
    },
    spanDisabled: {
        textAlign: "left",
        marginLeft: 10,
        marginBottom: 6,
        color: "grey"
    },
    contenedorNotas: {
        display: "block",
        textAlign: "left"
    },
    textoNoHayNotas: {
        textAlign: "left",
        marginLeft: 25,
        marginBottom: 6,
        marginTop: 10,
        color: "grey"
    },
    notas: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#e7e7e7",
        width: "100%",
        fontSize: "14px",
        marginBottom: 15, 
        marginLeft: 10,
        marginTop: 6
    },
    nota: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        cursor: "default"
    },
    inputNota: {
        width: "100%",
        marginRight: "16px"
    },
    autorNota: {
        color: "#159D74",
        fontWeight: 600,
        marginRight: 10
    },
    fechaNota: {
        color: "grey",
        display: "block"
    },
    infoNota: {
        marginLeft: 10
    },
    seccionDerecha: {
        display: "flex",
        alignItems: "center",
        gap: 8
    }
}));

export const Notas = ({ notas, setCampoEditado, update }) => {
    const classes = useStyles();
    const [textoNota, setTextoNota] = useState('')
    const [textoInvalido, setTextoInvalido] = useState(false)
    const {user, setUser} = useContext(UserContext);

    const agregarNota = () => {
        if (textoNota) {
            let nota = {
                autor: user.nombre,
                texto: textoNota
            }
            notas.push(nota)
            setCampoEditado(true)
            setTextoNota('')
            setTextoInvalido(false)
        } else {
            setTextoInvalido(true)
        }
     }

    const escribirNota = (event) => {
        setTextoNota(event.target.value);
    };

    const eliminarNota = (notaAEliminar) => {
        notas.splice(notas.indexOf(notaAEliminar), 1)
        update(notas.filter(nota => nota !== notaAEliminar))
        setCampoEditado(true)
    }

    return (
        <div className={classes.contenedorNotas}>
            <span className={classes.spanDisabled}>Notas</span>

            {notas.length === 0 &&
                <Typography className={classes.textoNoHayNotas} variant="body2">Aún no hay notas</Typography>
            }

            <List className={classes.notas} disablePadding>
                {notas.map((nota) => {
                    return <ListItem button className={classes.nota} divider>
                        <div>
                            <span className={classes.autorNota}>{nota.autor}: </span>
                            <span>{nota.texto}</span>
                        </div>
                        <div className={classes.seccionDerecha}>
                            <div>
                            <span className={classes.fechaNota}>{nota.fechaHora ? (new Date(nota.fechaHora)).toLocaleDateString() : new Date().toLocaleDateString()}</span>
                            <Typography variant="body2" align="right">{nota.fechaHora ? (new Date(nota.fechaHora)).toLocaleTimeString().replace(/(.*)\D\d+/, '$1') : new Date().toLocaleTimeString().replace(/(.*)\D\d+/, '$1')}</Typography>
                            </div> 
                            {user.tipo === 'Administrador_consorcio' && <Button variant="outlined" onClick={() => eliminarNota(nota)}><DeleteForeverSharpIcon color="error"></DeleteForeverSharpIcon></Button> }
                        </div>
                    </ListItem>
                })}
                {user.tipo === "Administrador_consorcio" &&
                    <ListItem button divider>
                        <TextField error={textoInvalido} className={classes.inputNota} size="small" id="nota" name="nota" label="Escriba una nota" value={textoNota} variant="outlined" onChange={escribirNota}></TextField>
                        <Button size="small" variant="outlined" onClick={agregarNota}>Agregar</Button>
                    </ListItem>
                }
            </List>
        </div>
    )
}

