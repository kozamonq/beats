import React , {useState, useEffect, useContext} from 'react'
import firebase, { db, auth } from '../../firebase'
import play from '../../components/circuloplay.png'
import {Link, useHistory} from 'react-router-dom'

import '../BeatsAll/BeatsAll.css'
import './Search.css'
import { Navbar } from '../../components/Navbar'

import {Player } from '../../components/AudioPlayer';
import { GlobalStateContext } from '../../contexts/GlobalState';
import { GlobalSongContext} from '../../contexts/CurrentPlaying';
import { GlobalSearchContext} from '../../contexts/SearchContext';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import dropUp from './expand-arrow.png'
import dropDown from './expand-button.png'


// MEDIA QUERY
import { useMediaQuery } from 'react-responsive';
import MediaQuery from 'react-responsive';


var searchIcon = <i class="fas fa-search"></i>;



export default function Search() {


    let history = useHistory();


    const decoratedOnClick = useAccordionToggle();


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
   






    /////// BUSCADOR //////////////////////////////////////////////////////

    const [preBuscador, setPreBuscador] = useState()
    const [buscador, setBuscador] = useContext(GlobalSearchContext);



    const getDatos= async () => {
        const datosBruto = preBuscador.toLowerCase();
        const datosFiltrados = datosBruto.split(" ");
        console.log(datosFiltrados)

        setBuscador(datosFiltrados);
        console.log(datosFiltrados)

        await history.push(`/search?q=${datosFiltrados}`);

    }

    ////////////////////////////////////////////////////////////////////////////



    const [spells, setSpells] = useState([])
    

    // SI buscador INCLUYE €, QUIERE DECIR QUE DEBEMOS FILTRAR POR PRECIOS

    useEffect(()=> {
        let buscadorString = buscador.toString() // STRING

        let buscadorSinSimbolo = parseInt(buscadorString.replace("€", "")) // NUMERO

        console.log(buscadorSinSimbolo)




        if(buscadorString.includes('€')){   // FILTRAR POR PRECIOS

            if(buscadorSinSimbolo == 10){               // FILTRO 0€-10€
                const fetchData = async () => {
                    const db = firebase.firestore()
                    const data = await db.collection("beatsVenta").where('precio', '<=', buscadorSinSimbolo).get()
                    setSpells(data.docs.map(doc => doc.data()))
                    console.log(spells)
                }
                fetchData()
            
            }else if( buscadorSinSimbolo == 20 ){       // FILTRO 10€-20€

                const fetchData = async () => {

                    const db = firebase.firestore()
                    const data = await db.collection("beatsVenta").where('precio', '<=', 20).get()
                    console.log(data.docs.map(doc => doc.data()))


                    const datos = data.docs.map(doc => doc.data())

                    let array10a20 = datos.filter(beat => beat.precio > 10);
                    console.log(array10a20)

                    setSpells(array10a20)
                   
                }
                fetchData()

            } else if ( buscadorSinSimbolo == 50 ){     // FILTRO 20€-50€

                const fetchData = async () => {
                    const db = firebase.firestore()
                    const data = await db.collection("beatsVenta").where('precio', '<=', 50).get()
                    console.log(data.docs.map(doc => doc.data()))


                    const datos = data.docs.map(doc => doc.data())

                    let array10a20 = datos.filter(beat => beat.precio > 20);
                    console.log(array10a20)

                    setSpells(array10a20)
                   
                }
                fetchData()



            } else if ( buscadorSinSimbolo == 100 ){    // FILTRO 50€-100€ 

                const fetchData = async () => {
                    const db = firebase.firestore()
                    const data = await db.collection("beatsVenta").where('precio', '<=', 100).get()
                    console.log(data.docs.map(doc => doc.data()))


                    const datos = data.docs.map(doc => doc.data())

                    let array10a20 = datos.filter(beat => beat.precio > 50);
                    console.log(array10a20)

                    setSpells(array10a20)
                   
                }
                fetchData()


            } else if ( buscadorSinSimbolo == 101 ){    // FILTRO +100€

                const fetchData = async () => {
                    const db = firebase.firestore()
                    const data = await db.collection("beatsVenta").where('precio', '>', 100).get()
                    console.log(data.docs.map(doc => doc.data()))


                    const datos = data.docs.map(doc => doc.data())


                    setSpells(datos)
                   
                }
                fetchData()

            }

        }else{

            const fetchData = async () => {
                const db = firebase.firestore()
                const data = await db.collection("beatsVenta").where('etiquetas', 'array-contains-any', buscador).get()
                
                setSpells(data.docs.map(doc => doc.data()))
            }
            fetchData()

        }
        
    },[buscador])


///////////////////////////////////////////////////////

const [acordeon1, setAcordeon1] = useState("panel1")
const [acordeon2, setAcordeon2] = useState("panel2")
const [acordeon3, setAcordeon3] = useState("panel3")



const toggleAcordeon1 = () => {
        if(acordeon1 == "panel1"){
            setAcordeon1("panel1-activo")
        }else if(acordeon1 == "panel1-activo") {
            setAcordeon1("panel1")
        }
}
const toggleAcordeon2 = () => {
    if(acordeon2 == "panel2"){
        setAcordeon2("panel2-activo")
    }else if(acordeon2 == "panel2-activo") {
        setAcordeon2("panel2")
    }
}
const toggleAcordeon3 = () => {
    if(acordeon3 == "panel3"){
        setAcordeon3("panel3-activo")
    }else if(acordeon3 == "panel3-activo") {
        setAcordeon3("panel3")
    }
}

///////////////////////////////////////////////////////


    const [filtros, setFiltros] = useState("filtros-movil-oculto")




    const activarFiltros = () => {
        setFiltros("filtros-movil-activo animate__animated animate__slideInUp")
    
    
    }
    const desactivarFiltros = () => {
        setFiltros("filtros-movil-oculto animate__animated animate__slideInDown")
    }





///////////////////////////////////////////////////////




    return (

        <div className="contenedor-general-beatsall">
            <Navbar />


            <div className="filtros-buscador">

                {/* Buscador */}
                <div className="buscador-input">
                    <form onSubmit={e => {e.preventDefault();getDatos()}}>
                        <div class="input-group mb-3 p-3">
                            <span class="input-group-text" id="basic-addon1">{searchIcon}</span>
                            <input type="text" onChange={e => setPreBuscador(e.target.value)} class="form-control" placeholder="Prueba con 'Trap Beat' o 'Reggaeton Beat'" aria-label="Username" aria-describedby="basic-addon1"></input>
                            
                        </div>
                            <h5 onClick={() => history.push('/all-beats')} className="eliminar-filtros-menu">Eliminar filtros</h5>
                    </form>
                </div>


                <MediaQuery minWidth={1371}>
                {/*                  Filtros                  */}

                {/* Estilos */}
                <div className="seccion-filtros">
                    <button onClick={() => toggleAcordeon1()} class={"accordion"}>
                        <div className="caja-estilos-filtros">
                            <p>Estilos</p><img src={dropDown}/>
                        </div>
                    </button>
                    <div class={acordeon1}>
                        <div className="contenido-caja">  
                        <ul onClick={() => {setBuscador(["trap"]);desactivarFiltros() }}>Trap</ul>
                                <ul onClick={() => {setBuscador(["rap"]);desactivarFiltros() }}>Rap</ul>
                                <ul onClick={() => {setBuscador(["drill"]);desactivarFiltros() }}>Drill</ul>
                                <ul onClick={() => {setBuscador(["reggaeton"]);desactivarFiltros() }}>Reggaeton</ul>
                                <ul onClick={() => {setBuscador(["r&b"]);desactivarFiltros() }}>R&B</ul>
                        </div> 
                    </div>
                </div>

                <hr></hr>

                {/* Precio */}
                <div className="seccion-filtros">
                    <button onClick={() => toggleAcordeon2()} class={"accordion"}>
                        <div className="caja-estilos-filtros">
                            <p>Precio</p><img src={dropDown}/>
                        </div>
                    </button>
                    <div class={acordeon2}>
                        <div className="contenido-caja">  
                                <ul onClick={() => {setBuscador(["10€"]);history.push(`/search?/q=${buscador}`) }}>0€ - 10€</ul>
                                <ul onClick={() => {setBuscador(["20€"]);history.push(`/search?/q=${buscador}`) }}>10€ - 20€</ul>
                                <ul onClick={() => {setBuscador(["50€"]);history.push(`/search?/q=${buscador}`) }}>20€ - 50€</ul>
                                <ul onClick={() => {setBuscador(["100€"]);history.push(`/search?/q=${buscador}`) }}>50€ - 100€</ul>         
                                <ul onClick={() => {setBuscador(["101€"]);history.push(`/search?/q=${buscador}`) }}>+100€</ul> 
                        </div> 
                    </div>
                </div>

                <hr></hr>
                
                {/* BPM */}
                <div className="seccion-filtros">
                    <button onClick={() => toggleAcordeon3()} class={"accordion"}>
                        <div className="caja-estilos-filtros">
                            <p>BPM</p><img src={dropDown}/>
                        </div>
                    </button>
                    <div class={acordeon3}>
                        <div className="contenido-caja">  
                            <ul>75-85</ul>
                            <ul>85-100</ul>
                            <ul>100-120</ul>
                            <ul>120-130</ul>
                            <ul>130-145</ul>
                            <ul>+145</ul>
                        </div> 
                    </div>
                </div>
                </MediaQuery>







                {/*                     MOVIL                     */}

                <MediaQuery maxWidth={1370}>
                    <div className="filtros-movil">
                        <button onClick={() => activarFiltros()}><i class="fas fa-filter"></i>Filtros</button>

                    </div>
                    
                    <div className={filtros}>
                        <i onClick={()=>desactivarFiltros()} className="cerrar far fa-times-circle fa-2x"></i>
                        <h2 className="encabezado-filtros">Filtros</h2>
                        <br></br>
                        <br></br>

                        <div className="seccion-filtros">
                        
                            <button onClick={() => toggleAcordeon1()} class={"accordion"}>
                                <div className="caja-estilos-filtros">
                                    <p>Estilos</p><img src={dropDown}/>
                                </div>
                            </button>
                            <div class={acordeon1}>
                                <div className="contenido-caja">
                                    <ul onClick={() => {setBuscador(["trap"]);desactivarFiltros() }}>Trap</ul>
                                    <ul onClick={() => {setBuscador(["rap"]);desactivarFiltros() }}>Rap</ul>
                                    <ul onClick={() => {setBuscador(["drill"]);desactivarFiltros() }}>Drill</ul>
                                    <ul onClick={() => {setBuscador(["reggaeton"]);desactivarFiltros() }}>Reggaeton</ul>
                                    <ul onClick={() => {setBuscador(["r&b"]);desactivarFiltros() }}>R&B</ul>
                                </div> 
                            </div>
                        </div>

                        <hr></hr>

                        {/* Precio */}
                        <div className="seccion-filtros">
                            <button onClick={() => toggleAcordeon2()} class={"accordion"}>
                                <div className="caja-estilos-filtros">
                                    <p>Precio</p><img src={dropDown}/>
                                </div>
                            </button>
                            <div class={acordeon2}>
                                <div className="contenido-caja">  
                                <ul onClick={() => {setBuscador(["10€"]);history.push(`/search?/q=${buscador}`) }}>0€ - 10€</ul>
                                <ul onClick={() => {setBuscador(["20€"]);history.push(`/search?/q=${buscador}`) }}>10€ - 20€</ul>
                                <ul onClick={() => {setBuscador(["50€"]);history.push(`/search?/q=${buscador}`) }}>20€ - 50€</ul>
                                <ul onClick={() => {setBuscador(["100€"]);history.push(`/search?/q=${buscador}`) }}>50€ - 100€</ul>         
                                <ul onClick={() => {setBuscador(["101€"]);history.push(`/search?/q=${buscador}`) }}>+100€</ul> 
                                </div> 
                            </div>
                        </div>

                        <hr></hr>
                        
                        {/* BPM */}
                        <div className="seccion-filtros">
                            <button onClick={() => toggleAcordeon3()} class={"accordion"}>
                                <div className="caja-estilos-filtros">
                                    <p>BPM</p><img src={dropDown}/>
                                </div>
                            </button>
                            <div class={acordeon3}>
                                <div className="contenido-caja">  
                                    <ul>75-85</ul>
                                    <ul>85-100</ul>
                                    <ul>100-120</ul>
                                    <ul>120-130</ul>
                                    <ul>130-145</ul>
                                    <ul>+145</ul>
                                </div> 
                            </div>
                        </div>

                    </div>
                </MediaQuery>

            </div>


            <div className="superior-all">
                <h1>Top Beats</h1>
                <div className="general-all">
                    
                    {spells.map(spell => (
                    

                            <div /* onClick={(e) => {console.log(e.target.nextElementSibling.children[1].innerText);}}  */ className="beat-container-all">    
                                <div className="caja-cuadrada-all">
                                <img src={play}   
                                    onClick={(e) => {console.log(e.target.nextElementSibling.children[1].innerText);
                                    setGlobalState({beatActivo:e.target.nextElementSibling.children[0].innerText});
                                    setCurrentSong({currentPlaying:e.target.nextElementSibling.children[1].innerText});                            
                                    }} className="playerstop-all" /> 


                                    <div className="info-oculta">
                                        <p>{spell.beatUrl}</p>                              
                                        <p>{spell.name}</p>                                     
                                    </div>



                                    <Link to={`/beat/${spell.identificador}`}>   

                                    <img className="imagen-fondo-beats-all"src={spell.imagenURL}/>

                                    <div className="info-oculta">
                                        <p>{spell.beatUrl}</p> 
                                    </div>
                                    </Link> 

                                </div>

                                <h4>{spell.precio}€</h4>

                                <h2 key={spell.name}>{spell.name}</h2>
                                <Link to={`/profile/${spell.nombreUsuario}`}>
                                    <h3>{spell.nombreUsuario}</h3>
                                </Link>
                            </div>
                        
                    ))}
                </div>

            </div>
            <div className="reproductor-all">
            <Player /> 
            </div>
        </div>
    )
}
