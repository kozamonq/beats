import React from 'react'
import { Link } from 'react-router-dom';

import './ConfirmacionSubido.css'
import logo from '../../components/logo-blanco.png'


export default function ConfirmacionSubido() {
    return (
        <div>
            <div className="container-master">
            <Link to="/"><img src={logo}></img></Link>
            <h2>¡Beat subido con éxito!</h2>
            <h3>Nuestro equipo revisará el Beat, y lo subiremos lo antes posible!</h3>


            <Link to="/"><button><a>Volver</a></button></Link>




            </div>
        </div>
    )
}
