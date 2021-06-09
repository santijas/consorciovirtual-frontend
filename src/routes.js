import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { React } from 'react'
import { NavBar } from './components/NavBar'
import { Login } from './views/Login'
import { Header } from './components/Header'
import { Usuarios } from './views/Usuarios'
import { Departamentos } from './views/Departamentos'


export const Routes = () => {

    return (
        <Router>    
              <Switch>
              <Route exact={true} path="/"><Login/></Route>
              <Route><div>
                    <Route><Header/></Route> 
                    <Route><NavBar/></Route> 
                    <Route path="/usuarios"><Usuarios/></Route>
                    <Route path="/departamentos"><Departamentos/></Route>
            </div></Route>
            </Switch>
        </Router>
    )
}