import React from 'react'
import './Footer.css'
import {Link} from 'react-router-dom'


var instagram = <i class="fab fa-instagram"></i>;
var twitter  = <i class="fab fa-twitter"></i>;
var youtube  = <i class="fab fa-youtube"></i>;
var facebook = <i class="fab fa-facebook-f"></i>;

export const Footer = () => {
    return (
        <div>
            <div className="container-main">
            <hr></hr>
            <div className="links">
                <h3 className="inicio">Inicio</h3>
                <h3 className="contacto">Contacto</h3>
                <h3 className="prensa">Prensa</h3>
            </div>


            <div className="redes-sociales">

                <a href="https://instagram.com"><div className="instagram">{instagram} </div> </a>
                <a href="https://instagram.com"><div className="twitter">{twitter}</div></a>
                <a href="https://instagram.com"><div className="youtube">{youtube}</div></a>
                <a href="https://instagram.com"><div className="facebook">{facebook}</div></a>
            </div>

            </div>
        </div>
    )
}
