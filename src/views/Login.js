import React, { useEffect, useContext } from 'react';
import { Avatar, TextField, FormControlLabel, Checkbox, Link, Paper, Grid, Box, Typography } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import { useState } from 'react'
import Logo from '../assets/logo.png'
import { StyledButtonPrimary } from '../components/Buttons'
import Fondo from '../assets/background.jpg'
import { SnackbarComponent } from '../components/Snackbar.js';
import useAuth from '../hooks/UseAuth.js';
import Solicitudes from '../assets/images/Solicitudes.png'
import Documentos from '../assets/images/Documentos.png'
import Inquilinos from '../assets/images/Inquilinos.png'
import Expensas from '../assets/images/Expensas.png'
import Gastos from '../assets/images/Gastos.png'
import Chat from '../assets/images/Chat.png'
import { UserContext } from '../hooks/UserContext';


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  image: {
    display: "flex",
    justifyContent: "flex-end",
    backgroundImage: `url(${Fondo})`,
    backgroundColor: "#F5F5F5",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    boxShadow: "1px -2px 5px 3px black",
    flexGrow: "2"
  },
  footer: {
    display: "flex",
    justifyContent: "space-around",
    height: "fit-content",
    flexGrow: "0"
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
  container: {
    borderRadius: "5px",
    maxHeight: "700px",
    boxShadow: "0px 0px 8px 1px rgba(0,0,0,0.50)",
    display: "flex",
    alignItems: "center",
    margin: "20px 20px 20px 0px"
  },
  bold: {
    fontWeight: 500,
    fontSize: 18,
    color: "rgba(0, 0, 0, 0.60)",
    textAlign: "center"
  },
  contenedorIcono: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "250px",
    paddingTop: 15
  }
}));

export const Login = () => {
  const [correo, setCorreo] = useState(window.localStorage.getItem("mailLogged") || "")
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [mensajeSnack, setMensajeSnack] = useState('')
  const { user, setUser } = useContext(UserContext);
  const [errors, setErrors] = useState({})

  let history = useHistory()
  const classes = useStyles();
  const { loginUser } = useAuth();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if (window.localStorage.getItem('mailLogged')) {
      setRemember(true)
    }

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setCorreo(user.correo)
      setPassword(user.password)
    }
    
    setUser(null)

  }, [])


  const handleRememberStorage = () => {
    if (remember) {
      window.localStorage.setItem('mailLogged', correo)
    } else {
      window.localStorage.removeItem('mailLogged')
    }
  }

  const redirectTypeUser = (user) => {
    if (user.tipo === "Propietario" || user.tipo === "Inquilino") {
      history.push("/departamentos")
    } else {
      history.push('/usuarios')
    }
  }

  const validarLogin = () => {
    setErrors(null)

    if (!correo) {
        setErrors(prev => ({ ...prev, correo: "Campo obligatorio" }))
    }

    if (!password) {
        setErrors(prev => ({ ...prev, password: "Campo obligatorio" }))
    }

    return correo && password
}


  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      if(validarLogin()){
        const logueado = await loginUser(correo, password)
        handleRememberStorage()
        redirectTypeUser(logueado)
      } else {
        usarSnack("Campos obligatorios faltantes.", true)
      }
    } catch (e) {
      console.log(e.message)
      usarSnack("Usuario o contraseña incorrectos.")
    }
  }

  const handleChange = (event) => {
    setRemember(event.target.checked);
  };

  const usarSnack = (message) => {
    setOpenSnackbar(true)
    setMensajeSnack(message)
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.image} >

        <Box className={classes.container} component={Paper}>
          <div  className={classes.paper} >

            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>

            <img src={Logo} className={classes.logo} alt="Consorcio Virtual" />

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
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                error={Boolean(errors?.correo)}
                helperText={errors?.correo}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={Boolean(errors?.password)}
                helperText={errors?.password}
              />
              <FormControlLabel
                control={<Checkbox value={remember} checked={remember} onChange={handleChange} color="primary" />}
                label="Recordarme"
              />
              <StyledButtonPrimary
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
                onClick={handleLogin}
              >
                Ingresar
              </StyledButtonPrimary>
            </form>
          </div>
        </Box>
      </Box>
      <Box className={classes.footer}>

        <Box className={classes.contenedorIcono}>
          <img src={Documentos} alt="Documentos"></img>
          <span className={classes.bold}>Accedé a los anuncios y la documentacion.</span>
        </Box>

        <Box className={classes.contenedorIcono}>
          <img src={Solicitudes} alt="Solicitudes"></img>
          <span className={classes.bold}>Realizá reclamos y solicitudes tecnicas.</span>
        </Box>

        <Box className={classes.contenedorIcono}>
          <img src={Gastos} alt="Gastos"></img>
          <span className={classes.bold}>Consultá los gastos del mes.</span>
        </Box>

        <Box className={classes.contenedorIcono}>
          <img src={Expensas} alt="Expensas"></img>
          <span className={classes.bold}>Pagá tus expensas.</span>
        </Box>

        <Box className={classes.contenedorIcono}>
          <img src={Inquilinos} alt="Inquilinos"></img>
          <span className={classes.bold}>Gestioná tus inquilinos.</span>
        </Box>

        <Box className={classes.contenedorIcono}>
          <img src={Chat} alt="Chat"></img>
          <span className={classes.bold}>Chateá con tus vecinos.</span>
        </Box>

      </Box>
      <SnackbarComponent snackColor={"#F23D4F"} openSnackbar={openSnackbar} mensajeSnack={mensajeSnack} handleCloseSnack={() => setOpenSnackbar(false)} />
    </Box>


  );
}