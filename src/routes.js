import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { React } from 'react'
import { NavBar } from './components/NavBar'
import { Login } from './views/Login'
import { Header } from './components/Header'
import { Usuarios } from './views/Usuarios'
import { Departamentos } from './views/Departamentos'
import { Solicitudes } from './views/Solicitudes'
import { AltaUsuario } from './views/AltaUsuario'


export const Routes = () => {

    return (
        <Router>    
              <Switch>
              <Route exact={true} path="/"><Login/></Route>
              <Route><div>
                    <Route><Header/></Route> 
                    <Route><NavBar/></Route> 
                    <Route path="/usuarios"><Usuarios/></Route>
                    <Route path="/usuario/create"><AltaUsuario/></Route>
                    <Route path="/departamentos"><Departamentos/></Route>
                    <Route path="/solicitudes"><Solicitudes/></Route>
            </div></Route>
            </Switch>
        </Router>
    )
}