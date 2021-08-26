import React from 'react'
import { Link } from 'react-router-dom'
import './OrderConfirmed.css'
import logo from '../../components/logo-blanco.png'
export default function OrderConfirmed() {
    return (
        <div className="div-general-confirmado">
            <img src={logo}></img>
            <h2>¡Gracias por tu compra!</h2>
            <h3>Tus Beats adquiridos, aparecerán en tu Panel, en la sección de "Beats Adquiridos"</h3>
           
            <h3>De todas formas, te hemos enviado un mail con el link para descargar el/los Beat/s</h3>

            <div className="botones-confirmed">
               <button><Link to="/panel"> Ir al Panel</Link></button>
                <button><Link to="/">Volver al inicio</Link></button>
            </div>
        </div>
    )
}
