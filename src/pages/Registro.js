import React, { Component } from 'react';
import { auth, createUserDocument } from '../firebase';
import {Link} from 'react-router-dom'
import './Registro.css'

import logo from '../components/logo-blanco.png'

class Singup extends Component {
  state = { displayName: '', email: '', password: '' };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, displayName } = this.state;
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(user);
      await createUserDocument(user, { displayName });
      
    } catch (error) {
      console.log('error', error);
    }if (window.confirm('La cuenta se ha creado correctamente')) 
    {
    window.location.href='/panel';
    };

    this.setState({ displayName: '', email: '', password: '' });
    




};

  render() {
    const { displayName, email, password } = this.state;
    return (
      <div className="superior">
        <form className="signup-login" onSubmit={this.handleSubmit}>
        <div className="container-master">
        <Link to="/"><img src={logo}></img></Link>
          <h2>Registrarse</h2>
          <br></br>
          <label>Nombre usuario</label>
          <input
            type="name"
            name="displayName"
            value={displayName}
            onChange={this.handleChange}
            placeholder="Nombre usuario"
          />
          <br></br>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            placeholder="Email"
          />
          <br></br>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            placeholder="Contraseña"
          />
          <br></br>
          <button>Registrarse</button>
          <br></br>
          <p><Link to="/inicio-sesion"> ¿Ya tienes una cuenta?</Link></p>
          </div>
        </form>
      </div>
    );
  }
}

export default Singup;