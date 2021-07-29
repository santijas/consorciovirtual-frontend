import { Drawer, List, ListItem, ListItemIcon, makeStyles } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, withRouter } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { ActiveApartment, ActiveUser, NonActiveUser, NonActiveApartment, ActiveAnnouncement, NonActiveAnnouncement, ActiveClaims, NonActiveClaims, ActiveRequest, NonActiveRequest, ActiveInquiline, NonActiveInquiline, ActiveGastos, NonActiveGastos, ActiveExpenses, NonActiveExpenses, ActiveDocuments, NonActiveDocuments, ActiveChat, NonActiveChat, ActiveTelefonosUtiles, NonActiveTelefonosUtiles } from '../assets/icons';
import { UserContext } from '../hooks/UserContext';
import { usuarioService } from '../services/usuarioService.js'
import { chatService } from '../services/chatService';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,

  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.down("sm")]: {
      width: "auto"
    }
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: "#FDFDFD",
    padding: theme.spacing(3),
  },
  textItem:{
    [theme.breakpoints.down("sm")]: {
      display:"none"
    }
  }
}));

export const NavBar = () => {
  const classes = useStyles();
  let history = useHistory();
  let location = useLocation()
  const [selected, setSelected] = useState('usuarios')
  const [mensajesSinLeer, setMensajesSinLeer] = useState(null)
  const { user } = useContext(UserContext);


  const handleSelectMenu = (menu) => {
    history.push(`${menu}`)
    setSelected(location.pathname)
  }

  const getMensajesSinLeer = async () => {
    let cantMensajes = await chatService.getCantidadDeMensajes(user?.id)
    setMensajesSinLeer(cantMensajes)
  }

  const conMensajesNuevos = () =>{
    return  mensajesSinLeer != null && mensajesSinLeer != 0
  }

  useEffect(() => {
    setSelected(location.pathname)
  }, [location])

  useEffect( ()=>{
    chatService.connectUsuarioWS(getMensajesSinLeer)

    return () => {
      chatService.closeWebSocket()
    }
  },[] )

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      { user &&
      <List>

        { user.esAdmin() &&
          <ListItem button key="Usuarios" onClick={() => handleSelectMenu("/usuarios")}>
            <ListItemIcon>{selected.includes("usuario") ? <ActiveUser className="navicon activecolor" /> : <NonActiveUser className="navicon" />}</ListItemIcon>
            <span className={classes.textItem} ><span className={`${selected.includes("usuario") ? "activecolor activesize" : "font"}`} >Usuarios</span></span>
          </ListItem>
        }


          <ListItem button key="Departamentos" onClick={() => handleSelectMenu("/departamentos")}>
            <ListItemIcon>{selected.includes("departamento") ? <ActiveApartment className="navicon" /> : <NonActiveApartment className="navicon" />}</ListItemIcon>
            <span className={classes.textItem} ><span className={`${(selected.includes("departamento")) ? "activecolor activesize" : "font"}`}>Departamentos</span></span>
          </ListItem>
        

          <ListItem button key="Anuncios" onClick={() => handleSelectMenu("/anuncios")}>
            <ListItemIcon>{selected.includes("anuncio") ? <ActiveAnnouncement className="navicon" /> : <NonActiveAnnouncement className="navicon" />}</ListItemIcon>
            <span className={classes.textItem} ><span className={`${selected.includes("anuncio") ? "activecolor activesize" : "font"}`}>Anuncios</span></span>
          </ListItem>

          <ListItem button key="Reclamos" onClick={() => handleSelectMenu("/reclamos")}>
            <ListItemIcon>{selected.includes("reclamo") ? <ActiveClaims className="navicon" /> : <NonActiveClaims className="navicon" />}</ListItemIcon>
            <span className={classes.textItem} ><span className={`${selected.includes("reclamo") ? "activecolor activesize" : "font"}`}>Reclamos</span></span>
          </ListItem>

          <ListItem button key="Solicitudes técnicas" onClick={() => handleSelectMenu("/solicitudes")}>
            <ListItemIcon>{selected.includes("solicitud") ? <ActiveRequest className="navicon" /> : <NonActiveRequest className="navicon" />}</ListItemIcon>
            <span className={classes.textItem} ><span className={`${selected.includes("solicitud") ? "activecolor activesize" : "font"}`}>Solicitudes Técnicas</span></span>
          </ListItem>

        { user.esPropietario() &&
          <ListItem button key="Inquilinos" onClick={() => handleSelectMenu("/inquilinos")}>
            <ListItemIcon>{selected.includes("inquilino") ? <ActiveInquiline className="navicon" /> : <NonActiveInquiline className="navicon" />}</ListItemIcon>
            <span className={classes.textItem} ><span className={`${selected.includes("inquilino") ? "activecolor activesize" : "font"}`}>Inquilinos</span></span>
          </ListItem>
        }


          <ListItem button key="Gastos" onClick={() => handleSelectMenu("/gastos")}>
            <ListItemIcon>{selected.includes("gasto") ? <ActiveGastos className="navicon" /> : <NonActiveGastos className="navicon" />}</ListItemIcon>
            <span className={classes.textItem} ><span className={`${selected.includes("gasto") ? "activecolor activesize" : "font"}`}>Gastos</span></span>
          </ListItem>
        

          <ListItem button key="Expensas" onClick={() => handleSelectMenu("/expensas")}>
            <ListItemIcon>{selected.includes("expensa") ? <ActiveExpenses className="navicon" /> : <NonActiveExpenses className="navicon" />}</ListItemIcon>
            <span className={classes.textItem} ><span className={`${selected.includes("expensa") ? "activecolor activesize" : "font"}`}>Expensas</span></span>
          </ListItem>

          <ListItem button key="Documentos" onClick={() => handleSelectMenu("/documentos")}>
            <ListItemIcon>{selected.includes("documento") ? <ActiveDocuments className="navicon" /> : <NonActiveDocuments className="navicon" />}</ListItemIcon>
            <span className={classes.textItem} ><span className={`${selected.includes("documento") ? "activecolor activesize" : "font"}`}>Documentos</span></span>
          </ListItem>

          <ListItem button key="Chat" onClick={() => handleSelectMenu("/chat")}>
            <ListItemIcon>{selected.includes("chat") ? <ActiveChat className="navicon" /> : <NonActiveChat className="navicon" />}</ListItemIcon>
            <span className={classes.textItem} ><span className={`${selected.includes("chat") ? "activecolor activesize" : "font"}`}>Chat</span>{ conMensajesNuevos() && !selected.includes("chat") && <span>{mensajesSinLeer}</span> }</span>
          </ListItem>

          <ListItem button key="TelefonosUtiles" onClick={() => handleSelectMenu("/telefonosUtiles")}>
            <ListItemIcon>{selected.includes("telefono") ? <ActiveTelefonosUtiles className="navicon" /> : <NonActiveTelefonosUtiles className="navicon" />}</ListItemIcon>
            <span className={classes.textItem} ><span className={`${selected.includes("telefono") ? "activecolor activesize" : "font"}`}>Teléfonos Útiles</span></span>
          </ListItem>

      </List>
      }
    </Drawer>
  )
}

export default withRouter(NavBar)