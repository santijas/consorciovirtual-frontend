import React, { useEffect, useState, Fragment } from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import { StyledButtonPrimary, StyledButtonSecondary } from '../../components/Buttons'
import { useHistory, useParams } from 'react-router-dom';
import { Link, TextField, MenuItem, Divider, Box } from '@material-ui/core';
import { usuarioService } from "../../services/usuarioService";
import { Historial } from '../../components/Historial'
import { SnackbarComponent } from '../../components/Snackbar'
import { ModalComponent } from '../../components/Modal'
import { Chevron } from '../../assets/icons';
import update from 'immutability-helper';
import { Gasto } from '../../domain/gasto';
import { gastoService } from '../../services/gastoService';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import 'moment/locale/es'
import moment from 'moment';

const useStyles = makeStyles ({
    root: {
      display: 'flex',
      marginLeft: 300,
      flexDirection: "row",
      height: "100%",
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
      inputsDate:{
          textTransform: "uppercase"
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

  const tipoDeGasto = [
    {
      value: 'Común',
      label: 'Común',
    },
    {
      value: 'Extraordinaria',
      label: 'Extraordinaria',
    }
  ]

export const ABMCGasto = ({edicion, creacion}) =>{
    const classes = useStyles();
    const [gasto, setGasto] = useState('')
    const [campoEditado, setCampoEditado] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [openSnackbar, setOpenSnackbar] = useState('')
    const [mensajeSnack, setMensajeSnack] = useState()
    const [snackColor, setSnackColor] = useState()
    const [modalStyle] = useState(getModalStyle);
    const [tipoGasto, setTipoGasto] = useState()

    let history = useHistory()
    const params = useParams()

    const fetchGasto = async () =>{
        try{
            let unGasto
            if(creacion){
                unGasto = new Gasto()
            } else{
                unGasto = await gastoService.getById(params.id)
            }
            setGasto(unGasto) 
            }
        catch{

        }
    }

    const actualizarValor = (event) => {
        const newState = update(gasto, {
            [event.target.id]: { $set: event.target.value}
        })
        setGasto(newState)
        setCampoEditado(true)
    }

    const backToGastos = () =>{
        history.push("/gastos")
    }

    const popupModal = () =>{
        setOpenModal(true)
    }
    
    useEffect( ()  =>  {
        fetchGasto()
    },[])

    const crearGasto = async () => {
        try{
            gasto.periodo = moment(new Date(Date.now())).format('YYYY-MM')
            console.log(gasto)
            if(validarGasto()){
                await gastoService.create(gasto)
                history.push("/gastos", { openChildSnack : true })    
            }else{
                usarSnack("Campos obligatorios faltantes.", true)
            }
        } catch (error) {
            usarSnack("No se puede conectar con el servidor.", true)
        }
    }

    const modificarGasto = async () => {
        try {
            console.log(gasto)
            if (validarGasto()){
                await gastoService.update(gasto)
                usarSnack("Gasto modificado correctamente", false)
            }else{
                usarSnack("Campos obligatorios faltantes.", true)
            }
        }catch(errorRecibido){
            usarSnack("No se puede conectar con el servidor.", true)
        }
    }

    const eliminarGasto = async () => {
        try {
            await gastoService.delete(gasto.id)
            backToGastos()
        }catch(errorRecibido){
            usarSnack("No se puede conectar con el servidor.", true)
        }
    }

    const validarGasto = () =>{
        return gasto.periodo && gasto.titulo && gasto.importe
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

    const handleChangeType = (event) => {
        gasto.tipo = event.target.value
        setTipoGasto(event.target.value)
      };

    const bodyModal = (
      
            <div style={modalStyle} className={classes.paper}>
                        <h2 id="simple-modal-title">¿Estás seguro que querés eliminar este gasto?</h2>
                        <p id="simple-modal-description">Esta acción no se puede deshacer.</p>
                        <Box display="flex" flexDirection="row" mt={4}>
                            <StyledButtonPrimary onClick={ eliminarGasto }>Eliminar gasto</StyledButtonPrimary>
                            <Link className={classes.linkModal} onClick={() => setOpenModal(false)}>
                                Cancelar
                            </Link>
                        </Box>
                    </div>
        )

    return (
        
        <div className={classes.root} >
            <div className={classes.contenedorForm}>
                <Link className={classes.link} onClick={backToGastos}>
                    <Chevron className={classes.chevron}/>
                    Volver a gastos
                </Link>
                { creacion &&
                    <Typography component="h2" variant="h5" className={classes.tittle}>
                        Nuevo gasto
                     </Typography>
                }
                
                { !creacion && edicion &&
                    <Typography component="h2" variant="h5" className={classes.tittle}>
                    Modificar gasto
                    </Typography>
                }
        
                <form className={classes.form} noValidate autoComplete="off">
                    
                    {   creacion &&
                    <div className={classes.contenedorInput}>
                        <span className={classes.span}>Período</span>
                        <MuiPickersUtilsProvider utils={MomentUtils} locale={moment().locale('es')} >
                            <DatePicker
                                views={["year", "month"]}
                                value={ new Date(Date.now())}
                                disabled
                                inputVariant="outlined"
                                onChange={(event) => actualizarValor(event)}
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                    }

                    {   !creacion && edicion &&
                    <div className={classes.contenedorInput}>
                        <span className={classes.span}>Período</span>
                        <MuiPickersUtilsProvider utils={MomentUtils}  locale={moment().locale('es')}>
                            <DatePicker
                                className={classes.inputsDate}
                                views={["year", "month"]}
                                value={gasto.periodo}
                                disabled
                                inputVariant="outlined"
                                onChange={(event) => actualizarValor(event)}
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                    }

                    <div className={classes.contenedorInputDerecha}>
                        <span className={classes.span} >Titulo</span>
                        <TextField className={classes.inputs} id="titulo" value={gasto.titulo || ''} onChange={(event) => actualizarValor(event)} name="titulo" variant="outlined" />
                    </div>

                    { !creacion && edicion &&
                        <div className={classes.contenedorInput}>
                        <span className={classes.span}>Tipo</span>
                        <TextField className={classes.inputs} id="tipo" value={gasto.tipo || ''} onChange={(event) => actualizarValor(event)} name="tipo"  variant="outlined" disabled/>
                    </div>
                    }
                    { creacion && !edicion &&
                    <div className={classes.contenedorInput}>
                        <span className={classes.span}>Tipo</span>
                        <TextField className={classes.inputs} id="tipo" select onChange={ handleChangeType } value={gasto.tipo || ''} variant="outlined" >
                                {tipoDeGasto.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    }
                    <div className={classes.contenedorInputDerecha}>
                        <span className={classes.span}>Monto</span>
                        <TextField className={classes.inputs} id="importe" value={gasto.importe || ''} onChange={(event) => actualizarValor(event)} name="importe"  variant="outlined" type="number"/>
                    </div>

                </form> 
                      
            </div>

            <div className={classes.buttonLog}>
                { creacion &&
                <div className={classes.contenedorBotones}>
                    <StyledButtonPrimary className={classes.botones} onClick={() => crearGasto() } >Crear gasto</StyledButtonPrimary>
                    <StyledButtonSecondary className={classes.botones} onClick={ backToGastos }>Cancelar</StyledButtonSecondary>
                </div>
                }
                { edicion && !creacion &&
                <div className={classes.contenedorBotones}>
                    {campoEditado &&
                        <StyledButtonPrimary className={classes.botones} onClick={ modificarGasto }>Guardar cambios</StyledButtonPrimary>
                    }   
                    {!campoEditado &&
                        <StyledButtonPrimary className={classes.botonesDisabled} disabled>Guardar cambios</StyledButtonPrimary>
                    }
                    <StyledButtonSecondary className={classes.botones} onClick={ popupModal }>Eliminar gasto</StyledButtonSecondary>
                </div>
                }
                <Divider className={classes.divider} />
                
                { edicion && !creacion &&
                    <Historial usuariosHistorial={usuarioService.usuariosPrueba}/>
                }

            </div>

            <SnackbarComponent snackColor={snackColor} openSnackbar={openSnackbar} mensajeSnack={mensajeSnack} handleCloseSnack={() => setOpenSnackbar(false)}/>
                
            <ModalComponent openModal={openModal} bodyModal={bodyModal} handleCloseModal={ () => setOpenModal(false) }/>
            
         </div>

    )
}
 

