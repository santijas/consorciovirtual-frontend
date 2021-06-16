import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { React } from 'react'
import { NavBar } from './components/NavBar'
import { Login } from './views/Login'
import { Header } from './components/Header'
import { Usuarios } from './views/Usuarios'
import { Departamentos } from './views/Departamentos'
import { Solicitudes } from './views/Solicitudes'
import { AltaUsuario } from './views/AltaUsuario'
import { Gastos } from './views/Gastos'


export const Routes = () => {

    return (
        <Router>    
              <Switch>
              <Route exact={true} path="/"><Login/></Route>
              <Route><div className="App">
                    <Route><Header/></Route> 
                    <Route><NavBar/></Route> 
                    <Route path="/usuarios"><Usuarios/></Route>
                    <Route path="/newuser"><AltaUsuario creacion={true} edicion={false}/></Route>
                    <Route path="/usuario/:id"><AltaUsuario creacion={false} edicion={true} /></Route>
                    <Route path="/departamentos"><Departamentos/></Route>
                    <Route path="/solicitudes"><Solicitudes/></Route>
                    <Route path="/gastos"><Gastos/></Route>
            </div></Route>
            </Switch>
        </Router>
    )
}