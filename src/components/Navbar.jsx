import React, { useState, useEffect, useContext } from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom'
import logo from './logo-blanco.png'
import firebase from '../firebase'

import MediaQuery from 'react-responsive';

import {GlobalCartItems} from '../contexts/CartContext'




export const Navbar = () => {
    

    // Mostrar/Ocultar botón "Inicio Sesión"
    const user = firebase.auth().currentUser;

    const [logeado, setLogeado] = useState()

    useEffect(() =>{        
        if(user){
            setLogeado("inicio-sesion-link-logeado")
        }else{
            setLogeado("inicio-sesion-link")
        }
    },[])

   
    
   
   
     
    const [navLinkOpen, setNavLinkOpen] = useState(false)
    
    const cambiarEstado = () =>{
        setNavLinkOpen(!navLinkOpen)
    }




   // STATE CARRITO CLASE
    const [cartItems, setCartItems] = useContext(GlobalCartItems)

    const [carritoShake, setCarritoShake] = useState("boton-shake")





/*     useEffect(() => { // MOVIMIENTO CARRITO

        setCarritoShake("boton-shake animate__animated animate__headShake") 


    },[cartItems])  */




    return (
       <nav className="nav-general-div">

            <MediaQuery maxWidth={1370}>

                <div className="logo">
                <Link to="/"><img src={logo} alt="Logo"/></Link>
                </div>

                
                <ul className={'navlinks'}>
                    <Link to='/inicio-sesion'><a className={logeado}>Iniciar Sesión</a></Link>
                   
                  
                    <Link to='/subir-beat'><a>Subir</a></Link>

                    <Link to='/panel'><a>Panel</a></Link>                

                    <div className={carritoShake}>
                        <Link to='/carrito'><i class="fas fa-shopping-cart"></i></Link>
                    </div>
                   
                    <div onClick={cambiarEstado} className="hamburger-toggle2">
                    
                </div>


                
                </ul>
            </MediaQuery>

            <MediaQuery minWidth={1370}>

                <div className="logo">
                <Link to="/"><img src={logo} alt="Logo"/></Link>
                </div>

                
                <ul className={'navlinks'}>
                    <Link to='/inicio-sesion'><a className={logeado}>Iniciar Sesión</a></Link>
                   
                    {/* <li className="link"><a href="#">Home</a></li>*/}
                    <Link to='/all-beats'><a>Beats</a></Link>
                    <Link to='/'><a>BeatMakers</a></Link>
                    <Link to='/subir-beat'><a>Subir</a></Link>
                    <Link to='/panel'><a>Panel</a></Link>
                    {/* <li className="link"><a href="#">Services</a></li> */}
                    <Link to='/carrito'><i class="fas fa-shopping-cart"></i></Link>
                    {/* <li className="link"><a href="#">Contact Us</a></li> */}
                    <div onClick={cambiarEstado} className="hamburger-toggle2">
                    
                </div>


                
                </ul>
            </MediaQuery>
                

        </nav>
    )
}
