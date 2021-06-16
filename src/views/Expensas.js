import React, { useEffect, useState } from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import { Tabla, StyledTableRow, StyledTableCell } from '../components/Tabla';
import { expensaService } from '../services/expensaService';
import { Busqueda } from '../components/Busqueda'
import { StyledButtonPrimary } from '../components/Buttons'
import { useHistory } from 'react-router-dom';


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

const headers = ["Período", "Departamento", "Tipo", "Monto a pagar", "Estado"]


const ColumnasCustom = (dato) => {
  return (
  <StyledTableRow key={dato.id} className="pointer">
    <StyledTableCell className="tableNormal" component="th" scope="row">{dato.periodo}</StyledTableCell>
    <StyledTableCell className="tableNormal" component="th" scope="row">{dato.departamento}</StyledTableCell>
    { tipoDeExpensa(dato.tipoOrdinaria) }
    <StyledTableCell className="tableNormal" component="th" scope="row">{dato.valorTotalExpensa}</StyledTableCell>
    { estadoDePago(dato.estado) }
  </StyledTableRow>
  )
}

const tipoDeExpensa = (tipoOrdinaria) => {
  return tipoOrdinaria?
  <StyledTableCell className="tableNormal" component="th" scope="row">Ordinaria</StyledTableCell> 
  :
  <StyledTableCell className="tableNormal"  component="th" scope="row">Extraordinaria</StyledTableCell>
}

const estadoDePago = (estado) => {
  return estado?
  <StyledTableCell className="tableBold" component="th" scope="row">Pagado</StyledTableCell> 
  :
  <StyledTableCell className="tableBold"  component="th" scope="row">Pendiente</StyledTableCell>
}

export const Expensas = () =>{
    const classes = useStyles();
    const [expensas, setExpensas] = useState([])
    let history = useHistory()

    const fetchAll = async (textoBusqueda) =>{
      const gastosEncontrados = await expensaService.getAllExpensas()
      setExpensas(gastosEncontrados)
    }

    const newUser = () =>{
      history.push("/newuser")
    }
    

    useEffect( ()  =>  {
        fetchAll("")
    },[])

    return (
        <div className={classes.root} >
           <Typography component="h2" variant="h5" className={classes.tittle}>
             Expensas
           </Typography>
           <div className={classes.contenedorBusqueda}> 
              <Busqueda holder="Buscá por fecha, título o monto" busqueda={fetchAll} />
              <div>
               <span className={classes.cantidadObject} > {expensas.length} expensas </span>
              <StyledButtonPrimary onClick={newUser} >Agregar expensa</StyledButtonPrimary>
              </div>
           </div>
            <Tabla datos={expensas} headers={headers} ColumnasCustom={ColumnasCustom}/>
         </div>

    )
}