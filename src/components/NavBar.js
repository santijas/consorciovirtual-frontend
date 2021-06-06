import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { ActiveApartment, ActiveUser, NonActiveUser, NonActiveApartment, ActiveAnnouncement, NonActiveAnnouncement, ActiveClaims, NonActiveClaims, ActiveRequest, NonActiveRequest, ActiveInquiline, NonActiveInquiline, ActiveGastos, NonActiveGastos, ActiveExpenses, NonActiveExpenses, ActiveDocuments, NonActiveDocuments, ActiveChat, NonActiveChat } from '../assets/icons';

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
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: "#FDFDFD",
      padding: theme.spacing(3),
    },

  }));

export const NavBar = () => {
    const classes = useStyles();
    let history = useHistory();
    const [selected, setSelected] = useState('usuarios')

    const handleSelectMenu = (menu)  =>{
      setSelected(menu)
      history.push(`/${menu}`)
   }    

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

        <List>
            <ListItem button key="Usuarios" onClick={() => handleSelectMenu("usuarios")}>
              <ListItemIcon>{selected==="usuarios"? <ActiveUser class="navicon activecolor"/> : <NonActiveUser class="navicon"/> }</ListItemIcon>
              <span className={`${(selected==="usuarios")? "activecolor activesize": "font"}`}>Usuarios</span>
            </ListItem>

            <ListItem button key="Departamentos" onClick={() => handleSelectMenu("departamentos")}>
              <ListItemIcon>{selected==="departamentos" ? <ActiveApartment class="navicon"/> : <NonActiveApartment class="navicon"/>}</ListItemIcon>
              <span className={`${(selected==="departamentos")? "activecolor activesize": "font"}`}>Departamentos</span>
            </ListItem>

            <ListItem button key="Anuncios" onClick={() => handleSelectMenu("anuncios")}>
              <ListItemIcon>{selected==="anuncios" ? <ActiveAnnouncement class="navicon"/> : <NonActiveAnnouncement class="navicon"/>}</ListItemIcon>
              <span className={`${(selected==="anuncios")? "activecolor activesize": "font"}`}>Anuncios</span>
            </ListItem>

            <ListItem button key="Reclamos" onClick={() => handleSelectMenu("reclamos")}>
              <ListItemIcon>{selected==="reclamos" ? <ActiveClaims class="navicon"/> : <NonActiveClaims class="navicon"/>}</ListItemIcon>
              <span className={`${(selected==="reclamos")? "activecolor activesize": "font"}`}>Reclamos</span>
            </ListItem>

            
            <ListItem button key="Solicitudes técnicas" onClick={() => handleSelectMenu("solicitudes")}>
              <ListItemIcon>{selected==="solicitudes" ? <ActiveRequest class="navicon"/> : <NonActiveRequest class="navicon"/>}</ListItemIcon>
              <span className={`${(selected==="solicitudes")? "activecolor activesize": "font"}`}>Solicitudes Técnicas</span>
            </ListItem>

            <ListItem button key="Inquilinos" onClick={() => handleSelectMenu("inquilinos")}>
              <ListItemIcon>{selected==="inquilinos" ? <ActiveInquiline class="navicon"/> : <NonActiveInquiline class="navicon"/>}</ListItemIcon>
              <span className={`${(selected==="inquilinos")? "activecolor activesize": "font"}`}>Inquilinos</span>
            </ListItem>

            <ListItem button key="Gastos" onClick={() => handleSelectMenu("gastos")}>
              <ListItemIcon>{selected==="gastos" ? <ActiveGastos class="navicon"/> : <NonActiveGastos class="navicon"/>}</ListItemIcon>
              <span className={`${(selected==="gastos")? "activecolor activesize": "font"}`}>Gastos</span>
            </ListItem>
            
            <ListItem button key="Expensas" onClick={() => handleSelectMenu("expensas")}>
              <ListItemIcon>{selected==="expensas" ? <ActiveExpenses class="navicon"/> : <NonActiveExpenses class="navicon"/>}</ListItemIcon>
              <span className={`${(selected==="expensas")? "activecolor activesize": "font"}`}>Expensas</span>
            </ListItem>

            
            <ListItem button key="Documentos" onClick={() => handleSelectMenu("documentos")}>
              <ListItemIcon>{selected==="documentos" ? <ActiveDocuments class="navicon"/> : <NonActiveDocuments class="navicon"/>}</ListItemIcon>
              <span className={`${(selected==="documentos")? "activecolor activesize": "font"}`}>Documentos</span>
            </ListItem>

            <ListItem button key="Chat" onClick={() => handleSelectMenu("chat")}>
              <ListItemIcon>{selected==="chat" ? <ActiveChat class="navicon"/> : <NonActiveChat class="navicon"/>}</ListItemIcon>
              <span className={`${(selected==="chat")? "activecolor activesize": "font"}`}>Chat</span>
            </ListItem>


        </List>
      </Drawer>
    )
}

export default withRouter(NavBar)