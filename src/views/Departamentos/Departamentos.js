import React, { useEffect, useState } from 'react'
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

const useStyles = makeStyles ({
    cantidadObject:{
      fontWeight: 300,
      marginRight: 10
    }
  });


  const headers = [
    {id: "piso", label:"Departamento"},
    {id: "propietario", label:"Propietario"},
    {id: "inquilino", label:"Inquilino"},
    {id: "actividad", label:"Actividad"},
    {id: "estadoCuenta", label:"Estado de cuenta"},
  ]
  
  const ColumnasCustom = (dato) => { 
    
    let history= useHistory()
  
    const showDepartamento = (id) =>{
      history.push(`/departamento/${id}`)
    }

    return (
      
      <StyledTableRow key={dato.id} onClick={() => showDepartamento(dato.id)} className="pointer">
        <StyledTableCell className="tableBold" component="th" scope="row">{dato.piso}º {dato.nroDepartamento}</StyledTableCell>
        <StyledTableCell className="tableNormal" component="th" scope="row">{dato.propietario}</StyledTableCell>
        <StyledTableCell className="tableNormal" component="th" scope="row">{dato.inquilino}</StyledTableCell>
        <StyledTableCell className="tableNormal" component="th" scope="row">{dato.ultimaModificacion}</StyledTableCell>
        <StyledTableCell className="tableBold" component="th" scope="row">{dato.estadoDeCuenta}</StyledTableCell> 
      </StyledTableRow>
    )
  }

export const Departamentos = () =>{
    const location = useLocation();
    const classes = useStyles();
    const [departamentos, setDepartamentos] = useState([])
    const { openSnackbar, setOpenSnackbar, mensajeSnack, usarSnack } = useSnack();
    const [textoBusqueda, setTextoBusqueda] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    let history = useHistory()  

    const newDepto = () =>{
      history.push("/newdepartamento")
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
                <Busqueda holder="Buscá por departamento, propietario, inquilino o estado de cuenta" busqueda={setTextoBusqueda} />
                <div>
                <span className={classes.cantidadObject} > {departamentos.length} departamentos </span>
                <StyledButtonPrimary onClick={newDepto}>Agregar departamento</StyledButtonPrimary>
                </div>
            </SearchBox>
            {
              departamentos.length > 0 &&
            <Tabla datos={departamentos} headers={headers} ColumnasCustom={ColumnasCustom} heightEnd={90} defaultSort={"piso"} defaultOrder={"asc"}/>
            }
            { departamentos.length === 0 && !isLoading &&
                <SearchWithoutResults resultado="departamentos"/>
            }
            
            <SnackbarComponent snackColor={"#00A650"} openSnackbar={openSnackbar} mensajeSnack={mensajeSnack} handleCloseSnack={() => setOpenSnackbar(false)}/>
        
         </RootBox>

    )
}
