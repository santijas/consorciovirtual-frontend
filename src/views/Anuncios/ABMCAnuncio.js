import React, { useEffect, useState } from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import { StyledButtonPrimary, StyledButtonSecondary } from '../../components/Buttons'
import { useHistory, useParams } from 'react-router-dom';
import { Link, TextField, MenuItem, Divider, Box } from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { anuncioService } from "../../services/anuncioService";
import { Historial } from '../../components/Historial'
import { SnackbarComponent } from '../../components/Snackbar'
import { ModalComponent } from '../../components/Modal'
import { Chevron } from '../../assets/icons';
import { Anuncio } from '../../domain/anuncio';
import update from 'immutability-helper';
import { usuarioService } from '../../services/usuarioService';

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
        marginTop: 30,

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
        marginBottom: 50
    },
    contenedorInputDerecha: {
        display: "flex",
        flexDirection: "column",
        flex: "50%",
        maxWidth: 400,
        marginBottom: 50
    },
    contenedorInputAnchoCompleto: {
        display: "flex",
        flexDirection: "column",
        flex: "50%"
    },
    span: {
        textAlign: "left",
        marginLeft: 10,
        marginBottom: 6
    },
    contenedorFecha: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    botones: {
        display: "flex",
        marginTop: 10,
    },
    iconoFecha: {
        color: "grey",
        fontSize: 16,
        marginBottom: 6,
    },
    contenedorBotones: {
        display: "flex",
        flexDirection: "column",
        margin: "10px 50px"
    },
    divider: {
        marginTop: 40
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
    }
});

function getModalStyle() {
    const top = 50
    const left = 50

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

export const ABMCAnuncio = ({ edicion, creacion }) => {
    const classes = useStyles();
    const [anuncio, setAnuncio] = useState('')
    const [campoEditado, setCampoEditado] = useState(false)
    const [cambiosGuardados, setCambiosGuardados] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [openSnackbar, setOpenSnackbar] = useState('')
    const [mensajeSnack, setMensajeSnack] = useState()
    const [snackColor, setSnackColor] = useState()
    const [modalStyle] = useState(getModalStyle);
    const [usuarios, setUsuarios] = useState('')

    let history = useHistory()
    const params = useParams()

    const fetchAnuncio = async () => {
        try {
            let unAnuncio
            if (creacion) {
                unAnuncio = new Anuncio()
            } else {
                unAnuncio = await anuncioService.getById(params.id)
            }
            setAnuncio(unAnuncio)
        }
        catch {

        }
    }

    const fetchAllUsers = async (textoBusqueda) => {
        const usuariosEncontrados = await usuarioService.getBySearch(textoBusqueda)
        setUsuarios(usuariosEncontrados)
    }

    const actualizarValor = (event) => {
        const newState = update(anuncio, {
            [event.target.id]: { $set: event.target.value }
        })
        setAnuncio(newState)
        setCampoEditado(true)
    }

    const backToAnuncios = () => {
        history.push("/anuncios")
    }

    const popupModal = () => {
        setOpenModal(true)
    }

    useEffect(() => {
        fetchAnuncio()
        fetchAllUsers('')
    }, [])

    const crearAnuncio = async () => {
        try {
            if (validarAnuncio()) {
                await anuncioService.create(anuncio)
                history.push("/anuncios", { openChildSnack: true, mensajeChild: "Anuncio creado correctamente." })
            } else {
                usarSnack("Campos obligatorios faltantes.", true)
            }
        } catch (errorRecibido) {
            usarSnack(errorRecibido.response.data, true)
        }
    }

    const modificarAnuncio = async () => {
        try {
            if (validarAnuncio()) {
                await anuncioService.update(anuncio)
                setCambiosGuardados(true)
                setCampoEditado(false)
                usarSnack("Anuncio modificado correctamente", false)
            } else {
                usarSnack("Campos obligatorios faltantes.", true)
            }
        } catch (errorRecibido) {
            usarSnack(errorRecibido.response.data, true)
        }
        setCambiosGuardados(false)
    }

    const eliminarAnuncio = async () => {
        try {
            await anuncioService.delete(anuncio.id)
            history.push("/anuncios", { openChildSnack: true, mensajeChild: "Anuncio eliminado correctamente." })
        } catch (errorRecibido) {
            usarSnack("No se puede conectar con el servidor.", true)
        }
    }

    const validarAnuncio = () => {
        return anuncio.titulo && anuncio.fechaVencimiento && anuncio.descripcion
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
            <h2 id="simple-modal-title">¿Estás seguro que querés eliminar este anuncio?</h2>
            <p id="simple-modal-description">Esta acción no se puede deshacer.</p>
            <Box display="flex" flexDirection="row" mt={4}>
                <StyledButtonPrimary onClick={eliminarAnuncio}>Eliminar anuncio</StyledButtonPrimary>
                <Link className={classes.linkModal} onClick={() => setOpenModal(false)}>
                    Cancelar
                </Link>
            </Box>
        </div>
    )

    return (

        <div className={classes.root} >
            <div className={classes.contenedorForm}>
                <Link className={classes.link} onClick={backToAnuncios}>
                    <Chevron className={classes.chevron} />
                    Volver a anuncios
                </Link>
                {creacion &&
                    <Typography component="h2" variant="h5" className={classes.tittle}>
                        Nuevo anuncio
                    </Typography>
                }

                {!creacion && edicion &&
                    <Typography component="h2" variant="h5" className={classes.tittle}>
                        Modificar anuncio
                    </Typography>
                }

                <form className={classes.form} noValidate autoComplete="off">

                    <div className={classes.contenedorInput}>
                        <span className={classes.span}>Fecha</span>
                        <div className={classes.contenedorFecha}>
                            <span className={classes.span}>{edicion ? anuncio.fechaCreacion : (new Date()).toLocaleDateString()}</span>
                            {edicion && <CalendarTodayIcon className={classes.iconoFecha}></CalendarTodayIcon>}
                        </div>
                    </div>

                    <div className={classes.contenedorInputDerecha}>
                        <span className={classes.span}>Autor</span>
                        <span className={classes.span}>{edicion ? anuncio.nombreAutor : usuarioService.usuarioLogueado.nombre + " " + usuarioService.usuarioLogueado.apellido}</span>
                    </div>

                    <div className={classes.contenedorInput}>
                        <span className={classes.span} >Título</span>
                        <TextField className={classes.inputs} id="titulo" value={anuncio.titulo || ''} onChange={(event) => actualizarValor(event)} name="titulo" variant="outlined" />
                    </div>

                    <div className={classes.contenedorInput}>
                        <span className={classes.span}>Vencimiento</span>
                        <TextField className={classes.inputs} id="fechaVencimiento" value={anuncio.fechaVencimiento || ''} onChange={(event) => actualizarValor(event)} name="fechaVencimiento" type="date" variant="outlined" />
                    </div>

                    <div className={classes.contenedorInputAnchoCompleto}>
                        <span className={classes.span}>Descripción</span>
                        <TextField className={classes.inputs} id="descripcion" value={anuncio.descripcion || ''} onChange={(event) => actualizarValor(event)} name="descripcion" variant="outlined" />
                    </div>

                </form>

            </div>

            <div className={classes.buttonLog}>
                    {creacion &&
                        <div className={classes.contenedorBotones}>
                            <StyledButtonPrimary className={classes.botones} onClick={() => crearAnuncio()} >Crear anuncio</StyledButtonPrimary>
                            <StyledButtonSecondary className={classes.botones} onClick={backToAnuncios}>Cancelar</StyledButtonSecondary>
                        </div>
                    }
                    {edicion && !creacion &&
                        <div className={classes.contenedorBotones}>
                            {campoEditado &&
                                <StyledButtonPrimary className={classes.botones} onClick={modificarAnuncio}>Guardar cambios</StyledButtonPrimary>
                            }
                            {!campoEditado &&
                                <StyledButtonPrimary className={classes.botonesDisabled} disabled>Guardar cambios</StyledButtonPrimary>
                            }
                            <StyledButtonSecondary className={classes.botones} onClick={popupModal}>Eliminar anuncio</StyledButtonSecondary>
                        </div>
                    }
                    <Divider className={classes.divider} />

                    {edicion && !creacion &&
                        <Historial tipo="ANUNCIO" id={params.id} update={cambiosGuardados} />
                    }

                </div>

            <SnackbarComponent snackColor={snackColor} openSnackbar={openSnackbar} mensajeSnack={mensajeSnack} handleCloseSnack={() => setOpenSnackbar(false)} />

            <ModalComponent openModal={openModal} bodyModal={bodyModal} handleCloseModal={() => setOpenModal(false)} />

        </div>

    )
}


