import { Box, Typography, Avatar, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    tittle:{
        textAlign:"left",
        marginTop: 20
    },
    spanAvatar:{
        margin: "2px 0 0 10px",
        textAlign:"left",
        fontWeight: "normal",
        fontStyle: "normal",
        fontSize: "18px",
        color: "rgba(0, 0, 0, 0,8)"
    },
    spanFecha:{
        margin: "2px 0 0 10px",
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: "12px",
        display: "flex",
        color: "rgba(0, 0, 0, 0.56)"
    }
  }));

export const Historial = ({usuariosHistorial}) => {
    const classes = useStyles()

    const filterFirstLetters = (name) => {
        return name.match(/\b(\w)/g).join('')
    } 

    return (
        <Box display="flex" flexDirection="column" ml={5}>
                    <Typography component="h5" variant="h6" className={classes.tittle}>
                        Historial de cambios
                    </Typography>
                    <Box display="flex" flexDirection="column" mt={5}>
                        {usuariosHistorial.map((user) => (
                            <Box display="flex" mb={3}>
                                <Avatar className={classes.avatar}>{filterFirstLetters(user.nombre+ " " + user.apellido)}</Avatar>
                                <Box display="flex" flexDirection="column">
                                    <span className={classes.spanAvatar}>{user.nombre} {user.apellido}</span>
                                    <span className={classes.spanFecha}>12/03/2021 - 17:13 hs</span>
                                </Box>
                            </Box>
                         ))}
                    </Box>
                </Box>
    )
}
