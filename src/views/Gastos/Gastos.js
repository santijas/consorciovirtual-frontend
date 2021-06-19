import React, { useEffect, useState } from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import { Tabla, StyledTableRow, StyledTableCell } from '../../components/Tabla';
import { usuarioService } from '../../services/usuarioService';
import { Busqueda } from '../../components/Busqueda'
import { StyledButtonPrimary } from '../../components/Buttons'
import { useHistory } from 'react-router-dom';
import { gastoService } from '../../services/gastoService';
import 'moment/locale/es'
import moment from 'moment';
import MomentUtils from '@date-io/moment';


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

const headers = ["Periodo", "Título", "Tipo", "Actividad", "Monto"]


const ColumnasCustom = (dato) => {
let history= useHistory()

const getGasto = (id) =>{
  history.push(`/gasto/${id}`)
}

const formatDate = (date) =>{
  const fecha = moment(date).format('MMMM YYYY').toUpperCase()
  const lower = fecha.toLowerCase();
  return fecha.charAt(0).toUpperCase() + lower.slice(1);
}

return (
<StyledTableRow key={dato.id} onClick={() => getGasto(dato.id)} className="pointer">
  <StyledTableCell className="tableNormal" component="th" scope="row">{formatDate(dato.periodo)}</StyledTableCell>
  <StyledTableCell className="tableNormal" component="th" scope="row">{dato.titulo}</StyledTableCell>
  <StyledTableCell className="tableNormal" component="th" scope="row">{dato.tipo}</StyledTableCell>
  <StyledTableCell className="tableNormal" component="th" scope="row">Modificado hace {Math.floor(Math.random() * 10)} horas</StyledTableCell>
  <StyledTableCell className="tableBold" component="th" scope="row">{dato.importe}</StyledTableCell>
</StyledTableRow>
)
}
export const Gastos = () =>{
    const classes = useStyles();
    const [gastos, setGastos] = useState([])
    let history = useHistory()

    const fetchAll = async (textoBusqueda) =>{
      const gastosEncontrados = await gastoService.getAll(textoBusqueda)
      setGastos(gastosEncontrados)
    }

    const newUser = () =>{
      history.push("/newgasto")
    }
    
 
    useEffect( ()  =>  {
        fetchAll("")
    },[])

    return (
        <div className={classes.root} >
           <Typography component="h2" variant="h5" className={classes.tittle}>
             Gastos
           </Typography>
           <div className={classes.contenedorBusqueda}> 
              <Busqueda holder="Buscá por fecha, título o monto" busqueda={fetchAll} />
              <div>
               <span className={classes.cantidadObject} > {gastos.length} gastos </span>
              <StyledButtonPrimary onClick={newUser} >Agregar gasto</StyledButtonPrimary>
              </div>
           </div>
            <Tabla datos={gastos} headers={headers} ColumnasCustom={ColumnasCustom} heightEnd={90}/>
         </div>

    )
}
