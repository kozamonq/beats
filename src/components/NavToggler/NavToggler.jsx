import React, {useState, useContext} from 'react'
import {Link, useHistory} from 'react-router-dom';
import './NavToggler.css'

// MEDIA QUERY
import { useMediaQuery } from 'react-responsive';
import MediaQuery from 'react-responsive';
import { GlobalSearchContext} from '../../contexts/SearchContext';

export default function NavToggler() {

    let history = useHistory();

    var [toggler, setToggler] = useState("div-oculto-toggler")
    var [overlay, setOverlay] = useState("overlay-nav-toggler")
    




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





    return (

        <div className="contenedor-general-navtoggler">
            <MediaQuery maxWidth={1371}>

            <div className="ham-toggler-div" >
                <i onClick={() => {setToggler("div-oculto-toggler-activo animate__animated animate__slideInUp");
                                    setOverlay("overlay-nav-toggler-activo")}} class="fas fa-bars fa-lg"></i>
            </div>


            <form onSubmit={e => {e.preventDefault();getDatos()}}>
            <div className="buscador-inicio-nav">
                <div class="input-group">
                    <span class="input-group-text" id="basic-addon1"><i class="fas fa-search"></i></span>
                    <input type="text" onChange={e => setPreBuscador(e.target.value)} class="form-control" placeholder="¿Qué estás buscando?" aria-label="Username" aria-describedby="basic-addon1"></input>
                </div>
           </div>
           </form>


        

            <div className={overlay}></div>
            <div className={`${toggler} `}>{/* animate__animated animate__slideInUp */}
                <div className="links">
                    <h2>MENU</h2>
                    <i onClick={() => { setToggler("div-oculto-toggler animate__animated animate__slideOutUp");
                                        setOverlay("overlay-nav-toggler")}} class="cruz far fa-times-circle fa-lg"></i>
                    <hr></hr>
                    <br></br> 
                    <h3><Link to="/all-beats">Beats</Link></h3>
                    <h3><Link to="/beatmakers">Beat Makers</Link></h3>
                    <h3><Link to="/subir-beat">Publica tus Beats</Link></h3>
                    <br></br>
                    <h3><Link to="/all-beats">Contacto</Link></h3>
                </div>

            </div>
            </MediaQuery>
        </div>
    )
}
