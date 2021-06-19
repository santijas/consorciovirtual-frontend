import React from 'react'
import { Snackbar, SnackbarContent, withStyles } from "@material-ui/core";

export const StyledSnackbarGreen = withStyles((theme) => ({
    root:{
      backgroundColor: "#00A650",
      color: "white",
      width: "600px",
      marginRight: 100
    },
    }))(SnackbarContent);

export const StyledSnackbarRed = withStyles((theme) => ({
   root:{
     backgroundColor: "#F23D4F",
     color: "white",
      width: "600px",
      marginRight: 100
    },
      }))(SnackbarContent);

export const StyledSnackbar = withStyles((theme) => ({
        root:{
          color: "white",
           width: "600px",
           marginRight: 100
         },
           }))(SnackbarContent);


export const SnackbarComponent = ({snackColor, openSnackbar, mensajeSnack, handleCloseSnack } ) =>{

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={openSnackbar}
      onClose={handleCloseSnack}
      key={'bottomcenter'}
      autoHideDuration={2000}
    >
  <StyledSnackbar 
      style={{backgroundColor: snackColor}}
      message={mensajeSnack}
  />
  </Snackbar> 
  )
}