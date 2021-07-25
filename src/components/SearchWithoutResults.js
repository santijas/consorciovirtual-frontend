import React from 'react'
import { Box, makeStyles, Typography } from '@material-ui/core';
import { SearchNotFound } from '../assets/icons';


const useStyles = makeStyles ({
    icon:{
        fontSize: 40,
        margin: "20px 0 20px",
      },
      span:{
        color: "rgba(0, 0, 0, 0.55)",
        fontSize:20
      },
  });


export const SearchWithoutResults = () =>{
    const classes = useStyles();

    return (
        <Box mt={10}  display="flex" justifyContent="center" alignItems="center">
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
           <SearchNotFound className={classes.icon}/>
           <Typography component="h1" variant="h6">
             ¡Sin Resultados!
         </Typography>
         <span className={classes.span}>No se encontraron resultados con el criterio de busqueda actual.</span>
        </Box>
        </Box>      
    )
}



