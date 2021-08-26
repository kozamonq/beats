import React, {useRef, useState} from 'react'
import './Registro.css'
import logo from '../components/logo-blanco.png'
import { AuthProvider, useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'


export default function UpdateProfile() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {currentUser, updatePassword, updateEmail} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== 
        passwordConfirmRef.current.value){
            return setError('Las contraseñas no coinciden. Inténtalo de nuevo.')
        }


        const promises = []
        setLoading(true)
        setError('')
        
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            history.push('/panel')
        }).catch(() => {
            setError()
        }).finally(() => {
            setLoading(false)
        })



        
        
      
    }
   
    return (
        
        <div>
            <div className="inicio-sesion">
            <Link to="/"><img src={logo}></img></Link>
                {/* <h2>Inicia Sesión para continuar</h2> */}
                <h2>Update Profile</h2>
           

                {error && <p>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="introducir-datos">

                        <h5>Email</h5>
                        <input id="email" type="text" 
                        ref={emailRef} 
                        placeholder="   Introduce tu email"
                        className="usuario-email" 
                        defaultValue={currentUser.email}></input>
                        
                        <h5>Contraseña</h5>
                        <input id="password" type="password" 
                        ref={passwordRef} 
                        placeholder="   Déjalo vacío si no quieres cambios" 
                        className="contrasena"></input>

                        <h5>Confirmar Contraseña</h5>
                        <input id="password-confirm" type="password" 
                        ref={passwordConfirmRef} 
                        placeholder="   Déjalo vacío si no quieres cambios" 
                        className="contrasena"></input>
                        
                        <button disabled={loading} type="submit" className="boton-sesion">Actualizar Datos</button>
                    
                        <h6 className="pregunta"><Link to="/panel">Cancelar</Link></h6>
                        <h6><Link to="/forgot-password">¿Olvidase tu contraseña?</Link></h6>
                    
                    
                    </div>
                </form>
            </div>


            
        </div>
        
    )
}
