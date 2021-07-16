import React, { useEffect, useState } from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import { StyledButtonPrimary, StyledButtonSecondary } from '../../components/Buttons'
import { useHistory, useParams } from 'react-router-dom';
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
import { ButtonBox, FormBox, LeftInputBox, RightFormBox, RightInputBox, RootBoxABM } from '../../components/Contenedores';

const useStyles = makeStyles ({
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
    span:{
        textAlign:"left",
        marginLeft: 10,
        marginBottom: 6
    },
    botones:{
        display: "flex",
        marginTop: 10,
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
    const [campoEditado, setCampoEditado] = useState(false)
    const [cambiosGuardados, setCambiosGuardados] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const { openSnackbar, setOpenSnackbar, mensajeSnack, usarSnack, snackColor } = useSnack();
    const [modalStyle] = useState(getModalStyle);
    const [departamentos, setDepartamentos] = useState([])

    let history = useHistory()
    const params = useParams()


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
        setCampoEditado(true)
      };
    
    useEffect( ()  =>  {
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
                }
            catch(error){
                usarSnack(error.response.data, true)
            }
        }

        fetchUsuario()
    },[params.id, creacion])

    const crearUsuario = async () => {
        try{
            if(validarUsuario()){
                await usuarioService.create(usuario)
                history.push("/usuarios", { openChildSnack : true, mensajeChild: "Usuario creado correctamente."})    
            }else{
                usarSnack("Campos obligatorios faltantes.", true)
            }
        } catch (error) {
            usarSnack(error.response.data, true)
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
        }catch(error){
            usarSnack(error.response.data, true)
        }
        setCambiosGuardados(false)
    }

    const eliminarUsuario = async () => {
        try {
            await usuarioService.delete(usuario.id)
            history.push("/usuarios", { openChildSnack : true, mensajeChild: "Usuario eliminado correctamente."}) 
        }catch(error){
            usarSnack(error.response.data, true)
        }
    }

    const validarUsuario = () =>{
        return usuario.nombre && usuario.apellido && usuario.dni && usuario.correo && validarDni()
    }

    const validarDni = () =>{
        return usuario.dni.length === 8
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
        
        <RootBoxABM>
            <FormBox>
                <Link className={classes.link} onClick={backToUsers}>
                    <Chevron className={classes.chevron}/>
                    Volver a usuarios
                </Link>
                { creacion &&
                    <Typography component="h2" variant="h5" className="tittle">
                        Nuevo usuario
                     </Typography>
                }
                
                { !creacion && edicion &&
                    <Typography component="h2" variant="h5" className="tittle">
                    Modificar usuario
                    </Typography>
                }
        
                <form className={classes.form} noValidate autoComplete="off">
                    <LeftInputBox>
                        <span className={classes.span}>Nombre</span>
                        <TextField className={classes.inputs} id="nombre" value={usuario.nombre || ''} onChange={(event) => actualizarValor(event)} name="nombre" variant="outlined" />
                    </LeftInputBox>

                    <RightInputBox>
                        <span className={classes.span} >Apellido</span>
                        <TextField className={classes.inputs} id="apellido" value={usuario.apellido || ''} onChange={(event) => actualizarValor(event)} name="apellido" variant="outlined" />
                    </RightInputBox>

                    <LeftInputBox>
                        <span className={classes.span}>DNI</span>
                        <TextField className={classes.inputs} id="dni" value={usuario.dni || ''} onChange={(event) => actualizarValor(event)} name="dni"  variant="outlined" type="number"/>
                    </LeftInputBox>

                    <RightInputBox>
                        <span className={classes.span}>E-mail</span>
                        <TextField className={classes.inputs} id="correo" value={usuario.correo || ''} onChange={(event) => actualizarValor(event)} name="correo"  variant="outlined" />
                    </RightInputBox>

                    <LeftInputBox>
                        <span className={classes.span}>Fecha de nacimiento</span>
                        <TextField className={classes.inputs} id="fechaNacimiento" value={usuario.fechaNacimiento || ''} onChange={(event) => actualizarValor(event)} name="fechaNacimiento" type="date" variant="outlined" />
                    </LeftInputBox>

                    <RightInputBox>
                        <span className={classes.span}>Tipo de usuario</span>
                        <TextField className={classes.inputs} id="tipoUsuario" select onChange={ handleChangeType } value={usuario.tipo || ''} variant="outlined" >
                                {tiposDeUsuario.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </RightInputBox>
                    
                    { edicion && !creacion && departamentos.length > 0 &&
                    <LeftInputBox>
                        <span className={classes.spanDisabled}>Piso</span>
                        {
                            departamentos.map((departamento)=>(
                                <span style={{ marginBottom : 6}} key={departamento.id} className={classes.inputsDisabled}>{departamento.piso || ''}</span>
                            ))
                        }
                    </LeftInputBox>
                    }
                    
                    { edicion && !creacion && departamentos.length > 0 &&
                    <RightInputBox>
                        <span className={classes.spanDisabled}>Departamento</span>
                               {
                            departamentos.map((departamento)=>(
                                <span style={{ marginBottom : 6}} key={departamento.id} className={classes.inputsDisabled}>{departamento.nroDepartamento || ''}</span>
                            ))
                        }
                    </RightInputBox>
                    }
                </form> 
                      
            </FormBox>

            <RightFormBox>
                { creacion &&
                <ButtonBox>
                    <StyledButtonPrimary className={classes.botones} onClick={() => crearUsuario() } >Crear usuario</StyledButtonPrimary>
                    <StyledButtonSecondary className={classes.botones} onClick={ backToUsers }>Cancelar</StyledButtonSecondary>
                </ButtonBox>
                }
                { edicion && !creacion &&
                <ButtonBox>
                    {campoEditado &&
                        <StyledButtonPrimary className={classes.botones} onClick={ modificarUsuario }>Guardar cambios</StyledButtonPrimary>
                    }   
                    {!campoEditado &&
                        <StyledButtonPrimary className={classes.botonesDisabled} disabled>Guardar cambios</StyledButtonPrimary>
                    }
                    <StyledButtonSecondary className={classes.botones} onClick={ popupModal }>Eliminar usuario</StyledButtonSecondary>
                </ButtonBox>
                }
                <Divider className={classes.divider} />
                
                { edicion && !creacion &&
                    <Historial tipo="USUARIO" id={params.id} update={cambiosGuardados}/>
                }

            </RightFormBox>

            <SnackbarComponent snackColor={snackColor} openSnackbar={openSnackbar} mensajeSnack={mensajeSnack} handleCloseSnack={() => setOpenSnackbar(false)}/>
                
            <ModalComponent openModal={openModal} bodyModal={bodyModal} handleCloseModal={ () => setOpenModal(false) }/>
            
         </RootBoxABM>

    )
}
 

