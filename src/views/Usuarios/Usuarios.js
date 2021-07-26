import React, { useEffect, useState } from 'react'
import { makeStyles, Typography, Snackbar } from '@material-ui/core';
import { Tabla, StyledTableRow, StyledTableCell } from '../../components/Tabla';
import { usuarioService } from '../../services/usuarioService';
import { Busqueda } from '../../components/Busqueda'
import { StyledButtonPrimary } from '../../components/Buttons'
import { useHistory, useLocation } from 'react-router-dom';
import { SnackbarComponent } from '../../components/Snackbar'
import { numeroConPuntos, splitVisual } from '../../utils/formats';
import useSnack from '../../hooks/UseSnack';
import { RootBox, SearchBox } from '../../components/Contenedores';
import { SearchWithoutResults } from '../../components/SearchWithoutResults';


const useStyles = makeStyles ({
    cantidadObject:{
      fontWeight: 300,
      marginRight: 10
    },
  });

const headers = [
  {id: "nombre", numeric: "false", label:"Nombre y Apellido"},
  {id: "correo", numeric: "false", label:"E-mail"},
  {id: "dni", numeric: "true", label:"DNI"},
  {id: "actividad", numeric: "false", label:"Actividad"},
  {id: "tipo", numeric: "false", label:"Tipo de Cuenta"}
]


const ColumnasCustom = (dato) => {
  let history= useHistory()

  const getUser = (id) =>{
    history.push(`/usuario/${id}`)
  }

  return (
  <StyledTableRow key={dato.id} onClick={() => getUser(dato.id)} className="pointer">
    <StyledTableCell  component="th" scope="row">
      <div className="contenedorColumna">
        <span className="tableBold">{dato.nombre +" "+ dato.apellido}</span>
      </div>
    </StyledTableCell>
    <StyledTableCell className="tableNormal" component="th" scope="row">{dato.correo}</StyledTableCell>
    <StyledTableCell className="tableNormal" component="th" scope="row">{numeroConPuntos(dato.dni)}</StyledTableCell>
    <StyledTableCell className="tableNormal" component="th" scope="row">{dato.ultimaModificacion}</StyledTableCell>
    <StyledTableCell className="tableBold" component="th" scope="row">{splitVisual(dato.tipo)}</StyledTableCell>
  </StyledTableRow>
  )
}

export const Usuarios = () =>{
    const location = useLocation()
    let history = useHistory()  
    const classes = useStyles()
    const [usuarios, setUsuarios] = useState([])
    const { openSnackbar, setOpenSnackbar, mensajeSnack, usarSnack } = useSnack();
    const [textoBusqueda, setTextoBusqueda] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    useEffect( ()  =>  {
      const fetchAllUsers = async (textoBusqueda) => {
        const usuariosEncontrados = await usuarioService.getBySearch(textoBusqueda)
        setUsuarios(usuariosEncontrados)
        setIsLoading(false)
      }

      fetchAllUsers(textoBusqueda)
      
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
      history.push("/newuser")
    }

    return (
        <RootBox>
           <Typography component="h2" variant="h5" className="tittle">
             Usuarios 
           </Typography>
           <SearchBox> 
              <Busqueda holder="Buscá por nombre, apellido, DNI, e-mail o tipo de cuenta" busqueda={setTextoBusqueda} />
              <div>
               <span className={classes.cantidadObject} > {usuarios.length} usuarios </span>
              <StyledButtonPrimary onClick={newUser} >Agregar usuario</StyledButtonPrimary>
              </div>
           </SearchBox>
           {usuarios.length >1 &&
            <Tabla datos={usuarios} headers={headers} ColumnasCustom={ColumnasCustom} heightEnd={90} defaultSort={"nombre"} defaultOrder={"asc"}/>
           }
            { usuarios.length === 0 && !isLoading &&
                <SearchWithoutResults/>
            }

              <SnackbarComponent snackColor={"#00A650"} openSnackbar={openSnackbar} mensajeSnack={mensajeSnack} handleCloseSnack={() => setOpenSnackbar(false)}/>
        
        </RootBox>
        
    )
}
