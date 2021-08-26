//PANEL
import React, {useState, useEffect} from 'react'
import {useAuth} from '../contexts/AuthContext'
import {Link, useHistory} from 'react-router-dom'
import { Navbar } from '../components/Navbar'


import { db, auth } from '../firebase';

import './Dashboard.css'
import { Footer } from '../components/Footer'

import {firestore} from '../firebase';
import firebase from '../firebase'



export default function Dashboard() {
    const [error, setError] = useState("")
    const {currentUser, logout} = useAuth()
    const history = useHistory()
    const usuarioID =currentUser.uid


    const [usuario, setUsuario] = useState("Usuario")

    const [avatar, setAvatar] = useState("")

    useEffect(() => {

    },[usuario])

        const getUser = async () => {
        const userDocument = await firebase.firestore().collection(`users`).doc(usuarioID).get();
        console.log(userDocument.data())
        const dataUsuario = userDocument.data();
        const nombreUsario=dataUsuario.displayName; //
        setUsuario(nombreUsario)// SE MUESTRA EL USUARIO
        console.log(nombreUsario)

        setAvatar(userDocument.data().avatar)

        } 
        getUser()





    async function handleLogOut () {
        setError('')
        try{
            await logout()
            history.push('/')
        }catch{
            setError('Failed to log out')
        }
    }
    
    
    return (
        <div>
            <Navbar />
            
            <div className="container-general">
                <div className="botones-generales">
                    
                <Link to={`/profile/${usuario}`}> <button className="perfil">Perfil</button></Link>
                </div>


                <h1>Panel de Usuario</h1>
                <hr></hr>
                {error && <p>{error}</p>}
                <div className="datos-cuenta">
                    <strong>Email: </strong>{currentUser.email}
                    <Link to="/update-profile" className="actualizar">Actualizar<br></br></Link>

                    <br></br>

                    <strong>Contraseña: </strong> ****
                    <Link to="/forgot-password" className="actualizar">Cambiar Contraseña<br></br></Link>
                    
                    <br></br>

                    <strong>Usuario: </strong>{usuario} {/* tenemos que lograr mostrar aki el nombre, cogiendo los datos de firestore DB (firebase) */}<br></br>

                    <br></br>

                    <strong>Avatar:</strong> <Link to="/update-avatar" className="actualizar">Cambiar Avatar</Link>

                    <br></br>
                    <img className="avatar-dashboard"src={avatar}></img>
                    <br></br>
                    <button variant="link" className="cerrar-sesion" onClick={handleLogOut}>Cerrar Sesión</button>
                </div>
                <br></br>
               
                <div className="botones-generales">
                    <Link to="/beats-adquiridos"><button className="adquiridos">Beats Adquiridos</button></Link>
                    <Link to="/en-venta"><button className="en-venta">Beats en Venta</button></Link>
                   
                </div>
               
            </div>
            <div className="footer">
                <Footer />
            </div>
        </div>
    )
}
