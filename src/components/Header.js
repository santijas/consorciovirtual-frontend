import { Avatar, Button, makeStyles, Menu, MenuItem } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { Desplegable } from '../assets/icons';
import { avatarColours } from '../utils/avatarColours';
import { usuarioService } from '../services/usuarioService.js'
import { splitTipo } from '../utils/formats';
import Logo from '../assets/logo.png'
import { UserContext } from '../hooks/UserContext';

const useStyles = makeStyles((theme) => ({
    root: {
        background: "white",
        width: "100%",
        position: "fixed",
        top: 0,
        zIndex: 1300,
        height: 70,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        display: "flex",
        justifyContent: "space-between",
    },
    tittle: {
        alignSelf: "center",
        padding: 20,
        display: "flex",
        justifyContent: "left",
    },
    loguedUser: {
        display: "flex",
        alignSelf: "center",
        alignItems: "center",
        marginRight: 100,
        [theme.breakpoints.down("sm")]: {
            marginRight: 0
        }
    },
    avatar: {
        display: "flex",
        background: "red",
        marginRight: 5,
        [theme.breakpoints.down("sm")]: {
            fontSize: 14,
        }
    },
    menuUser: {
        marginTop: 55,
        marginLeft: 50
    },
    boton: {
        textTransform: "none"
    },
    contenedorBoton: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    nombreTipo: {
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        fontFamily: "ProximaNovaNormal",
        fontSize: 16,
        [theme.breakpoints.down("sm")]: {
            fontSize: 12,
        },
    },
    span: {
        textAlign: "left",
        fontSize: 14,
        color:"rgba(0, 0, 0, 0.6)",
        fontFamily: "ProximaNovaNormal",
        [theme.breakpoints.down("sm")]: {
            fontSize: 11,
        }
    },
    desplegable: {
        marginLeft: 10
    },
    logo: {
        marginLeft: 25,
        [theme.breakpoints.down("sm")]: {
            marginLeft: 0,
            width: 110
        }
    }
}));

export const Header = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [nombre, setNombre] = useState()
    const { user, setUser } = useContext(UserContext);

    let history = useHistory()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const filterFirstLetters = (nombre) => {
        return nombre.match(/\b(\w)/g).join('')
    }

    const logout = () => {
        setAnchorEl(null)
        history.push("/")
    }

    const perfil = () => {
        setAnchorEl(null)
        history.push("/perfil")
    }

    useEffect(() => {

    }, [user])

    return (
        <header className={classes.root}>
            <div className={classes.tittle}>
                <img src={Logo} className={classes.logo} />
            </div>
            {user &&
                <div className={classes.loguedUser} >
                    <Avatar style={{ backgroundColor: avatarColours(user.nombre) }} className={classes.avatar} >{filterFirstLetters(user.nombreYApellido())}</Avatar>
                    <Button className={classes.boton} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <div className={classes.contenedorBoton}>
                            <div className={classes.nombreTipo}>
                                {user.nombre + " " + user.apellido}
                                <span className={classes.span}>{splitTipo(user.tipo)}</span>
                            </div>
                            <Desplegable className={classes.desplegable} />
                        </div>
                    </Button>

                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        className={classes.menuUser}
                    >
                        <MenuItem onClick={perfil}> Perfil </MenuItem>
                        <MenuItem onClick={logout}> Cerrar sesión </MenuItem>
                    </Menu>

                </div>
            }
        </header>
    )
}

export default withRouter(Header)