import React, { useEffect, useState } from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import { Tabla, StyledTableRow, StyledTableCell } from '../../components/Tabla';
import { Busqueda } from '../../components/Busqueda'
import { StyledButtonPrimary } from '../../components/Buttons'
import { useHistory, useLocation } from 'react-router-dom';
import { gastoService } from '../../services/gastoService';
import { SnackbarComponent } from '../../components/Snackbar';
import { dosDecimales, formatDate, numeroConPuntos } from '../../utils/formats';
import useSnack from '../../hooks/UseSnack';
import { RootBox, SearchBox } from '../../components/Contenedores';


const useStyles = makeStyles ({
    cantidadObject:{
      fontWeight: 300,
      marginRight: 10
    },
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
  <StyledTableCell className="tableNormal" component="th" scope="row">{dato.ultimaModificacion}</StyledTableCell>
  <StyledTableCell className="tableBold" component="th" scope="row">${numeroConPuntos(dosDecimales(dato.importe))}</StyledTableCell>
</StyledTableRow>
)
}
export const Gastos = () =>{
    const classes = useStyles();
    const location = useLocation();
    const [gastos, setGastos] = useState([])
    const { openSnackbar, setOpenSnackbar, mensajeSnack, usarSnack } = useSnack();
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

    const fetchSnack = () => {
      if(location.state !== undefined){
        usarSnack(location.state.mensajeChild, false)
      }
    }
    fetchSnack()
  },[location.state])
 


    return (
        <RootBox>
           <Typography component="h2" variant="h5" className="tittle">
             Gastos
           </Typography>
           <SearchBox> 
              <Busqueda holder="Buscá por título o monto" busqueda={setTextoBusqueda} />
              <div>
               <span className={classes.cantidadObject} > {gastos.length} gastos </span>
              <StyledButtonPrimary onClick={newUser} >Agregar gasto</StyledButtonPrimary>
              </div>
           </SearchBox>
            <Tabla datos={gastos} headers={headers} ColumnasCustom={ColumnasCustom} heightEnd={90} defaultSort={"periodo"} defaultOrder={"desc"}/>

            <SnackbarComponent snackColor={"#00A650"} openSnackbar={openSnackbar} mensajeSnack={mensajeSnack} handleCloseSnack={() => setOpenSnackbar(false)}/>
        
         </RootBox>

    )
}
