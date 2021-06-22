import React, { useEffect, useState, Fragment } from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import { StyledButtonPrimary } from '../../components/Buttons'
import { useHistory, useParams } from 'react-router-dom';
import { Link, Divider, Box } from '@material-ui/core';
import { ModalComponent } from '../../components/Modal'
import { Chevron } from '../../assets/icons';
import update from 'immutability-helper';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import 'moment/locale/es'
import moment from 'moment';
import { obtenerPeriodoDeMoment } from '../../utils/formats';
import { StyledTableCellScroll, StyledTableRowScroll, TablaScroll } from '../../components/TablaScroll';
import { gastoService } from '../../services/gastoService';

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

  const ColumnasCustom = (dato) => {
    return (
    <StyledTableRowScroll key={dato.id} className="pointer">
      <StyledTableCellScroll className="tableNormal" component="th" scope="row">{dato.titulo}</StyledTableCellScroll>
      <StyledTableCellScroll className="tableNormal" component="th" scope="row">{dato.tipo}</StyledTableCellScroll>
      <StyledTableCellScroll className="tableBold" component="th" scope="row">{dato.importe}</StyledTableCellScroll> 
    </StyledTableRowScroll>
    )
  }

export const ABExpensa = () =>{
    const classes = useStyles();
    const [gastos, setGastos] = useState('')
    const [openModal, setOpenModal] = useState(false)
    const [modalStyle] = useState(getModalStyle);
    const [selectedDate, handleDateChange] = useState(new Date());


    let history = useHistory()
    const params = useParams()

    const fetchGastosPeriodo = async () =>{
        try{
            const gastos = await gastoService.getByPeriod(obtenerPeriodoDeMoment(selectedDate))
            setGastos(gastos)
        }catch{

        }    
    }


    const backToExpensas = () =>{
        history.push("/expensas")
    }

    const popupModal = () =>{
        setOpenModal(true)
    }

    
    const generarExpensa = () => {
        console.log(obtenerPeriodoDeMoment(selectedDate))
    }
    
    useEffect( ()  =>  {
        fetchGastosPeriodo()
    },[selectedDate])

    const restriccionDate = () => {
        var date = new Date(Date.now())
        date.setFullYear(date.getFullYear() -5);
        return `"${date.getFullYear()}-${date.getMonth()}"`
    }

    const bodyModal = (
      
            <div style={modalStyle} className={classes.paper}>
                        <h2 id="simple-modal-title">¿Estás seguro que querés eliminar estas expensas?</h2>
                        <p id="simple-modal-description">Esta acción no se puede deshacer.</p>
                        <Box display="flex" flexDirection="row" mt={4}>
                            <StyledButtonPrimary >Anular expensas</StyledButtonPrimary>
                            <Link className={classes.linkModal} onClick={() => setOpenModal(false)}>
                                Cancelar
                            </Link>
                        </Box>
                    </div>
        )

    return (
        
        <div className={classes.root} >
            <div className={classes.contenedorForm}>
                <Link className={classes.link} onClick={backToExpensas}>
                    <Chevron className={classes.chevron}/>
                    Volver a expensas
                </Link>

                    <Typography component="h2" variant="h5" className={classes.tittle}>
                        Calcular expensas {}
                     </Typography>
        
                <form className={classes.form} noValidate autoComplete="off">
                    
                   
                    <div className={classes.contenedorInput}>
                        <span className={classes.span}>Período</span>
                        <MuiPickersUtilsProvider utils={MomentUtils} locale={moment().locale('es')} >
                            <DatePicker
                                views={["year", "month"]}
                                value={ selectedDate }
                                inputVariant="outlined"
                                className="capitalize"
                                minDate={ restriccionDate() }
                                maxDate={ Date.now() }
                                disableFuture
                                onChange={ handleDateChange }
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                    

                    <div className={classes.contenedorInputDerecha}>
                        <span className={classes.spanDisabled}>Cantidad de departamentos</span>
                        <span className={classes.inputsDisabled}>50</span>
                    </div>

                    <div className={classes.contenedorInput}>
                        <span className={classes.spanDisabled}>Valor total de expensa común</span>
                        <span className={classes.inputsDisabled}>$5000</span>
                    </div>

                    <div className={classes.contenedorInputDerecha}>
                        <span className={classes.spanDisabled}>Valor total de expensa extraordinaria</span>
                        <span className={classes.inputsDisabled}>$5353</span>
                    </div>
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
            </div>

            <div className={classes.buttonLog}>

                <div className={classes.contenedorBotones}>
                    <StyledButtonPrimary className={classes.botones} onClick={ generarExpensa } >Generar expensas</StyledButtonPrimary>
                </div>

                <Divider className={classes.divider} />

            </div>
                
            <ModalComponent openModal={openModal} bodyModal={bodyModal} handleCloseModal={ () => setOpenModal(false) }/>
            
         </div>

    )
}
 

