import React, { useEffect, useState } from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import { StyledButtonPrimary, StyledButtonSecondary } from '../../components/Buttons'
import { useHistory, useParams, Prompt } from 'react-router-dom';
import { Link, TextField, MenuItem, Divider, Box } from '@material-ui/core';
import { departamentoService } from "../../services/departamentoService";
import { Historial } from '../../components/Historial'
import { SnackbarComponent } from '../../components/Snackbar'
import { ModalComponent } from '../../components/Modal'
import { Chevron } from '../../assets/icons';
import { Departamento } from '../../domain/departamento';
import update from 'immutability-helper';
import { usuarioService } from '../../services/usuarioService';
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
    inputInquilino: {
        backgroundColor: "white",
        textAlign: "left"
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

export const ABMCDepartamento = ({ edicion, creacion }) => {
    const classes = useStyles();
    const [departamento, setDepartamento] = useState('')
    const [campoEditado, setCampoEditado] = useState(false)
    const [cambiosGuardados, setCambiosGuardados] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const { openSnackbar, setOpenSnackbar, mensajeSnack, usarSnack, snackColor } = useSnack();
    const [modalStyle] = useState(getModalStyle);
    const [usuarios, setUsuarios] = useState([])
    const [inquilinos, setInquilinos] = useState([])
    const [propietarioId, setPropietarioId] = useState(null)
    const [inquilinoId, setInquilinoId] = useState(null)


    let history = useHistory()
    const params = useParams()

    useEffect(() => {
        const fetchDepartamento = async () => {
            try {
                let unDepartamento
                if (creacion) {
                    unDepartamento = new Departamento()
                } else {
                    unDepartamento = await departamentoService.getById(params.id)
                    setPropietarioId(unDepartamento.propietario.id)
                    if (unDepartamento.inquilino) {
                        setInquilinoId(unDepartamento.inquilino.id)
                    }
                }
                setDepartamento(unDepartamento)

            }
            catch (error) {
                usarSnack(error.response.data, true)
            }
        }

        fetchDepartamento()
        fetchAllUsers('')
        fetchAllInquilinos()
    }, [params.id, creacion])


    const fetchAllUsers = async (textoBusqueda) => {
        const usuariosEncontrados = await usuarioService.getBySearch(textoBusqueda)
        setUsuarios(usuariosEncontrados)
    }

    const fetchAllInquilinos = async () => {
        const usuariosEncontrados = await usuarioService.getInquilinos()
        setInquilinos(usuariosEncontrados)
        console.log(usuariosEncontrados)
    }

    const actualizarValor = (event) => {
        const newState = update(departamento, {
            [event.target.id]: { $set: event.target.value }
        })
        setDepartamento(newState)
        setCampoEditado(true)
    }

    const backToUsers = () => {
        history.push("/departamentos")
    }

    const popupModalDelete = () => {
        setOpenModalDelete(true)
    }

    const crearDepartamento = async () => {
        try {

            if (validarDepartamento()) {
                await departamentoService.create(departamento, propietarioId)
                setCampoEditado(false)
                history.push("/departamentos", { openChildSnack: true, mensajeChild: "Departamento creado correctamente." })
            } else {
                usarSnack("Campos obligatorios faltantes.", true)
            }
        } catch (error) {
            usarSnack(error.response.data, true)
        }
    }

    const modificarDepartamento = async () => {
        try {
            if (validarDepartamento()) {
                await departamentoService.update(departamento, propietarioId, inquilinoId)
                setCambiosGuardados(true)
                setCampoEditado(false)
                usarSnack("Departamento modificado correctamente", false)
            } else {
                usarSnack("Campos obligatorios faltantes.", true)
            }
        } catch (error) {
            usarSnack(error.response.data, true)
        }
        setCambiosGuardados(false)
    }

    const eliminarDepartamento = async () => {
        try {
            await departamentoService.delete(departamento.id)
            history.push("/departamentos", { openChildSnack: true, mensajeChild: "Departamento eliminado correctamente." })
        } catch (error) {
            usarSnack(error.response.data, true)
        }
    }

    const validarDepartamento = () => {
        return departamento.nroDepartamento && departamento.torre && departamento.piso && departamento.metrosCuadrados
    }

    const changePropietario = (event) => {
        setPropietarioId(event.target.value)
        setCampoEditado(true)
    }

    const changeInquilino = (event) => {
        setInquilinoId(event.target.value)
        setCampoEditado(true)
    }

    const bodyModalDelete = (

        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">¿Estás seguro que querés eliminar este departamento?</h2>
            <p id="simple-modal-description">Esta acción no se puede deshacer.</p>
            <Box display="flex" flexDirection="row" mt={4}>
                <StyledButtonPrimary onClick={eliminarDepartamento}>Eliminar departamento</StyledButtonPrimary>
                <Link className={classes.linkModal} onClick={() => setOpenModalDelete(false)}>
                    Cancelar
                </Link>
            </Box>
        </div>
    )

    return (
        <RootBoxABM>
            <Prompt when={campoEditado} message={"Hay modificaciones sin guardar. ¿Desea salir de todas formas?"} />
                <FormBox>
                    <Link className={classes.link} onClick={backToUsers}>
                        <Chevron className={classes.chevron} />
                        Volver a departamentos
                    </Link>
                    {creacion &&
                        <Typography component="h2" variant="h5" className="tittle">
                            Nuevo departamento
                        </Typography>
                    }

                    {!creacion && edicion &&
                        <Typography component="h2" variant="h5" className="tittle">
                            Modificar departamento
                        </Typography>
                    }

                    <form className={classes.form} noValidate autoComplete="off">

                        <LeftInputBox>
                            <span className={classes.span}>Piso</span>
                            <TextField className={classes.inputs} id="piso" value={departamento.piso || ''} onChange={(event) => actualizarValor(event)} name="piso" variant="outlined" />
                        </LeftInputBox>


                        <RightInputBox>
                            <span className={classes.span}>Departamento</span>
                            <TextField className={classes.inputs} id="nroDepartamento" value={departamento.nroDepartamento || ''} onChange={(event) => actualizarValor(event)} name="nroDepartamento" variant="outlined" />
                        </RightInputBox>

                        <LeftInputBox>
                            <span className={classes.span} >Torre</span>
                            <TextField className={classes.inputs} id="torre" value={departamento.torre || ''} onChange={(event) => actualizarValor(event)} name="torre" variant="outlined" />
                        </LeftInputBox>

                        <RightInputBox>
                            <span className={classes.span}>Superficie (m2)</span>
                            <TextField className={classes.inputs} id="metrosCuadrados" value={departamento.metrosCuadrados || ''} onChange={(event) => actualizarValor(event)} name="metrosCuadrados" variant="outlined" type="number" />
                        </RightInputBox>

                        {usuarios && departamento &&
                            <LeftInputBox>
                                <span className={classes.span}>Propietario</span>
                                {departamento &&
                                    <TextField className={classes.inputs} id="propietario" select value={propietarioId || ''} onChange={changePropietario} name="propietario" variant="outlined" >
                                        {usuarios.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.id}.  {option.nombre} {option.apellido}
                                            </MenuItem>
                                        ))}
                                    </TextField>}
                            </LeftInputBox>
                        }

                        <RightInputBox>
                            <span className={classes.span}>Porcentaje de expensas (%)</span>
                            <TextField className={classes.inputs} id="porcentajeExpensa" onChange={(event) => actualizarValor(event)} value={departamento.porcentajeExpensa || ''} name="porcentajeExpensa" variant="outlined" type="number" />
                        </RightInputBox>


                        {inquilinos && departamento && edicion && !creacion &&
                            <LeftInputBox>
                                <span className={classes.span}>Inquilino</span>
                                {departamento && <TextField className={classes.inputInquilino} id="inquilino" select value={inquilinoId || ''} onChange={changeInquilino} name="inquilino" variant="outlined" >
                                    <MenuItem key={0} value={null}>
                                        Sin Inquilino
                                    </MenuItem>
                                    {inquilinos && inquilinos.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.id}. {option.nombre} {option.apellido}
                                        </MenuItem>
                                    ))}
                                </TextField>}
                            </LeftInputBox>}

                    </form>

                </FormBox>

                <RightFormBox>
                    {creacion &&
                        <ButtonBox>
                            <StyledButtonPrimary className={classes.botones} onClick={() => crearDepartamento()} >Crear departamento</StyledButtonPrimary>
                            <StyledButtonSecondary className={classes.botones} onClick={backToUsers}>Cancelar</StyledButtonSecondary>
                        </ButtonBox>
                    }
                    {edicion && !creacion && propietarioId &&
                        <ButtonBox>
                            {campoEditado &&
                                <StyledButtonPrimary className={classes.botones} onClick={modificarDepartamento}>Guardar cambios</StyledButtonPrimary>
                            }
                            {!campoEditado &&
                                <StyledButtonPrimary className={classes.botonesDisabled} disabled>Guardar cambios</StyledButtonPrimary>
                            }
                            <StyledButtonSecondary className={classes.botones} onClick={popupModalDelete}>Eliminar Departamento</StyledButtonSecondary>
                        </ButtonBox>
                    }
                    <Divider className={classes.divider} />

                    {edicion && !creacion &&
                        <Historial tipo="DEPARTAMENTO" id={params.id} update={cambiosGuardados} />
                    }

                </RightFormBox>

                <SnackbarComponent snackColor={snackColor} openSnackbar={openSnackbar} mensajeSnack={mensajeSnack} handleCloseSnack={() => setOpenSnackbar(false)} />

                <ModalComponent openModal={openModalDelete} bodyModal={bodyModalDelete} handleCloseModal={() => setOpenModalDelete(false)} />

        </RootBoxABM>

    )
}


