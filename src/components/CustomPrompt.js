import React, { useState } from "react";
import { makeStyles } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { StyledButtonPrimary, StyledButtonSecondary } from './Buttons'


function getModalStyle() {
    const top = 50
    const left = 50

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles({
    linkModal: {
        color: "#159D74",
        textAlign: "left",
        marginLeft: 50,
        marginTop: 10,
        cursor: "pointer",
        fontWeight: 600
    },
    paper: {
        position: 'absolute',
        width: 422,
        backgroundColor: "white",
        boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.1)",
        borderRadius: "6px",
        padding: "0 30px 32px 32px"
    },
    modal:{
        zIndex: "1500",
        position: "fixed",
        inset: "0px",
        background: "rgba(0, 0, 0, 0.5)",
    },
    botonTransparencia: {
        background: "rgba(21,157, 116, 50%)",
    },
    botonRojo:{
        background:"rgba(187, 14 ,14 ,100%)",
        color: "white"
    }
})


export const CustomPrompt = ({ message, cleanUp }) => {
    const [modalStyle] = useState(getModalStyle);
    const classes = useStyles();
    const cancel = () => cleanUp(false)
    const ok = () => cleanUp(true)


    return (
        <Box className={classes.modal} aria-hidden="true">
            <Box style={modalStyle} className={classes.paper}>
                <h2 id="simple-modal-title">{message}</h2>
                <p id="simple-modal-description">Esta acción no se puede deshacer.</p>
            
                <Box display="flex" flexDirection="row" mt={4} justifyContent="space-between">
                    <StyledButtonSecondary className={classes.botonRojo} onClick={ok}>Salir de todas formas</StyledButtonSecondary>
                    <StyledButtonPrimary  onClick={ cancel }>Cancelar</StyledButtonPrimary>
                </Box>

            </Box>
        </Box>
    )
}

