import React, { useEffect, useState } from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import { Tabla, StyledTableRow, StyledTableCell } from '../components/Tabla';
import { usuarioService } from '../services/usuarioService';
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

const headers = ["Fecha", "Título", "Tipo", "Actividad", "Monto"]


const ColumnasCustom = (dato) => {
let history= useHistory()

const getUser = (id) =>{
  history.push(`/usuario/${id}`)
}

return (
<StyledTableRow key={dato.id} onClick={() => getUser(dato.username)} className="pointer">
  <StyledTableCell className="tableNormal" component="th" scope="row">{dato.fecha}</StyledTableCell>
  <StyledTableCell className="tableNormal" component="th" scope="row">{dato.titulo}</StyledTableCell>
  <StyledTableCell className="tableNormal" component="th" scope="row">{dato.tipo}</StyledTableCell>
  <StyledTableCell className="tableNormal" component="th" scope="row">Modificado hace {Math.floor(Math.random() * 10)} horas</StyledTableCell>
  <StyledTableCell className="tableBold" component="th" scope="row">{dato.monto}</StyledTableCell>
</StyledTableRow>
)
}
export const Gastos = () =>{
    const classes = useStyles();
    const [gastos, setGastos] = useState([])
    let history = useHistory()

    const fetchAll = async (textoBusqueda) =>{
      const gastosEncontrados = [] //await gastosService.getAll()
      setGastos(gastosEncontrados)
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
             Gastos
           </Typography>
           <div className={classes.contenedorBusqueda}> 
              <Busqueda holder="Buscá por fecha, título o monto" busqueda={fetchAll} />
              <div>
               <span className={classes.cantidadObject} > {gastos.length} gastos </span>
              <StyledButtonPrimary onClick={newUser} >Agregar gasto</StyledButtonPrimary>
              </div>
           </div>
            <Tabla datos={gastos} headers={headers} ColumnasCustom={ColumnasCustom}/>
         </div>

    )
}
