import React, {useState, useEffect} from 'react'
import './UpdateAvatar.css'

import {useAuth} from '../../contexts/AuthContext'
import firebase from '../../firebase'
import app from '../../firebase'

import {Link, useHistory} from 'react-router-dom'


const db = app.firestore()

export default function UpdateAvatar() {

    const history = useHistory()



    const [fileUrl, setFileUrl] = useState(null) 


    // UID DEL USUARIO
    const {currentUser} = useAuth()
    const usuarioID =currentUser.uid 
      
    const [usuario, setUsuario] = useState("Usuario")
  
    useEffect(() => {
    },[usuario])
      
  
  
    
    const getUser = async () => {
        const userDocument = await firebase.firestore().collection(`users`).doc(usuarioID).get();
        
        const dataUsuario = userDocument.data();
        const nombreUsario = dataUsuario.displayName; //
        setUsuario(nombreUsario)// SE MUESTRA EL USUARIO
         
    } 
    getUser()





    // imagen
    const onFileChange = async (e) => {
        const userDocument = await firebase.firestore().collection(`users`).doc(usuarioID).get();
        
        const dataUsuario = userDocument.data();
        const nombreUsario = dataUsuario.displayName; 


        const file = e.target.files[0]
        const storageRef = app.storage().ref(`Beats/${nombreUsario}`)   
        const fileRef = storageRef.child(file.name)                                
        await fileRef.put(file)                                                     
        setFileUrl(await fileRef.getDownloadURL())
        
        
    }



    const onSubmit = async (e) => {
        e.preventDefault()


        db.collection('users/').doc(usuarioID).update({
            avatar: fileUrl
           
        })
       

        await console.log('archivo subido correctamente')
        await alert('Avatar actualizado correctamente!')

        history.push('/panel') 

    }





    return (
        <div className="container-avatar-general">
            <form onSubmit={onSubmit}>
                <h2>Actualizar Avatar</h2>

                <input type='file' id='select-avatar' className="input-avatar" onChange={onFileChange}></input>
                <label for="select-avatar" className="subir-avatar">Selecciona tu Avatar</label>
                <br></br>



                <button >Actualizar</button>


            </form>


           
            <img className="imagen-avatar" src={fileUrl}></img>
        </div>
    )
}
