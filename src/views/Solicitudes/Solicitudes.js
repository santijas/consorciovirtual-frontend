import React, { useEffect, useState } from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import { Tabla, StyledTableRow, StyledTableCell } from '../../components/Tabla';
import { Busqueda } from '../../components/Busqueda'
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { solicitudService } from '../../services/solicitudService';
import { StyledButtonPrimary } from '../../components/Buttons'
import { SnackbarComponent } from '../../components/Snackbar'
import useSnack from '../../hooks/UseSnack';
import { RootBox, SearchBox } from '../../components/Contenedores';
import { SearchWithoutResults } from '../../components/SearchWithoutResults';
import { soloFecha } from '../../utils/formats';
import { padLeadingZeros } from '../../utils/formats';

const useStyles = makeStyles({
  cantidadObject: {
    fontWeight: 300,
    marginRight: 10
  },
});

const headers = [
  { id: "id", label: "Solicitud" },
  { id: "nombreAutor", label: "Autor" },
  { id: "titulo", label: "Título" },
  { id: "actividad", label: "Actividad" },
  { id: "nombreEstado", label: "Estado" }
]

const ColumnasCustom = (dato) => {

  let history = useHistory()

  const getSolicitud = (id) => {
    history.push(`/solicitud/${id}`)
  }

  const colorEstado = (nombre) => {
    if (nombre === 'Resuelto') {
      return { color: "#159D74" }
    } else if (nombre === 'Rechazado') {
      return { color: "rgba(255, 0 , 0 , 75%)" }
    }
  }

  return (
    <StyledTableRow key={dato.id} onClick={() => getSolicitud(dato.id)} className="pointer" style={dato.nombreEstado === 'Resuelto' || dato.nombreEstado === 'Rechazado' ? {background: "rgba(198, 198 ,198 , 10%)", boxShadow: "0px 1px 2px rgb(0 0 0 / 20%)"} : {}}>
      <StyledTableCell component="th" scope="row">
        <div className="contenedorColumna">
          <span className="tableBold">{padLeadingZeros(dato.id, 5)}</span>
          <span >{soloFecha(dato.fecha)}</span>
        </div>
      </StyledTableCell>
      <StyledTableCell className="tableNormal" component="th" scope="row">{dato.nombreAutor}</StyledTableCell>
      <StyledTableCell className="tableNormal" component="th" scope="row">{dato.titulo}</StyledTableCell>
      <StyledTableCell className="tableNormal" component="th" scope="row">{dato.ultimaModificacion}</StyledTableCell>
      <StyledTableCell className="tableBold" component="th" scope="row" style={colorEstado(dato.nombreEstado)}>{dato.nombreEstado}</StyledTableCell>
    </StyledTableRow>)
}

export const Solicitudes = () => {
  const classes = useStyles();
  const [solicitudes, setSolicitudes] = useState([])
  const { openSnackbar, setOpenSnackbar, mensajeSnack, usarSnack } = useSnack();
  const [textoBusqueda, setTextoBusqueda] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  let history = useHistory()
  let location = useLocation()



  const newSolicitud = () => {
    history.push("/crearsolicitud")
  }

  useEffect(() => {
    const fetchAllSolicitudes = async (textoBusqueda) => {
      const solicitudesEncontradas = await solicitudService.getAllSolicitudes(textoBusqueda)
      setSolicitudes(solicitudesEncontradas)
      setIsLoading(false)
    }
    fetchAllSolicitudes(textoBusqueda)
  }, [textoBusqueda])

  useEffect(() => {

    const fetchSnack = () => {
      if (location.state !== undefined) {
        usarSnack(location.state.mensajeChild, false)
      }
    }
    fetchSnack()
  }, [location.state])

  return (
    <RootBox >
      <Typography component="h2" variant="h5" className="tittle">
        Solicitudes técnicas
      </Typography>
      <SearchBox>
        <Busqueda holder="Buscá por solicitud, autor, titulo o estado" busqueda={setTextoBusqueda} />
        <div>
          <span className={classes.cantidadObject} > {solicitudes.length} solicitudes técnicas </span>
          <StyledButtonPrimary onClick={newSolicitud}>Agregar solicitud técnica</StyledButtonPrimary>
        </div>
      </SearchBox>
      {solicitudes.length > 0 &&
        <Tabla datos={solicitudes} headers={headers} ColumnasCustom={ColumnasCustom} heightEnd={90} defaultSort={"id"} defaultOrder={"desc"} />
      }
      {solicitudes.length === 0 && !isLoading &&
        <SearchWithoutResults resultado="solicitudes" />
      }
      <SnackbarComponent snackColor={"#00A650"} openSnackbar={openSnackbar} mensajeSnack={mensajeSnack} handleCloseSnack={() => setOpenSnackbar(false)} />

    </RootBox>

  )
}
