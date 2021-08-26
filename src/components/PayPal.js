import React, { useEffect, useRef, useContext, useState } from 'react'
import {useHistory} from 'react-router-dom'
import {GlobalCartItems} from '../contexts/CartContext'
import app from '../firebase'
import {useAuth} from '../contexts/AuthContext'
import './PayPal.css'

import emailjs from 'emailjs-com';

import sk from '../sk/sk.json'



const db = app.firestore()






export default function PayPal() {
    let history = useHistory();


    // UID DEL USUARIO
    const {currentUser} = useAuth()
    const usuarioID =currentUser.uid 


    // global state del carrito
    const [cartItems, setCartItems] = useContext(GlobalCartItems)
    console.log(cartItems)           // 0 {}, 1 {}, ... //





    // DESCRIPTCION PAYPAL
    var arrayDescription = []

    for ( let i = 0 ; i < cartItems.length ; i++){
        arrayDescription.push(cartItems[i].titulo)

    }
    console.log(arrayDescription)

    var descripcion = arrayDescription.toString()
    console.log(descripcion)
    ////////////////////////////////////////////////////////////
    
    
    // PRECIO TOTAL PAYPAL
    var arrayPrecios = []

    for ( let i = 0 ; i < cartItems.length ; i++){

        arrayPrecios.push(parseInt(cartItems[i].precio))

    }
    console.log(arrayPrecios)

    let carritoTotal = arrayPrecios.reduce((a, b) => a + b, 0);
    console.log(carritoTotal)
    ////////////////////////////////////////////////////////////












    //// PAYPAL
    const paypal = useRef()

    useEffect(() => {

        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            description: descripcion,  // hay que cambiar esto
                            amount: {                       // ya que no es solo 1 elemento
                                currency_code: "EUR",       // 
                                value: carritoTotal     //
                            }
                        }
                    ]
                })
            },


            onApprove: async(data, actions) => {

                const order = await actions.order.capture()
                console.log(order)
                // Lo que quieras hacer despues de la compra (deberemos imprimir los datos de "order" a la base de datos)
                // // METODO A - SUBIMOS ARCHIVO A DB CREANDO UNA SUBCOLECCION
                

                for( let i = 0 ; i < cartItems.length; i++){

                    db.collection('users/').doc(usuarioID).collection('beatsAdquiridos').doc(cartItems[i].titulo).set({

                        name: cartItems[i].titulo,
                        beatUrl: cartItems[i].URLbeat,
                        imagenURL: cartItems[i].imagen,
                        precio: cartItems[i].precio,
                        usuario: usuarioID,
                        
                        
                        idTransaccion: order.id,
    
                        fecha: order.create_time,
                        status: order.status,
                        payerID: order.payer.payer_id,
                        payerEmail: order.payer.email_address,
                        payerNombre: order.payer.name.given_name
                        
                    }) 

                }


                /// EMAIL //////////////////////////////////////////////

                // ENVIAREMOS UN MAIL POR CADA BEAT COMPRADO



                for ( let i = 0 ; i < cartItems.length ; i++){ 
                    
                    var templateParams= {
                        to_email:`${order.payer.email_address}`,
                        to_name:`${order.payer.name.given_name}`,
                        nombre_beat:`${cartItems[i].titulo}`,
                        precio_beat:`${cartItems[i].precio}€`,
                        transaccion_id:`${order.id}`,
                        transaccion_fecha:`${order.create_time}`,
                        descarga_url:`${cartItems[i].URLbeat}`
                    };
                    
                    emailjs.send( sk.sk[0].service, sk.sk[0].template,templateParams, sk.sk[0].user )
                    .then((res) => {
                        console.log("success", res.status);
                    });


                }
                ////////////////////////////////////////////////////////
               


                await history.push("/orden-confirmada"); 

            },
            onError: (err) => {
                console.log(err)
            }
        }).render(paypal.current)
    }, [])



    return (
        <div className="paypal-container-buttons">
            <div ref={paypal}></div>
        </div>
    )
}
