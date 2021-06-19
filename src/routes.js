import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { React } from 'react'
import { NavBar } from './components/NavBar'
import { Login } from './views/Login'
import { Header } from './components/Header'
import { Usuarios } from './views/Usuarios/Usuarios'
import { Departamentos } from './views/Departamentos/Departamentos'
import { Solicitudes } from './views/Gastos/Solicitudes'
import { ABMCUsuario } from './views/Usuarios/ABMCUsuario'
import { Gastos } from './views/Gastos/Gastos'
import { Expensas } from './views/Expensas/Expensas'


export const Routes = () => {

    return (
        <Router>    
              <Switch>
              <Route exact={true} path="/"><Login/></Route>
              <Route><div className="App">
                    <Route><Header/></Route> 
                    <Route><NavBar/></Route> 
                    <Route path="/usuarios"><Usuarios/></Route>
                    <Route path="/newuser"><ABMCUsuario creacion={true} edicion={false}/></Route>
                    <Route path="/usuario/:id"><ABMCUsuario creacion={false} edicion={true} /></Route>
                    <Route path="/departamentos"><Departamentos/></Route>
                    <Route path="/solicitudes"><Solicitudes/></Route>
                    <Route path="/gastos"><Gastos/></Route>
                    <Route path="/expensas"><Expensas/></Route>
            </div></Route>
            </Switch>
        </Router>
    )
}