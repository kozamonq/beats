import React, {useState, useEffect} from 'react';
import './UploadFile.css'
import app from '../../firebase'
import {useAuth} from '../../contexts/AuthContext'
import {Link, useHistory} from 'react-router-dom'
import firebase from '../../firebase'




import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

var crypto = require("crypto");


const db = app.firestore()

export function UploadFile() {
   
    
    const history = useHistory()
                          
    const [fileUrl, setFileUrl] = React.useState(null) 
    const [fileUrl2, setFileUrl2] = React.useState(null)
    const [fileUrlWav, setFileUrlWav] = React.useState(null)   
      

    const [beatSubido, setBeatSubido] = useState("")            
    useEffect(() => {                                                                                                   
    },[beatSubido])                                             
      
                                                         
    const [beatCargado, setBeatCargado] = useState("")          
    useEffect(() => {                                                                                               
    },[beatCargado])    


    const [beatCargadoWav, setBeatCargadoWav] = useState("")       
    useEffect(() => {                                                                                               
    },[beatCargadoWav])    



    const [imagenCargado, setImagenCargado] = useState("")          
    useEffect(() => {                                                                                             
    },[imagenCargado])    
    

    const [loading, setLoading] = useState("") 
    const color = useState("#ffffff");

    useEffect(() => {

    }, [loading])



    // UID DEL USUARIO
    const {currentUser} = useAuth()
    const usuarioID =currentUser.uid 
    
    const [usuario, setUsuario] = useState("Usuario")

    useEffect(() => {
    },[usuario])
    


  
    const getUser = async () => {
        const userDocument = await firebase.firestore().collection(`users`).doc(usuarioID).get();
       /*  console.log(userDocument.data()) */
        const dataUsuario = userDocument.data();
        const nombreUsario = dataUsuario.displayName; //
        setUsuario(nombreUsario)// SE MUESTRA EL USUARIO
        /* console.log(nombreUsario) */
    } 
    getUser()
    



    // audio
    const onFileChange = async (e) => {

        const userDocument = await firebase.firestore().collection(`users`).doc(usuarioID).get();
        /*  console.log(userDocument.data()) */
         const dataUsuario = userDocument.data();
         const nombreUsario = dataUsuario.displayName; //


        const file = e.target.files[0]
        const storageRef = app.storage().ref(`Beats/${nombreUsario}/BeatsSubidos`)   // si en vez de crear una carpeta (en Storage) con el ID del usuario, queremos
        const fileRef = storageRef.child(file.name)                  // crear una carpeta con el Nombre del usuario, deberemos remplazar
        await fileRef.put(file)                                       // el campo ${usuarioID} por ${nombreUsuario}
        setFileUrl(await fileRef.getDownloadURL())

        setBeatCargado(file.name)
        setLoading("")
    }


     // audio WAV
     const onFileChangeWav = async (e) => {

        const userDocument = await firebase.firestore().collection(`users`).doc(usuarioID).get();
        /*  console.log(userDocument.data()) */
         const dataUsuario = userDocument.data();
         const nombreUsario = dataUsuario.displayName; //


        const file = e.target.files[0]
        const storageRef = app.storage().ref(`Beats/${nombreUsario}/BeatsSubidos`)   // si en vez de crear una carpeta (en Storage) con el ID del usuario, queremos
        const fileRef = storageRef.child(file.name)                  // crear una carpeta con el Nombre del usuario, deberemos remplazar
        await fileRef.put(file)                                       // el campo ${usuarioID} por ${nombreUsuario}
        setFileUrlWav(await fileRef.getDownloadURL())

        setBeatCargadoWav(file.name)
        setLoading("")
    }

    
    // imagen
    const onFileChange2 = async (e) => {
        const userDocument = await firebase.firestore().collection(`users`).doc(usuarioID).get();
        /*  console.log(userDocument.data()) */
         const dataUsuario = userDocument.data();
         const nombreUsario = dataUsuario.displayName; //


        const file = e.target.files[0]
        const storageRef = app.storage().ref(`Beats/${nombreUsario}/BeatsSubidos`)   // si en vez de crear una carpeta (en Storage) con el ID del usuario, queremos
        const fileRef = storageRef.child(file.name)                                // crear una carpeta con el Nombre del usuario, deberemos remplazar
        await fileRef.put(file)                                                     // el campo ${usuarioID} por ${nombreUsuario}
        setFileUrl2(await fileRef.getDownloadURL())

        setImagenCargado(file.name)
        setLoading("")
    }
// ESTAS DOS ULTIMAS FUNCIONES, PODRIAN IR DENTRO DE LA CONSTANTE onSubmit, con el fin de los archivos se envien SOLO cuando se le de al botón
    




    //SNIPPER 
    const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    `;
   


////////////////////////////////////////////////////////////////////


    
    const iden = Math.floor(Math.random() * 1000000) + 10;
   /*  const iden = crypto.randomBytes(20); */

    // Array para tags
    const [tagsBeat, setTagsBeat] = useState();



    const onSubmit = async (e) => {
        e.preventDefault()

        const beatNombre = (e.target.beatNombre.value).toLowerCase();
        const estilo = (e.target.estilo.value).toLowerCase();
        const bpm = (e.target.bpm.value).toLowerCase();
        const nota = (e.target.nota.value).toLowerCase();
        const precio = parseInt((e.target.precio.value));

        // generado por los campos de arriba
        const tagsDefault = [beatNombre, estilo, bpm, nota, usuario]

        // introducido por Beatmaker
        const separarComas = tagsBeat.split(",");
        const tags = separarComas;
        
        // agrupacion de todos los tags
        const allTags = tagsDefault.concat(tags); // unión de los 2 arrays de tags (el creado automáticamente + el creado por el beatmaker)


        if(!beatNombre){
            return
        }

        

        // ACTUALIZAMOS EL CAMPO DE "beatmaker" a "yes"
        db.collection('users/').doc(usuarioID).update({
            beatmaker: "yes"
            
        }) 



      

        // // METODO A - SUBIMOS ARCHIVO A DB CREANDO UNA SUBCOLECCION
        db.collection('users/').doc(usuarioID).collection('beatsSubidos').doc(beatNombre).set({
            name: beatNombre,
            beatUrl: fileUrl,
            beatUrlWav: fileUrlWav,
            imagenURL: fileUrl2,
            estilo: estilo,
            BPM: bpm,
            nota: nota,
            precio: precio,
            identificador: iden,
            usuario: usuarioID,
            nombreUsuario: usuario,
            ventas: 0, // este campo se actualizará (.update) cuando alguien compre.
            etiquetas: allTags,
            fecha: new Date()
            
        }) 




        //Queremos duplicar los datos, para que luego podamos leerlos mas facilmente, al hacer la pagina de Beats en general.

        // // METODO A - SUBIMOS ARCHIVO A DB EN LA CARPETA DE BEATSSUBIDOS GENERAL
        db.collection('beatsVenta/').doc(beatNombre).set({ // hay que comprobar si esto esta bien
            name: beatNombre,
            beatUrl: fileUrl,
            beatUrlWav: fileUrlWav,
            imagenURL: fileUrl2,
            estilo: estilo,
            BPM: bpm,
            nota: nota,
            precio: precio,
            identificador: iden,
            usuario: usuarioID,
            nombreUsuario: usuario,
            etiquetas: allTags,
            fecha: new Date()
            
        }, {merge:true}) 





        await console.log('archivo subido correctamente')
        await alert('Beat subido correctamente!')
        setBeatSubido("El beat se ha subido correctamente")

      
        history.push('/confirmacion') 
      


       
        
    }














////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // HTML 
    return (
        <>
            <div className="contenedor-general">
                <form onSubmit={onSubmit}>
                    <div className="archivo">

                        
                        <input className="subir-archivo-boton"type="file" id="files" onChange={onFileChange}  />
                        <label onClick={() => setLoading(!loading)} className="subir-archivo"for="files">Selecciona tu Beat (mp3)</label>
                        
                        
                        <input className="subir-archivo-boton"type="file" id="filesWav" onChange={onFileChangeWav}  />
                        <label onClick={() => setLoading(!loading)} className="subir-archivo"for="filesWav">Selecciona tu Beat (wav)</label>
                  
                                    
                        <input className="subir-archivo-boton"type="file" id="filesImagen" onChange={onFileChange2}  />
                        <label onClick={() => setLoading(!loading)} className="subir-archivo"for="filesImagen">Selecciona tu Portada</label>
                        
                    </div>

                    <label for="beatNombre">Nombre del Beat</label> <br/>
                    <input className="nombreBeat" type="text" name="beatNombre" placeholder="Nombre del Beat"/>

                    <br></br>
                    <br></br>

                    <label for="estilo">Género</label> <br/>
                    <select className="estilo-musica" id="estilo" name="estilo">
                        <option value="" selected="selected">- selecciona -</option>
                        <option value="Trap">Trap</option>
                        <option value="Drill">Drill</option>
                        <option value="Reggaeton">Reggaeton</option>
                        <option value="R&B">R&B</option>
                        <option value="Pop">Pop</option>
                        <option value="Reggae">Reggae</option>
                        <option value="Flamenco">Flamenco</option>
                        <option value="Mambo">Mambo</option>
                        <option value="Bachata">Bachata</option>
                    </select>

                    <br></br>


                    <label for="beatNombre">BPM</label> <br/>
                    <input className="nombreBeat" type="text" name="bpm" placeholder="BPM"/>

                    <br></br>
                    
                   {/*  <label for="beatNombre">Nota del Beat</label> <br/>
                    <input className="nombreBeat" type="text" name="nota" placeholder="Nota del Beat"/> */}
                    <label for="estilo">Nota del Beat</label> <br/>
                    <select className="estilo-musica" id="nota" name="nota">
                        <option value="" selected="selected">- selecciona -</option>
                        <option value="NS/NC">NS/NC</option>
                        <option value="C">C</option>
                        <option value="Cm">Cm</option>
                        <option value="C#">C#</option>
                        <option value="C#m">C#m</option>
                        <option value="D">D</option>
                        <option value="Dm">Dm</option>
                        <option value="D#">D#</option>
                        <option value="D#m">D#m</option>
                        <option value="E">E</option>
                        <option value="Em">Em</option>                     
                        <option value="F">F</option>
                        <option value="Fm">Fm</option>
                        <option value="F#">F#</option>
                        <option value="F#m">F#m</option>
                        <option value="G">G</option>
                        <option value="Gm">Gm</option>
                        <option value="G#">G#</option>
                        <option value="G#m">G#m</option>
                        <option value="A">A</option>
                        <option value="Am">Am</option>
                        <option value="A#">A#</option>
                        <option value="A#m">A#m</option>
                        <option value="B">B</option>
                        <option value="Bm">Bm</option>                      
                    </select>
                    <br></br>

                    <label for="beatNombre">Precio (€)</label> <br/>
                    <input className="nombreBeat" type="text" name="precio" placeholder="Precio"/>

                    <br></br>
                    <label for="beatNombre">Tags (separar por comas, solo minúsuculas)</label> <br/>
                    <input onChange={event => setTagsBeat(event.target.value)} className="nombreBeat" type="text" name="tags" placeholder="Tags"/>
                    <br></br>


                    <button>Subir Beat</button>

                    <h3>{beatSubido}</h3>
                    <ClipLoader color={color} loading={loading} css={override} size={50} />
                    <h5>{beatCargado}</h5>
                    <h5>{imagenCargado}</h5>
                </form>
            </div>


        </>
    )
}