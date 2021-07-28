import React, { useEffect, useState, useContext } from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import { StyledButtonPrimary, StyledButtonSecondary } from '../../components/Buttons'
import { useHistory, useParams, Prompt } from 'react-router-dom';
import { Link, TextField, MenuItem, Divider, Box } from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { reclamoService } from "../../services/reclamoService";
import { Historial } from '../../components/Historial'
import { Notas } from '../../components/Notas'
import { SnackbarComponent } from '../../components/Snackbar'
import { ModalComponent } from '../../components/Modal'
import { Chevron } from '../../assets/icons';
import update from 'immutability-helper';
import { Reclamo } from '../../domain/reclamo';
import { UserContext } from '../../hooks/UserContext';
import useSnack from '../../hooks/UseSnack';
import { ButtonBox, FormBox, LeftInputBox, RightFormBox, RightInputBox, RootBoxABM } from '../../components/Contenedores';
import { soloFecha } from '../../utils/formats';

const useStyles = makeStyles({
    link: {
        color: "#159D74",
        textAlign: "left",
        marginBottom: 20,
        cursor: "pointer",
    },
    linkModal: {
        color: "#159D74",
        textAlign: "left",
        marginLeft: 50,
        marginTop: 10,
        cursor: "pointer",
        fontWeight: 600
    },
    form: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: 30
    },
    inputs: {
        backgroundColor: "white",
        textAlign: "left"
    },
    contenedorInputDescripcion: {
        display: "flex",
        flexDirection: "column",
        marginBottom: 50,
        maxWidth: 1000,
    },
    span: {
        textAlign: "left",
        marginLeft: 10,
        marginBottom: 6,
        maxWidth: 600
    },
    botones: {
        display: "flex",
        marginTop: 10,
    },
    divider: {
        marginTop: 40
    },
    inputsDisabled: {
        textAlign: "left",
        marginLeft: 10
    },
    spanDisabled: {
        textAlign: "left",
        marginLeft: 10,
        marginBottom: 6,
        color: "grey"
    },
    botonesDisabled: {
        background: "rgba(0, 0, 0 ,10%)",
    },
    chevron: {
        fontSize: "12px",
        marginRight: 8
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: "white",
        boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.1)",
        borderRadius: "6px",
        padding: "0 30px 32px 32px"
    },
    nroReclamo: {
        fontSize: "15px",
        textAlign: "left",
        marginLeft: "10px",
        marginTop: "10px"
    },
    contenedorFecha: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    iconoFecha: {
        color: "grey",
        fontSize: 16,
        marginBottom: 6,
    },
    contenedorDescripcion: {
        width: "100%",
        display: "block"
    }
});

const estados = [
    {
        value: 'Resuelto',
        label: 'Resuelto',
    },
    {
        value: 'En proceso',
        label: 'En proceso',
    },
    {
        value: 'Pendiente de resolución',
        label: 'Pendiente de resolución',
    }
]

function getModalStyle() {
    const top = 50
    const left = 50

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

export const ABMCReclamo = ({ edicion, creacion }) => {
    const classes = useStyles();
    const [reclamo, setReclamo] = useState(new Reclamo())
    const [notas, setNotas] = useState([])
    const [estado, setEstado] = useState('')
    const [estadoOriginal, setEstadoOriginal] = useState('')
    const [asunto, setAsunto] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [campoEditado, setCampoEditado] = useState(false)
    const [cambiosGuardados, setCambiosGuardados] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const { openSnackbar, setOpenSnackbar, mensajeSnack, usarSnack, snackColor } = useSnack();
    const [modalStyle] = useState(getModalStyle);
    const { user, setUser } = useContext(UserContext);

    let history = useHistory()
    const params = useParams()

    const fetchReclamo = async () => {
        let unReclamo
        if (creacion) {
            unReclamo = new Reclamo()
            unReclamo.fecha = new Date()
            unReclamo.autor = { id: user.id }
        } else {
            unReclamo = await reclamoService.getById(params.id)
            setNotas(unReclamo.notas)
            setEstado(unReclamo.estado)
            setEstadoOriginal(unReclamo.estado)
            setAsunto(unReclamo.asunto)
            setMensaje(unReclamo.mensaje)
        }
        setReclamo(unReclamo)
    }

    const actualizarValor = (event) => {
        const newState = update(reclamo, {
            [event.target.id]: { $set: event.target.value }
        })
        setReclamo(newState)
        setCampoEditado(true)
    }

    const backToReclamos = () => {
        history.push("/reclamos")
    }

    const popupModal = () => {
        setOpenModal(true)
    }

    const handleChangeType = (event) => {
        setEstado(event.target.value);
        setCampoEditado(true)
    };

    useEffect(() => {
        fetchReclamo()
    }, [])

    const crearReclamo = async () => {
        try {
            if (validarReclamo()) {
                let nuevoReclamo = reclamo
                nuevoReclamo.autor = { id: user.id }
                nuevoReclamo.estado = { nombreEstado: 'Pendiente de resolución'}
                await reclamoService.create(nuevoReclamo)
                setCampoEditado(false)
                history.push("/reclamos", { openChildSnack: true, mensajeChild: "Reclamo creado correctamente." })
            } else {
                usarSnack("Campos obligatorios faltantes.", true)
            }
        } catch (error) {
            usarSnack(error.response.data, true)
        }
    }

    const modificarReclamo = async () => {
        try {
            let nuevoReclamo = reclamo
            nuevoReclamo.estado = {}
            nuevoReclamo.estado = { nombreEstado: estado }
            nuevoReclamo.autor = { id: nuevoReclamo.idAutor }
            nuevoReclamo.notas = notas
            await reclamoService.update(nuevoReclamo)
            setCambiosGuardados(true)
            setEstadoOriginal(estado)
            setCampoEditado(false)
            usarSnack("Reclamo modificado correctamente", false)
        } catch (error) {
            usarSnack(error.response.data, true)
        }
        setCambiosGuardados(false)
    }

    const eliminarReclamo = async () => {
        try {
            await reclamoService.delete(reclamo.id)
            history.push("/reclamos", { openChildSnack: true, mensajeChild: "Reclamo eliminado correctamente." })
        } catch (error) {
            usarSnack(error.response.data, true)
        }
    }

    const validarReclamo = () => {
        return reclamo.asunto && reclamo.mensaje
    }

    const mostrarPosiblesEstados = () => {
        if (user.esAdmin()) {
            return estados.filter(nombreEstado => {
                if (estadoOriginal === 'En proceso') {
                    return estadoOriginal === nombreEstado.value || nombreEstado.value === 'Resuelto'
                } else {
                    return estadoOriginal === nombreEstado.value || nombreEstado.value === 'En proceso'
                }
            })
        } else {
            return estados.filter(nombreEstado => estadoOriginal === nombreEstado.value)
        }
    }

    const cambioDeEstadoDesactivado = () => {        
        return creacion
            || estadoOriginal === 'Resuelto'
            || user.esInquilino()
            || user.esPropietario()
    }

    const bodyModal = (

        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">¿Estás seguro que querés eliminar este reclamo?</h2>
            <p id="simple-modal-description">Esta acción no se puede deshacer.</p>
            <Box display="flex" flexDirection="row" mt={4}>
                <StyledButtonPrimary onClick={eliminarReclamo}>Eliminar reclamo</StyledButtonPrimary>
                <Link className={classes.linkModal} onClick={() => setOpenModal(false)}>
                    Cancelar
                </Link>
            </Box>
        </div>
    )

    return (

        <RootBoxABM>
            <Prompt when={campoEditado} message={"Hay modificaciones sin guardar. ¿Desea salir de todas formas?"} />
            <FormBox>
                <Link className={classes.link} onClick={backToReclamos}>
                    <Chevron className={classes.chevron} />
                    Volver a reclamos
                </Link>
                {creacion &&
                    <Typography component="h2" variant="h5" className="tittle">
                        Nuevo reclamo
                    </Typography>
                }

                {!creacion && edicion &&
                    <Typography component="h2" variant="h5" className="tittle">
                        Modificar reclamo
                    </Typography>
                }

                <form className={classes.form} noValidate autoComplete="off">
                    <LeftInputBox>
                        <span className={classes.spanDisabled}>Nro de reclamo</span>
                        <span className={classes.nroReclamo}>{edicion ? reclamo.id : '-'}</span>
                    </LeftInputBox>

                    <RightInputBox>
                        <span className={classes.span} >Estado</span>
                        <TextField className={edicion ? classes.inputs : classes.inputsDisabled} id="estadoReclamo" select disabled={cambioDeEstadoDesactivado()} onChange={handleChangeType} value={estado || ''} label={creacion ? 'Pendiente de resolución' : ''} variant={creacion ? 'filled' : 'outlined'} >
                            {mostrarPosiblesEstados().map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </RightInputBox>

                    <LeftInputBox>
                        <span className={classes.spanDisabled}>Autor</span>
                        {creacion ? <span className={classes.span}>{user.nombre + " " + user.apellido}</span>
                            : <span className={classes.span}>{reclamo.nombreAutor}</span>}
                    </LeftInputBox>

                    <RightInputBox>
                        <span className={classes.spanDisabled}>Fecha</span>
                        <div className={classes.contenedorFecha}>
                            <span className={classes.span}>{edicion ? soloFecha(reclamo.fecha) : (new Date()).toLocaleDateString()}</span>
                            {edicion && <CalendarTodayIcon className={classes.iconoFecha}></CalendarTodayIcon>}
                        </div>
                    </RightInputBox>

                    <LeftInputBox>
                        <span className={classes.spanDisabled}>Asunto</span>
                        {edicion ? <span className={classes.span}>{reclamo.asunto}</span>
                            : <TextField className={classes.inputs} id="asunto" variant="outlined" value={reclamo.asunto || ''} onChange={(event) => actualizarValor(event)}></TextField>}
                    </LeftInputBox>

                </form>

                <div className={classes.contenedorDescripcion}>
                    <div className={classes.contenedorInputDescripcion}>
                        <span className={classes.spanDisabled}>Descripción</span>
                        {edicion ? <span className={classes.span}>{reclamo.mensaje}</span>
                            : <TextField className={classes.inputs} id="mensaje" name="mensaje" variant="outlined" value={reclamo.mensaje || ''} onChange={(event) => actualizarValor(event)}></TextField>}
                    </div>
                </div>

                {(edicion && !creacion) &&
                    <Notas notas={notas} setCampoEditado={setCampoEditado} update={setNotas} puedeAgregarNotas={reclamo.estado !== 'Resuelto' && (user.esAdmin() || user.id === reclamo.idAutor)}></Notas>
                }

            </FormBox>

            <RightFormBox>
                {creacion &&
                    <ButtonBox>
                        <StyledButtonPrimary className={classes.botones} onClick={crearReclamo}>Crear reclamo</StyledButtonPrimary>
                        <StyledButtonSecondary className={classes.botones} onClick={backToReclamos}>Cancelar</StyledButtonSecondary>
                    </ButtonBox>
                }
                {edicion && !creacion &&
                    <ButtonBox>
                        {campoEditado &&
                            <StyledButtonPrimary className={classes.botones} onClick={modificarReclamo}>Guardar cambios</StyledButtonPrimary>
                        }
                        {!campoEditado &&
                            <StyledButtonPrimary className={classes.botonesDisabled} disabled>Guardar cambios</StyledButtonPrimary>
                        }
                        <StyledButtonSecondary className={classes.botones} onClick={popupModal}>Eliminar reclamo</StyledButtonSecondary>
                    </ButtonBox>
                }
                <Divider className={classes.divider} />

                {edicion && !creacion &&
                    <Historial tipo="RECLAMO" id={params.id} update={cambiosGuardados} />
                }

            </RightFormBox>

            <SnackbarComponent snackColor={snackColor} openSnackbar={openSnackbar} mensajeSnack={mensajeSnack} handleCloseSnack={() => setOpenSnackbar(false)} />

            <ModalComponent openModal={openModal} bodyModal={bodyModal} handleCloseModal={() => setOpenModal(false)} />

        </RootBoxABM>

    )
}


