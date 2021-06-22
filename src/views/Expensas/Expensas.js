import React, { useEffect, useState } from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import { Tabla, StyledTableRow, StyledTableCell } from '../../components/Tabla';
import { expensaService } from '../../services/expensaService';
import { Busqueda } from '../../components/Busqueda'
import { StyledButtonPrimary, StyledButtonSecondary } from '../../components/Buttons'
import { useHistory } from 'react-router-dom';
import { formatDate } from '../../utils/formats';


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
    },
    botonAnular:{
      marginLeft: 8
    },
    contenedorBotones:{
      display: "flex",
      flexWrap: "nowrap",
      alignItems:"center"

    }

  });

const headers = [
  {id: "periodo", label:"Periodo"},
  {id: "departamento", label:"Departamento"},
  {id: "montoAPagar", label:"Monto a pagar"},
  {id: "estado", label:"Estado"},
]

const ColumnasCustom = (dato) => {
  return (
  <StyledTableRow key={dato.id} className="pointer">
    <StyledTableCell className="tableNormal" component="th" scope="row">{formatDate(dato.periodo)}</StyledTableCell>
    <StyledTableCell className="tableNormal" component="th" scope="row">{dato.departamento}</StyledTableCell>
    <StyledTableCell className="tableNormal" component="th" scope="row">{dato.montoAPagar}</StyledTableCell> 
    { estadoDePago(dato.estado) }
  </StyledTableRow>
  )
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
      const expensasEncontradas = await expensaService.getBySearch(textoBusqueda)
      setExpensas(expensasEncontradas)
    }

    const newExpensa = () =>{
      history.push("/newexpensa")
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
              <div className={classes.contenedorBotones}>
               <span className={classes.cantidadObject} > {expensas.length} expensas </span>
              <StyledButtonPrimary onClick={newExpensa} >Calcular expensas</StyledButtonPrimary>
              <StyledButtonSecondary className={classes.botonAnular} onClick={newExpensa}>Anular expensas</StyledButtonSecondary>
              </div>
           </div>
            <Tabla datos={expensas} headers={headers} ColumnasCustom={ColumnasCustom} heightEnd={90}/>
         </div>

    )
}