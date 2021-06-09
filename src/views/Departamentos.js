import React, { useEffect, useState } from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import { Tabla } from '../components/Tabla';


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
    }

  });

const headers = []

export const Departamentos = () =>{
    const classes = useStyles();
    const [departamentos, setDepartamentos] = useState([])


    const fetchAllDepartamentos = async (textoBusqueda) =>{
    }

    useEffect( ()  =>  {
      fetchAllDepartamentos("")
    },[])

    return (
        <div className={classes.root} >
           <Typography component="h2" variant="h5" className={classes.tittle}>
             Departamentos
           </Typography>
            <Tabla datos={departamentos} headers={headers} />
         </div>

    )
}
