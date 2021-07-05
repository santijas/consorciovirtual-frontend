import React, { useEffect, useState } from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import { Tabla, StyledTableRow, StyledTableCell } from '../../components/Tabla';
import { departamentoService } from '../../services/departamentoService';
import { Busqueda } from '../../components/Busqueda'
import { StyledButtonPrimary } from '../../components/Buttons'
import { useHistory, useLocation } from 'react-router-dom';
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
        <StyledTableCell className="tableNormal" component="th" scope="row">Modificado hace {Math.floor(Math.random() * 10)} horas</StyledTableCell>
        { estadoDeCuenta(dato.estadoCuenta) }
      </StyledTableRow>
    )
  }

  const estadoDeCuenta = (estado) => {
    return estado?
    <StyledTableCell className="tableBold" component="th" scope="row">Pagado</StyledTableCell> 
    :
    <StyledTableCell className="tableBold"  component="th" scope="row">Pendiente</StyledTableCell>
  }

export const Departamentos = () =>{
    const location = useLocation();
    const classes = useStyles();
    const [departamentos, setDepartamentos] = useState([])
    const [openSnackbar, setOpenSnackbar] = useState('')
    const [mensajeSnack, setMensajeSnack] = useState('')
    let history = useHistory()  



    const fetchAllDepartamentos = async (textoBusqueda) =>{
      const deptosEncontrados = await departamentoService.getBySearch(textoBusqueda)
      setDepartamentos(deptosEncontrados)
    }

    const newDepto = () =>{
      history.push("/newdepartamento")
    }

    const fetchSnack = () => {
      location.state === undefined? setOpenSnackbar(false) : usarSnack()
    }

    const usarSnack = () =>{
      setOpenSnackbar(location.state.openChildSnack)
      setMensajeSnack(location.state.mensajeChild)
    }

    useEffect( ()  =>  {
      fetchAllDepartamentos("")
      fetchSnack()
    },[])

    return (
        <div className={classes.root} >
            <Typography component="h2" variant="h5" className={classes.tittle}>
              Departamentos
            </Typography>
            <div className={classes.contenedorBusqueda}> 
                <Busqueda holder="Buscá por departamento, propietario, inquilino o estado de cuenta" busqueda={fetchAllDepartamentos} />
                <div>
                <span className={classes.cantidadObject} > {departamentos.length} departamentos </span>
                <StyledButtonPrimary onClick={newDepto}>Agregar departamento</StyledButtonPrimary>
                </div>
            </div>
            <Tabla datos={departamentos} headers={headers} ColumnasCustom={ColumnasCustom} heightEnd={90} defaultSort={"piso"} defaultOrder={"asc"}/>
            <SnackbarComponent snackColor={"#00A650"} openSnackbar={openSnackbar} mensajeSnack={mensajeSnack} handleCloseSnack={() => setOpenSnackbar(false)}/>
        
         </div>

    )
}
