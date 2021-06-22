import React, { useEffect, useState } from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import { Tabla, StyledTableRow, StyledTableCell } from '../../components/Tabla';
import { usuarioService } from '../../services/usuarioService';
import { Busqueda } from '../../components/Busqueda'
import { useHistory } from 'react-router-dom';
import { solicitudService } from '../../services/solicitudService';
import { StyledButtonPrimary } from '../../components/Buttons'


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

const headers = ["Solicitud", "Autor", "Título", "Actividad", "Estado"]

const ColumnasCustom = (dato) => <StyledTableRow key={dato.id}>
  <StyledTableCell  component="th" scope="row">
    <div className="contenedorColumna">
      <span className="tableBold">{dato.id}</span>
      <span >{dato.fecha}</span>
    </div>
  </StyledTableCell>
  <StyledTableCell className="tableNormal" component="th" scope="row">{dato.autor}</StyledTableCell>
  <StyledTableCell className="tableNormal" component="th" scope="row">{dato.titulo}</StyledTableCell>
  <StyledTableCell className="tableNormal" component="th" scope="row">Modificado hace {Math.floor(Math.random() * 10)} horas</StyledTableCell>
  <StyledTableCell className="tableBold" component="th" scope="row">{dato.estado}</StyledTableCell>
</StyledTableRow>

export const Solicitudes = () =>{
    const classes = useStyles();
    const [solicitudes, setSolicitudes] = useState([])
    let history = useHistory()

    const fetchAllSolicitudes = async (textoBusqueda) =>{
      const solicitudesEncontradas = await solicitudService.getAllSolicitudes()
      setSolicitudes(solicitudesEncontradas)
    }

    const newUser = () =>{
      history.push("/solicitud/1")
    }
    

    useEffect( ()  =>  {
      fetchAllSolicitudes("")
    },[])

    return (
        <div className={classes.root} >
           <Typography component="h2" variant="h5" className={classes.tittle}>
             Solicitudes técnicas
           </Typography>
           <div className={classes.contenedorBusqueda}> 
             <Busqueda holder="Buscá por solicitud, autor, titulo o estado" busqueda={fetchAllSolicitudes} />
             <div>
               <span className={classes.cantidadObject} > {solicitudes.length} solicitudes técnicas </span>
             <StyledButtonPrimary >Agregar solicitud técnica</StyledButtonPrimary>
            </div>
           </div>
            <Tabla datos={solicitudes} headers={headers} ColumnasCustom={ColumnasCustom} heightEnd={90}/>
         </div>

    )
}
