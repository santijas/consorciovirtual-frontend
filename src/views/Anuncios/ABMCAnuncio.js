import React, { useEffect, useState, useContext } from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import { StyledButtonPrimary, StyledButtonSecondary } from '../../components/Buttons'
import { useHistory, useParams, Prompt } from 'react-router-dom';
import { Link, TextField, Divider, Box } from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { anuncioService } from "../../services/anuncioService";
import { Historial } from '../../components/Historial'
import { SnackbarComponent } from '../../components/Snackbar'
import { ModalComponent } from '../../components/Modal'
import { Chevron } from '../../assets/icons';
import { Anuncio } from '../../domain/anuncio';
import update from 'immutability-helper';
import { UserContext } from '../../hooks/UserContext';
import useSnack from '../../hooks/UseSnack';
import { ButtonBox, FormBox, FullInputBox, LeftInputBox, RightFormBox, RightInputBox, RootBoxABM } from '../../components/Contenedores';
import { fechaMaxNow, soloFecha } from '../../utils/formats';

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
        marginTop: 30,
    },
    inputs: {
        backgroundColor: "white",
        textAlign: "left"
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
    const { openSnackbar, setOpenSnackbar, mensajeSnack, usarSnack, snackColor } = useSnack()
    const [modalStyle] = useState(getModalStyle)
    const { user } = useContext(UserContext)
    const [errors, setErrors] = useState({})

    let history = useHistory()
    const params = useParams()


    useEffect(() => {
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
            catch (error) {
                usarSnack(error.response.data, true)
            }
        }
        fetchAnuncio()
    }, [params.id, creacion])

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

    const crearAnuncio = async () => {
        try {
            if (validarAnuncio()) {
                await anuncioService.create(anuncio)
                setCampoEditado(false)
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
            usarSnack(errorRecibido.response.data, true)
        }
    }

    const validarAnuncio = () => {

        setErrors(null)
        if (!anuncio.titulo) {
            setErrors(prev => ({ ...prev, titulo: "Campo obligatorio" }))
        }

        if (!anuncio.fechaVencimiento) {
            setErrors(prev => ({ ...prev, fechaVencimiento: "Campo obligatorio" }))
        }

        if (!anuncio.descripcion) {
            setErrors(prev => ({ ...prev, descripcion: "Campo obligatorio" }))
        }

        return anuncio.titulo && anuncio.fechaVencimiento && anuncio.descripcion
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

        <RootBoxABM>
            <Prompt when={campoEditado} message={"Hay modificaciones sin guardar. ¿Desea salir de todas formas?"} />
            <FormBox>
                <Link className={classes.link} onClick={backToAnuncios}>
                    <Chevron className={classes.chevron} />
                    Volver a anuncios
                </Link>
                {creacion &&
                    <Typography component="h2" variant="h5" className="tittle">
                        Nuevo anuncio
                    </Typography>
                }

                {!creacion && edicion &&
                    <Typography component="h2" variant="h5" className="tittle">
                        { user?.esAdmin() ? "Modificar anuncio" : "Anuncio" }
                    </Typography>
                }

                <form className={classes.form} noValidate autoComplete="off">

                    <LeftInputBox>
                        <span className={user?.esAdmin()? "spanTitleGrey" : "spanTitleGrey"}>Fecha</span>
                        <div className={classes.contenedorFecha}>
                            <span className="spanNormal">{edicion ? soloFecha(anuncio.fechaCreacion) : (soloFecha(new Date()))}</span>
                            {edicion && <CalendarTodayIcon className={classes.iconoFecha}></CalendarTodayIcon>}
                        </div>
                    </LeftInputBox>

                    <RightInputBox>
                        <span className={user?.esAdmin()? "spanTitleGrey" : "spanTitleGrey"}>Autor</span>
                        <span className="spanNormal">{edicion ? anuncio.nombreAutor : user?.nombreYApellido()}</span>
                    </RightInputBox>


                    <LeftInputBox>
                        <span className={user?.esAdmin()? "spanTitle" : "spanTitleGrey"} >Título</span>
                        
                        {user?.esAdmin() 
                        ? <TextField 
                        className={classes.inputs} 
                        id="titulo" 
                        value={anuncio.titulo || ''} 
                        onChange={(event) => actualizarValor(event)} 
                        name="titulo" 
                        variant="outlined" 
                        error={Boolean(errors?.titulo)}
                        helperText={errors?.titulo}
                        inputProps={{ maxLength: 70 }}
                        />
                        :<span className="spanNormal">{anuncio.titulo || ''}</span>
                        }   
                    </LeftInputBox>

                    <RightInputBox>
                        <span className={user?.esAdmin()? "spanTitle" : "spanTitleGrey"}>Vencimiento</span>
                        
                        {user?.esAdmin() 
                        ?  <TextField 
                        className={classes.inputs} 
                        id="fechaVencimiento" 
                        value={anuncio.fechaVencimiento || ''} 
                        onChange={(event) => actualizarValor(event)} 
                        name="fechaVencimiento" 
                        type="date" 
                        variant="outlined" 
                        error={Boolean(errors?.fechaVencimiento)}
                        helperText={errors?.fechaVencimiento}
                        InputProps={{inputProps: { min:  fechaMaxNow() }}}
                        />
                        :<span className="spanNormal">{soloFecha(anuncio.fechaVencimiento) || ''}</span>
                        }   
                    </RightInputBox>

                    <FullInputBox>
                        <span className={user?.esAdmin()? "spanTitle" : "spanTitleGrey"}>Descripción</span>
                        {user?.esAdmin() 
                        ? <TextField 
                        className={classes.inputs} 
                        id="descripcion" 
                        value={anuncio.descripcion || ''} 
                        onChange={(event) => actualizarValor(event)} 
                        name="descripcion" 
                        variant="outlined" 
                        error={Boolean(errors?.descripcion)}
                        helperText={errors?.descripcion}
                        inputProps={{ maxLength: 150 }}
                        />
                        :<span className="spanNormal">{anuncio.descripcion || ''}</span>
                        }
                    </FullInputBox>

                </form>

            </FormBox>
                
            <RightFormBox>
                
                {creacion && user?.esAdmin() &&
                    <ButtonBox>
                        <StyledButtonPrimary className={classes.botones} onClick={() => crearAnuncio()} >Crear anuncio</StyledButtonPrimary>
                        <StyledButtonSecondary className={classes.botones} onClick={backToAnuncios}>Cancelar</StyledButtonSecondary>
                    </ButtonBox>
                }
                {edicion && !creacion && user?.esAdmin() &&
                    <ButtonBox>
                        {campoEditado &&
                            <StyledButtonPrimary className={classes.botones} onClick={modificarAnuncio}>Guardar cambios</StyledButtonPrimary>
                        }
                        {!campoEditado &&
                            <StyledButtonPrimary className={classes.botonesDisabled} disabled>Guardar cambios</StyledButtonPrimary>
                        }
                        <StyledButtonSecondary className={classes.botones} onClick={popupModal}>Eliminar anuncio</StyledButtonSecondary>
                    </ButtonBox>
                }
                { user?.esAdmin() && <Divider className={classes.divider} /> }

                {edicion && !creacion  &&
                    <Historial tipo="ANUNCIO" id={params.id} update={cambiosGuardados} />
                }

            </RightFormBox>
             
            <SnackbarComponent snackColor={snackColor} openSnackbar={openSnackbar} mensajeSnack={mensajeSnack} handleCloseSnack={() => setOpenSnackbar(false)} />

            <ModalComponent openModal={openModal} bodyModal={bodyModal} handleCloseModal={() => setOpenModal(false)} />

        </RootBoxABM>

    )
}


