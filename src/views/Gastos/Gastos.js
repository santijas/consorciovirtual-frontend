import React, { useEffect, useState } from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import { Tabla, StyledTableRow, StyledTableCell } from '../../components/Tabla';
import { Busqueda } from '../../components/Busqueda'
import { StyledButtonPrimary } from '../../components/Buttons'
import { useHistory, useLocation } from 'react-router-dom';
import { gastoService } from '../../services/gastoService';
import { SnackbarComponent } from '../../components/Snackbar';
import { dosDecimales, formatDate, numeroConPuntos } from '../../utils/formats';


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
    }

  });

const headers = [
  {id: "periodo", label:"Periodo"},
  {id: "titulo", label:"Título"},
  {id: "tipo", label:"Tipo"},
  {id: "actividad", label:"Actividad"},
  {id: "importe", label:"Monto"}
]

const ColumnasCustom = (dato) => {
let history= useHistory()

const getGasto = (id) =>{
  history.push(`/gasto/${id}`)
}

return (
<StyledTableRow key={dato.id} onClick={() => getGasto(dato.id)} className="pointer">
  <StyledTableCell className="tableNormal" component="th" scope="row">{formatDate(dato.periodo)}</StyledTableCell>
  <StyledTableCell className="tableNormal" component="th" scope="row">{dato.titulo}</StyledTableCell>
  <StyledTableCell className="tableNormal" component="th" scope="row">{dato.tipo}</StyledTableCell>
  <StyledTableCell className="tableNormal" component="th" scope="row">Modificado hace {Math.floor(Math.random() * 10)} horas</StyledTableCell>
  <StyledTableCell className="tableBold" component="th" scope="row">${numeroConPuntos(dosDecimales(dato.importe))}</StyledTableCell>
</StyledTableRow>
)
}
export const Gastos = () =>{
    const classes = useStyles();
    const location = useLocation();
    const [gastos, setGastos] = useState([])
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [mensajeSnack, setMensajeSnack] = useState('')
    const [textoBusqueda, setTextoBusqueda] = useState('')
    let history = useHistory()



    const newUser = () =>{
      history.push("/newgasto")
    }

    useEffect( ()  =>  {
      const fetchAll = async (textoBusqueda) =>{
        const gastosEncontrados = await gastoService.getBySearch(textoBusqueda)
        setGastos(gastosEncontrados)
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
             Gastos
           </Typography>
           <div className={classes.contenedorBusqueda}> 
              <Busqueda holder="Buscá por título o monto" busqueda={setTextoBusqueda} />
              <div>
               <span className={classes.cantidadObject} > {gastos.length} gastos </span>
              <StyledButtonPrimary onClick={newUser} >Agregar gasto</StyledButtonPrimary>
              </div>
           </div>
            <Tabla datos={gastos} headers={headers} ColumnasCustom={ColumnasCustom} heightEnd={90} defaultSort={"periodo"} defaultOrder={"desc"}/>

            <SnackbarComponent snackColor={"#00A650"} openSnackbar={openSnackbar} mensajeSnack={mensajeSnack} handleCloseSnack={() => setOpenSnackbar(false)}/>
        
         </div>

    )
}
