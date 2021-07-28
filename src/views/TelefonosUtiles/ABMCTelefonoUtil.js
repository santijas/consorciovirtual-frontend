import React, { useContext, useEffect, useState } from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import { StyledButtonPrimary, StyledButtonSecondary } from '../../components/Buttons'
import { useHistory, useParams, Prompt } from 'react-router-dom';
import { Link, TextField, MenuItem, Divider, Box } from '@material-ui/core';
import { telefonoUtilService } from '../../services/telefonoUtilService';
import { Historial } from '../../components/Historial'
import { SnackbarComponent } from '../../components/Snackbar'
import { ModalComponent } from '../../components/Modal'
import { Chevron } from '../../assets/icons';
import { TelefonoUtil } from '../../domain/telefonoUtil';
import update from 'immutability-helper';
import useSnack from '../../hooks/UseSnack';
import { ButtonBox, FormBox, LeftInputBox, RightFormBox, RightInputBox, RootBoxABM, CompleteInputBox } from '../../components/Contenedores';
import { UserContext } from '../../hooks/UserContext';
import { handleOnlyNumbers } from '../../utils/formats';

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
    span: {
        textAlign: "left",
        marginLeft: 10,
        marginBottom: 6
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

export const ABMCTelefonoUtil = ({ edicion, creacion }) => {
    const classes = useStyles();
    const [telefonoUtil, setTelefonoUtil] = useState('')
    const [campoEditado, setCampoEditado] = useState(false)
    const [cambiosGuardados, setCambiosGuardados] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const { openSnackbar, setOpenSnackbar, mensajeSnack, usarSnack, snackColor } = useSnack();
    const [modalStyle] = useState(getModalStyle);
    const { user, setUser } = useContext(UserContext);
    const [errors, setErrors] = useState({})

    let history = useHistory()
    const params = useParams()

    //Se llama cuando se actualiza un campo y pone el flag en true
    const actualizarValor = (event) => {
        const newState = update(telefonoUtil, {
            [event.target.id]: { $set: event.target.value }
        })
        setTelefonoUtil(newState)
        setCampoEditado(true)
    }

    const backToTelefenosUtiles = () => {
        history.push("/telefonosUtiles")
    }

    const popupModal = () => {
        setOpenModal(true)
    }

    // para cargar el telefono por id, o empezar con uno nuevo
    useEffect(() => {
        const fetchTelefonoUtil = async () => {
            try {
                let unTelefonoUtil
                if (creacion) {
                    unTelefonoUtil = new TelefonoUtil()
                } else {
                    unTelefonoUtil = await telefonoUtilService.getById(params.id)
                }
                setTelefonoUtil(unTelefonoUtil)
            }
            catch (error) {
                usarSnack(error.response.data, true)
            }
        }

        fetchTelefonoUtil()
    }, [params.id, creacion])

    const crearTelefonoUtil = async () => {
        try {
            if (verificarCamposVacios()) {
                if (verificarNumeroTelefonico()) {
                    await telefonoUtilService.create(telefonoUtil)
                    setCampoEditado(false)
                    history.push("/telefonosUtiles", { openChildSnack: true, mensajeChild: "Nuevo teléfono útil creado correctamente." })
                } else {
                    usarSnack("El teléfono solo puede contener números, espacios y/o guiones medios.", true)
                }
            } else {
                usarSnack("Campos obligatorios faltantes.", true)
            }
        } catch (error) {
            usarSnack(error.response.data, true)
        }
    }

    const modificarTelefonoUtil = async () => {
        try {
            if (verificarCamposVacios()) {
                if (verificarNumeroTelefonico()) {
                    await telefonoUtilService.update(telefonoUtil)
                    setCambiosGuardados(true)
                    setCampoEditado(false)
                    usarSnack("Teléfono útil modificado correctamente", false)
                } else {
                    usarSnack("El teléfono solo puede contener números, espacios y/o guiones medios.", true)
                }
            } else {
                usarSnack("Campos obligatorios faltantes.", true)
            }
        } catch (error) {
            usarSnack(error.response.data, true)
        }
        setCambiosGuardados(false)
    }

    const eliminarTelefonoUtil = async () => {
        try {
            await telefonoUtilService.delete(telefonoUtil.id)
            history.push("/telefonosUtiles", { openChildSnack: true, mensajeChild: "Teléfono útil eliminado correctamente." })
        } catch (error) {
            usarSnack(error.response.data, true)
        }
    }

    const verificarCamposVacios = () => {
        setErrors(null)
        if (!telefonoUtil.nombre) {
            setErrors(prev => ({ ...prev, nombre: "Campo obligatorio" }))
        }

        if (!telefonoUtil.telefono) {
            setErrors(prev => ({ ...prev, telefono: "Campo obligatorio" }))
        }

        if (!telefonoUtil.servicio) {
            setErrors(prev => ({ ...prev, servicio: "Campo obligatorio" }))
        }
        

        return telefonoUtil.nombre && telefonoUtil.telefono && telefonoUtil.servicio
    }

    const verificarNumeroTelefonico = () => {
        return true
    }

    const bodyModal = (

        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">¿Seguro desea eliminar este télefono?</h2>
            <p id="simple-modal-description">Esta acción no se puede deshacer.</p>
            <Box display="flex" flexDirection="row" mt={4}>
                <StyledButtonPrimary onClick={eliminarTelefonoUtil}>Eliminar teléfono útil</StyledButtonPrimary>
                <Link className={classes.linkModal} onClick={() => setOpenModal(false)}>
                    Cancelar
                </Link>
            </Box>
        </div>
    )

    const enterKey = (e) =>{
        if (e.key === "Enter") {
            edicion? modificarTelefonoUtil() : crearTelefonoUtil()
        }
    }

    return (

        <RootBoxABM>
            <Prompt when={campoEditado} message={"Hay modificaciones sin guardar. ¿Desea salir de todas formas?"} />
            <FormBox>
                <Link className={classes.link} onClick={backToTelefenosUtiles}>
                    <Chevron className={classes.chevron} />
                    Volver al listado de teléfonos útiles
                </Link>
                {creacion &&
                    <Typography component="h2" variant="h5" className="tittle">
                        Nuevo teléfono útil
                    </Typography>
                }

                {!creacion && edicion &&
                    <Typography component="h2" variant="h5" className="tittle">
                        Modificar teléfono útil
                    </Typography>
                }

                <form className={classes.form} noValidate autoComplete="off">
                    {user.esAdmin() &&
                        <CompleteInputBox clas>
                            <span className={classes.span}>Nombre Completo / Empresa</span>
                            <TextField 
                            className={classes.inputs} 
                            id="nombre" 
                            value={telefonoUtil.nombre || ''} 
                            onChange={(event) => actualizarValor(event)} 
                            name="nombre" 
                            variant="outlined" 
                            error={Boolean(errors?.nombre)}
                            helperText={errors?.nombre}
                            inputProps={{ maxLength: 30 }}
                            onKeyDown={(e) => { enterKey(e) }}
                            />
                        </CompleteInputBox>
                    }
                    {user.esAdmin() &&
                        <LeftInputBox>
                            <span className={classes.span} >Servicio</span>
                            <TextField 
                            className={classes.inputs} 
                            id="servicio"
                             value={telefonoUtil.servicio || ''} 
                             onChange={(event) => actualizarValor(event)} 
                             name="servicio" 
                             variant="outlined" 
                             error={Boolean(errors?.servicio)}
                             helperText={errors?.servicio}
                             inputProps={{ maxLength: 30 }}
                             onKeyDown={(e) => { enterKey(e) }}
                             />
                        </LeftInputBox>
                    }
                    {user.esAdmin() &&
                        <RightInputBox>
                            <span className={classes.span}>Teléfono</span>
                            <TextField 
                            className={classes.inputs} 
                            id="telefono" 
                            value={telefonoUtil.telefono || ''} 
                            onChange={(event) => actualizarValor(event)}
                             name="telefono" 
                             variant="outlined" 
                             error={Boolean(errors?.telefono)}
                             helperText={errors?.telefono}
                             inputProps={{ maxLength: 15 }}
                             onInput={ handleOnlyNumbers }
                             onKeyDown={(e) => { enterKey(e) }}
                             />
                        </RightInputBox>
                    }
                    {user.esAdmin() &&
                        <CompleteInputBox>
                            <span className={classes.span}>Anotación</span>
                            <TextField 
                            multiline 
                            className={classes.inputs} 
                            id="anotacion" 
                            value={telefonoUtil.anotacion || ''} 
                            onChange={(event) => actualizarValor(event)} 
                            name="anotacion" 
                            variant="outlined" 
                            inputProps={{ maxLength: 500 }}
                            onKeyDown={(e) => { enterKey(e) }}
                            />
                        </CompleteInputBox>
                    }
                    {!user.esAdmin() &&
                        <CompleteInputBox clas>
                            <span className={classes.span}>Nombre Completo / Empresa</span>
                            <TextField disabled className={classes.inputs} id="nombre" value={telefonoUtil.nombre} name="nombre" variant="outlined" />
                        </CompleteInputBox>
                    }
                    {!user.esAdmin() &&
                        <LeftInputBox>
                            <span className={classes.span} >Servicio</span>
                            <TextField disabled className={classes.inputs} id="servicio" value={telefonoUtil.servicio} name="servicio" variant="outlined" />
                        </LeftInputBox>
                    }
                    {!user.esAdmin() &&
                        <RightInputBox>
                            <span className={classes.span}>Teléfono</span>
                            <TextField disabled className={classes.inputs} id="telefono" value={telefonoUtil.telefono} name="telefono" variant="outlined" />
                        </RightInputBox>
                    }
                    {!user.esAdmin() &&
                        <CompleteInputBox>
                            <span className={classes.span}>Anotación</span>
                            <TextField multiline disabled className={classes.inputs} id="anotacion" value={telefonoUtil.anotacion} name="anotacion" variant="outlined" />
                        </CompleteInputBox>
                    }
                </form>

            </FormBox>

            <RightFormBox>
                {user.esAdmin() && creacion &&
                    <ButtonBox>
                        <StyledButtonPrimary className={classes.botones} onClick={() => crearTelefonoUtil()} >Crear Teléfono Útil</StyledButtonPrimary>
                        <StyledButtonSecondary className={classes.botones} onClick={backToTelefenosUtiles}>Cancelar</StyledButtonSecondary>
                    </ButtonBox>
                }
                {user.esAdmin() && edicion && !creacion &&
                    <ButtonBox>
                        {campoEditado &&
                            <StyledButtonPrimary className={classes.botones} onClick={modificarTelefonoUtil}>Guardar cambios</StyledButtonPrimary>
                        }
                        {!campoEditado &&
                            <StyledButtonPrimary className={classes.botonesDisabled} disabled>Guardar cambios</StyledButtonPrimary>
                        }
                        <StyledButtonSecondary className={classes.botones} onClick={popupModal}>Eliminar teléfono útil</StyledButtonSecondary>
                    </ButtonBox>
                }
                <Divider className={classes.divider} />

                {edicion && !creacion &&
                    <Historial tipo="TELEFONOUTIL" id={params.id} update={cambiosGuardados} />
                }

            </RightFormBox>

            <SnackbarComponent snackColor={snackColor} openSnackbar={openSnackbar} mensajeSnack={mensajeSnack} handleCloseSnack={() => setOpenSnackbar(false)} />

            <ModalComponent openModal={openModal} bodyModal={bodyModal} handleCloseModal={() => setOpenModal(false)} />

        </RootBoxABM>

    )
}


