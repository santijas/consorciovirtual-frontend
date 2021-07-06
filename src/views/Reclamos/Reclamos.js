import React, { useEffect, useState } from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import { Tabla, StyledTableRow, StyledTableCell } from '../../components/Tabla';
import { reclamoService } from '../../services/reclamoService';
import { Busqueda } from '../../components/Busqueda'
import { StyledButtonPrimary } from '../../components/Buttons'
import { useHistory } from 'react-router-dom';
import { SnackbarComponent } from '../../components/Snackbar'
import { useLocation } from 'react-router-dom';

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
  { id: "id", label: "Reclamo" },
  { id: "autor", label: "Autor" },
  { id: "asunto", label: "Asunto" },
  { id: "fechaModificacion", label: "Actividad" },
  { id: "Estado", label: "Estado" }
]

const ColumnasCustom = (dato) => {
  let history = useHistory()

  const getReclamo = (id) => {
    history.push(`/reclamo/${id}`)
  }

  return (
    <StyledTableRow key={dato.id} onClick={() => getReclamo(dato.id)} className="pointer">
      <StyledTableCell component="th" scope="row">
        <div className="contenedorColumna">
          <span className="tableBold">{dato.id}</span>
          <span >{dato.fecha}</span>
        </div>
      </StyledTableCell>
      <StyledTableCell className="tableNormal" component="th" scope="row">{dato.autor}</StyledTableCell>
      <StyledTableCell className="tableNormal" component="th" scope="row">{dato.asunto}</StyledTableCell>
      <StyledTableCell className="tableNormal" component="th" scope="row">Modificado hace {Math.floor(Math.random() * 10)} horas</StyledTableCell>
      <StyledTableCell className="tableBold" component="th" scope="row">{dato.estado}</StyledTableCell>
    </StyledTableRow>
  )
}
export const Reclamos = () => {
  const classes = useStyles();
  const [reclamos, setReclamos] = useState([])
  const [openSnackbar, setOpenSnackbar] = useState('')
  const [mensajeSnack, setMensajeSnack] = useState()
  let history = useHistory()
  let location = useLocation()

  const fetchAllReclamos = async (textoBusqueda) => {
    const reclamosEncontrados = await reclamoService.getAll(textoBusqueda)
    setReclamos(reclamosEncontrados)
  }

  const newReclamo = () => {
    history.push("/newreclamo")
  }

  useEffect(() => {
    fetchAllReclamos("")
    fetchSnack()
  }, [])

  const fetchSnack = () => {
    location.state === undefined ? setOpenSnackbar(false) : usarSnack()
  }

  const usarSnack = () => {
      setOpenSnackbar(location.state.openChildSnack)
      setMensajeSnack(location.state.mensajeChild)
  }

  return (
    <div className={classes.root} >
      <Typography component="h2" variant="h5" className={classes.tittle}>
        Reclamos
      </Typography>
      <div className={classes.contenedorBusqueda}>
        <Busqueda holder="Buscá por id, asunto o estado" busqueda={fetchAllReclamos} />
        <div>
          <span className={classes.cantidadObject} > {reclamos.length} reclamos </span>
          <StyledButtonPrimary onClick={newReclamo} >Agregar Reclamo</StyledButtonPrimary>
        </div>
      </div>
      <Tabla datos={reclamos} headers={headers} ColumnasCustom={ColumnasCustom} defaultSort={"nombre"} defaultOrder={"desc"} />

      <SnackbarComponent snackColor={"#00A650"} openSnackbar={openSnackbar} mensajeSnack={mensajeSnack} handleCloseSnack={() => setOpenSnackbar(false)} />

    </div>

  )
}