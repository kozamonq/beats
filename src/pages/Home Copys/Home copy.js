import React, {useState, useContext, useEffect} from 'react';
import {useAuth} from '../contexts/AuthContext'
import {Link, useHistory} from 'react-router-dom'
import './Home.css'
import { Navbar } from '../components/Navbar'
import CajaBeats from '../components/CajaBeats';
import { Beatmakers } from '../components/Beatmakers';
import { Generos } from '../components/Generos';
import { Footer } from '../components/Footer';

import firebase, { db, auth } from '../firebase'


import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import beats from '../database/beats.json'

// import Swiper JS
import {Swiper,SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper'
// import Swiper styles
import 'swiper/swiper-bundle.css';
import {Player } from '../components/AudioPlayer';
import { GlobalStateContext } from '../contexts/GlobalState';
import { GlobalSongContext} from '../contexts/CurrentPlaying'


import play from '../components/circuloplay.png'
import pause from '../components/circulostop.png'
import { Switch } from 'react-router';


var searchIcon = <i class="fas fa-search"></i>;


export function Home() {


    /* console.log(mp3.target.nextElementSibling.innerText); */

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

 

    // Para entrar en la base de datos
    const {currentUser, logout} = useAuth()
    const history = useHistory()
    const usuarioID =currentUser.uid

    const [usuario, setUsuario] = useState("Usuario")
    useEffect(() => {
    },[usuario])

    // const getData = async () => {
       

    //     const sfRef = await firebase.firestore().collection(`users`).get('beatsSubidos')
    //     .then( snapshot => {
    //         const usuarios = []
    //         snapshot.forEach(doc => {
    //             const data = doc.data()
    //             usuarios.push(data)
    //            /*  console.log(data) */
    //         })
    //     }); 
    //    /*  console.log(sfRef) */
        
    // } 
    // getData()





/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <div>
            <Navbar />
           
            <div className="imagen-inicio">
                <img width="100%" opacity="" src="https://images.unsplash.com/photo-1593642532454-e138e28a63f4?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="hola"></img>
                <div className="overlay"></div>

                <h2>#1 MARKETPLACE DE HABLA HISPANA</h2>
               
            </div>

         
            
            <div className="buscador-inicio">
                <div class="input-group mb-3 p-3">
                    <span class="input-group-text" id="basic-addon1">{searchIcon}</span>
                    <input type="text" class="form-control" placeholder="Prueba con 'Trap Beat' o 'Reggaeton Beat'" aria-label="Username" aria-describedby="basic-addon1"></input>
                </div>
           </div>


            {/*  TOP BEATS DE LA SEMANA   */}      
           <div className="top-beats-semana">
                <h2>Top Beats de la Semana</h2>

                {/*  SWIPER   */}      
                <Swiper
                spaceBetween={0}
                slidesPerView={1.8}       
                >

                    {
                        beats.map((beat) =>  

                            <SwiperSlide>
                            
                                    

                                    <div onClick={(e) => {console.log(e.target.nextElementSibling);} }>
                                        
                                    <div class="playerstop-container" >
                                        
                                            {/* Reproductor */}
                                            <img src={estadoReproductor}   
                                            onClick={(e) => {console.log(e);
                                            setGlobalState({beatActivo:e.target.nextElementSibling.children[0].children[0].innerText});
                                            setCurrentSong({currentPlaying:e.target.nextElementSibling.innerText});                            
                                            }} className="playerstop"/> 
                                        
                                            
                                            {/* Caja Beats */}
                                            <CajaBeats 
                                            nombrebeatmaker={beat.nombrebeatmaker}
                                            beat1nombre={beat.beat1nombre}
                                            imagen={beat.beat1.imagen}
                                            mp3={beat.mp3}
                                            />                          
                                            
                                        </div>
                                    </div>

                            </SwiperSlide>    
                         
                        )
                    }

                </Swiper>         
            </div>

            {/*  TOP BEATS DE LA SEMANA   */}      
            <div className="trending-beats">
                <h2>Trending Beats</h2>
                {/*  SWIPER   */}      
                <Swiper
                spaceBetween={0}
                slidesPerView={1.8}       
                >
                   {
                        beats.map((beat) =>  
                        <SwiperSlide>
                           <div onClick={(e) => {console.log(e.target.nextElementSibling.innerText);
                            setGlobalState({beatActivo:e.target.nextElementSibling.innerText})} }>
                                <CajaBeats 
                                nombrebeatmaker={beat.nombrebeatmaker}
                                beat1nombre={beat.beat1nombre}
                                imagen={beat.beat1.imagen}
                                mp3={beat.mp3}
                                />
                        
                            </div>
                        </SwiperSlide>)
                    }
                   
                </Swiper>
            {/*   SWIPER  */}     
           </div>



            {/*  TOP BEATMAKERS   */}  
            <div className="top-beatmakers">
                <h2>Mejores Beatmakers</h2>
                {/*  SWIPER   */}      
                <Swiper
                spaceBetween={0}
                slidesPerView={1.8}       
                >
                    <SwiperSlide><Beatmakers/></SwiperSlide>
                    <SwiperSlide><Beatmakers/></SwiperSlide>
                    <SwiperSlide><Beatmakers/></SwiperSlide>
                    <SwiperSlide><Beatmakers/></SwiperSlide>
                    <SwiperSlide><Beatmakers/></SwiperSlide>
                    <SwiperSlide><Beatmakers/></SwiperSlide>
                    <SwiperSlide><Beatmakers/></SwiperSlide>
                </Swiper>
                {/*   SWIPER  */} 
            </div>



            {/*  EXPLORAR POR GÉNEROS   */}  
            <div className="generos">
                <h2>Búsqueda por Géneros</h2>
                {/*  SWIPER   */}      
                <Swiper
                spaceBetween={0}
                slidesPerView={1.8}       
                >

                    <SwiperSlide><Generos/></SwiperSlide>
                    <SwiperSlide><Generos/></SwiperSlide>
                    <SwiperSlide><Generos/></SwiperSlide>
                    <SwiperSlide><Generos/></SwiperSlide>
                    <SwiperSlide><Generos/></SwiperSlide>
                    <SwiperSlide><Generos/></SwiperSlide>
                    <SwiperSlide><Generos/></SwiperSlide>
                    <SwiperSlide><Generos/></SwiperSlide>

                </Swiper>
                {/*   SWIPER  */} 
            </div>

        <div className="reproductor">
            <Player /> 
        </div>


            <Footer/>
        </div>
    )
};

