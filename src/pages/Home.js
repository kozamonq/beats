import React, {useState, useContext, useEffect} from 'react';
import {useAuth} from '../contexts/AuthContext'
import {Link, useHistory} from 'react-router-dom';
import './Home.css';
import '../components/CajaBeats.css';
import { Navbar } from '../components/Navbar'
import CajaBeats from '../components/CajaBeats';
import { Beatmakers } from '../components/Beatmakers';
import { Generos } from '../components/Generos';
import { Footer } from '../components/Footer';

import estilos from '../database/Estilos/Estilos.json';
import firebase, { db, auth } from '../firebase'

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

// Foto Portada
import portada from './portada.jpeg'
import portada1 from './portada1.jpg'
import portada2 from './portada2.jpg'


// import Swiper JS
import {Swiper,SwiperSlide} from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper'
// import Swiper styles
import 'swiper/swiper-bundle.css';




import {Player } from '../components/AudioPlayer';
import { GlobalStateContext } from '../contexts/GlobalState';
import { GlobalSongContext} from '../contexts/CurrentPlaying';
import { GlobalSearchContext} from '../contexts/SearchContext';

import play from '../components/circuloplay.png'
import pause from '../components/circulostop.png'
import { Switch } from 'react-router';
import NavToggler from '../components/NavToggler/NavToggler';


// MEDIA QUERY
import { useMediaQuery } from 'react-responsive';
import MediaQuery from 'react-responsive';


SwiperCore.use([Navigation])
var searchIcon = <i class="fas fa-search"></i>;




export function Home(props) {
    
    const {history} = props;

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


////////////////////////////////////////////////////////////////////////

 
    const datosArray = []
    const [datosGenerales, setDatosGenerales] = useState([])


////////////////////////////////////////////////////////////////////////

    // TOP BEATS
    const [spells, setSpells] = useState([])

    useEffect(()=> {
        const fetchData = async () => {
            const db = firebase.firestore()
            const data = await db.collection("beatsVenta").get()
            setSpells(data.docs.map(doc => doc.data()))


        }
        fetchData()
    },[])

    /* console.log(spells) */
////////////////////////////////////////////////////////////////////////

    // TOP BEATMAKERS
    const [beatmakers, setBeatmakers] = useState([])

    useEffect(()=> {
        const fetchData = async () => {
            const db = firebase.firestore()
            const data = await db.collection("users").where('beatmaker','==','yes').get()
            setBeatmakers(data.docs.map(doc => doc.data()))
           

        }
        fetchData()
    },[])
    


////////////////////////////////////////////////////////////////////////

const [estadoReproductor, setEstadoReproductor] = useState({
    toggleActive: null,
    objects: spells
})

const [imagenReproductor, setImagenReproductor] = useState(play)


const cambiarReproductor = (index) => {
   
   
    
}


function toggleActive(index) {
    setEstadoReproductor({...estadoReproductor, activeObject: estadoReproductor.objects[index] });
}

function toggleActiveStyles(index) {
    if(estadoReproductor.objects[index] === estadoReproductor.activeObject) {
        return pause;
    } else {
        return play;
    }
}





// BUSCADOR //////////////////////////////////////////////

const [preBuscador, setPreBuscador] = useState()
const [buscador, setBuscador] = useContext(GlobalSearchContext);


/*  console.log(buscador) */

const getDatos= async () => {
    const datosBruto = preBuscador.toLowerCase();
    const datosFiltrados = datosBruto.split(" ");
    console.log(datosFiltrados)

    setBuscador(datosFiltrados);

    await history.push(`/search?q=${datosFiltrados}`);
}




///////////////////////////////////////////////////////////////////////////////

const [soundListening, setSoundListening] = useState("soundlistening1")





  
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <div>
            <Navbar />
            <NavToggler />
           
            <div className="imagen-inicio">

                <MediaQuery maxWidth={1370}>
                    <img width="100%" opacity="" src={portada} alt="hola"></img>
                </MediaQuery>

                <MediaQuery minWidth={1371}>
                    <img width="100%" opacity="" src={portada2} alt="hola"></img>
                </MediaQuery>



                <h2>#1 MARKETPLACE DE HABLA HISPANA</h2>
            </div>

            <form onSubmit={e => {e.preventDefault();getDatos()}}>
            <div className="buscador-inicio">
                <div class="input-group mb-3 p-3">
                    <span class="input-group-text" id="basic-addon1">{searchIcon}</span>
                    <input type="text" onChange={e => setPreBuscador(e.target.value)} class="form-control" placeholder="Prueba con 'Trap Beat' o 'Reggaeton Beat'" aria-label="Username" aria-describedby="basic-addon1"></input>
                </div>
            </div>
            </form>





{/* ////////////////////////////////////////////////////////////////////////////// */}

            {/*  TOP BEATS DE LA SEMANA   */}      
           <div className="top-beats-semana animate__animated animate__fadeInRight animate__slow">
               {/* {DatosGlobales()} */}
                <h2>Top Beats de la Semana</h2>
                {/*  SWIPER   */}   

                <MediaQuery maxWidth={580}>   
                 <Swiper
                spaceBetween={0}
                
                slidesPerView={1.8}       
                >
                
 
                            {spells.map((spell, index) => (
                                <SwiperSlide>
                                    
                                    <div onClick={(e) => console.log(e)} className="beat-container">    
                                        
                                        <div  className="caja-cuadrada">

                                           
                                                <img 
                                                key={index}
                                                tabIndex="1"
                                                onClick={(e) => {
                                                setGlobalState({beatActivo:e.target.nextElementSibling.children[0].innerText});
                                                setCurrentSong({currentPlaying:e.target.nextElementSibling.children[1].innerText}); 
                                                }}


                                                src={imagenReproductor}
                                                className="playerstop" /> 

                                                <div className="info-oculta">
                                                    <p>{spell.beatUrl}</p>
                                                    <p>{spell.name}</p> 
                                                </div>

                                           
                                          

                                     


                                            <div className={soundListening} >
                                                <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                                            </div>
                                           
                                           
                                           
                                            <div className="info-oculta">
                                                <p>{spell.beatUrl}</p>
                                                <p>{spell.name}</p> 
                                            </div>



                                            <Link to={`/beat/${spell.identificador}`}>          
                                            {/*  <a href={`/beat/${spell.identificador}`}> */}
                                                <img className="imagen-fondo-beats"src={spell.imagenURL}/>
                                                
                                                <div className="info-oculta">
                                                    <p>{spell.beatUrl}</p> 
                                                </div>
                                                
                                                
                                                
                                            {/*    </a> */}
                                            </Link> 
                                        </div>
                                        <h2 key={spell.name}>{spell.name}</h2>
                                        <h3>{spell.nombreUsuario}</h3>
                                    </div>
                                   
                                </SwiperSlide>
                            ))}

              </Swiper>   
              <div className="ver-mas-div">    
                        <Link to="/all-beats">    
                                    
                            <a className="ver-mas">Ver todos los beats...</a>  
                                                        
                        </Link>
                    </div>  
              </MediaQuery>
            
                <MediaQuery minWidth={581} maxWidth={800}>   
                    <Swiper
                    spaceBetween={2}
                    
                    slidesPerView={3}       
                    >
                    
    
                                {spells.map((spell, index) => (
                                    <SwiperSlide>
                                        
                                        <div onClick={(e) => console.log(e)} className="beat-container">    
                                            
                                            <div className="caja-cuadrada">
                                                
                                            <img /* src={estadoReproductor}  */  
                                            key={index}

                                                onClick={(e) => {
                                                setGlobalState({beatActivo:e.target.nextElementSibling.children[0].innerText});
                                                setCurrentSong({currentPlaying:e.target.nextElementSibling.children[1].innerText});                            
                                                }}
                                            
                                            
                                                
                                                                    
                                        
                                                src={toggleActiveStyles(index)}
                                                
                                                className="playerstop" /> 
                                                <div className="info-oculta">
                                                    <p>{spell.beatUrl}</p>
                                                    <p>{spell.name}</p> 
                                                </div>



                                                <Link to={`/beat/${spell.identificador}`}>          
                                                {/*  <a href={`/beat/${spell.identificador}`}> */}
                                                    <img className="imagen-fondo-beats"src={spell.imagenURL}/>
                                                    
                                                    <div className="info-oculta">
                                                        <p>{spell.beatUrl}</p> 
                                                    </div>
                                                    
                                                    
                                                    
                                                {/*    </a> */}
                                                </Link> 
                                            </div>
                                            <h2 key={spell.name}>{spell.name}</h2>
                                            <h3>{spell.nombreUsuario}</h3>
                                        </div>
                                    
                                    </SwiperSlide>
                                ))}

                </Swiper>   
                <div className="ver-mas-div">    
                        <Link to="/all-beats">    
                                    
                            <a className="ver-mas">Ver todos los beats...</a>  
                                                        
                        </Link>
                    </div>  
                </MediaQuery>
               
                <MediaQuery minWidth={800} maxWidth={1080}>   
                 <Swiper
                spaceBetween={0}
                
                slidesPerView={4.2}       
                >
                
 
                            {spells.map((spell, index) => (
                                <SwiperSlide>
                                    
                                    <div onClick={(e) => console.log(e)} className="beat-container">    
                                        
                                        <div className="caja-cuadrada">
                                            
                                           <img /* src={estadoReproductor}  */  
                                           key={index}

                                            onClick={(e) => {
                                            setGlobalState({beatActivo:e.target.nextElementSibling.children[0].innerText});
                                            setCurrentSong({currentPlaying:e.target.nextElementSibling.children[1].innerText});                            
                                            }}
                                        
                                        
                                            
                                                                   
                                     
                                            src={imagenReproductor}
                                            
                                            className="playerstop" /> 
                                            <div className="info-oculta">
                                                <p>{spell.beatUrl}</p>
                                                <p>{spell.name}</p> 
                                            </div>



                                            <Link to={`/beat/${spell.identificador}`}>          
                                            {/*  <a href={`/beat/${spell.identificador}`}> */}
                                                <img className="imagen-fondo-beats"src={spell.imagenURL}/>
                                                
                                                <div className="info-oculta">
                                                    <p>{spell.beatUrl}</p> 
                                                </div>
                                                
                                                
                                                
                                            {/*    </a> */}
                                            </Link> 
                                        </div>
                                        <h2 key={spell.name}>{spell.name}</h2>
                                        <h3>{spell.nombreUsuario}</h3>
                                    </div>
                                   
                                </SwiperSlide>
                            ))}

              </Swiper>   
                    <div className="ver-mas-div">    
                        <Link to="/all-beats">    
                                    
                            <a className="ver-mas">Ver todos los beats...</a>  
                                                        
                        </Link>
                    </div>  
              </MediaQuery>
            
                <MediaQuery minWidth={1081} maxWidth={1370} >   
                    <Swiper
                    spaceBetween={0}
                    
                    slidesPerView={5}       
                    >
                    
    
                                {spells.map((spell, index) => (
                                    <SwiperSlide>
                                        
                                        <div onClick={(e) => console.log(e)} className="beat-container">    
                                            
                                            <div className="caja-cuadrada">
                                                
                                            <img /* src={estadoReproductor}  */  
                                            key={index}

                                                onClick={(e) => {
                                                setGlobalState({beatActivo:e.target.nextElementSibling.children[0].innerText});
                                                setCurrentSong({currentPlaying:e.target.nextElementSibling.children[1].innerText});                            
                                                }}
                                            
                                            
                                                
                                                                    
                                        
                                                src={imagenReproductor}
                                                
                                                className="playerstop" /> 
                                                <div className="info-oculta">
                                                    <p>{spell.beatUrl}</p>
                                                    <p>{spell.name}</p> 
                                                </div>



                                                <Link to={`/beat/${spell.identificador}`}>          
                                                {/*  <a href={`/beat/${spell.identificador}`}> */}
                                                    <img className="imagen-fondo-beats"src={spell.imagenURL}/>
                                                    
                                                    <div className="info-oculta">
                                                        <p>{spell.beatUrl}</p> 
                                                    </div>
                                                    
                                                    
                                                    
                                                {/*    </a> */}
                                                </Link> 
                                            </div>
                                            <h2 key={spell.name}>{spell.name}</h2>
                                            <h3>{spell.nombreUsuario}</h3>
                                        </div>
                                    
                                    </SwiperSlide>
                                ))}

                </Swiper> 
                    <div className="ver-mas-div">    
                    <Link to="/all-beats">    
                                
                        <a className="ver-mas">Ver todos los beats...</a>  
                                                    
                    </Link>
                    </div>  
                </MediaQuery>            
            
                <MediaQuery minWidth={1371} maxWidth={3000} >   
                    <Swiper
                    spaceBetween={0}
                    
                    slidesPerView={3.9}

                          
                    >
                    
    
                                {spells.map((spell, index) => (
                                    <SwiperSlide>
                                        
                                        <div className="separador-swiper">


                                        <div onClick={(e) => console.log(e)} className="beat-container">    
                                            
                                            <div className="caja-cuadrada">
                                                
                                            <img /* src={estadoReproductor}  */  
                                            key={index}

                                                onClick={(e) => {
                                                setGlobalState({beatActivo:e.target.nextElementSibling.children[0].innerText});
                                                setCurrentSong({currentPlaying:e.target.nextElementSibling.children[1].innerText});                            
                                                console.log(index);

                                            }}
                                               
                                            
                                                
                                                                    
                                        
                                                src={imagenReproductor}
                                                
                                                className="playerstop" /> 
                                                <div className="info-oculta">
                                                    <p>{spell.beatUrl}</p>
                                                    <p>{spell.name}</p> 
                                                </div>



                                                <Link to={`/beat/${spell.identificador}`}>          
                                                {/*  <a href={`/beat/${spell.identificador}`}> */}
                                                    <img className="imagen-fondo-beats"src={spell.imagenURL}/>
                                                    
                                                    <div className="info-oculta">
                                                        <p>{spell.beatUrl}</p> 
                                                    </div>
                                                    
                                                    
                                                    
                                                {/*    </a> */}
                                                </Link> 
                                            </div>
                                            <h2 key={spell.name}>{spell.name}</h2>
                                            <div className="link-profile">
                                            <h3><Link to={`/profile/${spell.nombreUsuario}`}>{spell.nombreUsuario}</Link></h3>
                                            </div>
                                        </div>
                                        </div>
                                    </SwiperSlide>
                                ))}

                </Swiper>   
            
            
            <div className="ver-mas-div">    
                <Link to="/all-beats">    
                            
                    <a className="ver-mas">Ver todos los beats...</a>  
                                                   
                </Link>
            </div> 
                </MediaQuery>            
            
            
            </div>



{/* ////////////////////////////////////////////////////////////////////////////// */}

            {/*  TOP BEATMAKERS   */}  
            <div className="top-beatmakers">
                <h2>Mejores Beatmakers</h2>
                {/*  SWIPER   */}    


                <MediaQuery maxWidth={580}>  
                <Swiper
                spaceBetween={0}
                slidesPerView={1.8}       
                >
                    {beatmakers.map((beatmaker, index) => (
                        <SwiperSlide>


                                <div onClick={(e) => console.log(e)} className="beatmaker-container">
                                    <Link to={`/profile/${beatmaker.displayName}`}>  
                                        
                                        <div className="caja-cuadrada-beatmaker">          
                                            <img className="imagen-fondo-beatmakers"src={beatmaker.avatar}/>  
                                        </div> 

                                        <h3>{beatmaker.displayName}</h3>   

                                    </Link>
                                </div>



                        </SwiperSlide>

                    ))}

                </Swiper>
                </MediaQuery>

                <MediaQuery minWidth={581} maxWidth={800}>  
                <Swiper
                spaceBetween={2}
                slidesPerView={3}       
                >
                    {beatmakers.map((beatmaker, index) => (
                        <SwiperSlide>


                                <div onClick={(e) => console.log(e)} className="beatmaker-container">
                                    <Link to={`/profile/${beatmaker.displayName}`}>  
                                        
                                        <div className="caja-cuadrada-beatmaker">          
                                            <img className="imagen-fondo-beatmakers"src={beatmaker.avatar}/>  
                                        </div> 

                                        <h3>{beatmaker.displayName}</h3>   

                                    </Link>
                                </div>



                        </SwiperSlide>

                    ))}

                </Swiper>
                </MediaQuery>

                <MediaQuery minWidth={800} maxWidth={1080}>  
                <Swiper
                spaceBetween={0}
                slidesPerView={4.2}       
                >
                    {beatmakers.map((beatmaker, index) => (
                        <SwiperSlide>


                                <div onClick={(e) => console.log(e)} className="beatmaker-container">
                                    <Link to={`/profile/${beatmaker.displayName}`}>  
                                        
                                        <div className="caja-cuadrada-beatmaker">          
                                            <img className="imagen-fondo-beatmakers"src={beatmaker.avatar}/>  
                                        </div> 

                                        <h3>{beatmaker.displayName}</h3>   

                                    </Link>
                                </div>



                        </SwiperSlide>

                    ))}

                </Swiper>
                </MediaQuery>

                <MediaQuery minWidth={1081} maxWidth={1370}>  
                <Swiper
                spaceBetween={0}
                slidesPerView={5}       
                >
                    {beatmakers.map((beatmaker, index) => (
                        <SwiperSlide>


                                <div onClick={(e) => console.log(e)} className="beatmaker-container">
                                    <Link to={`/profile/${beatmaker.displayName}`}>  
                                        
                                        <div className="caja-cuadrada-beatmaker">          
                                            <img className="imagen-fondo-beatmakers"src={beatmaker.avatar}/>  
                                        </div> 

                                        <h3>{beatmaker.displayName}</h3>   

                                    </Link>
                                </div>



                        </SwiperSlide>

                    ))}

                </Swiper>
                </MediaQuery>

                <MediaQuery minWidth={1371} maxWidth={3000}>  
                <Swiper
                spaceBetween={0}
                slidesPerView={3.9}       
                >
                    {beatmakers.map((beatmaker, index) => (
                        <SwiperSlide>


                                <div onClick={(e) => console.log(e)} className="beatmaker-container">
                                    <Link to={`/profile/${beatmaker.displayName}`}>  
                                        
                                        <div className="caja-cuadrada-beatmaker">          
                                            <img className="imagen-fondo-beatmakers"src={beatmaker.avatar}/>  
                                        </div> 

                                        <h3>{beatmaker.displayName}</h3>   

                                    </Link>
                                </div>



                        </SwiperSlide>

                    ))}

                </Swiper>
                </MediaQuery>


                
            </div>

{/* ////////////////////////////////////////////////////////////////////////////// */}
          
            {/*  TOP BEATMAKERS   */}  
            <div className="top-beatmakers">
                <h2>Top Estilos</h2>
                {/*  SWIPER   */}    


                <MediaQuery maxWidth={580}>  
                <Swiper
                spaceBetween={0}
                slidesPerView={1.8}       
                >
                    {estilos.map((estilo, index) => (
                        <SwiperSlide>


                                <div onClick={() => {setBuscador([estilo.nombre.toLocaleLowerCase()]);history.push(`/search?/q=${buscador}`)}} className="beatmaker-container">
                                    {/* <Link to={`/search?/q=${estilo.nombre}`}>  */}
                                        
                                        <div className="caja-cuadrada-beatmaker">          
                                            <img className="imagen-fondo-beatmakers"src={estilo.imagen}/>  
                                        </div> 

                                        <h3>{estilo.nombre}</h3>   

                                   {/*  </Link> */}
                                </div>



                        </SwiperSlide>

                    ))}

                </Swiper>
                </MediaQuery>

                <MediaQuery minWidth={581} maxWidth={800}>  
                <Swiper
                spaceBetween={2}
                slidesPerView={3}       
                >
                    {estilos.map((estilo, index) => (
                        <SwiperSlide>


                                <div onClick={() => {setBuscador([estilo.nombre.toLocaleLowerCase()]);history.push(`/search?/q=${buscador}`)}} className="beatmaker-container">
                                    {/* <Link to={`/search?/q=${estilo.nombre}`}>  */}
                                        
                                        <div className="caja-cuadrada-beatmaker">          
                                            <img className="imagen-fondo-beatmakers"src={estilo.imagen}/>  
                                        </div> 

                                        <h3>{estilo.nombre}</h3>   

                                   {/*  </Link> */}
                                </div>



                        </SwiperSlide>

                    ))}

                </Swiper>
                </MediaQuery>

                <MediaQuery minWidth={800} maxWidth={1080}>  
                <Swiper
                spaceBetween={0}
                slidesPerView={4.2}       
                >
                    {estilos.map((estilo, index) => (
                        <SwiperSlide>


                                <div onClick={() => {setBuscador([estilo.nombre.toLocaleLowerCase()]);history.push(`/search?/q=${buscador}`)}} className="beatmaker-container">
                                    {/* <Link to={`/search?/q=${estilo.nombre}`}>  */}
                                        
                                        <div className="caja-cuadrada-beatmaker">          
                                            <img className="imagen-fondo-beatmakers"src={estilo.imagen}/>  
                                        </div> 

                                        <h3>{estilo.nombre}</h3>   

                                   {/*  </Link> */}
                                </div>



                        </SwiperSlide>

                    ))}

                </Swiper>
                </MediaQuery>

                <MediaQuery minWidth={1081} maxWidth={1370}>  
                <Swiper
                spaceBetween={0}
                slidesPerView={5}       
                >
                    {estilos.map((estilo, index) => (
                        <SwiperSlide>


                                <div onClick={() => {setBuscador([estilo.nombre.toLocaleLowerCase()]);history.push(`/search?/q=${buscador}`)}} className="beatmaker-container">
                                    {/* <Link to={`/search?/q=${estilo.nombre}`}>  */}
                                        
                                        <div className="caja-cuadrada-beatmaker">          
                                            <img className="imagen-fondo-beatmakers"src={estilo.imagen}/>  
                                        </div> 

                                        <h3>{estilo.nombre}</h3>   

                                   {/*  </Link> */}
                                </div>



                        </SwiperSlide>

                    ))}

                </Swiper>
                </MediaQuery>

                <MediaQuery minWidth={1371} maxWidth={3000}>  
                <Swiper
                spaceBetween={0}
                slidesPerView={3.9}       
                >
                    {estilos.map((estilo, index) => (
                        <SwiperSlide>


                                <div onClick={() => {setBuscador([estilo.nombre.toLocaleLowerCase()]);history.push(`/search?/q=${buscador}`)}} className="beatmaker-container">
                                    {/* <Link to={`/search?/q=${estilo.nombre}`}>  */}
                                        
                                        <div className="caja-cuadrada-beatmaker">          
                                            <img className="imagen-fondo-beatmakers"src={estilo.imagen}/>  
                                        </div> 

                                        <h3>{estilo.nombre}</h3>   

                                   {/*  </Link> */}
                                </div>



                        </SwiperSlide>

                    ))}

                </Swiper>
                </MediaQuery>

                
            </div>

            

            <div className="reproductor">
                <Player /> 
            </div>


            {/*   <Footer/> */}
            <div className="footer-provisional"></div>
        </div>
    )
};

