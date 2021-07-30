import React, { useContext, useEffect, useState } from 'react'
import { Typography } from '@material-ui/core';
import { Tabla, StyledTableRow, StyledTableCell } from '../../components/Tabla';
import { Busqueda } from '../../components/Busqueda'
import { StyledButtonPrimary } from '../../components/Buttons'
import { useHistory, useLocation } from 'react-router-dom';
import { gastoService } from '../../services/gastoService';
import { SnackbarComponent } from '../../components/Snackbar';
import { dosDecimales, formatDate, numeroConPuntos } from '../../utils/formats';
import useSnack from '../../hooks/UseSnack';
import { RootBox, SearchBox } from '../../components/Contenedores';
import { SearchWithoutResults } from '../../components/SearchWithoutResults';
import { UserContext } from '../../hooks/UserContext';
import useWindowDimensions, { tamanioLimite } from '../../hooks/TamanioPantalla';


const Headers = () => {
  const { height, width } = useWindowDimensions();

  let headers

  if(width > tamanioLimite){
    headers = [
      {id: "periodo", label:"Periodo"},
      {id: "titulo", label:"Título"},
      {id: "tipo", label:"Tipo"},
      {id: "actividad", label:"Actividad"},
      {id: "importe", label:"Monto"}
    ]
  }else{
    headers = [
      {id: "periodo", label:"Periodo"},
      {id: "titulo", label:"Título"},
      {id: "importe", label:"Monto"}
    ]
  }

  return headers
}


const ColumnasCustom = (dato) => {
const { height, width } = useWindowDimensions();
let history= useHistory()

const getGasto = (id) =>{
  history.push(`/gasto/${id}`)
}

return (
<StyledTableRow key={dato.id} onClick={() => getGasto(dato.id)} className="pointer animate__animated animate__fadeIn">
  <StyledTableCell className="tableNormal" component="th" scope="row">{formatDate(dato.periodo)}</StyledTableCell>
  <StyledTableCell className="tableNormal" component="th" scope="row">{dato.titulo}</StyledTableCell>
  { width > tamanioLimite &&
  <StyledTableCell className="tableNormal" component="th" scope="row">{dato.tipo}</StyledTableCell>
  }
  { width > tamanioLimite &&
  <StyledTableCell className="tableNormal" component="th" scope="row">{dato.ultimaModificacion}</StyledTableCell>
  }
  <StyledTableCell className="tableBold" component="th" scope="row">${numeroConPuntos(dosDecimales(dato.importe))}</StyledTableCell>
</StyledTableRow>
)
}
export const Gastos = () =>{
    const location = useLocation();
    const [gastos, setGastos] = useState([])
    const { openSnackbar, setOpenSnackbar, mensajeSnack, usarSnack } = useSnack();
    const [textoBusqueda, setTextoBusqueda] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const { user } = useContext(UserContext)
    let history = useHistory()



    const newUser = () =>{
      history.push("/creargasto")
    }

    useEffect( ()  =>  {
      const fetchAll = async (textoBusqueda) =>{
        const gastosEncontrados = await gastoService.getBySearch(textoBusqueda)
        setGastos(gastosEncontrados)
        setIsLoading(false)
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
               <span className="cantidadObject" > {gastos.length} gastos </span>
              { user?.esAdmin() && <StyledButtonPrimary onClick={newUser} >Agregar gasto</StyledButtonPrimary>}
              </div>
           </SearchBox>

           {gastos.length > 0 &&
            <Tabla datos={gastos} headers={Headers} ColumnasCustom={ColumnasCustom} heightEnd={90} defaultSort={"periodo"} defaultOrder={"desc"}/>
           }
            { gastos.length === 0 && !isLoading &&
                <SearchWithoutResults resultado="gastos"/>
            }

            <SnackbarComponent snackColor={"#00A650"} openSnackbar={openSnackbar} mensajeSnack={mensajeSnack} handleCloseSnack={() => setOpenSnackbar(false)}/>
        
         </RootBox>

    )
}
