import React from 'react'
import firebase from '../../firebase'
import {useAuth} from '../../contexts/AuthContext'

import './BeatsVenta.css'
import { Navbar } from '../../components/Navbar'


export default function BeatsVenta() {
    const {currentUser} = useAuth()
    const usuarioID =currentUser.uid 

    const [spells, setSpells] = React.useState([])

    React.useEffect(()=> {
        const fetchData = async () => {
            const db = firebase.firestore()
            const data = await db.collection("users").doc(usuarioID).collection("beatsSubidos").get()
            setSpells(data.docs.map(doc => doc.data()))


        }
        fetchData()
    },[])
    
    
    return (
        <div>
            <Navbar />
            <div className="container-general">
                <h1>Beats en Venta</h1>
                <table>
                    <thead>
                            <tr>
                                <th>Nombre</th>
                                
                                <th>Estilo</th>
                                <th>Nota</th>
                                <th>Precio</th>
                            </tr>
                    </thead>
                    
                    <tbody>
                            <th>
                                {spells.map(spell => (
                                    <ul key={spell.name}>{spell.name}</ul>
                                    ))}
                            </th>

                        

                            <th>
                                {spells.map(spell => (
                                <ul key={spell.estilo}>{spell.estilo}</ul>
                                ))}
                            </th>

                            <th>
                                
                                {spells.map(spell => (
                                <ul key={spell.nota}>{spell.nota}</ul>
                                ))}
                            </th>
                            

                            <th>
                                {spells.map(spell => (
                                <ul key={spell.precio}>{spell.precio}</ul>
                                ))}
                                
                            </th>
                                    
                    </tbody>
                </table>



              
               
            
            </div>

        </div>
    )
}
