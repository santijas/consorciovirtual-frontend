import React, { useEffect, useState } from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import { StyledButtonPrimary } from '../../components/Buttons'
import { useHistory, useParams } from 'react-router-dom';
import { Link, Divider, Box, TextField } from '@material-ui/core';
import { Chevron } from '../../assets/icons';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import 'moment/locale/es'
import moment from 'moment';
import { dosDecimales, obtenerPeriodoDeMoment } from '../../utils/formats';
import { StyledTableCellScroll, StyledTableRowScroll, TablaScroll } from '../../components/TablaScroll';
import { gastoService } from '../../services/gastoService';
import { departamentoService } from '../../services/departamentoService';
import update from 'immutability-helper';
import { ExpensaGeneral } from '../../domain/expensaGeneral';
import { expensaService } from '../../services/expensaService';
import { SnackbarComponent } from '../../components/Snackbar';
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
      <StyledTableCellScroll className="tableNormal" component="th" scope="row">{dato.titulo}</StyledTableCellScroll>
      <StyledTableCellScroll className="tableNormal" component="th" scope="row">{dato.tipo}</StyledTableCellScroll>
      <StyledTableCellScroll className="tableBold" component="th" scope="row">$ {dosDecimales(dato.importe)}</StyledTableCellScroll> 
    </StyledTableRowScroll>
    )
  }

export const ABExpensa = () =>{
    const classes = useStyles();
    const [gastos, setGastos] = useState('')
    const [selectedDate, handleDateChange] = useState(new Date());
    const [expensaGeneral, setExpensaGeneral] = useState(new ExpensaGeneral()) 
    const [cantidadDeptos, setCantidadDeptos] = useState('')
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [mensajeSnack, setMensajeSnack] = useState()
    const [snackColor, setSnackColor] = useState()

    let history = useHistory()

    const fetchGastosPeriodo = async () =>{
        try{
            const gastosEncontrados = await gastoService.getByPeriod(obtenerPeriodoDeMoment(selectedDate))
            setGastos(gastosEncontrados)
            setExpensaGeneral(new ExpensaGeneral())
            const valorComun = gastosEncontrados.filter(gasto => gasto.tipo === "Común").map(gasto => gasto.importe).reduce(function(acc, val) { return acc + val; }, 0)
            const valorExtraordinaria = gastosEncontrados.filter(gasto => gasto.tipo === "Extraordinaria").map(gasto => gasto.importe).reduce(function(acc, val) { return acc + val; }, 0)
            actualizarValor(dosDecimales(valorComun), dosDecimales(valorExtraordinaria))

            const cantidadDeptos = await departamentoService.count()
            setCantidadDeptos(cantidadDeptos)
        }catch(error){
            usarSnack(error.response.data, true)
        }    
    }



    const actualizarValor = (valorComun, valorExtraordinaria) => {
        const newState = update(expensaGeneral, {
            valorTotalExpensaComun: { $set: valorComun},
            valorTotalExpensaExtraordinaria: {$set: valorExtraordinaria}
        })
        setExpensaGeneral(newState)
    }

    const backToExpensas = () =>{
        history.push("/expensas")
    }

    
    const generarExpensa = () => {
        try{
            if(gastos.length > 0){
                expensaService.create(obtenerPeriodoDeMoment(selectedDate))
                
                history.push("/expensas", { openChildSnack : true , mensajeChild: "Expensas generadas correctamente.", render: true})
            }else{
                usarSnack("No es posible generar expensas sin gastos registrados en el periodo.", true)
            }  
        }catch(error){
            usarSnack(error.response.data, true)
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
        fetchGastosPeriodo()
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
        
        <RootBoxABM>
            <FormBox>
                <Link className={classes.link} onClick={backToExpensas}>
                    <Chevron className={classes.chevron}/>
                    Volver a expensas
                </Link>

                    <Typography component="h2" variant="h5" className="tittle">
                        Calcular expensas {}
                     </Typography>
        
                <form className={classes.form} noValidate autoComplete="off">
                    
                   
                    <LeftInputBox>
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
                            ></DatePicker>
                        </MuiPickersUtilsProvider>
                    </LeftInputBox>
                    

                    <RightInputBox>
                        <span className={classes.spanDisabled}>Cantidad de departamentos</span>
                        <span className={classes.inputsDisabled}>{cantidadDeptos}</span>
                    </RightInputBox>

                    <LeftInputBox>
                        <span className={classes.spanDisabled}>Valor total de expensa común</span>
                        <span className={classes.inputsDisabled}>$ {expensaGeneral.valorTotalExpensaComun || ' - '}</span>
                    </LeftInputBox>

                    <RightInputBox>
                        <span className={classes.spanDisabled}>Valor total de expensa extraordinaria</span>
                        <span className={classes.inputsDisabled}>$ {expensaGeneral.valorTotalExpensaExtraordinaria || ' - ' }</span>
                    </RightInputBox>
                </form> 
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
            </FormBox>

            <RightFormBox>

                <ButtonBox>
                    <StyledButtonPrimary className={classes.botones} onClick={ generarExpensa } >Generar expensas</StyledButtonPrimary>
                </ButtonBox>

                <Divider className={classes.divider} />
                <SnackbarComponent snackColor={snackColor} openSnackbar={openSnackbar} mensajeSnack={mensajeSnack} handleCloseSnack={() => setOpenSnackbar(false)}/>
            </RightFormBox>
            
         </RootBoxABM>

    )
}
 

