import React, { useEffect, useState, useContext } from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import { StyledButtonPrimary, StyledButtonSecondary } from '../../components/Buttons'
import { useHistory, useParams, Prompt } from 'react-router-dom';
import { Link, TextField, MenuItem, Divider, Box } from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { solicitudService } from "../../services/solicitudService";
import { Historial } from '../../components/Historial'
import { SnackbarComponent } from '../../components/Snackbar'
import { ModalComponent } from '../../components/Modal'
import { Notas } from '../../components/Notas'
import { Chevron } from '../../assets/icons';
import update from 'immutability-helper';
import { SolicitudTecnica } from '../../domain/solicitudTecnica';
import { UserContext } from '../../hooks/UserContext';
import useSnack from '../../hooks/UseSnack';
import { ButtonBox, FormBox, LeftInputBox, RightFormBox, RightInputBox, RootBoxABM } from '../../components/Contenedores';

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
    nroSolicitud: {
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

const estadosDeSolicitud = [
    {
        value: 'Pendiente',
        label: 'Pendiente',
    },
    {
        value: 'Pendiente de aprobación',
        label: 'Pendiente de aprobación',
    },
    {
        value: 'Resuelto',
        label: 'Resuelto',
    },
    {
        value: 'Rechazado',
        label: 'Rechazado',
    },
    {
        value: 'En proceso',
        label: 'En proceso',
    }
]

const tiposDeSolicitud = [
    {
        value: 'Interna',
        label: 'Interna',
    },
    {
        value: 'Externa',
        label: 'Externa',
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

export const ABMCSolicitud = ({ edicion, creacion }) => {
    const classes = useStyles();
    const [solicitud, setSolicitud] = useState(new SolicitudTecnica())
    const [notas, setNotas] = useState([])
    const [estado, setEstado] = useState('')
    const [tipo, setTipo] = useState('')
    const [titulo, setTitulo] = useState('')
    const [detalle, setDetalle] = useState('')
    const { user, setUser } = useContext(UserContext);
    const [campoEditado, setCampoEditado] = useState(false)
    const [cambiosGuardados, setCambiosGuardados] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const { openSnackbar, setOpenSnackbar, mensajeSnack, usarSnack, snackColor } = useSnack();
    const [modalStyle] = useState(getModalStyle);

    let history = useHistory()
    const params = useParams()

    const fetchSolicitud = async () => {
        try {
            let unaSolicitud
            if (creacion) {
                unaSolicitud = new SolicitudTecnica()
                unaSolicitud.fecha = new Date()
                unaSolicitud.autor = { id: user.id }
            } else {
                unaSolicitud = await solicitudService.getById(params.id)
                setEstado(unaSolicitud.estado.nombreEstado)
                setTitulo(unaSolicitud.titulo)
                setNotas(unaSolicitud.notas)
                setDetalle(unaSolicitud.detalle)
            }
            setSolicitud(unaSolicitud)
        }
        catch (error) {
            usarSnack(error.response.data, true)
        }
    }

    const actualizarValor = (event) => {
        const newState = update(solicitud, {
            [event.target.id]: { $set: event.target.value }
        })
        setSolicitud(newState)
        setCampoEditado(true)
    }

    const backToSolicitudes = () => {
        history.push("/solicitudes")
    }

    const popupModal = () => {
        setOpenModal(true)
    }

    const handleChangeType = (event) => {
        setEstado(event.target.value);
        setCampoEditado(true)
    };

    const cambiarTipoSolicitud = (event) => {
        setTipo(event.target.value)
    }

    useEffect(() => {
        fetchSolicitud()
    }, [])

    const crearSolicitud = async () => {
        try {
            if (validarSolicitud()) {
                let nuevaSolicitud = solicitud
                nuevaSolicitud.autor = { id: user.id }
                nuevaSolicitud.estado = { id: 1 }
                nuevaSolicitud.tipo = tipo
                await solicitudService.create(nuevaSolicitud)
                history.push("/solicitudes", { openChildSnack: true, mensajeChild: "Solicitud técnica creada correctamente." })
            } else {
                usarSnack("Campos obligatorios faltantes.", true)
            }
        } catch (error) {
            usarSnack(error.response.data, true)
        }
    }

    const modificarSolicitud = async () => {
        try {
            let nuevaSolicitud = solicitud
            nuevaSolicitud.estado.nombreEstado = estado
            nuevaSolicitud.estado.id = (estado === 'Pendiente') ? 1 : 2
            nuevaSolicitud.notas = notas
            await solicitudService.update(solicitud)
            setCambiosGuardados(true)
            setCampoEditado(false)
            usarSnack("Solicitud técnica modificada correctamente", false)
        } catch (error) {
            usarSnack(error.response.data, true)
        }
        setCambiosGuardados(false)
    }

    const eliminarSolicitud = async () => {
        try {
            await solicitudService.delete(solicitud.id)
            history.push("/solicitudes", { openChildSnack: true, mensajeChild: "Solicitud técnica eliminada correctamente." })
        } catch (error) {
            usarSnack(error.response.data, true)
        }
    }

    const validarSolicitud = () => {
        return solicitud.titulo && solicitud.detalle && tipo
    }

    const bodyModal = (

        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">¿Estás seguro que querés eliminar esta solicitud técnica?</h2>
            <p id="simple-modal-description">Esta acción no se puede deshacer.</p>
            <Box display="flex" flexDirection="row" mt={4}>
                <StyledButtonPrimary onClick={eliminarSolicitud}>Eliminar solicitud técnica</StyledButtonPrimary>
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
                <Link className={classes.link} onClick={backToSolicitudes}>
                    <Chevron className={classes.chevron} />
                    Volver a solicitudes técnicas
                </Link>
                {creacion &&
                    <Typography component="h2" variant="h5" className="tittle">
                        Nueva solicitud técnica
                    </Typography>
                }

                {!creacion && edicion &&
                    <Typography component="h2" variant="h5" className="tittle">
                        Modificar solicitud técnica
                    </Typography>
                }

                <form className={classes.form} noValidate autoComplete="off">
                    <LeftInputBox>
                        <span className={classes.spanDisabled}>Nro de solicitud técnica</span>
                        <span className={classes.nroSolicitud}>{edicion ? solicitud.id : '-'}</span>
                    </LeftInputBox>

                    <RightInputBox>
                        <span className={classes.span} >Estado</span>
                        <TextField className={edicion ? classes.inputs : classes.inputsDisabled} id="estadoSolicitud" select disabled={creacion || user.tipo === 'Inquilino'} onChange={handleChangeType} value={estado || ''} label={creacion ? (creacion && user.tipo === 'Inquilino' ? 'Pendiente de aprobación' : 'Pendiente') : ''} variant={creacion ? 'filled' : 'outlined'} >
                            {estadosDeSolicitud.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </RightInputBox>

                    <LeftInputBox>
                        <span className={classes.spanDisabled}>Autor</span>
                        {creacion ? <span className={classes.span}>{user.nombre + " " + user.apellido}</span>
                            : <span className={classes.span}>{solicitud.nombreAutor}</span>}
                    </LeftInputBox>

                    <RightInputBox>
                        <span className={classes.spanDisabled}>Fecha</span>
                        <div className={classes.contenedorFecha}>
                            <span className={classes.span}>{edicion ? solicitud.fecha : (new Date()).toLocaleDateString()}</span>
                            {edicion && <CalendarTodayIcon className={classes.iconoFecha}></CalendarTodayIcon>}
                        </div>
                    </RightInputBox>

                    <LeftInputBox>
                        <span className={classes.spanDisabled}>Titulo</span>
                        {edicion ? <span className={classes.span}>{solicitud.titulo}</span>
                            : <TextField className={classes.inputs} id="titulo" variant="outlined" value={solicitud.titulo || ''} onChange={(event) => actualizarValor(event)}></TextField>}
                    </LeftInputBox>

                    <RightInputBox>
                        <span className={classes.spanDisabled}>Tipo</span>
                        {edicion ? <span className={classes.span}>{solicitud.tipo}</span>
                            : <TextField className={classes.inputs} id="tipoSolicitud" select onChange={cambiarTipoSolicitud} value={tipo || ''} variant={'outlined'} >
                                {tiposDeSolicitud.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>}
                    </RightInputBox>

                </form>

                <div className={classes.contenedorDescripcion}>
                    <div className={classes.contenedorInputDescripcion}>
                        <span className={classes.spanDisabled}>Descripción</span>
                        {edicion ? <span className={classes.span}>{solicitud.detalle}</span>
                            : <TextField className={classes.inputs} id="detalle" name="detalle" variant="outlined" value={solicitud.detalle || ''} onChange={(event) => actualizarValor(event)}></TextField>}
                    </div>
                </div>

                {(edicion && !creacion) &&
                    <Notas notas={notas} setCampoEditado={setCampoEditado} update={setNotas}></Notas>
                }

            </FormBox>

            <RightFormBox>
                {creacion &&
                    <ButtonBox>
                        <StyledButtonPrimary className={classes.botones} onClick={() => crearSolicitud()} >Crear solicitud técnica</StyledButtonPrimary>
                        <StyledButtonSecondary className={classes.botones} onClick={backToSolicitudes}>Cancelar</StyledButtonSecondary>
                    </ButtonBox>
                }
                {edicion && !creacion &&
                    <ButtonBox>
                        {campoEditado &&
                            <StyledButtonPrimary className={classes.botones} onClick={modificarSolicitud}>Guardar cambios</StyledButtonPrimary>
                        }
                        {!campoEditado &&
                            <StyledButtonPrimary className={classes.botonesDisabled} disabled>Guardar cambios</StyledButtonPrimary>
                        }
                        <StyledButtonSecondary className={classes.botones} onClick={popupModal}>Eliminar solicitud</StyledButtonSecondary>
                    </ButtonBox>
                }
                <Divider className={classes.divider} />

                {edicion && !creacion &&
                    <Historial tipo="SOLICITUD_TECNICA" id={params.id} update={cambiosGuardados} />
                }

            </RightFormBox>

            <SnackbarComponent snackColor={snackColor} openSnackbar={openSnackbar} mensajeSnack={mensajeSnack} handleCloseSnack={() => setOpenSnackbar(false)} />

            <ModalComponent openModal={openModal} bodyModal={bodyModal} handleCloseModal={() => setOpenModal(false)} />

        </RootBoxABM>

    )
}


