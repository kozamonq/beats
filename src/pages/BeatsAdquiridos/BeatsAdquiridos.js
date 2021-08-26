import React from 'react'
import firebase from '../../firebase'
import {useAuth} from '../../contexts/AuthContext'

import '../BeatsVenta/BeatsVenta.css'
import { Navbar } from '../../components/Navbar'


export default function BeatsVenta() {
    const {currentUser} = useAuth()
    const usuarioID =currentUser.uid 

    const [spells, setSpells] = React.useState([])

    React.useEffect(()=> {
        const fetchData = async () => {
            const db = firebase.firestore()
            const data = await db.collection("users").doc(usuarioID).collection("beatsAdquiridos").get()
            setSpells(data.docs.map(doc => doc.data()))


        }
        fetchData()
    },[])
    
    
    return (
        <div>
            <Navbar />
            <div className="container-general">
                <h1>Beats Adquiridos</h1>
                <table>
                    <thead>
                            <tr>
                                <th>Nombre</th>
                                
                                
                                <th>Precio</th>
                                <th>Descargar</th>
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
                                <ul key={spell.precio}>{spell.precio}</ul>
                                ))}
                                
                            </th>

                            <th>
                                {spells.map(spell => (
                                <ul key={spell.beatUrl}><a href={spell.beatUrl}>Descargar</a></ul>
                                ))}
                                
                            </th>
                                    
                    </tbody>
                </table>



              
               
            
            </div>

        </div>
    )
}
