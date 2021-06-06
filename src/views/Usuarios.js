import React, { useEffect, useState } from 'react'
import { makeStyles, Typography } from '@material-ui/core';


const useStyles = makeStyles ({
    root: {
      display: 'flex',

    },
    tittle:{
        marginLeft: 300,
        textAlign: "left",
        marginTop: 30
    }

  });

export const Usuarios = () =>{
    const classes = useStyles();

    return (
        
        <Typography component="h2" variant="h5" className={classes.tittle}>
        Usuarios
         </Typography>

    )
}

