import React, { useContext, useEffect, useState } from 'react'
import {  Typography } from '@material-ui/core';
import { Tabla, StyledTableRow, StyledTableCell } from '../../components/Tabla';
import { telefonoUtilService } from '../../services/telefonoUtilService';
import { Busqueda } from '../../components/Busqueda'
import { StyledButtonPrimary } from '../../components/Buttons'
import { useHistory, useLocation } from 'react-router-dom';
import { SnackbarComponent } from '../../components/Snackbar'
import useSnack from '../../hooks/UseSnack';
import { RootBox, SearchBox } from '../../components/Contenedores';
import { SearchWithoutResults } from '../../components/SearchWithoutResults';
import { UserContext } from '../../hooks/UserContext';


const headers = [
  {id: "nombre", numeric: "false", label:"Nombre/Empresa"},
  {id: "servicio", numeric: "false", label:"Servicio"},
  {id: "telefono", numeric: "false", label:"Teléfono"},
  {id: "anotacion", numeric: "false", label:"Anotación"},
]

const ColumnasCustom = (dato) => {
  let history= useHistory()

  const getTelefonoUtil = (id) =>{
    history.push(`/telefonoUtil/${id}`)
  }

  const textoSegunLargoDeCadena = (cadena) => {
    let textoAEntregar
      if(cadena != null && cadena.length > 20){
        textoAEntregar = "Click para ver la antación completa"
      }else{
        textoAEntregar = cadena
      }
    return textoAEntregar
  }

  return (
  <StyledTableRow key={dato.id} onClick={() => getTelefonoUtil(dato.id)} className="pointer">
    <StyledTableCell className="tableNormal" component="th" scope="row">{dato.nombre}</StyledTableCell>
    <StyledTableCell className="tableNormal" component="th" scope="row">{dato.servicio}</StyledTableCell>
    <StyledTableCell className="tableNormal" component="th" scope="row">{dato.telefono}</StyledTableCell>
    <StyledTableCell className="tableNormal" component="th" scope="row">{textoSegunLargoDeCadena(dato.anotacion)}</StyledTableCell>
  </StyledTableRow>
  )
}

export const TelefonosUtiles = () =>{
    const location = useLocation()
    let history = useHistory()  
    const [telefonos, setTelefonos] = useState([])
    const { openSnackbar, setOpenSnackbar, mensajeSnack, usarSnack } = useSnack();
    const [textoBusqueda, setTextoBusqueda] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const { user } = useContext(UserContext)

    useEffect( ()  =>  {
      const fetchAll = async (textoBusqueda) => {
        const telefonos = await telefonoUtilService.getBySearch(textoBusqueda)
        setTelefonos(telefonos)
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

    const newTelefonoUtil = () =>{
      history.push("/creartelefonoutil")
    }

    return (
        <RootBox>
           <Typography component="h2" variant="h5" className="tittle">
             Teléfonos Útiles
           </Typography>
           <SearchBox> 
              <Busqueda holder="Buscá por servicio" busqueda={setTextoBusqueda} />
              <div>
               <span className="cantidadObject" > {telefonos.length} Teléfonos útiles </span>
              {user?.esAdmin() && <StyledButtonPrimary onClick={newTelefonoUtil} >Agregar teléfono útil</StyledButtonPrimary> }
              </div>
           </SearchBox>
           {telefonos.length>1 &&
            <Tabla datos={telefonos} headers={headers} ColumnasCustom={ColumnasCustom} heightEnd={90} defaultSort={"nombre"} defaultOrder={"asc"}/>
           }
            { telefonos.length === 0 && !isLoading &&
                <SearchWithoutResults resultado="telefonos útiles"/>
            }

              <SnackbarComponent snackColor={"#00A650"} openSnackbar={openSnackbar} mensajeSnack={mensajeSnack} handleCloseSnack={() => setOpenSnackbar(false)}/>
        
        </RootBox>
        
    )
}
