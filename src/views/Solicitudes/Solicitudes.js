import React, { useEffect, useState } from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import { Tabla, StyledTableRow, StyledTableCell } from '../../components/Tabla';
import { Busqueda } from '../../components/Busqueda'
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { solicitudService } from '../../services/solicitudService';
import { StyledButtonPrimary } from '../../components/Buttons'
import { SnackbarComponent } from '../../components/Snackbar'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    marginLeft: 300,
    marginTop: 30,
    marginRight: 50,
    flexDirection: "column"
  },
  tittle: {
    textAlign: "left",
  },
  contenedorBusqueda: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 20
  },
  cantidadObject: {
    fontWeight: 300,
    marginRight: 10
  },
  departamento: {
    display: "flex"
  }

});

const headers = [
  {id: "id", label:"Solicitud"},
  {id: "nombreAutor", label:"Autor"},
  {id: "titulo", label:"Título"},
  {id: "actividad", label:"Actividad"},
  {id: "nombreEstado", label:"Estado"}
]

const ColumnasCustom = (dato) => {

  let history = useHistory()

  const getSolicitud = (id) => {
    history.push(`/solicitud/${id}`)
  }

  return (
    <StyledTableRow key={dato.id} onClick={() => getSolicitud(dato.id)} className="pointer">
      <StyledTableCell component="th" scope="row">
        <div className="contenedorColumna">
          <span className="tableBold">{dato.id}</span>
          <span >{dato.fecha}</span>
        </div>
      </StyledTableCell>
      <StyledTableCell className="tableNormal" component="th" scope="row">{dato.nombreAutor}</StyledTableCell>
      <StyledTableCell className="tableNormal" component="th" scope="row">{dato.titulo}</StyledTableCell>
      <StyledTableCell className="tableNormal" component="th" scope="row">Modificado hace {Math.floor(Math.random() * 10)} horas</StyledTableCell>
      <StyledTableCell className="tableBold" component="th" scope="row">{dato.nombreEstado}</StyledTableCell>
    </StyledTableRow>)
}

export const Solicitudes = () => {
  const classes = useStyles();
  const [solicitudes, setSolicitudes] = useState([])
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [mensajeSnack, setMensajeSnack] = useState()
  const [textoBusqueda, setTextoBusqueda] = useState('')
  let history = useHistory()
  let location = useLocation()



  const newSolicitud = () => {
    history.push("/newsolicitud")
  }

  useEffect(() => {
    const fetchAllSolicitudes = async (textoBusqueda) => {
      const solicitudesEncontradas = await solicitudService.getAllSolicitudes(textoBusqueda)
      setSolicitudes(solicitudesEncontradas)
    }
    fetchAllSolicitudes(textoBusqueda)
  }, [textoBusqueda])

  useEffect( () =>{
    const usarSnack = () => {
      setOpenSnackbar(location.state.openChildSnack)
      setMensajeSnack(location.state.mensajeChild)
    }

    const fetchSnack = () => {
      location.state === undefined? setOpenSnackbar(false) : usarSnack()
    }
    fetchSnack()
  },[location.state])

  return (
    <div className={classes.root} >
      <Typography component="h2" variant="h5" className={classes.tittle}>
        Solicitudes técnicas
      </Typography>
      <div className={classes.contenedorBusqueda}>
        <Busqueda holder="Buscá por solicitud, autor, titulo o estado" busqueda={ setTextoBusqueda } />
        <div>
          <span className={classes.cantidadObject} > {solicitudes.length} solicitudes técnicas </span>
          <StyledButtonPrimary onClick={newSolicitud}>Agregar solicitud técnica</StyledButtonPrimary>
        </div>
      </div>
      <Tabla datos={solicitudes} headers={headers} ColumnasCustom={ColumnasCustom} heightEnd={90} defaultSort={"id"} defaultOrder={"desc"}/>
    
      <SnackbarComponent snackColor={"#00A650"} openSnackbar={openSnackbar} mensajeSnack={mensajeSnack} handleCloseSnack={() => setOpenSnackbar(false)} />

    </div>

  )
}
