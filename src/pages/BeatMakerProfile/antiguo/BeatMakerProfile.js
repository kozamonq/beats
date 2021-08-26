import React, {useContext, useEffect, useState} from 'react'
import { Navbar } from '../../components/Navbar'
import NavToggler from '../../components/NavToggler/NavToggler'
import './BeatMakerProfile.css'
import {Link} from 'react-router-dom'
import firebase from '../../firebase'
import {useAuth} from '../../contexts/AuthContext'


import defaultProfile1 from './default-profile.jpeg';
import defaultProfile2 from './default-profile2.jpeg';
import defaultProfile3 from './default-profile3.jpeg';
import defaultProfile4 from './default-profile4.jpeg';

import carrito from '../BeatPage/carrito.png'

import play from '../../components/circuloplay.png'
import { Player } from '../../components/AudioPlayer'
import { GlobalStateContext } from '../../contexts/GlobalState';
import { GlobalSongContext} from '../../contexts/CurrentPlaying';
import 'react-h5-audio-player/lib/styles.css';





export default function BeatMakerProfile() {

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

   const [estadoReproductor, setEstadoReproductor] = useState(play)
////////////////////////////////////////////////////////////////////////
   
   
   

    var windowLocation= window.location   
    var dirtyURL = windowLocation.pathname
    
    var cleanURL = dirtyURL.replace("/profile/", "") 
    console.log(cleanURL)

    const [spells, setSpells] = React.useState([])
    const [datosUsuario, setDatosUsuario] = useState()
    const [avatarUsuario, setAvatarUsuario] = useState()


    /// AQUI HAY QUE HACER UN QUERY, PARA SOLO COGER LOS BEATS CON EL NOMBRE DE USUARIO DE LA URL (EJEMPLO http://localhost:3000/profile/Svciogotbeats)

    React.useEffect(()=> {
        const fetchData = async () => {
            const db = firebase.firestore()
            const data = await db.collection("beatsVenta").where('nombreUsuario','==',cleanURL).get()
            setSpells(data.docs.map(doc => doc.data()))


        }
        fetchData()
    },[])


    React.useEffect(()=> {
        const fetchData = async () => {
            const db = firebase.firestore()
            const data = await db.collection("users").where('displayName','==',cleanURL).get()
           
            // AVATAR 
            var avatar = data.docs.map(doc => doc.data())[0].avatar;
            setAvatarUsuario(avatar)



            // FECHA
            var segundos = data.docs.map(doc => doc.data())[0].createdAt.seconds
            var milisegundos = segundos * 1000
            var d = new Date(milisegundos);
            var fecha = d.toLocaleDateString();
            setDatosUsuario(fecha)

           /*  console.log(d.toLocaleDateString()) */

        }
        fetchData()
    },[])





    return (
        <div>

            <Navbar/>
            <NavToggler/>

            <div className="container-profile-master">
                    {/* <img className="imagen-profile" src={defaultProfile4}/>  */}{/* imagen de fondo */}
                <div className="stats">
                    <h2>{cleanURL}</h2>

                    <div className="avatar-perfil">
                        <img className="imagen-avatar-perfil" src={avatarUsuario}></img>
                    </div>



                    <div className="espacio-entre">
                        <p>Desde: {datosUsuario} </p>
                        
                    </div>

                    
                       {/*  <p>Estilos: Trap, Drill </p> */}
                        <p>Redes <i class="fab fa-instagram"></i> &#160;<i class="fab fa-spotify"></i> &#160;<i class="fab fa-twitter"></i></p>
                </div>

                <div className="beats">
                <table>
                    <thead>
                           
                                <tr>
                                    <th>Nombre</th>
                                    <th>Play</th>
                                    <th>Estilo</th>
                                  
                                    <th>Precio</th>
                                </tr>
                            
                    </thead>
                    <br></br>
                    <tbody>
                            <th>
                                {spells.map(spell => (
                                        <div className="link-nombre">
                                            <ul key={spell.name}><Link to={`/beat/${spell.identificador}`}>{spell.name}</Link></ul> 
                                        </div> 
                                    ))}
                            </th>

                            <th>
                            {spells.map(spell => (
                                         
                                <div onClick={()=>{
                                    console.log('hola');
                                    const cancion =spell.name;
                                    const nombre =spell.beatUrl;

                                    setGlobalState({beatActivo:nombre});
                                    setCurrentSong({currentPlaying:cancion});
                                ;}}  className="circuloplay">
                                    <ul><img src={play}/></ul>
                                </div>
                                    ))}

                            </th>


                            <th>
                                {spells.map(spell => (
                                    <div className="estilo-columna">
                                        <ul key={spell.estilo}><p>{spell.estilo}</p></ul>
                                    </div>
                                ))}
                            </th>

                            

                            <th>
                                {spells.map(spell => (
                                <ul className="precio" key={spell.precio}><button className="boton-compra-perfil"><img className="carrito" src={carrito}/>{spell.precio}€</button></ul>
                                ))}
                                
                            </th>
                                    
                    </tbody>
                </table>

                </div>






            </div>
            <div className="reproductor">
            <Player /> 
            </div>

        </div>
    )
}
