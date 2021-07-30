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
        width: "fit-content"
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
    botones: {
        display: "flex",
        marginTop: 10,
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
                    await telefonoUtilService.create(telefonoUtil)
                    setCampoEditado(false)
                    history.push("/telefonosUtiles", { openChildSnack: true, mensajeChild: "Nuevo teléfono útil creado correctamente." })
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
                    await telefonoUtilService.update(telefonoUtil)
                    setCambiosGuardados(true)
                    setCampoEditado(false)
                    usarSnack("Teléfono útil modificado correctamente", false)
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
        
        if (telefonoUtil.telefono && !verificarNumeroTelefonico) {
            setErrors(prev => ({ ...prev, telefono: "El teléfono supera el largo permitido." }))
        }

        return telefonoUtil.nombre && telefonoUtil.telefono && telefonoUtil.servicio && verificarNumeroTelefonico()
    }

    const verificarNumeroTelefonico = () => {
        return telefonoUtil.telefono.length < 16
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
                        {user?.esAdmin()? "Modificar teléfono útil" : "Consultar teléfono útil"}
                    </Typography>
                }

                <form className={classes.form} noValidate autoComplete="off">
                    
                        <CompleteInputBox>
                            <span className={user?.esAdmin()? "spanTitle" : "spanTitleGrey"}>Nombre Completo / Empresa</span>
                            
                            {user?.esAdmin() 
                            ?<TextField 
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
                            :<span className="spanNormal">{telefonoUtil.nombre || ''}</span>
                        } 
                        </CompleteInputBox>
                    
                    
                        <LeftInputBox>
                            <span className={user?.esAdmin()? "spanTitle" : "spanTitleGrey"} >Servicio</span>
                            
                            {user?.esAdmin() 
                            ? <TextField 
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
                             :<span className="spanNormal">{telefonoUtil.servicio || ''}</span>
                        } 
                        </LeftInputBox>
                    
                    
                        <RightInputBox>
                            <span className={user?.esAdmin()? "spanTitle" : "spanTitleGrey"}>Teléfono</span>
                           
                            {user?.esAdmin() 
                            ? <TextField 
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
                             :<span className="spanNormal">{telefonoUtil.telefono || ''}</span>
                            } 
                        </RightInputBox>
                    
                    
                        <CompleteInputBox>
                            <span className={user?.esAdmin()? "spanTitle" : "spanTitleGrey"}>Anotación</span>
                            
                            {user?.esAdmin() 
                            ? <TextField 
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
                            :<span className="spanNormal">{telefonoUtil.anotacion || ''}</span>
                        } 
                        </CompleteInputBox>
                    

                </form>

            </FormBox>

            <RightFormBox>
                {user?.esAdmin() && creacion &&
                    <ButtonBox>
                        <StyledButtonPrimary className={classes.botones} onClick={() => crearTelefonoUtil()} >Crear Teléfono Útil</StyledButtonPrimary>
                        <StyledButtonSecondary className={classes.botones} onClick={backToTelefenosUtiles}>Cancelar</StyledButtonSecondary>
                    </ButtonBox>
                }
                {user?.esAdmin() && edicion && !creacion &&
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
                { user?.esAdmin() && <Divider className={classes.divider} /> }

                {edicion && !creacion &&
                    <Historial tipo="TELEFONOUTIL" id={params.id} update={cambiosGuardados} />
                }

            </RightFormBox>

            <SnackbarComponent snackColor={snackColor} openSnackbar={openSnackbar} mensajeSnack={mensajeSnack} handleCloseSnack={() => setOpenSnackbar(false)} />

            <ModalComponent openModal={openModal} bodyModal={bodyModal} handleCloseModal={() => setOpenModal(false)} />

        </RootBoxABM>

    )
}


