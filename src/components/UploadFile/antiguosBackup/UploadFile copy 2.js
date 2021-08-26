import React, { Component } from 'react';
import firebase from 'firebase';
import firestore from 'firebase'
import db from '../../../firebase'
import Dots from 'react-activity/lib/Dots';
import 'react-activity/lib/Dots/Dots.css';
import 'firebase/firestore';
import 'firebase/auth';

import {auth} from '../../../firebase'

import './UploadFile.css'

class UploadFile extends Component {
    
    constructor () {
        super();
        this.state={
            uploadValue: 1,
            beat: null,
           
           
        };
        this.handleUpload = this.handleUpload.bind(this);
    };



     async handleUpload(event)  {
        const file= event.target.files[0];
        const storageRef = firebase.storage().ref(`/Beats/${file.name}`);
        const task = storageRef.put(file);

        
        ///
        const nombreBeat = (file.name).replace(".mp3" , ""); //limpiamos el nombre del beat, para que no se nos muestre el .mp3 o .wav
        console.log(nombreBeat) 
        ///



      /*   const userDocument = await firebase.firestore().collection(`users`).doc("tTJOYH22TqUm7v3y3p5e5OlWh7o1").get();
        console.log(userDocument.data()) */

        
        


        task.on('state-changed', snapshot => {
        
            let percentage = (snapshot.bytesTransfererred / snapshot.totalBytes) *100;
            this.setState( {
                uploadValue: percentage
            })
        }, error => {
            console.log(error.message) 
        }, () => {
            
            storageRef.getDownloadURL().then(url =>{
               
               
                this.setState({
                    
                    uploadValue: 100,
                    beat:`El Beat se ha subido correctamente!`
                    
                });
                //AQUI DEBERÍA IR LA FUNCION PARA SUBIR EL ${file.name} Y LA URL (SI SE SABE COMO) A LA DB

            });

            

        });

     
       
       
    }


    render() {
        return (
            <div>
                <div className="progreso">
                    <p>Barra de progreso</p>
                
                    <progress value={this.state.uploadValue} max="100"></progress>
                </div>
                <br/>
                
                <div className="seleccion">
                    
                    <input type="file" onChange={this.handleUpload} />
                    
                </div>

              
                
                <br/>
               {/*  <img src={this.state.picture}/> */}
                <div className="subida-correcta">
                    <h3>{this.state.beat}</h3>
                </div>
                
            </div>
        )
    }
}

export default UploadFile
