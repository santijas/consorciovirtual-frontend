import React, { useContext, useEffect, useState } from 'react'
import { Typography } from '@material-ui/core';
import { Tabla, StyledTableRow, StyledTableCell } from '../../components/Tabla';
import { reclamoService } from '../../services/reclamoService';
import { Busqueda } from '../../components/Busqueda'
import { StyledButtonPrimary } from '../../components/Buttons'
import { useHistory } from 'react-router-dom';
import { SnackbarComponent } from '../../components/Snackbar'
import { useLocation } from 'react-router-dom';
import useSnack from '../../hooks/UseSnack';
import { RootBox, SearchBox } from '../../components/Contenedores';
import { soloFecha } from '../../utils/formats';
import { SearchWithoutResults } from '../../components/SearchWithoutResults';
import { padLeadingZeros } from '../../utils/formats';
import { UserContext } from '../../hooks/UserContext';

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
    <StyledTableRow key={dato.id} onClick={() => getReclamo(dato.id)} className="pointer animate__animated animate__fadeIn" style={dato.estado === 'Resuelto' ? {background: "rgba(198, 198 ,198 , 10%)", boxShadow: "0px 1px 2px rgb(0 0 0 / 20%)"} : {}}>
      <StyledTableCell component="th" scope="row">
        <div className="contenedorColumna">
          <span className="tableBold">{padLeadingZeros(dato.id, 5)}</span>
          <span className="tableNormal">{soloFecha(dato.fecha)}</span>
        </div>
      </StyledTableCell>
      <StyledTableCell className="tableNormal" component="th" scope="row">{dato.nombreAutor}</StyledTableCell>
      <StyledTableCell className="tableNormal" component="th" scope="row">{dato.asunto}</StyledTableCell>
      <StyledTableCell className="tableNormal" component="th" scope="row">{dato.ultimaModificacion}</StyledTableCell>
      <StyledTableCell className="tableBold" component="th" scope="row" style={dato.estado === 'Resuelto' ? { color: "#159D74" } : {}}>{dato.estado}</StyledTableCell>
    </StyledTableRow>
  )
}
export const Reclamos = () => {
  const [reclamos, setReclamos] = useState([])
  const { openSnackbar, setOpenSnackbar, mensajeSnack, usarSnack } = useSnack();
  const [textoBusqueda, setTextoBusqueda] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useContext(UserContext)
  let history = useHistory()
  let location = useLocation()


  const newReclamo = () => {
    history.push("/crearreclamo")
  }

  useEffect(() => {
    const fetchAllReclamos = async (textoBusqueda) => {
      const reclamosEncontrados = await reclamoService.getAll(textoBusqueda)
      setReclamos(reclamosEncontrados)
      setIsLoading(false)
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
          <span className="cantidadObject" > {reclamos.length} reclamos </span>
         {!user?.esAdmin() && <StyledButtonPrimary onClick={newReclamo} >Agregar reclamo</StyledButtonPrimary>}
        </div>
      </SearchBox>
      {reclamos.length > 0 &&
      <Tabla datos={reclamos} headers={headers} ColumnasCustom={ColumnasCustom} heightEnd={110} defaultSort={"nombre"} defaultOrder={"desc"} />
      }
       { reclamos.length === 0 && !isLoading &&
                <SearchWithoutResults resultado="reclamos"/>
       }

      <SnackbarComponent snackColor={"#00A650"} openSnackbar={openSnackbar} mensajeSnack={mensajeSnack} handleCloseSnack={() => setOpenSnackbar(false)} />

    </RootBox>

  )
}