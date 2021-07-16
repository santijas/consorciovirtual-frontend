import React, { useEffect, useState } from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import { Tabla, StyledTableRow, StyledTableCell } from '../../components/Tabla';
import { reclamoService } from '../../services/reclamoService';
import { Busqueda } from '../../components/Busqueda'
import { StyledButtonPrimary } from '../../components/Buttons'
import { useHistory } from 'react-router-dom';
import { SnackbarComponent } from '../../components/Snackbar'
import { useLocation } from 'react-router-dom';
import useSnack from '../../hooks/UseSnack';
import { RootBox, SearchBox } from '../../components/Contenedores';

const useStyles = makeStyles({
  cantidadObject: {
    fontWeight: 300,
    marginRight: 10
  },
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
      <StyledTableCell className="tableNormal" component="th" scope="row">{dato.nombreAutor}</StyledTableCell>
      <StyledTableCell className="tableNormal" component="th" scope="row">{dato.asunto}</StyledTableCell>
      <StyledTableCell className="tableNormal" component="th" scope="row">Modificado hace {Math.floor(Math.random() * 10)} horas</StyledTableCell>
      <StyledTableCell className="tableBold" component="th" scope="row">{dato.estado}</StyledTableCell>
    </StyledTableRow>
  )
}
export const Reclamos = () => {
  const classes = useStyles();
  const [reclamos, setReclamos] = useState([])
  const { openSnackbar, setOpenSnackbar, mensajeSnack, usarSnack } = useSnack();
  const [textoBusqueda, setTextoBusqueda] = useState('')
  let history = useHistory()
  let location = useLocation()


  const newReclamo = () => {
    history.push("/newreclamo")
  }

  useEffect(() => {
    const fetchAllReclamos = async (textoBusqueda) => {
      const reclamosEncontrados = await reclamoService.getAll(textoBusqueda)
      setReclamos(reclamosEncontrados)
    }
    fetchAllReclamos(textoBusqueda)
  }, [textoBusqueda])

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
        Reclamos
      </Typography>
      <SearchBox>
        <Busqueda holder="Buscá por id, asunto o estado" busqueda={setTextoBusqueda} />
        <div>
          <span className={classes.cantidadObject} > {reclamos.length} reclamos </span>
          <StyledButtonPrimary onClick={newReclamo} >Agregar Reclamo</StyledButtonPrimary>
        </div>
      </SearchBox>
      <Tabla datos={reclamos} headers={headers} ColumnasCustom={ColumnasCustom} defaultSort={"nombre"} defaultOrder={"desc"} />

      <SnackbarComponent snackColor={"#00A650"} openSnackbar={openSnackbar} mensajeSnack={mensajeSnack} handleCloseSnack={() => setOpenSnackbar(false)} />

    </RootBox>

  )
}