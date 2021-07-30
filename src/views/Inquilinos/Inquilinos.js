import React, { useEffect, useState,  useContext } from 'react'
import {  Typography } from '@material-ui/core';
import { Tabla, StyledTableRow, StyledTableCell } from '../../components/Tabla';
import { usuarioService } from '../../services/usuarioService';
import { Busqueda } from '../../components/Busqueda'
import { StyledButtonPrimary } from '../../components/Buttons'
import { useHistory, useLocation } from 'react-router-dom';
import { SnackbarComponent } from '../../components/Snackbar'
import { numeroConPuntos } from '../../utils/formats';
import useSnack from '../../hooks/UseSnack';
import { RootBox, SearchBox } from '../../components/Contenedores';
import { UserContext } from '../../hooks/UserContext'; 
import { SearchWithoutResults } from '../../components/SearchWithoutResults';
import { useMediaQuery } from './../../hooks/UseMediaQuery';


const headers = [
  {id: "nombre", numeric: "false", label:"Nombre y Apellido"},
  {id: "correo", numeric: "false", label:"E-mail"},
  {id: "dni", numeric: "true", label:"DNI"},
  {id: "actividad", numeric: "false", label:"Actividad"},
]

const getHeaders = (mobileSize, tabletSize, webSize) => {
  let headers

  if (webSize) {
    headers = [
      {id: "nombre", numeric: "false", label:"Nombre y Apellido"},
      {id: "correo", numeric: "false", label:"E-mail"},
      {id: "dni", numeric: "true", label:"DNI"},
      {id: "actividad", numeric: "false", label:"Actividad"},
    ]
  } else if (!mobileSize && tabletSize) {
    headers = [
      {id: "nombre", numeric: "false", label:"Nombre y Apellido"},
      {id: "correo", numeric: "false", label:"E-mail"},
      {id: "dni", numeric: "true", label:"DNI"},
    ]
  } else {
    headers = [
      {id: "nombre", numeric: "false", label:"Nombre y Apellido"},
      {id: "correo", numeric: "false", label:"E-mail"},
    ]
  }
  return headers
}


const ColumnasCustom = (dato, mobileSize, tabletSize, webSize) => {
  let history= useHistory()

  const getInquilino = (id) =>{
    history.push(`/inquilino/${id}`)
  }

  const getCells = () => {
    if (mobileSize) {
      return (
        <StyledTableRow key={dato.id} onClick={() => getInquilino(dato.id)} className="pointer animate__animated animate__fadeIn">
        <StyledTableCell  component="th" scope="row">
          <div className="contenedorColumna">
            <span className="tableBold">{dato.nombre +" "+ dato.apellido}</span>
          </div>
        </StyledTableCell>
        <StyledTableCell className="tableNormal" component="th" scope="row">{dato.correo}</StyledTableCell>
      </StyledTableRow>
      )
    } else if (tabletSize) {
      return (
        <StyledTableRow key={dato.id} onClick={() => getInquilino(dato.id)} className="pointer animate__animated animate__fadeIn">
        <StyledTableCell  component="th" scope="row">
          <div className="contenedorColumna">
            <span className="tableBold">{dato.nombre +" "+ dato.apellido}</span>
          </div>
        </StyledTableCell>
        <StyledTableCell className="tableNormal" component="th" scope="row">{dato.correo}</StyledTableCell>
        <StyledTableCell className="tableNormal" component="th" scope="row">{numeroConPuntos(dato.dni)}</StyledTableCell>
      </StyledTableRow>
      )
    } else if (webSize) {
      return (
        <StyledTableRow key={dato.id} onClick={() => getInquilino(dato.id)} className="pointer animate__animated animate__fadeIn">
        <StyledTableCell  component="th" scope="row">
          <div className="contenedorColumna">
            <span className="tableBold">{dato.nombre +" "+ dato.apellido}</span>
          </div>
        </StyledTableCell>
        <StyledTableCell className="tableNormal" component="th" scope="row">{dato.correo}</StyledTableCell>
        <StyledTableCell className="tableNormal" component="th" scope="row">{numeroConPuntos(dato.dni)}</StyledTableCell>
        <StyledTableCell className="tableNormal" component="th" scope="row">{dato.ultimaModificacion}</StyledTableCell>
      </StyledTableRow>
      )
    }
  }

  return (getCells())
}

export const Inquilinos = () =>{
    const location = useLocation()
    let history = useHistory()  
    const [inquilinos, setInquilinos] = useState([])
    const { openSnackbar, setOpenSnackbar, mensajeSnack, usarSnack } = useSnack();
    const [textoBusqueda, setTextoBusqueda] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const { user } = useContext(UserContext)
    let mobileSize = useMediaQuery('(max-width: 400px)')
    let tabletSize = useMediaQuery('(max-width: 768px)')
    let webSize = useMediaQuery('(min-width: 769px)')

    useEffect( ()  =>  {
      const fetchAllUsers = async (textoBusqueda) => {
        let usuariosEncontrados
        !user.esPropietario()? 
          usuariosEncontrados = await usuarioService.getInquilinos(textoBusqueda) 
          :
          usuariosEncontrados = await usuarioService.getInquilinosDeUsuario(textoBusqueda, user.id)
        setInquilinos(usuariosEncontrados)
        setIsLoading(false)
      }

      if (user?.esPropietario()) {
        fetchAllUsers(textoBusqueda)
      } else {
        history.goBack()
      }
      
    },[textoBusqueda])

    useEffect( () =>{
  
      const fetchSnack = () => {
        if(location.state !== undefined){
          usarSnack(location.state.mensajeChild, false)
        }
      }
      fetchSnack()
    },[location.state])

    const newUser = () =>{
      history.push("/crearinquilino")
    }

    return (

        <RootBox>
           <Typography component="h2" variant="h5" className="tittle">
             Inquilinos 
           </Typography>
           <SearchBox> 
              <Busqueda holder="Buscá por nombre, apellido, DNI, e-mail o tipo de cuenta" busqueda={setTextoBusqueda} />
              <div>
               <span className="cantidadObject" > 
               {inquilinos.length} inquilinos </span>
              <StyledButtonPrimary onClick={newUser} >Agregar inquilino</StyledButtonPrimary>
              </div>
           </SearchBox>
           {inquilinos.length > 0 &&
            <Tabla datos={inquilinos} headers={getHeaders(mobileSize, tabletSize, webSize)} ColumnasCustom={ColumnasCustom} heightEnd={90} defaultSort={"nombre"} defaultOrder={"asc"}/>
           }
            { inquilinos.length === 0 && !isLoading &&
                <SearchWithoutResults resultado="inquilinos"/>
            }

              <SnackbarComponent snackColor={"#00A650"} openSnackbar={openSnackbar} mensajeSnack={mensajeSnack} handleCloseSnack={() => setOpenSnackbar(false)}/>
        
        </RootBox>
        
    )
}
