import React, { useEffect, useState } from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import { StyledButtonPrimary, StyledButtonSecondary } from '../../components/Buttons'
import { useHistory, useParams } from 'react-router-dom';
import { Link, TextField, MenuItem, Divider, Box } from '@material-ui/core';
import { departamentoService } from "../../services/departamentoService";
import { Historial } from '../../components/Historial'
import { SnackbarComponent } from '../../components/Snackbar'
import { ModalComponent } from '../../components/Modal'
import { Chevron } from '../../assets/icons';
import { Departamento } from '../../domain/departamento';
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
        marginBottom: 50,
    },
    contenedorInputDerecha: {
        display: "flex",
        flexDirection: "column",
        flex: "50%",
        maxWidth: 400,
        marginBottom: 50,
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
    const [openModal, setOpenModal] = useState(false)
    const [openSnackbar, setOpenSnackbar] = useState('')
    const [mensajeSnack, setMensajeSnack] = useState()
    const [snackColor, setSnackColor] = useState()
    const [modalStyle] = useState(getModalStyle);
    const [usuarios, setUsuarios] = useState('')
     // A MODIFICAR PARA EL FINAL
    const [propietarioId, setPropietarioId] = useState(null)
    const [inquilinoId, setInquilinoId] = useState(null)
    const [propDepto, setPropDepto] = useState('')
    const [inqDepto,setInqDepto] = useState('')


    let history = useHistory()
    const params = useParams()

    const fetchDepartamento = async () => {
        try {
            let unDepartamento
            if (creacion) {
                unDepartamento = new Departamento()
            } else {
                unDepartamento = await departamentoService.getById(params.id)
            }
            if(unDepartamento)setearEstados(unDepartamento)
        }
        catch(error) {
            //  usarSnack(error.response.data, true)
        }
    }

     // A MODIFICAR PARA EL FINAL
    const setearEstados = (depto) => {
        setDepartamento(depto)
        setPropDepto(depto.propietario)
        setInqDepto(depto.inquilino)
        setPropietarioId(depto.propietario.id)
        setInquilinoId(depto.inquilino.id)
    }

    const fetchAllUsers = async (textoBusqueda) => {
        const usuariosEncontrados = await usuarioService.getBySearch(textoBusqueda)
        setUsuarios(usuariosEncontrados)
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

    const popupModal = () => {
        setOpenModal(true)
    }

    useEffect(() => {
        fetchDepartamento()
        fetchAllUsers('')
    }, [])

    const crearDepartamento = async () => {
        try {

            if (validarDepartamento()) {        
                await departamentoService.create(departamento, propDepto)
                history.push("/departamentos", { openChildSnack: true, mensajeChild: "Departamento creado correctamente."})
            } else {
                usarSnack("Campos obligatorios faltantes.", true)
            }
        } catch (error) {
            usarSnack(error.response.data, true)
        }
    }

    const modificarDepartamento = async () => {
        try {
            if (validarDepartamento()){
                await departamentoService.update(departamento,propDepto, inqDepto)
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
            history.push("/departamentos", { openChildSnack: true, mensajeChild: "Departamento eliminado correctamente."})
        } catch (error) {
            usarSnack(error.response.data, true)
        }
    }

    const validarDepartamento = () => {
        return departamento.nroDepartamento && departamento.torre && departamento.piso && departamento.metrosCuadrados
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


     // A MODIFICAR PARA EL FINAL
    const changePropietario = (event) => {
        
        setPropietarioId(event.target.value)  
        setCampoEditado(true)     
        setPropDepto( selectUsuario(event.target.value) )
    }

     // A MODIFICAR PARA EL FINAL
    const changeInquilino = (event) => {
        setInquilinoId(event.target.value)
        setCampoEditado(true)
        setInqDepto( selectUsuario(event.target.value) )
    }

     // A MODIFICAR PARA EL FINAL
    const selectUsuario = (pos) => {
        return [...usuarios].filter(us => us.id === pos)
    }

    const bodyModal = (

        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">¿Estás seguro que querés eliminar este departamento?</h2>
            <p id="simple-modal-description">Esta acción no se puede deshacer.</p>
            <Box display="flex" flexDirection="row" mt={4}>
                <StyledButtonPrimary onClick={eliminarDepartamento}>Eliminar departamento</StyledButtonPrimary>
                <Link className={classes.linkModal} onClick={() => setOpenModal(false)}>
                    Cancelar
                </Link>
            </Box>
        </div>
    )

    return (

        <div className={classes.root} >
            <div className={classes.contenedorForm}>
                <Link className={classes.link} onClick={backToUsers}>
                    <Chevron className={classes.chevron} />
                    Volver a departamentos
                </Link>
                {creacion &&
                    <Typography component="h2" variant="h5" className={classes.tittle}>
                        Nuevo departamento
                    </Typography>
                }

                {!creacion && edicion &&
                    <Typography component="h2" variant="h5" className={classes.tittle}>
                        Modificar departamento
                    </Typography>
                }

                <form className={classes.form} noValidate autoComplete="off">

                <div className={classes.contenedorInput}>
                        <span className={classes.span}>Piso</span>
                        <TextField className={classes.inputs} id="piso" value={departamento.piso || ''} onChange={(event) => actualizarValor(event)} name="piso" variant="outlined" />
                    </div>
                    
                    
                    <div className={classes.contenedorInputDerecha}>
                        <span className={classes.span}>Departamento</span>
                        <TextField className={classes.inputs} id="nroDepartamento" value={departamento.nroDepartamento || ''} onChange={(event) => actualizarValor(event)} name="nroDepartamento" variant="outlined" />
                    </div>

                    <div className={classes.contenedorInput}>
                        <span className={classes.span} >Torre</span>
                        <TextField className={classes.inputs} id="torre" value={departamento.torre || ''} onChange={(event) => actualizarValor(event)} name="torre" variant="outlined" />
                    </div>

                    <div className={classes.contenedorInputDerecha}>
                        <span className={classes.span}>Superficie (m2)</span>
                        <TextField className={classes.inputs} id="metrosCuadrados" value={departamento.metrosCuadrados || ''} onChange={(event) => actualizarValor(event)} name="metrosCuadrados" variant="outlined" type="number"/>
                    </div>

                    {usuarios && departamento &&
                        <div className={classes.contenedorInput}>
                            <span className={classes.span}>Propietario</span>
                            {departamento &&
                                <TextField className={classes.inputs} id="propietario" select value={propietarioId || ''} onChange={changePropietario} name="propietario" variant="outlined" >
                                    {usuarios.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.id}.  {option.nombre} {option.apellido}
                                        </MenuItem>
                                    ))}
                                </TextField>}
                        </div>
                    }

                    <div className={classes.contenedorInputDerecha}>
                        <span className={classes.span}>Porcentaje de expensas (%)</span>
                        <TextField className={classes.inputs} id="porcentajeExpensa" onChange={(event) => actualizarValor(event)} value={departamento.porcentajeExpensa || ''} name="porcentajeExpensa" variant="outlined" type="number" />
                    </div>

                     
                    { usuarios && departamento && edicion && !creacion &&
                    <div className={classes.contenedorInput}>
                        <span className={classes.span}>Inquilino</span>
                        {departamento && <TextField className={classes.inputInquilino} id="inquilino" select value={inquilinoId || ''} onChange={changeInquilino} name="inquilino" variant="outlined" >
                        <MenuItem key={0} value={null}>
                                        Sin Inquilino
                                    </MenuItem>
                            {usuarios && usuarios.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                        {option.id} {option.nombre} {option.apellido}
                                    </MenuItem>
                                ))}
                        </TextField> }
                    </div> } 

                    {edicion && !creacion &&
                        <div className={classes.contenedorInput}>
                            {/* <span className={classes.spanDisabled}></span>
                        <span className={classes.inputsDisabled}></span> */}
                        </div>
                    }
                </form>

            </div>

            <div className={classes.buttonLog}>
                {creacion &&
                    <div className={classes.contenedorBotones}>
                        <StyledButtonPrimary className={classes.botones} onClick={() => crearDepartamento()} >Crear departamento</StyledButtonPrimary>
                        <StyledButtonSecondary className={classes.botones} onClick={backToUsers}>Cancelar</StyledButtonSecondary>
                    </div>
                }
                {edicion && !creacion && propDepto &&
                    <div className={classes.contenedorBotones}>
                        {campoEditado &&
                            <StyledButtonPrimary className={classes.botones} onClick={modificarDepartamento}>Guardar cambios</StyledButtonPrimary>
                        }
                        {!campoEditado &&
                            <StyledButtonPrimary className={classes.botonesDisabled} disabled>Guardar cambios</StyledButtonPrimary>
                        }
                        <StyledButtonSecondary className={classes.botones} onClick={popupModal}>Eliminar Departamento</StyledButtonSecondary>
                    </div>
                }
                <Divider className={classes.divider} />
                
                { edicion && !creacion &&
                    <Historial tipo="DEPARTAMENTO" id={params.id} update={cambiosGuardados}/>
                }

            </div>

            <SnackbarComponent snackColor={snackColor} openSnackbar={openSnackbar} mensajeSnack={mensajeSnack} handleCloseSnack={() => setOpenSnackbar(false)} />

            <ModalComponent openModal={openModal} bodyModal={bodyModal} handleCloseModal={() => setOpenModal(false)} />

        </div>

    )
}


