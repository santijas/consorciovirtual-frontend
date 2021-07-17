import React, { useEffect, useState, Fragment } from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import { StyledButtonPrimary, StyledButtonSecondary } from '../../components/Buttons'
import { useHistory, useParams } from 'react-router-dom';
import { Link, TextField, MenuItem, Divider, Box } from '@material-ui/core';
import { registroModificacionService } from "../../services/registroModificacionService";
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
import {FileUploader} from '../../components/FileUploader'
import { app } from '../../base';
import useSnack from '../../hooks/UseSnack';
import { ButtonBox, FormBox, LeftInputBox, RightFormBox, RightInputBox, RootBoxABM } from '../../components/Contenedores';
import axios from 'axios';

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
      inputsDate:{
          textTransform: "capitalize"
      },
      delete:{
          textAlign: "left",
          color: "red",
          fontWeight: 600,
          fontSize: 14,
          marginTop: 4,
          cursor: "pointer"
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

  const rubros = [
    {
      value: 'SUELDOYCARGASSOCIALES',
      label: 'Sueldo y cargas sociales',
    },
    {
      value: 'MANTENIMIENTOPARTESCOMUNES',
      label: 'Mantenimiento de partes comúnes',
    },
    {
        value: 'SERVICIOSPUBICOS',
        label: 'Servicios públicos',
    },
    {
        value: 'OTROSSERVICIOS',
        label: 'Otros servicios',
    },
    {
        value: 'REPARACIONESENUNIDADES',
        label: 'Reparacion en unidades',
    },
    {
        value: 'GASTOSBANCARIOS',
        label: 'Gastos bancarios',
    },
    {
        value: 'LIMPIEZA',
        label: 'Limpieza',
    },
    {
        value: 'ADMINISTRACION',
        label: 'Administración',
    },
    {
        value: 'SEGUROS',
        label: 'Seguros',
    },
    {
        value: 'OTROS',
        label: 'Otros',
    }

  ]

export const ABMCGasto = ({edicion, creacion}) =>{
    const classes = useStyles();
    const [gasto, setGasto] = useState('')
    const [campoEditado, setCampoEditado] = useState(false)
    const [cambiosGuardados, setCambiosGuardados] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const { openSnackbar, setOpenSnackbar, mensajeSnack, usarSnack, snackColor } = useSnack();
    const [modalStyle] = useState(getModalStyle);
    const [tipoGasto, setTipoGasto] = useState()
    const [rubro, setRubro] = useState()
    const [selectedDate, handleDateChange] = useState(new Date());
    const [selectedFile, setSelectedFile] = useState(null);

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
            console.log(unGasto)
            }
        catch(error){
            usarSnack(error.response.data, true)
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

    const formatName = () =>{
        let extension = selectedFile.name.split('.').pop();
        return `Gasto_${gasto.titulo}_${gasto.periodo}_${gasto.rubro}.${extension}`
    }


    const onFileUpload = async () => { 
       try{
           if(selectedFile){
            gasto.url = formatName()
            let formData = new FormData()

            formData.append('file', selectedFile, formatName());

            await axios.post('http://localhost:8080/uploadFile',
            formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
            })

           }
       }catch(error){
            usarSnack(error.response.data, true)
       }
      }

      const onDownload = async () => {
        try{
            const response = await axios.get(`http://localhost:8080/downloadFile/${gasto.url}`)
            let a = document.createElement('a');
            a.href = response.config.url;
            a.download = 'gastos';
            a.click();
        } catch(error){
            usarSnack(error.response.data, true)
       }            
      }
    
    
    useEffect( ()  =>  {
        fetchGasto()
    },[])

    const crearGasto = async () => {
        try{
            gasto.periodo = moment(new Date(Date.now())).format('YYYY-MM')
            if(validarGasto()){
                await onFileUpload()  
                await gastoService.create(gasto)
                history.push("/gastos", { openChildSnack : true , mensajeChild: "Gasto creado correctamente."})  
            }else{
                usarSnack("Campos obligatorios faltantes.", true)
            }
        } catch (error) {
            usarSnack(error.response.data, true)
        }
    }

    const modificarGasto = async () => {
        try {
            if (validarGasto()){
                await onFileUpload()
                await gastoService.update(gasto)
                setCambiosGuardados(true)
                setCampoEditado(false)
                usarSnack("Gasto modificado correctamente", false)
            }else{
                usarSnack("Campos obligatorios faltantes.", true)
            }
        }catch(error){
            usarSnack(error.response.data, true)
        }
        setCambiosGuardados(false)
    }

    const eliminarGasto = async () => {
        try {
            await gastoService.delete(gasto.id)
            history.push("/gastos", { openChildSnack : true , mensajeChild: "Gasto eliminado correctamente."})    
        }catch(error){
            usarSnack(error.response.data, true)
        }
    }

    const validarGasto = () =>{
        return gasto.periodo && gasto.titulo && gasto.importe
    }

    const handleChangeType = (event) => {
        gasto.tipo = event.target.value
        setTipoGasto(event.target.value)
      };

      const handleChangeRubro = (event) => {
        gasto.rubro = event.target.value
        setRubro(event.target.value)
        setCampoEditado(true)
      };

      const handleSelectFile = (file) => {
        setSelectedFile(file)
        setCampoEditado(true)
      };

      const deleteFile = (event) => {
        gasto.url = null
        setSelectedFile(null)
        setCampoEditado(true)
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

        const renderInput = ( props ) => (
            <TextField 
            className={classes.inputsDate} 
            id="tipo" 
            onClick={props.onClick} 
            onChange={props.onChange} 
            value={props.value} 
            variant="outlined"
            inputProps={{className: classes.inputsDate}}
            />
            
          );

    return (
        
        <RootBoxABM>
            <FormBox>
                <Link className={classes.link} onClick={backToGastos}>
                    <Chevron className={classes.chevron}/>
                    Volver a gastos
                </Link>
                { creacion &&
                    <Typography component="h2" variant="h5" className="tittle">
                        Nuevo gasto
                     </Typography>
                }
                
                { !creacion && edicion &&
                    <Typography component="h2" variant="h5" className="tittle">
                    Modificar gasto
                    </Typography>
                }
        
                <form className={classes.form} noValidate autoComplete="off">
                    
                    {   creacion &&
                    <LeftInputBox>
                        <span className={classes.span}>Período</span>
                        <MuiPickersUtilsProvider utils={MomentUtils} locale={moment().locale('es')} >
                            <DatePicker
                                views={["year", "month"]}
                                value={ selectedDate }
                                minDate={ new Date(Date.now()) }
                                inputVariant="outlined"
                                onChange={ handleDateChange }
                                TextFieldComponent={renderInput}
                            />
                        </MuiPickersUtilsProvider>
                    </LeftInputBox>
                    }

                    {   !creacion && edicion &&
                    <LeftInputBox>
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
                    </LeftInputBox>
                    }

                    <RightInputBox>
                        <span className={classes.span} >Titulo</span>
                        <TextField className={classes.inputs} id="titulo" value={gasto.titulo || ''} onChange={(event) => actualizarValor(event)} name="titulo" variant="outlined" />
                    </RightInputBox>

                    { !creacion && edicion &&
                        <LeftInputBox>
                        <span className={classes.span}>Tipo</span>
                        <TextField className={classes.inputs} id="tipo" value={gasto.tipo || ''} onChange={(event) => actualizarValor(event)} name="tipo"  variant="outlined" disabled/>
                    </LeftInputBox>
                    }

                    { creacion && !edicion &&
                    <LeftInputBox>
                        <span className={classes.span}>Tipo</span>
                        <TextField className={classes.inputs} id="tipo" select onChange={ handleChangeType } value={gasto.tipo || ''} variant="outlined" >
                                {tipoDeGasto.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </LeftInputBox>
                    }

                    <RightInputBox>
                        <span className={classes.span}>Monto</span>
                        <TextField className={classes.inputs} id="importe" value={gasto.importe || ''} onChange={(event) => actualizarValor(event)} name="importe"  variant="outlined" type="number"/>
                    </RightInputBox>

                    <LeftInputBox>
                        <span className={classes.span}>Rubro</span>
                        <TextField className={classes.inputs} id="rubro" select onChange={ handleChangeRubro } value={gasto.rubro || ''} variant="outlined" >
                                {rubros.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </LeftInputBox>

                { creacion && !edicion &&
                    <RightInputBox>
                        <span className={classes.span}>Archivo</span>
                        <FileUploader
                        onFileSelectSuccess={(file) => setSelectedFile(file)}
                        onFileSelectError={({ error }) => alert(error)}
                        />
                    </RightInputBox>
                }

                { !creacion && edicion &&
                    
                    <RightInputBox>
                        <span className={classes.span}>Archivo</span>
                        {
                            gasto.url ?
                            <Box display="flex" flexDirection="column">
                                <StyledButtonPrimary className={classes.botones} onClick={ onDownload } >Descargar documento</StyledButtonPrimary>
                                <span className={classes.delete} onClick={ deleteFile }>Eliminar archivo</span>
                            </Box>
                            :
                            <FileUploader
                            onFileSelectSuccess={(file) => handleSelectFile(file) }
                            onFileSelectError={({ error }) => alert(error)}
                            /> 
                        }
                        
                        
                    </RightInputBox>
                }


                </form> 
                      
            </FormBox>

            <RightFormBox>
                { creacion &&
                <ButtonBox>
                    <StyledButtonPrimary className={classes.botones} onClick={() => crearGasto() } >Crear gasto</StyledButtonPrimary>
                    <StyledButtonSecondary className={classes.botones} onClick={ backToGastos }>Cancelar</StyledButtonSecondary>
                </ButtonBox>
                }
                { edicion && !creacion &&
                <ButtonBox>
                    {campoEditado &&
                        <StyledButtonPrimary className={classes.botones} onClick={ modificarGasto }>Guardar cambios</StyledButtonPrimary>
                    }   
                    {!campoEditado &&
                        <StyledButtonPrimary className={classes.botonesDisabled} disabled>Guardar cambios</StyledButtonPrimary>
                    }
                    <StyledButtonSecondary className={classes.botones} onClick={ popupModal }>Eliminar gasto</StyledButtonSecondary>
                </ButtonBox>
                }
                <Divider className={classes.divider} />
                
                { edicion && !creacion &&
                    <Historial tipo='GASTO' id={params.id} update={cambiosGuardados}/>
                }

            </RightFormBox>

            <SnackbarComponent snackColor={snackColor} openSnackbar={openSnackbar} mensajeSnack={mensajeSnack} handleCloseSnack={() => setOpenSnackbar(false)}/>
                
            <ModalComponent openModal={openModal} bodyModal={bodyModal} handleCloseModal={ () => setOpenModal(false) }/>
            
         </RootBoxABM>

    )
}
