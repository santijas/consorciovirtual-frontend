import React from 'react';
import { Avatar, TextField, FormControlLabel, Checkbox, Link, Paper, Grid, Box, Typography } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import { usuarioService } from '../services/usuarioService.js'
import { useState } from 'react'
import { Usuario } from '../domain/usuario.js'
import Logo from '../assets/logo.png'
import { StyledButtonPrimary } from '../components/Buttons'
import Fondo from '../assets/background.jpg'
import { NonActiveAnnouncement, NonActiveChat, NonActiveExpenses, NonActiveGastos, NonActiveInquiline, NonActiveRequest } from '../assets/icons.js';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: "flex",
    flexDirection: "column",
    width:"100%"
  },
  image:{
    backgroundImage: `url(${Fondo})`,
    backgroundColor: "#F5F5F5",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    boxShadow: "1px -2px 5px 3px black",
  },
  paper: {
    margin: theme.spacing(20, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: "400px",
    maxHeigth: "100px!important",
    opacity: "none",
    
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#159D74",
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  container:{
    borderRadius: "5px",
    maxHeight: "700px",
    boxShadow:"0px 0px 8px 1px rgba(0,0,0,0.50)",
    display:"flex",
    alignItems:"center"
  },
  iconos:{
    fontSize: 60,
    color: "#159D74"
  },
  bold:{
    fontWeigth: 600,
    fontSize: 18
  }
}));

export const Login = () => {
  let [correo, setCorreo] = useState('')
  let [password, setPassword] = useState('')

  let history = useHistory()
  const classes = useStyles();

  const loginUser = async (e) => {
    e.preventDefault()
    const usuario = new Usuario()
    usuario.correo = correo
    usuario.password = password
    await usuarioService.loguearUsuario(usuario)
    history.push('/usuarios')
} 

  return (
  <Box className={classes.root}>
    <Box className={classes.image} display="flex" justifyContent="flex-end" py={4} pr={20}>
        
        <Box className={classes.container} component={Paper}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon  />
          </Avatar>
          <Typography component="h1" variant="h5">
            <img src={Logo} className={classes.logo}/>
          </Typography>
          <form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo electronico"
              autoComplete="email"
              autoFocus
              onChange={(e) => setCorreo(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordarme"
            />
            <StyledButtonPrimary
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
              onClick={loginUser}
            >
              Ingresar
            </StyledButtonPrimary>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Olvidó su clave?
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Box>
    </Box>
    <Box display="flex" justifyContent="space-around" width="100%" alignItems="center">
      <Box display="flex" flexDirection="column" mx={2} mt={2} alignItems="center" width="250px">
       <NonActiveAnnouncement className={classes.iconos} />
        <span className={classes.bold}>Consultá los anuncios y la documentacion.</span>
      </Box>

      <Box display="flex" flexDirection="column" mx={2} mt={2} alignItems="center" width="250px">
       <NonActiveRequest className={classes.iconos} />
        <span className={classes.bold}>Realizá reclamos y solicitudes tecnicas.</span>
      </Box>

      <Box display="flex" flexDirection="column" mx={2} mt={2} alignItems="center" width="250px">
       <NonActiveExpenses className={classes.iconos} />
        <span className={classes.bold}>Consultá los gastos del mes.</span>
      </Box>

      <Box display="flex" flexDirection="column" mx={2} mt={2} alignItems="center" width="250px">
       <NonActiveGastos className={classes.iconos}/>
        <span className={classes.bold}>Paga tus expensas.</span>
      </Box>

      <Box display="flex" flexDirection="column" mx={2} mt={2} alignItems="center" width="250px">
       <NonActiveInquiline className={classes.iconos} />
        <span className={classes.bold}>Gestioná tus inquilinos.</span>
      </Box>

      <Box display="flex" flexDirection="column" mx={2} mt={2} alignItems="center" width="250px">
       <NonActiveChat className={classes.iconos} />
        <span className={classes.bold}>Chatea con tus vecinos.</span>
      </Box>

    </Box>
  </Box>
  );
}