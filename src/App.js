

import  { BrowserRouter as Router, 
  Route, 
  Switch, 
  Link, 
  Redirect
} from 'react-router-dom';


//Pages
import {Home} from './pages/Home';


import { Navbar } from './components/Navbar';
import logo from './logo.svg';
/* import { InicioSesion } from './pages/InicioSesion'; */
import { AuthProvider } from './contexts/AuthContext';
import Registro from './pages/Registro';
import InicioSesion from './pages/InicioSesion';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute'
import ForgotPassword from './pages/ForgotPassword';
import UpdateProfile from './pages/UpdateProfile';
import Vender from './pages/Vender';
import SubirBeat from './pages/SubirBeat/SubirBeat.js';
import BeatPage from './pages/BeatPage/BeatPage';
import ConfirmacionSubido from './pages/SubirBeat/ConfirmacionSubido';
import BeatsVenta from './pages/BeatsVenta/BeatsVenta';
import BeatsAll from './pages/BeatsAll/BeatsAll';
import CheckOut from './pages/CheckOut/CheckOut';
import BeatMakerProfile from './pages/BeatMakerProfile/BeatMakerProfile';
import OrderConfirmed from './pages/CheckOut/OrderConfirmed';
import BeatsAdquiridos from './pages/BeatsAdquiridos/BeatsAdquiridos';
import UpdateAvatar from './pages/UpdateAvatar/UpdateAvatar';
import Search from './pages/Search/Search';
import Terminos from './pages/TeminosBeatmaker/Terminos';
import BeatMakersAll from './pages/BeatMakersAll/BeatMakersAll';




function App() {
  return (
    <AuthProvider>
      <Router>


        <Switch>
          <Route exact path="/" component={Home}/>
        
          <Route path="/registro" component={Registro}/>
          <Route path="/inicio-sesion" component={InicioSesion}/>
          <Route path="/forgot-password" component={ForgotPassword}/>
          
          <PrivateRoute exact path="/panel" component={Dashboard}/>
          <PrivateRoute path="/update-profile" component={UpdateProfile}/>
          <PrivateRoute path="/update-avatar" component={UpdateAvatar}/>
          <PrivateRoute path="/vender" component={Vender}/>


          <Route exact path="/terminos" component={Terminos}/>
          <PrivateRoute path="/subir-beat" component={SubirBeat}/>
          <PrivateRoute path="/confirmacion" component={ConfirmacionSubido}/>
          <PrivateRoute path="/en-venta" component={BeatsVenta}/>


          <Route path="/search" component={Search}/>
          <Route exact path="/search/:id" render={props => <Search {...props} />}/>

          <Route path="/all-beats" component={BeatsAll}/>

          <Route path="/beat" component={BeatPage}/>
          <Route exact path="/beat/:id" render={props => <BeatPage {...props} />}/>

          <Route path="/all-beatmakers" component={BeatMakersAll}/>

          <Route path="/profile/" component={BeatMakerProfile}/>
          <Route exact path="/profile/:id" render={props => <BeatMakerProfile {...props} />}/>



          <PrivateRoute exact path="/carrito" component={CheckOut}/>
          <PrivateRoute exact path="/orden-confirmada" component={OrderConfirmed}/>
          <PrivateRoute exact path="/beats-adquiridos" component={BeatsAdquiridos}/>
        


          <Redirect to="/404" />  

        </Switch>
        
      </Router>
    </AuthProvider>
  );
}

export default App;
