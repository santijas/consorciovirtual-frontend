import React, { useEffect, useState, useContext } from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import { StyledButtonPrimary, StyledButtonSecondary } from '../../components/Buttons'
import { useHistory, useParams, Prompt } from 'react-router-dom';
import { Link, TextField, MenuItem, Divider, Box } from '@material-ui/core';
import { usuarioService } from "../../services/usuarioService";
import { departamentoService } from "../../services/departamentoService";
import { Historial } from '../../components/Historial'
import { SnackbarComponent } from '../../components/Snackbar'
import { ModalComponent } from '../../components/Modal'
import { Chevron } from '../../assets/icons';
import { Usuario } from '../../domain/usuario';
import update from 'immutability-helper';
import useSnack from '../../hooks/UseSnack';
import ReactLoading from 'react-loading';
import { ButtonBox, FormBox, LeftInputBox, RightFormBox, RightInputBox, RootBoxABM, CompleteInputBox } from '../../components/Contenedores';
import { StyledButtonNewPassoword } from './../../components/Buttons';
import { UserContext } from '../../hooks/UserContext';
import { fechaMaxNacimiento, fechaMaxNow, fechaMinNacimiento, handleOnlyNumbers } from '../../utils/formats';
import { Select } from '@material-ui/core';

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
    createSpan: {
        marginBottom: 10,
        fontWeight: 600
    },
    select: {
        "&:focus": {
            backgroundColor: "white",
            border: "none",
            cursor: "pointer"

        }
    },
    input: {
        display: "none"
    },
    textFieldSelect: {
        backgroundColor: "white",
        textAlign: "left",
        cursor: "pointer"
    }
});

const tiposDeUsuario = [
    {
        value: 'Propietario',
        label: 'Propietario',
    },
    {
        value: 'Inquilino',
        label: 'Inquilino',
    },
    {
        value: 'Administrador_consorcio',
        label: 'Administrador de Consorcio',
    },
    {
        value: 'Administrador',
        label: 'Administrador',
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

export const ABMCUsuario = ({ edicion, creacion, perfil }) => {
    const classes = useStyles();
    const [usuario, setUsuario] = useState('')
    const { user } = useContext(UserContext)
    const [campoEditado, setCampoEditado] = useState(false)
    const [cambiosGuardados, setCambiosGuardados] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const { openSnackbar, setOpenSnackbar, mensajeSnack, usarSnack, snackColor } = useSnack();
    const [modalStyle] = useState(getModalStyle);
    const [departamentos, setDepartamentos] = useState([])
    const [errors, setErrors] = useState({})
    let history = useHistory()
    const params = useParams()

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordValidator, setNewPasswordValidator] = useState('')


    const updateValue = (event) => {
        const newState = update(usuario, {
            [event.target.id]: { $set: event.target.value }
        })
        setUsuario(newState)
        setCampoEditado(true)
    }

    const goBack = () => {
        history.goBack()
    }

    const popupModal = () => {
        setOpenModal(true)
    }

    const handleChangeType = (event) => {
        const newState = update(usuario, {
            tipo: { $set: event.target.value }
        })
        setUsuario(newState)
        setCampoEditado(true)
    };

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                let unUsuario

                if (creacion) {
                    unUsuario = new Usuario()
                    setUsuario(unUsuario)
                }

                if (edicion) {
                    let listaDepartamentos
                    unUsuario = await usuarioService.getById(params.id)
                    setUsuario(unUsuario)
                    listaDepartamentos = await departamentoService.getByPropietarioId(params.id)
                    setDepartamentos(listaDepartamentos)
                }

                if (perfil) {
                    setUsuario(user)
                }

            }
            catch (error) {
                usarSnack(error.response.data, true)
            }
        }

        if (perfil || user?.esAdmin()) {
            fetchUsuario()
        } else {
            history.goBack()
        }
    }, [params.id, creacion, edicion, perfil])


    const crearUsuario = async () => {
        try {
            if (validarUsuario()) {
                await usuarioService.create(usuario)
                setCampoEditado(false)
                history.push("/usuarios", { openChildSnack: true, mensajeChild: "Usuario creado correctamente." })
            } else {
                usarSnack("Campos obligatorios faltantes.", true)
            }
        } catch (error) {
            usarSnack(error.response.data, true)
        }
    }

    const modificarUsuario = async () => {
        try {
            if (validarUsuario()) {
                await usuarioService.update(usuario)
                setCambiosGuardados(true)
                setCampoEditado(false)
                usarSnack("Usuario modificado correctamente", false)
            } else {
                usarSnack("Campos obligatorios faltantes.", true)
            }
        } catch (error) {
            usarSnack(error.response.data, true)
        }
        setCambiosGuardados(false)
    }

    const eliminarUsuario = async () => {
        try {
            await usuarioService.delete(usuario.id)
            history.push("/usuarios", { openChildSnack: true, mensajeChild: "Usuario eliminado correctamente." })
        } catch (error) {
            usarSnack(error.response.data, true)
        }
    }

    const modificarContrasenia = async () => {
        try {
            if (validarNuevaContrasenia()) {
                await usuarioService.updatePassword(usuario.correo, currentPassword, newPassword)
                cleanAndCloseModal()
                usarSnack("Contraseña actualizada correctamente", false)
            } else {
                usarSnack("Verificar los datos ingresados", true)
            }
        } catch (error) {
            console.log(error)
            usarSnack(error.response.data, true)
        }
    }

    const validarUsuario = () => {
        setErrors(null)
        if (!usuario.nombre) {
            setErrors(prev => ({ ...prev, name: "Campo obligatorio" }))
        }

        if (!usuario.apellido) {
            setErrors(prev => ({ ...prev, lastName: "Campo obligatorio" }))
        }

        if (!usuario.dni) {
            setErrors(prev => ({ ...prev, dni: "Campo obligatorio" }))
        }

        if (usuario.dni && !validarDni()) {
            setErrors(prev => ({ ...prev, dni: "El DNI debe contener 7 u 8 digitos." }))
        }

        if (!usuario.telefono) {
            setErrors(prev => ({ ...prev, telefono: "Campo obligatorio" }))
        }

        if (usuario.telefono && !validarTelefono()) {
            setErrors(prev => ({ ...prev, telefono: "El numero de teléfono debe contener 10 digitos." }))
        }

        if (!usuario.correo) {
            setErrors(prev => ({ ...prev, correo: "Campo obligatorio" }))
        }

        if (usuario.correo && !validarCorreo()) {
            setErrors(prev => ({ ...prev, correo: "Introducir un correo electronico correcto." }))
        }

        if (!usuario.fechaNacimiento) {
            setErrors(prev => ({ ...prev, fecha: "Campo obligatorio" }))
        }

        if (!usuario.tipo) {
            setErrors(prev => ({ ...prev, tipo: "Campo obligatorio" }))
        }


        return usuario.nombre && usuario.apellido && usuario.dni && usuario.correo && usuario.fechaNacimiento && usuario.tipo && usuario.telefono && validarDni() && validarCorreo() && validarTelefono()
    }

    const validarDni = () => {
        return usuario.dni.length === 8 || usuario.dni.length === 7
    }

    const validarTelefono = () => {
        return usuario.telefono.length === 10
    }

    const validarCorreo = () => {
        return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(usuario.correo)
    }

    const validarNuevaContrasenia = () => {
        setErrors(null)

        if (!currentPassword) {
            setErrors(prev => ({ ...prev, currentPassword: "Campo obligatorio" }))
        }

        if (!newPassword) {
            setErrors(prev => ({ ...prev, newPassword: "Campo obligatorio" }))
        }

        if (!newPasswordValidator) {
            setErrors(prev => ({ ...prev, newPasswordValidator: "Campo obligatorio" }))
        }

        if (newPassword && newPasswordValidator && !(newPassword === newPasswordValidator)) {
            setErrors(prev => ({ ...prev, newPassword: "Deben coincidir" }))
            setErrors(prev => ({ ...prev, newPasswordValidator: "Deben coincidir" }))
        }

        return currentPassword && newPassword && newPasswordValidator && (newPassword === newPasswordValidator)
    }


    const cleanAndCloseModal = () => {
        setOpenModal(false)
        setNewPassword('')
        setNewPasswordValidator('')
        setCurrentPassword('')
        setErrors(null)
    }

    const bodyModal = (
        edicion ?

            <div style={modalStyle} className={classes.paper}>
                <h2 id="simple-modal-title">¿Estás seguro que querés eliminar este usuario?</h2>
                <p id="simple-modal-description">Esta acción no se puede deshacer.</p>
                <Box display="flex" flexDirection="row" mt={4}>
                    <StyledButtonPrimary onClick={eliminarUsuario}>Eliminar usuario</StyledButtonPrimary>
                    <Link className={classes.linkModal} onClick={() => setOpenModal(false)}>
                        Cancelar
                    </Link>
                </Box>
            </div>

            :

            <div style={modalStyle} className={classes.paper}>
                <h2 id="simple-modal-title">Cambiar contraseña</h2>
                <p id="simple-modal-description">Ingrese su nueva contraseña</p>
                <form className={classes.form} noValidate autoComplete="off">


                    <CompleteInputBox>
                        <span className={classes.span}>Contraseña actual</span>
                        <TextField
                            className={classes.inputs}
                            id="contraseniaActual"
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            name="contraseniaActual"
                            variant="outlined"
                            error={Boolean(errors?.currentPassword)}
                            helperText={errors?.currentPassword}
                            inputProps={{ maxLength: 25 }}
                        />
                    </CompleteInputBox>

                    <CompleteInputBox>
                        <span className={classes.span}>Nueva contraseña</span>
                        <TextField
                            className={classes.inputs}
                            id="nuevaContrasenia"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            name="nuevaContrasenia"
                            variant="outlined"
                            error={Boolean(errors?.newPassword)}
                            helperText={errors?.newPassword}
                            inputProps={{ maxLength: 25 }}
                        />
                    </CompleteInputBox>

                    <CompleteInputBox>
                        <span className={classes.span}>Repetir nueva contraseña</span>
                        <TextField
                            className={classes.inputs}
                            id="repetirNuevaContraseña"
                            type="password"
                            value={newPasswordValidator}
                            onChange={(e) => setNewPasswordValidator(e.target.value)}
                            name="repetirNuevaContraseña"
                            variant="outlined"
                            error={Boolean(errors?.newPasswordValidator)}
                            helperText={errors?.newPasswordValidator}
                            inputProps={{ maxLength: 25 }}
                        />
                    </CompleteInputBox>

                    <Box display="flex" flexDirection="row" mt={4}>
                        <StyledButtonPrimary onClick={modificarContrasenia}>Cambiar contraseña</StyledButtonPrimary>
                        <Link className={classes.linkModal} onClick={() => cleanAndCloseModal()}>
                            Cancelar
                        </Link>
                    </Box>
                </form>
            </div>
    )


    const chevronText = (
        (creacion || edicion) ? "Volver a usuarios" : "Volver atrás"
    )

    const tittleText = () => {
        if (creacion) {
            return "Nuevo usuario"
        }

        if (edicion && user?.esAdminGeneral()) {
            return "Modificar usuario"
        }

        if (perfil) {
            return "Perfil de usuario"
        }

        if (edicion && !user?.esAdminGeneral()) {
            return "Usuario"
        }
    }


    const enterKey = (e) => {
        if (e.key === "Enter") {
            edicion ? modificarUsuario() : crearUsuario()
        }
    }

    return (

        <RootBoxABM>
            <Prompt when={campoEditado} message={"Hay modificaciones sin guardar. ¿Desea salir de todas formas?"} />
            <FormBox>

                <Link className={classes.link} onClick={goBack}>
                    <Chevron className={classes.chevron} />
                    {chevronText}
                </Link>

                <Typography component="h2" variant="h5" className="tittle">
                    {tittleText()}
                </Typography>

                <form className={classes.form} noValidate autoComplete="off">
                    <LeftInputBox>
                        <span className={user?.esAdminGeneral() ? "spanTitle" : "spanTitleGrey"}>Nombre</span>
                        {user?.esAdminGeneral()
                            ? <TextField
                                className={classes.inputs}
                                id="nombre"
                                value={usuario?.nombre || ''}
                                onChange={(event) => updateValue(event)}
                                name="nombre"
                                variant="outlined"
                                error={Boolean(errors?.name)}
                                helperText={errors?.name}
                                inputProps={{ maxLength: 15 }}
                                onKeyDown={(e) => { enterKey(e) }}
                            />
                            : <span className="spanNormal">{usuario?.nombre || ''}</span>
                        }
                    </LeftInputBox>

                    <RightInputBox>
                        <span className={user?.esAdminGeneral() ? "spanTitle" : "spanTitleGrey"} >Apellido</span>
                        {user?.esAdminGeneral()
                            ? <TextField
                                className={classes.inputs}
                                id="apellido"
                                value={usuario?.apellido || ''}
                                onChange={(event) => updateValue(event)}
                                name="apellido"
                                variant="outlined"
                                error={Boolean(errors?.lastName)}
                                helperText={errors?.lastName}
                                inputProps={{ maxLength: 25 }}
                                onKeyDown={(e) => { enterKey(e) }}
                            />
                            : <span className="spanNormal">{usuario?.apellido || ''}</span>
                        }

                    </RightInputBox>

                    <LeftInputBox>
                        <span className={user?.esAdminGeneral() ? "spanTitle" : "spanTitleGrey"}>DNI</span>
                        {user?.esAdminGeneral()
                            ? <TextField
                                className={classes.inputs}
                                id="dni" value={usuario?.dni || ''}
                                onChange={(event) => updateValue(event)}
                                name="dni"
                                variant="outlined"
                                error={Boolean(errors?.dni)}
                                helperText={errors?.dni}
                                inputProps={{ maxLength: 8 }}
                                onInput={handleOnlyNumbers}
                                onKeyDown={(e) => { enterKey(e) }}
                            />
                            : <span className="spanNormal">{usuario?.dni || ''}</span>
                        }

                    </LeftInputBox>

                    <RightInputBox>
                        <span className={user?.esAdminGeneral() ? "spanTitle" : "spanTitleGrey"}>E-mail</span>
                        {user?.esAdminGeneral()
                            ? <TextField
                                className={classes.inputs}
                                id="correo" value={usuario?.correo || ''}
                                onChange={(event) => updateValue(event)}
                                name="correo"
                                variant="outlined"
                                type="email"
                                error={Boolean(errors?.correo)}
                                helperText={errors?.correo}
                                inputProps={{ maxLength: 50 }}
                                onKeyDown={(e) => { enterKey(e) }}
                            />
                            : <span className="spanNormal">{usuario?.correo || ''}</span>
                        }

                    </RightInputBox>

                    <LeftInputBox>
                        <span className={user?.esAdminGeneral() ? "spanTitle" : "spanTitleGrey"}>Fecha de nacimiento</span>
                        {user?.esAdminGeneral()
                            ? <TextField
                                className={classes.inputs}
                                id="fechaNacimiento"
                                value={usuario?.fechaNacimiento || ''}
                                onChange={(event) => updateValue(event)}
                                name="fechaNacimiento"
                                type="date"
                                variant="outlined"
                                error={Boolean(errors?.fecha)}
                                helperText={errors?.fecha}
                                onKeyDown={(e) => { enterKey(e) }}
                                InputProps={{ inputProps: { min: fechaMinNacimiento(), max: fechaMaxNacimiento() } }}
                            />
                            : <span className="spanNormal">{usuario?.fechaNacimiento || ''}</span>
                        }

                    </LeftInputBox>
                    {
                        !perfil &&

                        <RightInputBox>
                            <span className={user?.esAdminGeneral() ? "spanTitle" : "spanTitleGrey"}>Tipo de usuario</span>
                            {user?.esAdminGeneral()
                                ? <Select
                                    className={classes.textFieldSelect}
                                    id="tipoUsuario"
                                    select
                                    onChange={handleChangeType}
                                    value={usuario?.tipo || ''}
                                    error={Boolean(errors?.tipo)}
                                    helperText={errors?.tipo}
                                    variant="outlined"
                                    onKeyDown={(e) => { enterKey(e) }}
                                    inputProps={{ classes: { select: classes.select } }}
                                >
                                    {
                                        tiposDeUsuario.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                                : <span className="spanNormal">{usuario?.tipo || ''}</span>
                            }
                        </RightInputBox>
                    }
                    {edicion && !creacion && departamentos.length > 0 &&
                        <LeftInputBox>
                            <span className={classes.spanDisabled}>Piso y departamento</span>
                            {
                                departamentos.map((departamento) => (
                                    <span style={{ marginBottom: 6 }} key={departamento.id} className={classes.inputsDisabled}>{(departamento.piso + " " + departamento.nroDepartamento) || ''}</span>
                                ))
                            }
                        </LeftInputBox>
                    }

                    <RightInputBox>
                        <span className={user?.esAdminGeneral() ? "spanTitle" : "spanTitleGrey"}>Teléfono</span>
                        {user?.esAdminGeneral()
                            ? <TextField
                                className={classes.inputs}
                                id="telefono" value={usuario?.telefono || ''}
                                onChange={(event) => updateValue(event)}
                                name="telefono"
                                variant="outlined"
                                error={Boolean(errors?.telefono)}
                                helperText={errors?.telefono}
                                inputProps={{ maxLength: 10 }}
                                onInput={handleOnlyNumbers}
                                onKeyDown={(e) => { enterKey(e) }}
                            />
                            : <span className="spanNormal">{usuario?.telefono || ''}</span>
                        }

                    </RightInputBox>


                </form>

            </FormBox>

            <RightFormBox>
                {creacion &&
                    <ButtonBox>
                        <StyledButtonPrimary className={classes.botones} onClick={() => crearUsuario()} >Crear usuario</StyledButtonPrimary>
                        <StyledButtonSecondary className={classes.botones} onClick={goBack}>Cancelar</StyledButtonSecondary>
                    </ButtonBox>
                }


                {!creacion &&
                    <ButtonBox>
                        {campoEditado &&
                            <StyledButtonPrimary className={classes.botones} onClick={modificarUsuario}>Guardar cambios</StyledButtonPrimary>
                        }
                        {!campoEditado &&
                            <StyledButtonPrimary className={classes.botonesDisabled} disabled>Guardar cambios</StyledButtonPrimary>
                        }
                        {edicion && user?.esAdminGeneral() &&
                            <StyledButtonSecondary className={classes.botones} onClick={popupModal}>Eliminar usuario</StyledButtonSecondary>
                        }
                        {perfil &&
                            <StyledButtonPrimary className={classes.botones} onClick={popupModal}>Cambiar contraseña</StyledButtonPrimary>
                        }
                        {/* <StyledButtonSecondary className={classes.botones} onClick={goBack}>Cancelar</StyledButtonSecondary> */}

                    </ButtonBox>
                }

                <Divider className={classes.divider} />

                {edicion && !creacion &&
                    <Historial tipo="USUARIO" id={params.id} update={cambiosGuardados} />
                }

            </RightFormBox>

            <SnackbarComponent snackColor={snackColor} openSnackbar={openSnackbar} mensajeSnack={mensajeSnack} handleCloseSnack={() => setOpenSnackbar(false)} />

            <ModalComponent openModal={openModal} bodyModal={bodyModal} handleCloseModal={() => cleanAndCloseModal()} />

        </RootBoxABM>

    )
}


