import React, { useState } from "react";
import { makeStyles, Typography } from '@material-ui/core';
import { Link, TextField, MenuItem, Divider, Box } from '@material-ui/core';
import { StyledButtonPrimary, StyledButtonSecondary } from './Buttons'

import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

export const CustomPrompt = ({ message, cleanUp }) => {
    const [modalStyle] = useState(getModalStyle);
    const classes = useStyles();
    const cancel = () => cleanUp(false)
    const ok = () => cleanUp(true)

    return (
        <Dialog open onClose={cancel}>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText>

            </DialogContent>
            <DialogActions>
                <Button onClick={cancel} color="primary">
                    Cancelar
                </Button>
                <Button onClick={ok} color="primary" autoFocus>
                    Continuar
                </Button>
            </DialogActions>
        </Dialog>

        // ***CON NUESTROS ESTILOS (HABRÍA QUE RETOCAR)***
        //     <div style={modalStyle} className={classes.paper}>
        //     <h>{message}</h>
        //     <Box display="flex" flexDirection="row" mt={4}>
        //         <StyledButtonPrimary onClick={cancel}>Cancelar</StyledButtonPrimary>
        //         <Link className={classes.linkModal} onClick={ok}>
        //             Continuar
        //         </Link>
        //     </Box>
        // </div>
    )
}

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
        width: 400,
        backgroundColor: "white",
        boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.1)",
        borderRadius: "6px",
        padding: "0 30px 32px 32px"
    }
})
