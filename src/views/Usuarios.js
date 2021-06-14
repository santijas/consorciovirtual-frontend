import React, { useEffect, useState } from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import { Tabla, StyledTableRow, StyledTableCell } from '../components/Tabla';
import { usuarioService } from '../services/usuarioService';
import { Busqueda } from '../components/Busqueda'
import { BotonPrimario } from '../components/BotonPrimario'
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

const headers = ["Nombre y apellido", "E-mail", "DNI", "Actividad", "Tipo de Cuenta"]

const ColumnasCustom = (dato) => <StyledTableRow key={dato.id}>
  <StyledTableCell  component="th" scope="row">
    <div className="contenedorColumna">
      <span className="tableBold">{dato.nombre +" "+ dato.apellido}</span>
      <span >2° A</span>
    </div>
  </StyledTableCell>
  <StyledTableCell className="tableNormal" component="th" scope="row">{dato.correo}</StyledTableCell>
  <StyledTableCell className="tableNormal" component="th" scope="row">{dato.dni}</StyledTableCell>
  <StyledTableCell className="tableNormal" component="th" scope="row">Modificado hace {Math.floor(Math.random() * 10)} horas</StyledTableCell>
  <StyledTableCell className="tableBold" component="th" scope="row">Propietario</StyledTableCell>
</StyledTableRow>

export const Usuarios = () =>{
    const classes = useStyles();
    const [usuarios, setUsuarios] = useState([])
    let history = useHistory()

    const fetchAllUsers = async (textoBusqueda) =>{
      const usuariosEncontrados = await usuarioService.getAllUsers()
      setUsuarios(usuariosEncontrados)
    }

    const newUser = () =>{
      history.push("/usuario/create")
    }
    

    useEffect( ()  =>  {
      fetchAllUsers("")
    },[])

    return (
        <div className={classes.root} >
           <Typography component="h2" variant="h5" className={classes.tittle}>
             Usuarios
           </Typography>
           <div className={classes.contenedorBusqueda}> 
              <Busqueda holder="Buscá por nombre, apellido, DNI, e-mail o tipo de cuenta" busqueda={fetchAllUsers} />
              <div>
               <span className={classes.cantidadObject} > {usuarios.length} usuarios </span>
              <BotonPrimario tituloBoton="Agregar usuario" funcion={newUser}/>
              </div>
           </div>
            <Tabla datos={usuarios} headers={headers} ColumnasCustom={ColumnasCustom}/>
         </div>

    )
}
