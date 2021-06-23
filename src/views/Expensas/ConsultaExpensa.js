import React, { useEffect, useState } from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import { StyledButtonPrimary } from '../../components/Buttons'
import { useHistory, useParams } from 'react-router-dom';
import { Link, Divider, Box, Input, TextField } from '@material-ui/core';
import { Chevron } from '../../assets/icons';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import 'moment/locale/es'
import moment from 'moment';
import { dosDecimales, numeroConPuntos, obtenerPeriodoDeMoment } from '../../utils/formats';
import { StyledTableCellScroll, StyledTableRowScroll, TablaScroll } from '../../components/TablaScroll';
import { gastoService } from '../../services/gastoService';
import { departamentoService } from '../../services/departamentoService';
import update from 'immutability-helper';
import { ExpensaGeneral } from '../../domain/expensaGeneral';
import { expensaService } from '../../services/expensaService';

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
        marginLeft: 4,
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
          marginLeft: "4px"
      },
      inputsDateDisabled:{
        textTransform: "capitalize",
        textAlign: "left",
        fontSize: 16,
        padding: "14px 6px"
      }
  });

  const ColumnasCustom = (dato) => {

    let history= useHistory()
  
    const showGasto = (id) =>{
      history.push(`/gasto/${id}`)
    }

    return (
    <StyledTableRowScroll key={dato.id} className="pointer" onClick={() => showGasto(dato.id)}>
      <StyledTableCellScroll className="tableNormal" component="th" scope="row">{dato.titulo}</StyledTableCellScroll>
      <StyledTableCellScroll className="tableNormal" component="th" scope="row">{dato.tipo}</StyledTableCellScroll>
      <StyledTableCellScroll className="tableBold" component="th" scope="row">$ {dosDecimales(dato.importe)}</StyledTableCellScroll> 
    </StyledTableRowScroll>
    )
  }

export const ConsultarExpensa = () =>{
    const classes = useStyles();
    const [gastos, setGastos] = useState('') 
    const [expensa, setExpensa] = useState()

    let history = useHistory()
    const params = useParams()

    const fetchExpensa = async () =>{
        try{
            let unaExpensa = await expensaService.getById(params.id)
            setExpensa(unaExpensa) 
            console.log(expensa)
            const gastosEncontrados = await gastoService.getByPeriod(obtenerPeriodoDeMoment(unaExpensa.periodo))
            setGastos(gastosEncontrados)
        }catch{

        }
    }
    
    const backToExpensas = () =>{
        history.push("/expensas")
    }

    const pagarExpensa = () =>{
        console.log()
    }

    useEffect( ()  =>  {
        fetchExpensa()
    },[])


        const renderInput = ( props ) => (
            <TextField 
            className={classes.inputsDate} 
            id="tipo" 
            onClick={props.onClick} 
            onChange={props.onChange} 
            value={props.value} 
            inputProps={{className: classes.inputsDateDisabled}}
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
                        Expensa
                     </Typography>
        
            {expensa &&
                <form className={classes.form} noValidate autoComplete="off">
                    
                   
                    <div className={classes.contenedorInput}>
                        <span className={classes.spanDisabled}>Período</span>
                        <MuiPickersUtilsProvider utils={MomentUtils} locale={moment().locale('es')} >
                            <DatePicker
                                views={["year", "month"]}
                                value={ expensa.periodo }
                                inputVariant="outlined"
                                disableFuture
                                TextFieldComponent={renderInput}
                                readOnly
                                disableToolbar
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                    
                    
                    <div className={classes.contenedorInputDerecha}>
                        <span className={classes.spanDisabled}>Monto a pagar</span>
                        <span className={classes.inputsDisabled}>$ {expensa.montoAPagar}</span>
                    </div>

                    <div className={classes.contenedorInput}>
                        <span className={classes.spanDisabled}>Valor de expensa común</span>
                        <span className={classes.inputsDisabled}>$ {numeroConPuntos(expensa.valorDepartamentoComun) || ' - '}</span>
                    </div>

                    <div className={classes.contenedorInputDerecha}>
                        <span className={classes.spanDisabled}>Valor de expensa extraordinaria</span>
                        <span className={classes.inputsDisabled}>$ {numeroConPuntos(expensa.valorDepartamentoExtraordinaria) || ' - ' }</span>
                    </div>

                    <div className={classes.contenedorInput}>
                        <span className={classes.spanDisabled}>Propietario</span>
                        <span className={classes.inputsDisabled}> {expensa.propietario || ' - '}</span>
                    </div>

                    <div className={classes.contenedorInputDerecha}>
                        <span className={classes.spanDisabled}>Departamento</span>
                        <span className={classes.inputsDisabled}> {expensa.unidad || ' - ' }</span>
                    </div>
                   
                </form> 
                 }
                {gastos.length !== 0 && 
                <div>
                    <Typography component="h2" variant="subtitle1" className={classes.tittleVariant}>
                            Gastos del período
                    </Typography>
                    <Box mx={"auto"}>
                    <TablaScroll datos={gastos} ColumnasCustom={ColumnasCustom} heightEnd={90}/>
                    </Box>
                </div>
                }
            </div>

            <div className={classes.buttonLog}>

                <div className={classes.contenedorBotones}>
                    <StyledButtonPrimary className={classes.botones} onClick={ pagarExpensa } >Pagar expensa</StyledButtonPrimary>
                </div>

                <Divider className={classes.divider} />

            </div>
            
         </div>

    )
}
 
