import React, {useState, useContext} from 'react'
import { Player } from './AudioPlayer'
import './CajaBeats.css'

import play from './circuloplay.png'
import pause from './circulostop.png'
import verificado from './verificado.png'

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';


/* import BeatStorePlayer from './BeatStorePlayer';
import {Contexto} from './BeatStorePlayer' */
/* var iniciar=play;
var parar=""; */



export default class CajaBeats extends React.Component{



    render(){
        
        
        return (
            <div>

                    <div className="beat-container">
                        {/*  <div className="info-oculta">
                            <p>{this.props.beatUrl}</p>
                        </div> */}

                        <div className="caja-cuadrada">
                           {/*  <div className="info-oculta">
                                <p>{this.props.beatUrl}</p> 
                            </div> */}

                        <img className="imagen-fondo-beats"src={this.props.imagenURL}></img> 
                           {/*  <div className="info-oculta">
                                <p>{this.props.beatUrl}</p>
                            </div> */}
                        
                        <img className="playStop"/* src={iniciar} */></img> 
                          {/*   <div className="info-oculta">
                                <p>{this.props.beatUrl}</p>
                            </div> */}
                    </div>

                    {/* TITULO */}
                    <h2>{this.props.name}</h2>
                    {/* <div className="info-oculta">
                        <p>{this.props.beatUrl}</p>
                    </div> */}

                    {/* ARTISTA */}
                    <h3>{this.props.nombrebeatmaker}<img className="verificado" src={verificado}/></h3>
                   {/*  <div className="info-oculta">
                            <p>{this.props.beatUrl}</p>
                    </div> */}


                    {/*  <div className="info-oculta">
                            <p>{this.props.mp3}</p>

                        </div> */}
              
                </div>
            </div>
        )
    }
}
