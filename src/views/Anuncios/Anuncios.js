import React, { useEffect, useState } from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import { Tabla, StyledTableRow, StyledTableCell } from '../../components/Tabla';
import { Busqueda } from '../../components/Busqueda'
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { anuncioService } from '../../services/anuncioService';
import { StyledButtonPrimary } from '../../components/Buttons'
import { SnackbarComponent } from '../../components/Snackbar'
import useSnack from '../../hooks/UseSnack';
import { RootBox, SearchBox } from '../../components/Contenedores';

const useStyles = makeStyles({
    cantidadObject: {
        fontWeight: 300,
        marginRight: 10
    }
});

const headers = [
    { id: "fechaCreacion", label: "Fecha" },
    { id: "titulo", label: "Titulo" },
    { id: "nombreAutor", label: "Autor" },
    { id: "fechaModificacion", label: "Actividad" },
    { id: "fechaVencimiento", label: "Vencimiento" }
]

const ColumnasCustom = (dato) => {

    let history = useHistory()

    const getAnuncio = (id) => {
        history.push(`/anuncio/${id}`)
    }

    return (
        <StyledTableRow key={dato.id} onClick={() => getAnuncio(dato.id)} className="pointer">
            <StyledTableCell component="th" scope="row">
                <div className="contenedorColumna">
                    <span className="tableBold">{dato.fecha}</span>
                    <span>{dato.fechaCreacion}</span>
                </div>
            </StyledTableCell>
            <StyledTableCell className="tableNormal" component="th" scope="row">{dato.titulo}</StyledTableCell>
            <StyledTableCell className="tableNormal" component="th" scope="row">{dato.nombreAutor}</StyledTableCell>
            <StyledTableCell className="tableNormal" component="th" scope="row">Modificado hace {Math.floor(Math.random() * 10)} horas</StyledTableCell>
            <StyledTableCell className="tableBold" component="th" scope="row">{dato.fechaVencimiento}</StyledTableCell>
        </StyledTableRow>)
}

export const Anuncios = () => {
    const classes = useStyles();
    const [anuncios, setAnuncios] = useState([])
    const { openSnackbar, setOpenSnackbar, mensajeSnack, usarSnack } = useSnack();
    const [textoBusqueda, setTextoBusqueda] = useState('')
    let history = useHistory()
    let location = useLocation()

    const newAnuncio = () => {
        history.push("/newAnuncio")
    }

    useEffect(() => {
        const fetchAllAnuncios = async (textoBusqueda) => {
            const anunciosEncontrados = await anuncioService.getAllAnuncios(textoBusqueda)
            setAnuncios(anunciosEncontrados)
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
                <Busqueda holder="Buscá por fecha, título o autor" busqueda={setTextoBusqueda} />
                <div>
                    <span className={classes.cantidadObject} > {anuncios.length} anuncios </span>
                    <StyledButtonPrimary onClick={newAnuncio}>Agregar anuncio</StyledButtonPrimary>
                </div>
            </SearchBox>
            <Tabla datos={anuncios} headers={headers} ColumnasCustom={ColumnasCustom} heightEnd={90} defaultSort={"id"} defaultOrder={"desc"} />

            <SnackbarComponent snackColor={"#00A650"} openSnackbar={openSnackbar} mensajeSnack={mensajeSnack} handleCloseSnack={() => setOpenSnackbar(false)} />

        </RootBox>


    )
}
