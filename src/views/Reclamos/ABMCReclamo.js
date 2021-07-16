import React, { useEffect, useState, useContext } from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import { StyledButtonPrimary, StyledButtonSecondary } from '../../components/Buttons'
import { useHistory, useParams } from 'react-router-dom';
import { Link, TextField, MenuItem, Divider, Box } from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { reclamoService } from "../../services/reclamoService";
import { usuarioService } from "../../services/usuarioService";
import { Historial } from '../../components/Historial'
import { Notas } from '../../components/Notas'
import { SnackbarComponent } from '../../components/Snackbar'
import { ModalComponent } from '../../components/Modal'
import { Chevron } from '../../assets/icons';
import update from 'immutability-helper';
import { Reclamo } from '../../domain/reclamo';
import { UserContext } from '../../hooks/UserContext';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        marginLeft: 300,
        flexDirection: "row",
        height: "100%",
        boxSizing: "unset"
    },
    tittle: {
        textAlign: "left",
    },
    contenedorForm: {
        paddingTop: 30,
        display: "flex",
        width: "100%",
        flexDirection: "column",
        paddingRight: 50
    },
    buttonLog: {
        paddingTop: 30,
        display: "flex",
        backgroundColor: "white",
        height: "100%",
        width: "600px",
        flexDirection: "column"
    },
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
    contenedorInput: {
        display: "flex",
        flexDirection: "column",
        flex: "50%",
        maxWidth: 400,
        marginBottom: 50,
    },
    contenedorInputDerecha: {
        display: "flex",
        flexDirection: "column",
        flex: "50%",
        maxWidth: 400,
        marginBottom: 50,
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
    contenedorBotones: {
        display: "flex",
        flexDirection: "column",
        margin: "10px 50px"
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

const estadosDeReclamo = [
    {
        value: 'Pendiente',
        label: 'Pendiente',
    },
    {
        value: 'Aprobado',
        label: 'Aprobado',
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
    const [asunto, setAsunto] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [campoEditado, setCampoEditado] = useState(false)
    const [cambiosGuardados, setCambiosGuardados] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [mensajeSnack, setMensajeSnack] = useState()
    const [snackColor, setSnackColor] = useState()
    const [modalStyle] = useState(getModalStyle);
    const {user, setUser} = useContext(UserContext);

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
                nuevoReclamo.estado = { id: 1 }
                await reclamoService.create(nuevoReclamo)
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
            nuevoReclamo.estado.nombreEstado = estado
            nuevoReclamo.estado.id = (estado === 'Pendiente') ? 1 : 2
            nuevoReclamo.autor = { id: nuevoReclamo.idAutor }
            await reclamoService.update(nuevoReclamo)
            setCambiosGuardados(true)
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

    const usarSnack = (mensaje, esError) => {
        if (esError) {
            setSnackColor("#F23D4F")
        } else {
            setSnackColor("#00A650")
        }
        setMensajeSnack(mensaje)
        setOpenSnackbar(true)
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

        <div className={classes.root} >
            <div className={classes.contenedorForm}>
                <Link className={classes.link} onClick={backToReclamos}>
                    <Chevron className={classes.chevron} />
                    Volver a reclamos
                </Link>
                {creacion &&
                    <Typography component="h2" variant="h5" className={classes.tittle}>
                        Nuevo reclamo
                    </Typography>
                }

                {!creacion && edicion &&
                    <Typography component="h2" variant="h5" className={classes.tittle}>
                        Modificar reclamo
                    </Typography>
                }

                <form className={classes.form} noValidate autoComplete="off">
                    <div className={classes.contenedorInput}>
                        <span className={classes.spanDisabled}>Nro de reclamo</span>
                        <span className={classes.nroReclamo}>{edicion ? reclamo.id : '-'}</span>
                    </div>

                    <div className={classes.contenedorInputDerecha}>
                        <span className={classes.span} >Estado</span>
                        <TextField className={edicion ? classes.inputs : classes.inputsDisabled} id="estadoReclamo" select disabled={creacion} onChange={handleChangeType} value={estado || ''} label={creacion ? 'Activo' : ''} variant={creacion ? 'filled' : 'outlined'} >
                            {estadosDeReclamo.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>

                    <div className={classes.contenedorInput}>
                        <span className={classes.spanDisabled}>Autor</span>
                        {creacion ? <span className={classes.span}>{user.nombre + " " + user.apellido}</span>
                            : <span className={classes.span}>{reclamo.nombreAutor}</span>}
                    </div>

                    <div className={classes.contenedorInput}>
                        <span className={classes.spanDisabled}>Fecha</span>
                        <div className={classes.contenedorFecha}>
                            <span className={classes.span}>{edicion ? reclamo.fecha : (new Date()).toLocaleDateString()}</span>
                            {edicion && <CalendarTodayIcon className={classes.iconoFecha}></CalendarTodayIcon>}
                        </div>
                    </div>

                    <div className={classes.contenedorInput}>
                        <span className={classes.spanDisabled}>Asunto</span>
                        {edicion ? <span className={classes.span}>{reclamo.asunto}</span>
                            : <TextField className={classes.inputs} id="asunto" variant="outlined" value={reclamo.asunto || ''} onChange={(event) => actualizarValor(event)}></TextField>}
                    </div>

                </form>

                <div className={classes.contenedorDescripcion}>
                    <div className={classes.contenedorInputDescripcion}>
                        <span className={classes.spanDisabled}>Descripción</span>
                        {edicion ? <span className={classes.span}>{reclamo.mensaje}</span>
                            : <TextField className={classes.inputs} id="mensaje" name="mensaje" variant="outlined" value={reclamo.mensaje || ''} onChange={(event) => actualizarValor(event)}></TextField>}
                    </div>
                </div>

                {(edicion && !creacion) &&
                    <Notas notas={notas} setCampoEditado={setCampoEditado} update={setNotas}></Notas>
                }
                
            </div>

            <div className={classes.buttonLog}>
                {creacion &&
                    <div className={classes.contenedorBotones}>
                        <StyledButtonPrimary className={classes.botones} onClick={crearReclamo}>Crear reclamo</StyledButtonPrimary>
                        <StyledButtonSecondary className={classes.botones} onClick={backToReclamos}>Cancelar</StyledButtonSecondary>
                    </div>
                }
                {edicion && !creacion &&
                    <div className={classes.contenedorBotones}>
                        {campoEditado &&
                            <StyledButtonPrimary className={classes.botones} onClick={modificarReclamo}>Guardar cambios</StyledButtonPrimary>
                        }
                        {!campoEditado &&
                            <StyledButtonPrimary className={classes.botonesDisabled} disabled>Guardar cambios</StyledButtonPrimary>
                        }
                        <StyledButtonSecondary className={classes.botones} onClick={popupModal}>Eliminar reclamo</StyledButtonSecondary>
                    </div>
                }
                <Divider className={classes.divider} />

                {edicion && !creacion &&
                    <Historial tipo="RECLAMO" id={params.id} update={cambiosGuardados} />
                }

            </div>

            <SnackbarComponent snackColor={snackColor} openSnackbar={openSnackbar} mensajeSnack={mensajeSnack} handleCloseSnack={() => setOpenSnackbar(false)} />

            <ModalComponent openModal={openModal} bodyModal={bodyModal} handleCloseModal={() => setOpenModal(false)} />

        </div>

    )
}


