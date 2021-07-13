import React, { useEffect, useState } from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import { Tabla, StyledTableRow, StyledTableCell } from '../../components/Tabla';
import { expensaService } from '../../services/expensaService';
import { Busqueda } from '../../components/Busqueda'
import { StyledButtonPrimary, StyledButtonSecondary } from '../../components/Buttons'
import { useHistory, useLocation, withRouter } from 'react-router-dom';
import { formatDate, numeroConPuntos } from '../../utils/formats';
import { SnackbarComponent } from '../../components/Snackbar';


const useStyles = makeStyles ({
    root: {
      display: 'flex',
      marginLeft: 300,
      marginTop: 30,
      marginRight: 50,
      flexDirection: "column"
    },
    tittle:{
        textAlign: "left",
    },
    contenedorBusqueda:{
      display: "flex",
      justifyContent: "space-between",
      marginTop: 20
    },
    cantidadObject:{
      fontWeight: 300,
      marginRight: 10
    },
    departamento:{
      display:"flex"
    },
    botonAnular:{
      marginLeft: 8
    },
    contenedorBotones:{
      display: "flex",
      flexWrap: "nowrap",
      alignItems:"center"

    }

  });

const headers = [
  {id: "periodo", label:"Periodo"},
  {id: "departamento", label:"Departamento"},
  {id: "montoAPagar", label:"Monto a pagar"},
  {id: "estado", label:"Estado"},
]

const ColumnasCustom = (dato) => {
  let history= useHistory()

  const getExpensa = (id) =>{
    history.push(`/expensa/${id}`)
  }

  return (
  <StyledTableRow key={dato.id} className="pointer" onClick={() => getExpensa(dato.id)}>
    <StyledTableCell className="tableNormal" component="th" scope="row">{formatDate(dato.periodo)}</StyledTableCell>
    <StyledTableCell className="tableNormal" component="th" scope="row">{dato.departamento}</StyledTableCell>
    <StyledTableCell className="tableNormal" component="th" scope="row">$ {numeroConPuntos(dato.montoAPagar)}</StyledTableCell> 
    <StyledTableCell className="tableBold"  component="th" scope="row">{dato.estado}</StyledTableCell>
  </StyledTableRow>
  )
}

export const Expensas = () =>{
    const location = useLocation();
    const classes = useStyles();
    const [expensas, setExpensas] = useState([])
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [mensajeSnack, setMensajeSnack] = useState('')
    const [textoBusqueda, setTextoBusqueda] = useState('')
    let history = useHistory()

    const newExpensa = () =>{
      history.push("/newexpensa")
    }

    const anularExpensa = () =>{
      history.push("/anularexpensa")
    }

    useEffect( ()  =>  {
      const fetchAll = async (textoBusqueda) =>{
        const expensasEncontradas = await expensaService.getBySearch(textoBusqueda)
        setExpensas(expensasEncontradas)
      }

        fetchAll(textoBusqueda)
    },[textoBusqueda])

    useEffect( () =>{
      const usarSnack = () => {
        setOpenSnackbar(location.state.openChildSnack)
        setMensajeSnack(location.state.mensajeChild)
      }

      const fetchSnack = () => {
        location.state === undefined? setOpenSnackbar(false) : usarSnack()
      }
      fetchSnack()
    },[location.state])

    return (
        <div className={classes.root} >
           <Typography component="h2" variant="h5" className={classes.tittle}>
             Expensas
           </Typography>
           <div className={classes.contenedorBusqueda}> 
              <Busqueda holder="Buscá por departamento o monto" busqueda={setTextoBusqueda} />
              <div className={classes.contenedorBotones}>
               <span className={classes.cantidadObject} > {expensas.length} expensas </span>
              <StyledButtonPrimary onClick={newExpensa} >Calcular expensas</StyledButtonPrimary>
              <StyledButtonSecondary className={classes.botonAnular} onClick={anularExpensa}>Anular expensas</StyledButtonSecondary>
              </div>
           </div>
            <Tabla datos={expensas} headers={headers} ColumnasCustom={ColumnasCustom} heightEnd={90} defaultSort={"periodo"} defaultOrder={"desc"}/>

            <SnackbarComponent snackColor={"#00A650"} openSnackbar={openSnackbar} mensajeSnack={mensajeSnack} handleCloseSnack={() => setOpenSnackbar(false)}/>
         </div>

        
    )
}
export default withRouter(Expensas)