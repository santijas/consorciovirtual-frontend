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
import ReactLoading from 'react-loading';
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
      createSpan:{
          marginBottom: 10,
          fontWeight: 600
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

export const ABMCUsuario = ({edicion, creacion}) =>{
    const classes = useStyles();
    const [usuario, setUsuario] = useState('')
    const [campoEditado, setCampoEditado] = useState(false)
    const [cambiosGuardados, setCambiosGuardados] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const { openSnackbar, setOpenSnackbar, mensajeSnack, usarSnack, snackColor } = useSnack();
    const [modalStyle] = useState(getModalStyle);
    const [departamentos, setDepartamentos] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({
        name: '',
        lastName: '',
        dni: ''
    })
    let history = useHistory()
    const params = useParams()


    const updateValue = (event) => {
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
        const newState = update(usuario, {
            tipo: { $set: event.target.value}
        })
        setUsuario(newState)
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
                setIsLoading(true)
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
        setErrors(null)

        if(!usuario.nombre){
            setErrors(prev => ({ ...prev, name: "Campo obligatorio"}))
        }

        if(!usuario.apellido){
            setErrors(prev => ({ ...prev, lastName: "Campo obligatorio"}))
        }

        if(!usuario.dni){
            setErrors(prev => ({ ...prev, dni: "Campo obligatorio"}))
        }

        if(usuario.dni && (usuario.dni.length !== 8)){
            setErrors(prev => ({ ...prev, dni: "El DNI debe contener 8 numeros sin puntos."}))
        }

        if(usuario.dni && isNaN(usuario.dni)){
            setErrors(prev => ({ ...prev, dni: "El DNI solo puede contener numeros."}))
        }

        if(!usuario.correo){
            setErrors(prev => ({ ...prev, correo: "Campo obligatorio"}))
        }

        if(usuario.correo && !validarCorreo()){
            setErrors(prev => ({ ...prev, correo: "Introducir un correo electronico correcto."}))
        }

        if(!usuario.fecha && creacion){
            setErrors(prev => ({ ...prev, fecha: "Campo obligatorio"}))
        }

        if(!usuario.tipo){
            setErrors(prev => ({ ...prev, tipo: "Campo obligatorio"}))
        }
        
        
        return usuario.nombre && usuario.apellido && usuario.dni && usuario.correo && validarDni() && validarCorreo()
    }

    const validarDni = () =>{
        return usuario.dni.length === 8 && !isNaN(usuario.dni)
    }

    const validarCorreo = () =>{
        return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(usuario.correo)
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
                        <TextField 
                        className={classes.inputs} 
                        id="nombre" 
                        value={usuario.nombre || ''} 
                        onChange={(event) => updateValue(event)} 
                        name="nombre" 
                        variant="outlined" 
                        error={Boolean(errors?.name)}
                        helperText={errors?.name}
                        inputProps={{ maxLength: 15 }}
                        />
                    </LeftInputBox>

                    <RightInputBox>
                        <span className={classes.span} >Apellido</span>
                        <TextField 
                        className={classes.inputs} 
                        id="apellido" 
                        value={usuario.apellido || ''} 
                        onChange={(event) => updateValue(event)} 
                        name="apellido" 
                        variant="outlined"
                        error={Boolean(errors?.lastName)}
                        helperText={errors?.lastName}
                        inputProps={{ maxLength: 25 }}
                         />
                    </RightInputBox>

                    <LeftInputBox>
                        <span className={classes.span}>DNI</span>
                        <TextField 
                        className={classes.inputs} 
                        id="dni" value={usuario.dni || ''} 
                        onChange={(event) => updateValue(event)} 
                        name="dni"  
                        variant="outlined" 
                        error={Boolean(errors?.dni)}
                        helperText={errors?.dni}
                        inputProps={{ maxLength: 8 }}
                        />
                    </LeftInputBox>

                    <RightInputBox>
                        <span className={classes.span}>E-mail</span>
                        <TextField 
                        className={classes.inputs} 
                        id="correo" value={usuario.correo || ''} 
                        onChange={(event) => updateValue(event)} 
                        name="correo"  
                        variant="outlined" 
                        type="email"
                        error={Boolean(errors?.correo)}
                        helperText={errors?.correo}
                        inputProps={{ maxLength: 50 }}
                        />
                    </RightInputBox>

                    <LeftInputBox>
                        <span className={classes.span}>Fecha de nacimiento</span>
                        <TextField 
                        className={classes.inputs} 
                        id="fechaNacimiento" 
                        value={usuario.fechaNacimiento || ''} 
                        onChange={(event) => updateValue(event)} 
                        name="fechaNacimiento" 
                        type="date" 
                        variant="outlined" 
                        error={Boolean(errors?.fecha)}
                        helperText={errors?.fecha}
                        />
                    </LeftInputBox>

                    <RightInputBox>
                        <span className={classes.span}>Tipo de usuario</span>
                        <TextField 
                        className={classes.inputs} 
                        id="tipoUsuario" 
                        select 
                        onChange={ handleChangeType } 
                        value={usuario.tipo || ''} 
                        error={Boolean(errors?.tipo)}
                        helperText={errors?.tipo}
                        variant="outlined" >
                                {
                                tiposDeUsuario.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))
                            }
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
                { creacion && !isLoading &&
                <ButtonBox>
                    <StyledButtonPrimary className={classes.botones} onClick={() => crearUsuario() } >Crear usuario</StyledButtonPrimary>
                    <StyledButtonSecondary className={classes.botones} onClick={ backToUsers }>Cancelar</StyledButtonSecondary>
                </ButtonBox>
                }

            { creacion && isLoading &&
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <span className={classes.createSpan}> Creando usuario... </span>
                    <ReactLoading type="spin" color="#159D74" height={50} width={50} className="spin" />
                </Box>
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
 

