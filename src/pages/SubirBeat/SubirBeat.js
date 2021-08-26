import React, {Component, useState, useEffect} from 'react';
import firebase from 'firebase';

/* import Dots from 'react-activity/lib/Dots';
import 'react-activity/lib/Dots/Dots.css'; */

import {UploadFile} from '../../components/UploadFile/UploadFile'
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

import './SubirBeat.css'
import { Link } from 'react-router-dom';

import {useAuth} from '../../contexts/AuthContext'





export default function SubirBeat() {

    // UID DEL USUARIO
    const {currentUser} = useAuth()
    const usuarioID =currentUser.uid 

    const [datosUsuario, setDatosUsuario] = useState()

    const [confirmado, setConfirmado] = useState("div-terminos-oculto")


    
        const getUser = async () => {
            const userDocument = await firebase.firestore().collection(`users`).doc(usuarioID).get();
            const dataUsuario = userDocument.data();
            console.log(dataUsuario)


           /*  setDatosUsuario(userDocument.data()) */

            console.log(dataUsuario.terminosConfirmados)

            if(dataUsuario.terminosConfirmados == "no"){
                setConfirmado("div-terminos-activado")
                }else if (dataUsuario.terminosConfirmados == "yes"){
                    setConfirmado("div-terminos-oculto")
                } 
          
        } 
        getUser()





    console.log(datosUsuario)
    console.log(confirmado)

    const aceptarTerminos = async() => {
        const userDocument = await firebase.firestore().collection(`users`).doc(usuarioID).update({
            terminosConfirmados: "yes"
        });
        const dataUsuario = userDocument.data();


    }





    return ( 
        <div>
            <div className={confirmado}>

                <div className="mensaje-terminos">
                    <h2>Términos y Condiciones</h2>
                    <h3>Antes de subir tu primer Beat, necesitas confirmar nuestros términos y condiciones</h3>
                   
                    <button className="aceptar-terminos" onClick={() => aceptarTerminos()}>Aceptar Términos</button>
                    <br></br>
                    <Link to="/terminos">Ver Términos y Condiciones</Link>
                </div>

            </div>
            <Navbar />
            <div className="container-maestro">
             <h2>Selecciona tu Beat</h2>
             <br></br> <br></br>
            <UploadFile />
            <br></br>

            <div className="instrucciones">
                {/* <h4>Instrucciones</h4>
                <h5>Selecciona tu Beat (solo archivos .wav)</h5>
                <h5>Escribe el Nombre de tu Beat</h5>
                <h5>Espera 2 segundos (por si las moscas), y presiona "Subir Beat"</h5> */}
               {/*  <h4>Normas</h4>
                <h5>Nunca repitas el nombre de tus Beats</h5>
                <h5>Los Beats que subas, han de estar en perfectas condiciones</h5>
                <h5>Sube tus Beats en formato <strong>'.wav'. Cualquier Beat que no esté en ese formato será elminado</strong></h5>
                <Link to="/condiciones-licencias"><p>Condiciones Licencias</p></Link> */}
            </div>


            </div>
            <Footer />
        </div>
    )
}
