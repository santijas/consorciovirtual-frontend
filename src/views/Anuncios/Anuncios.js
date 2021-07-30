import React, { useContext, useEffect, useState } from 'react'
import { Typography } from '@material-ui/core';
import { Tabla, StyledTableRow, StyledTableCell } from '../../components/Tabla';
import { Busqueda } from '../../components/Busqueda'
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { anuncioService } from '../../services/anuncioService';
import { StyledButtonPrimary } from '../../components/Buttons'
import { SnackbarComponent } from '../../components/Snackbar'
import useSnack from '../../hooks/UseSnack';
import { RootBox, SearchBox } from '../../components/Contenedores';
import { fechaYaPaso, soloFecha } from '../../utils/formats';
import { SearchWithoutResults } from '../../components/SearchWithoutResults';
import { UserContext } from '../../hooks/UserContext';
import useWindowDimensions, { tamanioLimite } from '../../hooks/TamanioPantalla';


const Headers = () => {
  const { height, width } = useWindowDimensions();

  let headers

  if(width > tamanioLimite){
    headers = [
        { id: "fechaCreacion", label: "Fecha" },
        { id: "titulo", label: "Titulo" },
        { id: "nombreAutor", label: "Autor" },
        { id: "fechaModificacion", label: "Actividad" },
        { id: "fechaVencimiento", label: "Vencimiento" }
    ]
  }else{
    headers = [
        { id: "fechaCreacion", label: "Fecha" },
        { id: "titulo", label: "Titulo" },
        { id: "fechaVencimiento", label: "Vencimiento" }
    ]
  }


  return headers
}


const ColumnasCustom = (dato) => {
    const { height, width } = useWindowDimensions();
    let history = useHistory()

    const getAnuncio = (id) => {
        history.push(`/anuncio/${id}`)
    }

    const anuncioVencido = (fecha) =>{
        return fechaYaPaso(fecha)
    }

    return (
        <StyledTableRow key={dato.id} onClick={() => getAnuncio(dato.id)} className="pointer animate__animated animate__fadeIn" style={anuncioVencido(dato.fechaVencimiento)? {background: "rgba(198, 198 ,198 , 10%)", boxShadow: "0px 1px 2px rgb(0 0 0 / 20%)"} : {}}>
            <StyledTableCell className="tableNormal" component="th" scope="row">
                <div className="contenedorColumna">
                    <span>{soloFecha(dato.fechaCreacion)}</span>
                </div>
            </StyledTableCell>
            <StyledTableCell className="tableNormal" component="th" scope="row">{dato.titulo}</StyledTableCell>
            { width > tamanioLimite &&
            <StyledTableCell className="tableNormal" component="th" scope="row">{dato.nombreAutor}</StyledTableCell>
            }
            { width > tamanioLimite &&
            <StyledTableCell className="tableNormal" component="th" scope="row">{dato.ultimaModificacion}</StyledTableCell>
            }
            <StyledTableCell className="tableBold" component="th" scope="row"  style={anuncioVencido(dato.fechaVencimiento)? {color: "rgba(255, 0 , 0 , 75%)"} : {}}>
                {anuncioVencido(dato.fechaVencimiento)?  "Vencido" : soloFecha(dato.fechaVencimiento)}
            </StyledTableCell>
        </StyledTableRow>)
}

export const Anuncios = () => {
    const [anuncios, setAnuncios] = useState([])
    const { openSnackbar, setOpenSnackbar, mensajeSnack, usarSnack } = useSnack();
    const [textoBusqueda, setTextoBusqueda] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const { user } = useContext(UserContext)
    let history = useHistory()
    let location = useLocation()

    const newAnuncio = () => {
        history.push("/crearanuncio")
    }

    useEffect(() => {
        const fetchAllAnuncios = async (textoBusqueda) => {
            const anunciosEncontrados = await anuncioService.getAllAnuncios(textoBusqueda)
            setAnuncios(anunciosEncontrados)
            setIsLoading(false)
        }

        fetchAllAnuncios(textoBusqueda)
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
                Anuncios
            </Typography>
            <SearchBox>
                <Busqueda holder="Buscá por título o autor" busqueda={setTextoBusqueda} />
                <div>
                    <span className="cantidadObject" > {anuncios.length} anuncios </span>
                    { user?.esAdmin() && <StyledButtonPrimary onClick={newAnuncio}>Agregar anuncio</StyledButtonPrimary>}
                </div>
            </SearchBox>
            {anuncios.length > 0 &&
            <Tabla datos={anuncios} headers={Headers} ColumnasCustom={ColumnasCustom} heightEnd={90} defaultSort={"fecha"} defaultOrder={"desc"} />
            }
            { anuncios.length === 0 && !isLoading &&
                <SearchWithoutResults resultado="anuncios"/>
            }
            <SnackbarComponent snackColor={"#00A650"} openSnackbar={openSnackbar} mensajeSnack={mensajeSnack} handleCloseSnack={() => setOpenSnackbar(false)} />

        </RootBox>


    )
}
