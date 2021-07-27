import React from 'react'
import { Box, makeStyles, Typography } from '@material-ui/core';
import { SearchNotFound } from '../assets/icons';


const useStyles = makeStyles ({
    icon:{
        fontSize: 80,
        margin: "20px 0 20px",
      },
      span:{
        color: "rgba(0, 0, 0, 0.55)",
        fontSize:20
      },
      dot:{
        height: "125px",
        width: "125px",
        backgroundColor: "#D5D5D5",
        borderRadius: "50%",
        display: "flex",
        justifyContent:"center",
        alignItems:"center"
      }
  });


export const SearchWithoutResults = ({resultado}) =>{
    const classes = useStyles();

    return (
        <Box mt={10}  display="flex" justifyContent="center" alignItems="center">
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
            <span className={classes.dot}><SearchNotFound className={classes.icon}/></span>
           <Typography component="h1" variant="h6">
             ¡Sin Resultados!
         </Typography>
         <span className={classes.span}>No se encontraron {resultado}.</span>
        </Box>
        </Box>      
    )
}



