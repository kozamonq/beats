import React , {useState, useEffect, useContext} from 'react'
import './BeatMakersAll.css'
import firebase, { db, auth } from '../../firebase'
import play from '../../components/circuloplay.png'
import {Link, useHistory} from 'react-router-dom'

import { Navbar } from '../../components/Navbar'

import {Player } from '../../components/AudioPlayer';
import { GlobalStateContext } from '../../contexts/GlobalState';
import { GlobalSongContext} from '../../contexts/CurrentPlaying';
import { GlobalSearchContext} from '../../contexts/SearchContext';
import dropUp from '../Search/expand-arrow.png'
import dropDown from '../Search/expand-button.png'


// MEDIA QUERY
import { useMediaQuery } from 'react-responsive';
import MediaQuery from 'react-responsive';

var searchIcon = <i class="fas fa-search"></i>;



export default function BeatMakersAll() {

    let history = useHistory();

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
    ////////////////////////////////////////////////////////////////////////////


    const [spells, setSpells] = useState([])

    useEffect(()=> {
        const fetchData = async () => {
            const db = firebase.firestore()
            const data = await db.collection("users").where("beatmaker", "==", "yes").get()
            setSpells(data.docs.map(doc => doc.data()))
        }
        fetchData()

    },[])

    console.log(spells)


    return (
        <div className="beatmakers-all-container">
            <Navbar/>


            <h1>BEATMAKERS</h1>

            <div className="general-all-beatmaker">
                    {spells.map(spell => (

                        <div onClick={() => history.push(`/profile/${spell.displayName}`)}className="contenido-caja-beatmaker">
                            <img className="fondo-caja-beatmakers" src={spell.avatar}/>
                            <ul key={spell.displayName}>{spell.displayName}</ul>
                        </div>
                        
                    ))}
            </div>




        </div>
    )
}
