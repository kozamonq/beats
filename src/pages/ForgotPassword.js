import React, {useRef, useState} from 'react'
import './ForgotPassword.css'
import logo from '../components/logo-blanco.png'
import { AuthProvider, useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'


export default function ForgotPassword() {

    const emailRef = useRef()
    const { resetPassword } = useAuth()
   /*  const { registro } = useAuth() */
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
  

    async function handleSubmit(e) {
        e.preventDefault()

       
        try{
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage(<div className="error animate__animated animate__bounceIn">Hemos enviado instrucciones a tu correo</div>)
        } catch {
            setError(  <div className="error animate__animated animate__bounceIn">Error al recuperar la contraseña</div>)
        }

        setLoading(false)
    }
   
    return (
        
        <div className="superior">
            <div className="inicio-sesion">
                
                <Link to="/"><img src={logo}></img></Link>
                <h2>Recuperar Contraseña</h2>
           
              
                    {error && <p>{error}</p>}
                    {message && <p>{message}</p>}

                
                
                <form className="formulario" onSubmit={handleSubmit}>
                    <div className="introducir-datos">
                        
                        <input id="email"type="text" ref={emailRef} placeholder="   Introduce tu email"className="usuario-email"></input>
                       
                        <button disabled={loading} type="submit" className="boton-sesion">Recuperar Contraseña</button>

                        <h6 className="pregunta">¿Aún no estás registrado? <Link to="/registro">Regístrate</Link></h6>
                        <h6 className="pregunta"><Link to="/inicio-sesion">Login</Link></h6>
                    </div>
                </form>
            </div>


            
        </div>
        
    )
}
