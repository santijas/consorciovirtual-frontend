import React, { useEffect, useState, Fragment } from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import { StyledButtonSecondary } from '../../components/Buttons'
import { useHistory, useParams, withRouter } from 'react-router-dom';
import { Link, Divider, Box, Input, TextField } from '@material-ui/core';
import { Chevron } from '../../assets/icons';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import 'moment/locale/es'
import moment from 'moment';
import { dosDecimales, obtenerPeriodoDeMoment } from '../../utils/formats';
import { StyledTableCellScroll, StyledTableRowScroll, TablaScroll } from '../../components/TablaScroll';
import { departamentoService } from '../../services/departamentoService';
import { expensaService } from '../../services/expensaService';
import { SnackbarComponent } from '../../components/Snackbar';

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
        marginLeft: 10,
        fontSize: 16,
        padding: "14px 6px"
    },
    spanDisabled:{
        textAlign:"left",
        marginLeft: 10,
        marginBottom: 6,
        color: "grey"
    },
    tittleVariant:{
        textAlign:"left",
        marginLeft: 10,
        marginBottom: 6,
        color: "grey",
        fontWeight: "bold",
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
          textTransform: "capitalize",
          cursor: "pointer"
      }
  });

  const ColumnasCustom = (dato) => {

    let history= useHistory()
  
    const showGasto = (id) =>{
      history.push(`/gasto/${id}`)
    }

    return (
    <StyledTableRowScroll key={dato.id} className="pointer" onClick={() => showGasto(dato.id)}>
      <StyledTableCellScroll className="tableNormal" component="th" scope="row">{dato.unidad}</StyledTableCellScroll>
      <StyledTableCellScroll className="tableNormal" component="th" scope="row">{dato.propietario}</StyledTableCellScroll>
      <StyledTableCellScroll className="tableNormal" component="th" scope="row">$ {dosDecimales(dato.montoAPagar)}</StyledTableCellScroll> 
      <StyledTableCellScroll className="tableBold" component="th" scope="row">{dato.estado}</StyledTableCellScroll> 
    </StyledTableRowScroll>
    )
  }

export const AnularExpensa = () =>{
    const classes = useStyles();
    const [expensas, setExpensas] = useState('')
    const [selectedDate, handleDateChange] = useState(new Date());
    const [expensaGeneral, setExpensaGeneral] = useState() 
    const [cantidadDeptos, setCantidadDeptos] = useState('')
    const [openSnackbar, setOpenSnackbar] = useState('')
    const [mensajeSnack, setMensajeSnack] = useState()
    const [snackColor, setSnackColor] = useState()

    let history = useHistory()

    const fetchExpensasPeriodo = async () =>{
        try{
            const expensaEncontrada = await expensaService.getByPeriodGeneral(obtenerPeriodoDeMoment(selectedDate))
            setExpensaGeneral(expensaEncontrada)
            
            const expensasDelPeriodo = await expensaService.getByPeriodDepto(obtenerPeriodoDeMoment(selectedDate))
            setExpensas(expensasDelPeriodo)

            const cantidadDeptos = await departamentoService.count()
            setCantidadDeptos(cantidadDeptos)
        }catch{

        }    
    }


    const backToExpensas = () =>{
        history.push("/expensas")
    }

    
    const anularExpensa = () => {
        try{
            if(expensas.length > 0){
                expensaService.anularExpensas(obtenerPeriodoDeMoment(selectedDate))
                history.push("/expensas", { openChildSnack : true , mensajeChild: "Expensas anuladas correctamente.", render: false})
            }else{
                usarSnack("No existen expensas generadas en dicho periodo.", true)
            }  
        }catch(error){
            usarSnack(error, true)
        }
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
    
    useEffect( ()  =>  {
        fetchExpensasPeriodo()
    },[selectedDate])

    const restriccionDate = () => {
        var date = new Date(Date.now())
        date.setFullYear(date.getFullYear() -5);
        return `"${date.getFullYear()}-${date.getMonth()}"`
    }

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
        
        <div className={classes.root} >
            <div className={classes.contenedorForm}>
                <Link className={classes.link} onClick={backToExpensas}>
                    <Chevron className={classes.chevron}/>
                    Volver a expensas
                </Link>

                    <Typography component="h2" variant="h5" className={classes.tittle}>
                        Anular expensas
                     </Typography>
                { expensaGeneral &&
                <form className={classes.form} noValidate autoComplete="off">
                    
                   
                    <div className={classes.contenedorInput}>
                        <span className={classes.spanDisabled}>Período</span>
                        <MuiPickersUtilsProvider utils={MomentUtils} locale={moment().locale('es')} >
                            <DatePicker
                                views={["year", "month"]}
                                value={ selectedDate }
                                inputVariant="outlined"
                                minDate={ restriccionDate() }
                                maxDate={ Date.now() }
                                disableFuture
                                onChange={ handleDateChange }
                                TextFieldComponent={renderInput}
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                    

                    <div className={classes.contenedorInputDerecha}>
                        <span className={classes.spanDisabled}>Cantidad de departamentos</span>
                        <span className={classes.inputsDisabled}>{cantidadDeptos}</span>
                    </div>

                    <div className={classes.contenedorInput}>
                        <span className={classes.spanDisabled}>Valor total de expensa común</span>
                        <span className={classes.inputsDisabled}>$ {expensaGeneral.valorTotalExpensaComun || ' - '}</span>
                    </div>

                    <div className={classes.contenedorInputDerecha}>
                        <span className={classes.spanDisabled}>Valor total de expensa extraordinaria</span>
                        <span className={classes.inputsDisabled}>$ {expensaGeneral.valorTotalExpensaExtraordinaria || ' - ' }</span>
                    </div>
                </form> 
                }
                {expensas.length !== 0 && 
                <div>
                    <Typography component="h2" variant="subtitle1" className={classes.tittleVariant}>
                            Expensas del período
                    </Typography>
                    <Box mx={"auto"}>
                    <TablaScroll datos={expensas} ColumnasCustom={ColumnasCustom} heightEnd={90}/>
                    </Box>
                </div>
                }
            </div>

            <div className={classes.buttonLog}>

                <div className={classes.contenedorBotones}>
                    <StyledButtonSecondary className={classes.botones} onClick={ anularExpensa } >Anular expensas</StyledButtonSecondary>
                </div>

                <Divider className={classes.divider} />
                <SnackbarComponent snackColor={snackColor} openSnackbar={openSnackbar} mensajeSnack={mensajeSnack} handleCloseSnack={() => setOpenSnackbar(false)}/>
            </div>
            
         </div>

    )
}
 

export default withRouter(AnularExpensa)