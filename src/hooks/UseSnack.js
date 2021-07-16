import { useState, useEffect } from 'react';



export default function useSnack() {

    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [mensajeSnack, setMensajeSnack] = useState('')
    const [snackColor, setSnackColor] = useState()


    const usarSnack = (mensaje, esError) =>{
        if(esError){
            setSnackColor("#F23D4F")
        }else{
            setSnackColor("#00A650")
        }
        setMensajeSnack(mensaje)
        setOpenSnackbar(true)
    }


    return {
        openSnackbar,
        setOpenSnackbar,
        mensajeSnack,
        setMensajeSnack,
        snackColor,
        setSnackColor,
        usarSnack
    }
}