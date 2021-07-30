import React, { useEffect, useState, useContext } from 'react'
import { makeStyles, Select, Typography } from '@material-ui/core';
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
import { UserContext } from '../../hooks/UserContext'; 
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import { fechaMaxNacimiento, fechaMinNacimiento, handleOnlyNumbers } from '../../utils/formats';


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
      },
      pisoDepto: {
          fontWeight: "bold",
        padding: "15px 0 0 12px",
        color: "#159D74",
      },
      select: {
        "&:focus": {
          backgroundColor: "white"
        }
      },
      icon: {
          height: "70px",
          color: "grey",
          width: "70px",
      },
      textoGris: {
          color: "grey"
      },
      mensajeIcon: {
          display:"flex",
          flexDirection: "column",
          alignItems: "center"
      },
      dot:{
        height: "125px",
        width: "125px",
        backgroundColor: "#D5D5D5",
        borderRadius: "50%",
        display: "flex",
        justifyContent:"center",
        alignItems:"center",
        margin: "15px 0 20px"
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

export const ABMCInquilino = ({edicion, creacion}) =>{
    const classes = useStyles();
    const [inquilino, setInquilino] = useState('')
    const [campoEditado, setCampoEditado] = useState(false)
    const [cambiosGuardados, setCambiosGuardados] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const { openSnackbar, setOpenSnackbar, mensajeSnack, usarSnack, snackColor } = useSnack();
    const [modalStyle] = useState(getModalStyle);
    const [departamentos, setDepartamentos] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useContext(UserContext)
    const [errors, setErrors] = useState({})
    const [deptoSeleccionado, setDeptoSeleccionado] = useState('')

    let history = useHistory()
    const params = useParams()


    const actualizarValor = (event) => {
        var newState = update(inquilino, {
            [event.target.id]: { $set: event.target.value}
        })
        newState.tipo = 'Inquilino'
        setInquilino(newState)
        setCampoEditado(true)
    }

    const backToInquilinos = () =>{
        history.push("/inquilinos")
    }

    const popupModal = () =>{
        setOpenModal(true)
    }

    const seleccionarDepto = (event) => {
        console.log(event.target.value)
        setDeptoSeleccionado(event.target.value)
        setCampoEditado(true)
      };

    const crearInquilino = async () => {
        try{
            if(validarInquilino()){
                setIsLoading(true)
                await usuarioService.createInquilino(inquilino, deptoSeleccionado)
                
                history.push("/inquilinos", { openChildSnack : true, mensajeChild: "Inquilino creado correctamente."})    
            }else{
                usarSnack("Campos obligatorios faltantes.", true)
            }
        } catch (error) {
            usarSnack(error.response.data, true)
        }
    }

    const modificarInquilino = async () => {
        try {
            if (validarInquilino()){
                await usuarioService.update(
                    new Usuario(inquilino.id,
                        inquilino.nombre,
                        inquilino.apellido,
                        inquilino.fechaNacimiento,
                        inquilino.dni,
                        inquilino.correo,
                        'Inquilino',
                        'Sin modificaciones') 
                    )
                setCambiosGuardados(true)
                setCampoEditado(false)
                usarSnack("Inquilino modificado correctamente", false)
            }else{
                usarSnack("Campos obligatorios faltantes.", true)
            }
        }catch(error){
            usarSnack(error.response.data, true)
        }
        setCambiosGuardados(false)
    }

    const eliminarInquilino = async () => {
        try {
            await usuarioService.delete(inquilino.id)
            history.push("/inquilinos", { openChildSnack : true, mensajeChild: "Inquilino eliminado correctamente."}) 
        }catch(error){
            usarSnack(error.response.data, true)
        }
    }

    const validarInquilino = () =>{
        return creacion? validarModificacionInquilino() && deptoSeleccionado
        : validarModificacionInquilino()
    }

    const validarModificacionInquilino = () => {
        setErrors(null)
        if (!inquilino.nombre) {
            setErrors(prev => ({ ...prev, name: "Campo obligatorio" }))
        }

        if (!inquilino.apellido) {
            setErrors(prev => ({ ...prev, lastName: "Campo obligatorio" }))
        }

        if (!inquilino.dni) {
            setErrors(prev => ({ ...prev, dni: "Campo obligatorio" }))
        }

        if (inquilino.dni && !validarDni()) {
            setErrors(prev => ({ ...prev, dni: "El DNI debe contener 7 u 8 digitos." }))
        }

        if (!inquilino.correo) {
            setErrors(prev => ({ ...prev, correo: "Campo obligatorio" }))
        }

        if (inquilino.correo && !validarCorreo()) {
            setErrors(prev => ({ ...prev, correo: "Introducir un correo electronico correcto." }))
        }

        if (!inquilino.fechaNacimiento) {
            setErrors(prev => ({ ...prev, fecha: "Campo obligatorio" }))
        }

        if (!deptoSeleccionado) {
            setErrors(prev => ({ ...prev, deptoSeleccionado: "Campo obligatorio" })) 
        }

        return inquilino.nombre && inquilino.apellido && inquilino.dni && inquilino.correo && (edicion || deptoSeleccionado) && validarDni() && validarCorreo()
    }

    const validarDni = () => {
        return inquilino.dni.length === 8 || inquilino.dni.length === 7
    }

    const validarCorreo = () => {
        return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(inquilino.correo)
    }

    const tieneDeptosDeshabitados = () => {
        return departamentos.length != 0
    }

    const enterKey = (e) =>{
        if (e.key === "Enter") {
            edicion? modificarInquilino() : crearInquilino()
        }
    }

    

    const bodyModal = (
      
        <div style={modalStyle} className={classes.paper}>
                    <h2 id="simple-modal-title">¿Estás seguro que querés eliminar este inquilino?</h2>
                    <p id="simple-modal-description">Esta acción no se puede deshacer.</p>
                    <Box display="flex" flexDirection="row" mt={4}>
                        <StyledButtonPrimary onClick={ eliminarInquilino }>Eliminar inquilino</StyledButtonPrimary>
                        <Link className={classes.linkModal} onClick={() => setOpenModal(false)}>
                            Cancelar
                        </Link>
                    </Box>
                </div>
    )

    useEffect( ()  =>  {
        const fetchInquilino = async () =>{
            try{
                let unInquilino
                
                if(creacion){
                    unInquilino = new Usuario()
                }

                if(edicion){
                    unInquilino = await usuarioService.getInquilino(params.id)
                }
                    
                setInquilino(unInquilino) 
                }
            catch(error){
                usarSnack(error.response.data, true)
            }
        }

        fetchInquilino()
    },[params.id, creacion, edicion])

    useEffect(  () => {
        const getDeptosDeshabitados = async () => {
            let deptosDeshabitados = await departamentoService.getByPropietarioIdDeshabitado(user?.id)
            setDepartamentos(deptosDeshabitados)
        }
    
        getDeptosDeshabitados()
        },[])

    return (
        
        <RootBoxABM>
            <FormBox>
                <Link className={classes.link} onClick={backToInquilinos}>
                    <Chevron className={classes.chevron}/>
                    Volver a inquilinos
                </Link>


            {   ((tieneDeptosDeshabitados() && creacion) || edicion ) &&
                <div>
                    { creacion &&
                        <Typography component="h2" variant="h5" className="tittle">
                            Nuevo inquilino
                        </Typography>
                    }
                    
                    { !creacion && edicion &&
                        <Typography component="h2" variant="h5" className="tittle">
                        Modificar inquilino
                        </Typography>
                    }
            
                    <form className={classes.form} noValidate autoComplete="off">
                        <LeftInputBox>
                            <span className="spanTitleGrey">Nombre</span>
                            <TextField 
                            className={classes.inputs} 
                            id="nombre" 
                            value={inquilino.nombre || ''}
                            onChange={(event) => actualizarValor(event)} 
                            name="nombre" 
                            variant="outlined" 
                            error={Boolean(errors?.name)}
                            helperText={errors?.name}
                            inputProps={{ maxLength: 15 }}
                            onKeyDown={(e) => { enterKey(e) }}
                            />
                        </LeftInputBox>

                        <RightInputBox>
                            <span className="spanTitleGrey" >Apellido</span>
                            <TextField 
                            className={classes.inputs} 
                            id="apellido" 
                            value={inquilino.apellido || ''} 
                            onChange={(event) => actualizarValor(event)} 
                            name="apellido" 
                            variant="outlined" 
                            error={Boolean(errors?.lastName)}
                            helperText={errors?.lastName}
                            inputProps={{ maxLength: 25 }}
                            onKeyDown={(e) => { enterKey(e) }}
                            />
                        </RightInputBox>

                        <LeftInputBox>
                            <span className="spanTitleGrey">DNI</span>
                            <TextField 
                            className={classes.inputs} 
                            id="dni" 
                            value={inquilino.dni || ''} 
                            onChange={(event) => actualizarValor(event)} 
                            name="dni"  
                            variant="outlined" 
                            type="text"
                            error={Boolean(errors?.dni)}
                            helperText={errors?.dni}
                            inputProps={{ maxLength: 8 }}
                            onInput={ handleOnlyNumbers }
                            onKeyDown={(e) => { enterKey(e) }}
                            />
                        </LeftInputBox>

                        <RightInputBox>
                            <span className="spanTitleGrey">E-mail</span>
                            <TextField 
                            className={classes.inputs} 
                            id="correo" 
                            value={inquilino.correo || ''} 
                            onChange={(event) => actualizarValor(event)} 
                            name="correo"  
                            variant="outlined" 
                            error={Boolean(errors?.correo)}
                            helperText={errors?.correo}
                            inputProps={{ maxLength: 50 }}
                            onKeyDown={(e) => { enterKey(e) }}
                            />
                        </RightInputBox>

                        <LeftInputBox>
                            <span className="spanTitleGrey">Fecha de nacimiento</span>
                            <TextField 
                            className={classes.inputs} 
                            id="fechaNacimiento" 
                            value={inquilino.fechaNacimiento || ''} 
                            onChange={(event) => actualizarValor(event)} 
                            name="fechaNacimiento" 
                            type="date" 
                            variant="outlined" 
                            error={Boolean(errors?.fecha)}
                            helperText={errors?.fecha}
                            onKeyDown={(e) => { enterKey(e) }}
                            InputProps={{inputProps: { min: fechaMinNacimiento() , max:  fechaMaxNacimiento() } }}
                            />
                        </LeftInputBox>

                        <RightInputBox>
                            <span className="spanTitleGrey">Departamento</span>
                        { (!edicion && creacion && inquilino)?  
                        <Select 
                        className={classes.inputs} 
                        id="departamento" 
                        select 
                        onChange={ seleccionarDepto } 
                        value={deptoSeleccionado || ''} 
                        variant="outlined" 
                        error={Boolean(errors?.deptoSeleccionado)}
                        helperText={errors?.deptoSeleccionado}
                        onKeyDown={(e) => { enterKey(e) }}
                        inputProps={{classes: { select: classes.select }}}
                        >
                                    {departamentos.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                    {option.piso} º {option.nroDepartamento}   { option.torre? (" Torre " + option.torre)  : "" }
                                    </MenuItem>
                                ))}
                            </Select>
                            :
                            <div class="spanNormal">
                                {inquilino.piso} º {inquilino.nroDepartamento} { inquilino.torre? <span> Torre {inquilino.torre } </span>: "" }
                            </div>     
                            }
                        </RightInputBox>
                        
                    </form> 
                </div>
                }
                { creacion && !tieneDeptosDeshabitados() &&
                <div className={classes.mensajeIcon}>
                    <span className={classes.dot}>
                        <PersonAddDisabledIcon className={classes.icon}></PersonAddDisabledIcon>
                    </span>
                    <div className={classes.textoGris}>Debés contar con al menos un departamento deshabitado para poder crear y asignarle un inquilino</div>
                </div> }
            </FormBox> 

            <RightFormBox>
                { creacion && !isLoading && 
                <ButtonBox>
                    { tieneDeptosDeshabitados() &&
                        <StyledButtonPrimary className={classes.botones} onClick={() => crearInquilino() } >Crear inquilino</StyledButtonPrimary>
                    }

                    <StyledButtonSecondary className={classes.botones} onClick={ backToInquilinos }>Cancelar</StyledButtonSecondary>
                </ButtonBox>
                }

            { creacion && isLoading &&
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <span className={classes.createSpan}> Creando inquilino... </span>
                    <ReactLoading type="spin" color="#159D74" height={50} width={50} className="spin" />
                </Box>
                }

                { edicion && !creacion &&
                <ButtonBox>
                    {campoEditado &&
                        <StyledButtonPrimary className={classes.botones} onClick={ modificarInquilino }>Guardar cambios</StyledButtonPrimary>
                    }   
                    {!campoEditado &&
                        <StyledButtonPrimary className={classes.botonesDisabled} disabled>Guardar cambios</StyledButtonPrimary>
                    }
                    <StyledButtonSecondary className={classes.botones} onClick={ popupModal }>Eliminar inquilino</StyledButtonSecondary>
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
 

