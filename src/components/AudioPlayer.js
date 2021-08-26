// AUDIO PLAYER
import React, {useContext, useEffect, useState} from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { Thumbs } from 'swiper';
import CajaBeats from './CajaBeats'

import './AudioPlayer.css'
import { GlobalStateContext } from '../contexts/GlobalState';
import { GlobalSongContext } from '../contexts/CurrentPlaying'


export const Player = () => {
    const [currentSong, setCurrentSong] = useContext(GlobalSongContext)
    const {currentPlaying} = currentSong;

    const [globalState, setGlobalState] = useContext(GlobalStateContext)
    var {beatActivo} = globalState;
    
   
    var clasePlayer="player animate__animated animate__fadeIn";

    
    if(beatActivo == "1"){
        clasePlayer="player-apagado"
    }
    
    
    
    return (
        
       
        <div className={clasePlayer}>
           <div onClick={() => {setGlobalState({beatActivo: "1"})}} className="cruz-reproductor"><i class="fas fa-times"></i></div>
           
            <AudioPlayer
                /* autoPlay */
                src={beatActivo}
                onPlay={e => console.log("onPlay")}
                header={currentPlaying}
                // other props here
               
            />
            
        </div>
       
    )
    
}

