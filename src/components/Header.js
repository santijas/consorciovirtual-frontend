import { Avatar, Button, makeStyles, Menu, MenuItem, Typography } from '@material-ui/core';
import React from 'react'
import { withRouter } from 'react-router-dom'
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    root: {
      background: "white",
      width: "100%",
      position: "relative",
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
        marginRight: 100
    },
    avatar:{
        display:"flex",
        background:"red",
        marginRight: 5
    },
    menuUser:{
        padding: "100!important"
    }
  });

export const Header = () =>{
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const nombre = "Santiago Ranieri"
    let history = useHistory()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        console.log(event)
    };

    const handleClose = () => {
        setAnchorEl(null);
        history.push("/")
    };

    const filterFirstLetters = (name) => {
        return name.match(/\b(\w)/g).join('')
    }   

        return (
            <header className={classes.root}>
                <Typography component="h1" variant="h5" className={classes.tittle}>
                     Consorcio Virtual
                </Typography>
                <div className={classes.loguedUser} >
                        <Avatar className={classes.avatar}>{filterFirstLetters(nombre)}</Avatar>
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                            {nombre}
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            className={classes.menuUser}
                        >
                            <MenuItem onClick={handleClose}>Logout</MenuItem>
                        </Menu>
                </div>

            </header>
        )
}

export default withRouter(Header)