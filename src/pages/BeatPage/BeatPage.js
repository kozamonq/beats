import React, {useState, useEffect, useContext} from 'react'
import { Navbar } from '../../components/Navbar'
import './BeatPage.css'

import {Link, useHistory} from 'react-router-dom'

import {useAuth} from '../../contexts/AuthContext'
import app from '../../firebase'
import firebase from 'firebase/app'
import auth from '../../firebase'

import axios from 'axios'




import metronomo from './metronomo.png'
import metronomo2 from './metronomo2.png'
import reloj from './reloj.png'
import carrito from './carrito.png'
import circuloplay from '../../components/circuloplay.png'

import {Player } from '../../components/AudioPlayer';
import { GlobalStateContext } from '../../contexts/GlobalState';
import { GlobalSongContext} from '../../contexts/CurrentPlaying'
import {GlobalCartItems} from '../../contexts/CartContext'


import play from '../../components/circuloplay.png'

const db = app.firestore()




// HAY QUE CAMBIAR LA REACCIÓN AL HACER CLICK EN EL BOTÓN DE REPRODUCIR
// ACTUALMENTE, ESTA INTENTANDO BUSCAR EL ARCHIVO WAV ( PERO NO HAY NINGUNO)
// HEMOS DE HACER QUE AL HACER PLAY, BUSQUE EL ARCHIVO MP3, 
// Y CUANDO SE AÑADA AL CARRITO, BUSQUE EL ARCHIVO WAV

export default function BeatMaker() {
    const history = useHistory();

    var windowLocation= window.location   
    var dirtyURL = windowLocation.pathname
    
    var cleanURL = dirtyURL.replace("/beat/", "")
    var beatURL = parseInt(cleanURL)
    
    
    /*  */
    
    /////// REPRODUCTOR //////////////////////////////////////////////////////
    const [currentSong, setCurrentSong] = useContext(GlobalSongContext)
    const {currentPlaying} = currentSong;
    useEffect(() => {
        console.log('la base actual se ha actualizado')
    }, [currentSong])

    const [globalState, setGlobalState] = useContext(GlobalStateContext)
    const {beatActivo} = globalState;
    useEffect(() =>{
        console.log('el globalstate se ha actualizado')
    }, [globalState])
    //////////////////////////////////////////////////////////////////////////
   
    const [usuario, setUsuario] = useState()
    const [titulo, setTitulo] = useState()
    const [imagen, setImagen] = useState()
    const [beatmaker, setBeatmaker] = useState()
    const [bpm, setBpm] = useState()
    const [fecha, setFecha] = useState()
    const [precio, setPrecio] = useState()

    const [URLbeatMP3, setURLbeatMP3] = useState()
    const [URLbeat, setURLBeat] = useState()

   
    const [datosGenerales, setDatosGenerales] = useState("");

  
    
    useEffect(() => {  
            firebase.firestore().collection('beatsVenta').where('identificador', '==', beatURL).get()
                .then((snapshot) => {
                    snapshot.docs.forEach(doc => {
                        const datos = doc.data();
                
                        setUsuario(datos.usuario)
                        setTitulo(datos.name);
                        setImagen(datos.imagenURL);
                        setBeatmaker(datos.nombreUsuario);
                        setBpm(datos.BPM);
                        /* setFecha(datos.name); */

                        const fechaM = datos.fecha

                        const seconds = parseInt(fechaM.seconds*1000)

                        var newDate = new Date(seconds).toLocaleDateString("es-ES");
                        setFecha(newDate)


                        setPrecio(datos.precio);
                        setURLBeat(datos.beatUrlWav);
                        setURLbeatMP3(datos.beatUrl);
       
                       /*  console.log(titulo) */
                    })
                    
                })

        },[titulo,imagen]) 
    

/* /////// CARRITO ////////////////////////////////////////////////////////// */
   
   
   
    const [cartItems, setCartItems] = useContext(GlobalCartItems)

    // AÑADIDO AL CARRITO OVERLAY //
    const [carro, setCarro] = useState("div-overlay-oculto")

    var objetoCarrito = (titulo, precio, imagen, URLbeat)

    // UID DEL USUARIO
    const {currentUser} = useAuth()
    const usuarioID =currentUser.uid 


    
    const AgregarCarrito = async (objetoCarrito) => {

        setCartItems([...cartItems, objetoCarrito]);

    }
  
////////////////////////////////////////////////////////////////////////////

   

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div>
            <Navbar />
            <div className="container-general-beatmaker">
                <div className="portada">
                    <img className="beatPortada" src={imagen}  alt="#"/>
                    <h2> {titulo} </h2>


                    <img onClick={(e)=> {console.log(e.target.nextElementSibling.children[1].innerText);
                                        setGlobalState({beatActivo:e.target.nextElementSibling.children[1].innerText});
                                        setCurrentSong({currentPlaying:e.target.nextElementSibling.children[0].innerText});
                    }} className="circuloplay" src={circuloplay}/> 

                    <div className="info-oculta">
                        <p>{titulo}</p>
                        <p>{URLbeatMP3}</p>
                    </div>

                    <div className="perfil-beatmaker">
                        <h4>Beat by <Link to={`/profile/${beatmaker}`}>{beatmaker}</Link></h4>
                    </div>

                    <div className="tempo">
                        <h5><img src={metronomo2}/>{bpm}</h5><h5><img src={reloj}/>{fecha}</h5>
                    </div>


                    <button onClick={() => {AgregarCarrito({titulo, precio, URLbeat, imagen});
                                            setCarro("div-overlay-oculto-activo animate__animated animate__fadeIn")}}   className="boton-compra"><img className="carrito" src={carrito}/>{precio}€</button>
              
                </div>

                <div className={carro}>
                    <div className="alerta-overlay">
                        <h1>Has añadido "{titulo}" al carrito</h1>
                        <button onClick={() =>{history.push("/carrito")}}>Ver Carrito</button>
                        <button onClick={()=>{setCarro("div-overlay-oculto animate__animated animate__fadeOut")}}>Seguir ojeando</button>
                    </div>
                </div>

            </div>

            <div className="reproductor">
                <Player /> 
            </div>
        </div>
    )
}
