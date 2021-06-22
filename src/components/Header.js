import { Avatar, Button, makeStyles, Menu, MenuItem, Typography } from '@material-ui/core';
import React from 'react'
import { withRouter } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { Desplegable } from '../assets/icons';
import { avatarColours } from '../utils/avatarColours';
import { usuarioService } from '../services/usuarioService.js'
import { splitTipo } from '../utils/formats';

const useStyles = makeStyles({
    root: {
      background: "white",
      width: "100%",
      position: "sticky",
      top:0,
      zIndex: 1300,
      height: 70,
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      display: "flex",
      justifyContent: "space-between"
    },
    tittle:{
        alignSelf:"center",
        padding: 20
    },
    loguedUser:{
        display:"flex",
        alignSelf:"center",
        alignItems:"center",
        marginRight: 100,
    },
    avatar:{
        display:"flex",
        background:"red",
        marginRight: 5
    },
    menuUser:{
        marginTop: 55,
        marginLeft: 50
    },
    boton: {
        textTransform: "none"
    },
    contenedorBoton:{
        display: "flex",
        justifyContent:"center",
        alignContent:"center",
        alignItems:"center"
    },
    nombreTipo:{
        display:"flex",
        flexDirection:"column",
        textAlign:"left"
    },
    span:{
        textAlign:"left",
        fontSize: 12,
        fontWeight: 300
    },
    desplegable:{
        marginLeft:10
    }
  });

export const Header = () =>{
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const nombre = `${usuarioService.usuarioLogueado.nombre} ${usuarioService.usuarioLogueado.apellido}`
    const tipoCuenta = `${usuarioService.usuarioLogueado.tipo}`
    let history = useHistory()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const filterFirstLetters = (name) => {
        return name.match(/\b(\w)/g).join('')
    }   

    const goToLogin = () =>{
        history.push("/")
    }

        return (
            <header className={classes.root}>
                <Typography component="h1" variant="h5" className={classes.tittle}>
                     Consorcio Virtual
                </Typography>
                <div className={classes.loguedUser} >
                        <Avatar style={{backgroundColor: avatarColours(nombre)}} className={classes.avatar} >{filterFirstLetters(nombre)}</Avatar>
                        <Button className={classes.boton} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                          <div className={classes.contenedorBoton}> 
                                <div className={classes.nombreTipo}>
                                    {nombre} 
                                    <span className={classes.span}>{splitTipo(tipoCuenta)}</span>
                                </div> 
                                <Desplegable className={classes.desplegable}/>
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
                            <MenuItem onClick={ goToLogin } >Logout</MenuItem>
                        </Menu>
                </div>

            </header>
        )
}

export default withRouter(Header)