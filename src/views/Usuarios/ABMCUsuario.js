import React, { useEffect, useState } from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import { StyledButtonPrimary, StyledButtonSecondary } from '../../components/Buttons'
import { useHistory, useParams } from 'react-router-dom';
import { Link, TextField, MenuItem, Divider, Box } from '@material-ui/core';
import { usuarioService } from "../../services/usuarioService";
import { Historial } from '../../components/Historial'
import { SnackbarComponent } from '../../components/Snackbar'
import { ModalComponent } from '../../components/Modal'
import { Chevron } from '../../assets/icons';
import { Usuario } from '../../domain/usuario';
import update from 'immutability-helper';

const useStyles = makeStyles ({
    root: {
      display: 'flex',
      marginLeft: 300,
      flexDirection: "row",
      height: "100%",
      boxSizing: "unset"
    },
    tittle:{
        textAlign: "left",
    },
    contenedorForm:{
        paddingTop:30,
        display:"flex",
        width: "100%",
        flexDirection: "column",
        paddingRight: 50
    },
    buttonLog:{
        paddingTop:30,
        display:"flex",
        backgroundColor: "white",
        height: "100%",
        width: "600px",
        flexDirection: "column"
    },
    link:{
        color: "#159D74",
        textAlign:"left",
        marginBottom: 20,
        cursor: "pointer",
    },
    linkModal:{
        color: "#159D74",
        textAlign:"left",
        marginLeft: 50,
        marginTop: 10,
        cursor: "pointer",
        fontWeight: 600
    },
    form:{
        display:"flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: 30,
        
    },
    inputs:{
        backgroundColor: "white",
        textAlign: "left"
    },
    contenedorInput:{
        display: "flex",
        flexDirection: "column",
        flex: "50%",
        maxWidth: 400,
        marginBottom: 50,
    },
    contenedorInputDerecha:{
        display: "flex",
        flexDirection: "column",
        flex: "50%",
        maxWidth: 400,
        marginBottom: 50,
    },
    span:{
        textAlign:"left",
        marginLeft: 10,
        marginBottom: 6
    },
    botones:{
        display: "flex",
        marginTop: 10,
    },
    contenedorBotones:{
        display: "flex",
        flexDirection: "column",
        margin: "10px 50px"
    },
    divider: {
        marginTop: 40
      },
    inputsDisabled:{
        textAlign: "left",
        marginLeft: 10
    },
    spanDisabled:{
        textAlign:"left",
        marginLeft: 10,
        marginBottom: 6,
        color: "grey"
    },
    botonesDisabled:{
        background: "rgba(0, 0, 0 ,10%)",
    },
    chevron:{
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

export const ABMCUsuario = ({edicion, creacion}) =>{
    const classes = useStyles();
    const [usuario, setUsuario] = useState('')
    const [tipoUsuario, setTipoUsuario] = useState('')
    const [campoEditado, setCampoEditado] = useState(false)
    const [cambiosGuardados, setCambiosGuardados] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [openSnackbar, setOpenSnackbar] = useState('')
    const [mensajeSnack, setMensajeSnack] = useState()
    const [snackColor, setSnackColor] = useState()
    const [modalStyle] = useState(getModalStyle);
    const [departamentos, setDepartamentos] = useState([])

    let history = useHistory()
    const params = useParams()

    const fetchUsuario = async () =>{
        try{
            let unUsuario
            if(creacion){
                unUsuario = new Usuario()
            } else{
                let listaDepartamentos
                unUsuario = await usuarioService.getById(params.id)
                listaDepartamentos = await departamentoService.getByPropietarioId(params.id)
                setDepartamentos(listaDepartamentos)
            }
            setUsuario(unUsuario)
            setTipoUsuario(unUsuario.tipo) 
            }
        catch{

        }
    }

    const actualizarValor = (event) => {
        const newState = update(usuario, {
            [event.target.id]: { $set: event.target.value}
        })
        setUsuario(newState)
        setCampoEditado(true)
    }

    const backToUsers = () =>{
        history.push("/usuarios")
    }

    const popupModal = () =>{
        setOpenModal(true)
    }

    const handleChangeType = (event) => {
        usuario.tipo = event.target.value
        setTipoUsuario(event.target.value);
        setCampoEditado(true)
      };
    
    useEffect( ()  =>  {
        fetchUsuario()
    },[])

    const crearUsuario = async () => {
        try{
            if(validarUsuario()){
                await usuarioService.create(usuario)
                history.push("/usuarios", { openChildSnack : true, mensajeChild: "Usuario creado correctamente."})    
            }else{
                usarSnack("Campos obligatorios faltantes.", true)
            }
        } catch (error) {
            usarSnack("No se puede conectar con el servidor.", true)
        }
    }

    const modificarUsuario = async () => {
        try {
            if (validarUsuario()){
                await usuarioService.update(usuario)
                setCambiosGuardados(true)
                setCampoEditado(false)
                usarSnack("Usuario modificado correctamente", false)
            }else{
                usarSnack("Campos obligatorios faltantes.", true)
            }
        }catch(errorRecibido){
            usarSnack("No se puede conectar con el servidor.", true)
        }
        setCambiosGuardados(false)
    }

    const eliminarUsuario = async () => {
        try {
            await usuarioService.delete(usuario.id)
            history.push("/usuarios", { openChildSnack : true, mensajeChild: "Usuario eliminado correctamente."}) 
        }catch(errorRecibido){
            usarSnack("No se puede conectar con el servidor.", true)
        }
    }

    const validarUsuario = () =>{
        return usuario.nombre && usuario.apellido && usuario.dni && usuario.correo
    }

    const usarSnack = (mensaje, esError) =>{
        if(esError){
            setSnackColor("#F23D4F")
        }else{
            setSnackColor("#00A650")
        }
        setMensajeSnack(mensaje)
        setOpenSnackbar(true)
    }

    const bodyModal = (
      
            <div style={modalStyle} className={classes.paper}>
                        <h2 id="simple-modal-title">¿Estás seguro que querés eliminar este usuario?</h2>
                        <p id="simple-modal-description">Esta acción no se puede deshacer.</p>
                        <Box display="flex" flexDirection="row" mt={4}>
                            <StyledButtonPrimary onClick={ eliminarUsuario }>Eliminar usuario</StyledButtonPrimary>
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
                    <Chevron className={classes.chevron}/>
                    Volver a usuarios
                </Link>
                { creacion &&
                    <Typography component="h2" variant="h5" className={classes.tittle}>
                        Nuevo usuario
                     </Typography>
                }
                
                { !creacion && edicion &&
                    <Typography component="h2" variant="h5" className={classes.tittle}>
                    Modificar usuario
                    </Typography>
                }
        
                <form className={classes.form} noValidate autoComplete="off">
                    <div className={classes.contenedorInput}>
                        <span className={classes.span}>Nombre</span>
                        <TextField className={classes.inputs} id="nombre" value={usuario.nombre || ''} onChange={(event) => actualizarValor(event)} name="nombre" variant="outlined" />
                    </div>

                    <div className={classes.contenedorInputDerecha}>
                        <span className={classes.span} >Apellido</span>
                        <TextField className={classes.inputs} id="apellido" value={usuario.apellido || ''} onChange={(event) => actualizarValor(event)} name="apellido" variant="outlined" />
                    </div>

                    <div className={classes.contenedorInput}>
                        <span className={classes.span}>DNI</span>
                        <TextField className={classes.inputs} id="dni" value={usuario.dni || ''} onChange={(event) => actualizarValor(event)} name="dni"  variant="outlined" type="number"/>
                    </div>

                    <div className={classes.contenedorInputDerecha}>
                        <span className={classes.span}>E-mail</span>
                        <TextField className={classes.inputs} id="correo" value={usuario.correo || ''} onChange={(event) => actualizarValor(event)} name="correo"  variant="outlined" />
                    </div>

                    <div className={classes.contenedorInput}>
                        <span className={classes.span}>Fecha de nacimiento</span>
                        <TextField className={classes.inputs} id="fechaNacimiento" value={usuario.fechaNacimiento || ''} onChange={(event) => actualizarValor(event)} name="fechaNacimiento" type="date" variant="outlined" />
                    </div>

                    <div className={classes.contenedorInputDerecha}>
                        <span className={classes.span}>Tipo de usuario</span>
                        <TextField className={classes.inputs} id="tipoUsuario" select onChange={ handleChangeType } value={usuario.tipo || ''} variant="outlined" >
                                {tiposDeUsuario.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    
                    { edicion && !creacion && departamentos.length > 0 &&
                    <div className={classes.contenedorInput}>
                        <span className={classes.spanDisabled}>Piso</span>
                        {
                            departamentos.map((departamento)=>(
                                <span style={{ marginBottom : 6}} key={departamento.id} className={classes.inputsDisabled}>{departamento.piso || ''}</span>
                            ))
                        }
                    </div>
                    }
                    
                    { edicion && !creacion && departamentos.length > 0 &&
                    <div className={classes.contenedorInputDerecha}>
                        <span className={classes.spanDisabled}>Departamento</span>
                               {
                            departamentos.map((departamento)=>(
                                <span style={{ marginBottom : 6}} key={departamento.id} className={classes.inputsDisabled}>{departamento.nroDepartamento || ''}</span>
                            ))
                        }
                    </div>
                    }
                </form> 
                      
            </div>

            <div className={classes.buttonLog}>
                { creacion &&
                <div className={classes.contenedorBotones}>
                    <StyledButtonPrimary className={classes.botones} onClick={() => crearUsuario() } >Crear usuario</StyledButtonPrimary>
                    <StyledButtonSecondary className={classes.botones} onClick={ backToUsers }>Cancelar</StyledButtonSecondary>
                </div>
                }
                { edicion && !creacion &&
                <div className={classes.contenedorBotones}>
                    {campoEditado &&
                        <StyledButtonPrimary className={classes.botones} onClick={ modificarUsuario }>Guardar cambios</StyledButtonPrimary>
                    }   
                    {!campoEditado &&
                        <StyledButtonPrimary className={classes.botonesDisabled} disabled>Guardar cambios</StyledButtonPrimary>
                    }
                    <StyledButtonSecondary className={classes.botones} onClick={ popupModal }>Eliminar usuario</StyledButtonSecondary>
                </div>
                }
                <Divider className={classes.divider} />
                
                { edicion && !creacion &&
                    <Historial tipo="USUARIO" id={params.id} update={cambiosGuardados}/>
                }

            </div>

            <SnackbarComponent snackColor={snackColor} openSnackbar={openSnackbar} mensajeSnack={mensajeSnack} handleCloseSnack={() => setOpenSnackbar(false)}/>
                
            <ModalComponent openModal={openModal} bodyModal={bodyModal} handleCloseModal={ () => setOpenModal(false) }/>
            
         </div>

    )
}
 

