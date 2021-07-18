import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from "history";
import { React, useContext, useEffect } from 'react'
import { NavBar } from './components/NavBar'
import { Login } from './views/Login'
import { Header } from './components/Header'
import { Usuarios } from './views/Usuarios/Usuarios'
import { TelefonosUtiles } from './views/TelefonosUtiles/TelefonosUtiles'
import { ABMCTelefonoUtil } from './views/TelefonosUtiles/ABMCTelefonoUtil'
import { Departamentos } from './views/Departamentos/Departamentos'
import { Anuncios } from './views/Anuncios/Anuncios'
import { ABMCAnuncio } from './views/Anuncios/ABMCAnuncio'
import { Solicitudes } from './views/Solicitudes/Solicitudes'
import { Reclamos } from './views/Reclamos/Reclamos'
import { ABMCSolicitud } from './views/Solicitudes/ABMCSolicitud'
import { ABMCReclamo } from './views/Reclamos/ABMCReclamo'
import { ABMCUsuario } from './views/Usuarios/ABMCUsuario'
import { ABMCGasto } from './views/Gastos/ABMCGasto'
import { Gastos } from './views/Gastos/Gastos'
import { Expensas } from './views/Expensas/Expensas'
import { Redirect } from 'react-router'
import { ABMCDepartamento } from './views/Departamentos/ABMCDepartamento'
import { ABExpensa } from './views/Expensas/ABExpensa'
import { ConsultarExpensa } from './views/Expensas/ConsultaExpensa'
import { AnularExpensa } from './views/Expensas/AnularExpensa'
import { Chat } from './views/Chat/Chat.js'
import { UserContext } from './hooks/UserContext';
import ReactLoading from 'react-loading';
import Payment from './views/Expensas/Payment';


export const Routes = () => {
    const history = createBrowserHistory();

    return (
        <Router history={history}>    
              <Switch>
                <Route exact={true} path="/">
                    <Login/>
                </Route>
                    <div className="App">
                        <Route><Header/></Route> 
                        <Route><NavBar/></Route> 
                        <PrivateRoute path="/usuarios" exact={true} component={Usuarios}></PrivateRoute>
                        <Route path="/newuser"><ABMCUsuario creacion={true} edicion={false}/></Route>
                        <Route path="/usuario/:id"><ABMCUsuario creacion={false} edicion={true} /></Route>
                        <Route path="/departamentos" component={Departamentos}></Route>
                        <Route path="/newdepartamento"><ABMCDepartamento creacion={true} edicion={false}/></Route>
                        <Route path="/departamento/:id"><ABMCDepartamento creacion={false} edicion={true} /></Route>
                        <Route path="/anuncios" component={Anuncios}></Route>
                        <Route path="/newanuncio"><ABMCAnuncio creacion={true} edicion={false}/></Route>
                        <Route path="/anuncio/:id"><ABMCAnuncio creacion={false} edicion={true}/></Route>
                        <Route path="/reclamos" component={Reclamos}></Route>
                        <Route path="/newreclamo"><ABMCReclamo creacion={true} edicion={false}/></Route>
                        <Route path="/reclamo/:id"><ABMCReclamo creacion={false} edicion={true}/></Route>
                        <Route path="/solicitudes" component={Solicitudes}></Route>
                        <Route path="/newsolicitud"><ABMCSolicitud creacion={true} edicion={false}/></Route>
                        <Route path="/solicitud/:id"><ABMCSolicitud creacion={false} edicion={true} /></Route>
                        <Route path="/gastos" component={AnularExpensa}><Gastos/></Route>
                        <Route path="/newgasto"><ABMCGasto creacion={true} edicion={false}/></Route>
                        <Route path="/gasto/:id"><ABMCGasto creacion={false} edicion={true} /></Route>
                        <Route path="/expensas" component={Expensas}></Route>
                        <Route path="/newexpensa" component={ABExpensa} ></Route>
                        <Route path="/expensa/:id" component={ConsultarExpensa}></Route>
                        <Route path="/anularexpensa" component={AnularExpensa}></Route>
                        <Route path="/payment/success/:id*" component={Payment}></Route>
                        <Route path="/chat" component={Chat}></Route>
                        <Route path="/telefonosUtiles" component={TelefonosUtiles}></Route>
                        <Route path="/newTelefonoUtil"><ABMCTelefonoUtil creacion={true} edicion={false}/></Route>
                        <Route path="/telefonoUtil/:id"><ABMCTelefonoUtil creacion={false} edicion={true} /></Route>
                    </div>
                </Switch>
       </Router>
    )
}


export default function PrivateRoute(props) {
    const { user, isLoading } = useContext(UserContext);
    const { component: Component, ...rest } = props;

    if(isLoading) {
        return <div className="loadingAbs"><ReactLoading type="spin" color="#159D74" height={150} width={150} className="spin" /></div>
    }
    
    if(user){
       return ( <Route {...rest} render={(props) => 
            (<Component {...props}/>)
             }
          />
        )}

    return <Redirect path='/' component={Login}/>
 }