import React, { useEffect, useState, Fragment } from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import { StyledButtonPrimary, StyledButtonSecondary } from '../../components/Buttons'
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
import useSnack from '../../hooks/UseSnack';
import { ButtonBox, FormBox, LeftInputBox, RightFormBox, RightInputBox, RootBoxABM } from '../../components/Contenedores';
import { ModalComponent } from '../../components/Modal'

const useStyles = makeStyles ({
    link:{
        color: "#159D74",
        textAlign:"left",
        marginBottom: 20,
        cursor: "pointer",
        width: "fit-content"
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

function getModalStyle() {
    const top = 50
    const left = 50

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

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
    const { openSnackbar, setOpenSnackbar, mensajeSnack,  usarSnack, snackColor } = useSnack();
    //Modal
    const [modalStyle] = useState(getModalStyle);
    const [openModal, setOpenModal] = useState(false)


    

    let history = useHistory()

    const fetchExpensasPeriodo = async () =>{
        try{
            const expensaEncontrada = await expensaService.getByPeriodGeneral(obtenerPeriodoDeMoment(selectedDate))
            setExpensaGeneral(expensaEncontrada)
            
            const expensasDelPeriodo = await expensaService.getByPeriodDepto(obtenerPeriodoDeMoment(selectedDate))
            setExpensas(expensasDelPeriodo)

            const cantidadDeptos = await departamentoService.count()
            setCantidadDeptos(cantidadDeptos)
        }catch(error){
            usarSnack(error.response.data, true)
        }    
    }


    const backToExpensas = () =>{
        history.push("/expensas")
    }

    
    const anularExpensa = async ()  => {
        try{
            if(expensas.length > 0){
                await expensaService.anularExpensas(obtenerPeriodoDeMoment(selectedDate))
                history.push("/expensas", { openChildSnack : true , mensajeChild: "Expensas anuladas correctamente.", render: false})
            }else{
                setOpenModal(false)
                usarSnack("No existen expensas generadas en dicho periodo.", true)
            }  
        }catch(error){
            setOpenModal(false)
            usarSnack(error.response.data, true)
        }
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

        const bodyModal = (

        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">¿Estás seguro que desea anular las expensas para el período seleccionado?</h2>
            <p id="simple-modal-description">Esta acción no se puede deshacer.</p>
            <Box display="flex" flexDirection="row" mt={4}>
                <StyledButtonPrimary onClick={anularExpensa}>Anular</StyledButtonPrimary>
                <Link className={classes.linkModal} onClick={() => setOpenModal(false)}>
                    Cancelar
                </Link>
            </Box>
        </div>
    )

    return (
        
        <RootBoxABM>
            <FormBox>
                <Link className={classes.link} onClick={backToExpensas}>
                    <Chevron className={classes.chevron}/>
                    Volver a expensas
                </Link>

                    <Typography component="h2" variant="h5" className="tittle">
                        Anular expensas
                     </Typography>
                { expensaGeneral &&
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
                            />
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
            </FormBox>

            <RightFormBox>

                <ButtonBox>
                    <StyledButtonSecondary className={classes.botones} onClick={ () => setOpenModal(true) } >Anular expensas</StyledButtonSecondary>
                </ButtonBox>

                <Divider className={classes.divider} />
                <SnackbarComponent snackColor={snackColor} openSnackbar={openSnackbar} mensajeSnack={mensajeSnack} handleCloseSnack={() => setOpenSnackbar(false)}/>
            </RightFormBox>

            <ModalComponent openModal={openModal} bodyModal={bodyModal} handleCloseModal={() => setOpenModal(false)} />
            
         </RootBoxABM>

    )
}
 

export default withRouter(AnularExpensa)