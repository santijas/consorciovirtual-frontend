import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { React } from 'react'
import { NavBar } from './components/NavBar'
import { Login } from './views/Login'
import { Header } from './components/Header'
import { Usuarios } from './views/Usuarios/Usuarios'
import { Departamentos } from './views/Departamentos/Departamentos'
import { Solicitudes } from './views/Solicitudes/Solicitudes'
import { ABMCUsuario } from './views/Usuarios/ABMCUsuario'
import { ABMCGasto } from './views/Gastos/ABMCGasto'
import { Gastos } from './views/Gastos/Gastos'
import { Expensas } from './views/Expensas/Expensas'
import { usuarioService } from './services/usuarioService'
import { Redirect } from 'react-router'
import { ABMCDepartamento } from './views/Departamentos/ABMCDepartamento'
import { ABExpensa } from './views/Expensas/ABExpensa'



export const Routes = () => {

    return (
        <Router>    
              <Switch>
              <Route exact={true} path="/"><Login/></Route>
              <Route><div className="App">
                    <Route><Header/></Route> 
                    <Route><NavBar/></Route> 
                    <PrivateRoute path="/usuarios" component={Usuarios}></PrivateRoute>
                    <Route path="/newuser"><ABMCUsuario creacion={true} edicion={false}/></Route>
                    <Route path="/usuario/:id"><ABMCUsuario creacion={false} edicion={true} /></Route>
                    <Route path="/departamentos"><Departamentos/></Route>
                    <Route path="/newdepartamento"><ABMCDepartamento creacion={true} edicion={false}/></Route>
                    <Route path="/departamento/:id"><ABMCDepartamento creacion={false} edicion={true} /></Route>
                    <Route path="/solicitudes"><Solicitudes/></Route>
                    <Route path="/gastos"><Gastos/></Route>
                    <Route path="/newgasto"><ABMCGasto creacion={true} edicion={false}/></Route>
                    <Route path="/gasto/:id"><ABMCGasto creacion={false} edicion={true} /></Route>
                    <Route path="/expensas"><Expensas/></Route>
                    <Route path="/newexpensa"><ABExpensa/></Route>
            </div></Route>
            </Switch>
        </Router>
    )
}

const PrivateRoute = ({path, component}) => {
    const authenticated = usuarioService.usuarioLogueado.id !== undefined

    return (authenticated
    ? <Route path={path} component={component}></Route>
    : <Redirect exact={true} to="/" ></Redirect>)
}
