import React, { useContext, useEffect, useState } from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import { Tabla, StyledTableRow, StyledTableCell } from '../../components/Tabla';
import { departamentoService } from '../../services/departamentoService';
import { Busqueda } from '../../components/Busqueda'
import { StyledButtonPrimary } from '../../components/Buttons'
import { useHistory, useLocation } from 'react-router-dom';
import { SnackbarComponent } from '../../components/Snackbar';
import useSnack from '../../hooks/UseSnack';
import { RootBox, SearchBox } from '../../components/Contenedores';
import { SearchWithoutResults } from '../../components/SearchWithoutResults';
import { UserContext } from '../../hooks/UserContext';
import { useMediaQuery } from './../../hooks/UseMediaQuery';


const getHeaders = (mobileSize, tabletSize, webSize) => {
  let headers

  if(webSize){
    headers =    [
      {id: "piso", label:"Departamento"},
      {id: "propietario", label:"Propietario"},
      {id: "inquilino", label:"Inquilino"},
      {id: "actividad", label:"Actividad"},
      {id: "estadoCuenta", label:"Estado de cuenta"}
    ]
  }else if(!mobileSize && tabletSize) {
    headers = [
      {id: "piso", label:"Departamento"},
      {id: "propietario", label:"Propietario"},
      {id: "inquilino", label:"Inquilino"}
    ]
  } else{
    headers = [
      {id: "piso", label:"Departamento"},
      {id: "inquilino", label:"Inquilino"}
    ]
  }
  return headers
}

  const ColumnasCustom = (dato, mobileSize, tabletSize, webSize) => { 
    let history= useHistory()
  
    const showDepartamento = (id) =>{
      history.push(`/departamento/${id}`)
    }

    const getCells = () => {
      if(mobileSize) {
        return (
          <StyledTableRow key={dato.id} onClick={() => showDepartamento(dato.id)} className="pointer animate__animated animate__fadeIn">
          <StyledTableCell className="tableBold" component="th" scope="row">{dato.piso}º {dato.nroDepartamento}</StyledTableCell>
          <StyledTableCell className="tableNormal" component="th" scope="row">{dato.propietario}</StyledTableCell>
          </StyledTableRow>
        )
      } else if(tabletSize) {
        return (
          <StyledTableRow key={dato.id} onClick={() => showDepartamento(dato.id)} className="pointer animate__animated animate__fadeIn">
          <StyledTableCell className="tableBold" component="th" scope="row">{dato.piso}º {dato.nroDepartamento}</StyledTableCell>
          <StyledTableCell className="tableNormal" component="th" scope="row">{dato.propietario}</StyledTableCell>
          <StyledTableCell className="tableNormal" component="th" scope="row">{dato.inquilino}</StyledTableCell>
        </StyledTableRow>
        )
      } else if(webSize){
        return (
        <StyledTableRow key={dato.id} onClick={() => showDepartamento(dato.id)} className="pointer animate__animated animate__fadeIn">
        <StyledTableCell className="tableBold" component="th" scope="row">{dato.piso}º {dato.nroDepartamento}</StyledTableCell>
        <StyledTableCell className="tableNormal" component="th" scope="row">{dato.propietario}</StyledTableCell>
        <StyledTableCell className="tableNormal" component="th" scope="row">{dato.inquilino}</StyledTableCell>
        <StyledTableCell className="tableNormal" component="th" scope="row">{dato.ultimaModificacion}</StyledTableCell>
        <StyledTableCell className="tableBold" component="th" scope="row">{dato.estadoDeCuenta}</StyledTableCell> 
      </StyledTableRow>
        )
      }
    }

    return (getCells())
  }


export const Departamentos = () =>{
    const location = useLocation();
    const [departamentos, setDepartamentos] = useState([])
    const { openSnackbar, setOpenSnackbar, mensajeSnack, usarSnack } = useSnack();
    const [textoBusqueda, setTextoBusqueda] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const { user } = useContext(UserContext)
    let mobileSize = useMediaQuery('(max-width: 400px)')
    let tabletSize = useMediaQuery('(max-width: 768px)')
    let webSize = useMediaQuery('(min-width: 769px)')

    let history = useHistory()  

    const newDepto = () =>{
      history.push("/creardepartamento")
    }

    useEffect( ()  =>  {
      const fetchAllDepartamentos = async (textoBusqueda) =>{
        const deptosEncontrados = await departamentoService.getBySearch(textoBusqueda)
        setDepartamentos(deptosEncontrados)
        setIsLoading(false)
      }

      fetchAllDepartamentos(textoBusqueda)

    },[textoBusqueda])


    useEffect( () =>{
      const fetchSnack = () => {
        if(location.state !== undefined){
          usarSnack(location.state.mensajeChild, false)
          history.replace()
        }
      }
      fetchSnack()
    },[location.state])


    return (
        <RootBox>
            <Typography component="h2" variant="h5" className="tittle">
              Departamentos
            </Typography>
            <SearchBox> 
                <Busqueda holder="Buscá por departamento, propietario, inquilino" busqueda={setTextoBusqueda} />
                <div>
                <span className="cantidadObject" > {departamentos.length} departamentos </span>
                { user?.esAdminGeneral() && <StyledButtonPrimary onClick={newDepto}>Agregar departamento</StyledButtonPrimary> }
                </div>
            </SearchBox>
            {
              departamentos.length > 0 && 
                <Tabla datos={departamentos} headers={getHeaders(mobileSize, tabletSize, webSize)} ColumnasCustom={ColumnasCustom} heightEnd={90} defaultSort={"piso"} defaultOrder={"asc"}/>
                }
            { departamentos.length === 0 && !isLoading &&
                <SearchWithoutResults resultado="departamentos"/>
            }
            
            <SnackbarComponent snackColor={"#00A650"} openSnackbar={openSnackbar} mensajeSnack={mensajeSnack} handleCloseSnack={() => setOpenSnackbar(false)}/>
        
         </RootBox>

    )
}
