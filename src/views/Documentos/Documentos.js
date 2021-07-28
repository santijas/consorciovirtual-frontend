import React, { useEffect, useState } from 'react'
import { makeStyles, Typography, Snackbar } from '@material-ui/core';
import { Tabla, StyledTableRow, StyledTableCell } from '../../components/Tabla';
import { documentoService } from '../../services/documentoService';
import { Busqueda } from '../../components/Busqueda'
import { StyledButtonPrimary } from '../../components/Buttons'
import { useHistory, useLocation } from 'react-router-dom';
import { SnackbarComponent } from '../../components/Snackbar'
import useSnack from '../../hooks/UseSnack';
import { RootBox, SearchBox } from '../../components/Contenedores';
import { SearchWithoutResults } from '../../components/SearchWithoutResults';
import { soloFecha } from '../../utils/formats';


const useStyles = makeStyles ({
    cantidadObject:{
      fontWeight: 300,
      marginRight: 10
    },
  });

const headers = [
  {id: "fecha", numeric: "false", label:"Fecha"},
  {id: "titulo", numeric: "false", label:"Título"},
  {id: "autor", numeric: "false", label:"Autor"},
  {id: "actividad", numeric: "false", label:"Actividad"},
  {id: "archivo", numeric: "false", label:"Archivo"}
]

const ColumnasCustom = (dato) => {
  let history= useHistory()

  const getDocumento = (id) =>{
    history.push(`/documento/${id}`)
  }


  return (
  <StyledTableRow key={dato.id} onClick={() => getDocumento(dato.id)} className="pointer">
    <StyledTableCell className="tableNormal" component="th" scope="row">{soloFecha(dato.fechaCreacion)}</StyledTableCell>
    <StyledTableCell className="tableNormal" component="th" scope="row">{dato.titulo}</StyledTableCell>
    <StyledTableCell className="tableNormal" component="th" scope="row">{dato.autor}</StyledTableCell>
    <StyledTableCell className="tableNormal" component="th" scope="row">{dato.modificado}</StyledTableCell>
    <StyledTableCell className="tableBold" component="th" scope="row">{dato.archivo}</StyledTableCell>
  </StyledTableRow>
  )
}

export const Documentos = () =>{
    const location = useLocation()
    let history = useHistory()  
    const classes = useStyles()
    const [documentos, setDocumentos] = useState([])
    const { openSnackbar, setOpenSnackbar, mensajeSnack, usarSnack } = useSnack();
    const [textoBusqueda, setTextoBusqueda] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    useEffect( ()  =>  {
      const fetchAll = async (textoBusqueda) => {
        const documentos = await documentoService.getBySearch(textoBusqueda)
        setDocumentos(documentos)
        setIsLoading(false)
      }

      fetchAll(textoBusqueda)
      
    },[textoBusqueda])

    useEffect( () =>{
  
      const fetchSnack = () => {
        if(location.state !== undefined){
          usarSnack(location.state.mensajeChild, false)
        }
      }
      fetchSnack()
    },[location.state])

    const newDocument = () =>{
      history.push("/creardocumento")
    }

    return (
        <RootBox>
           <Typography component="h2" variant="h5" className="tittle">
             Documentos
           </Typography>
           <SearchBox> 
              <Busqueda holder="Buscá por título o nombre de archivo" busqueda={setTextoBusqueda} />
              <div>
               <span className={classes.cantidadObject} > {documentos.length} Documentos </span>
              <StyledButtonPrimary onClick={newDocument} >Agregar documento</StyledButtonPrimary>
              </div>
           </SearchBox>
           { documentos.length > 0 &&
            <Tabla datos={documentos} headers={headers} ColumnasCustom={ColumnasCustom} heightEnd={90} defaultSort={"nombre"} defaultOrder={"asc"}/>
           }
            { documentos.length === 0 && !isLoading &&
                <SearchWithoutResults resultado="documentos"/>
            }

              <SnackbarComponent snackColor={"#00A650"} openSnackbar={openSnackbar} mensajeSnack={mensajeSnack} handleCloseSnack={() => setOpenSnackbar(false)}/>
        
        </RootBox>
        
    )
}
