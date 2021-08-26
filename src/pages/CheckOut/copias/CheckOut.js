import React, {useContext, useState, useRef, useEffect} from 'react'
import {GlobalCartItems} from '../../contexts/CartContext'
import './CheckOut.css'
import {Link, useHistory} from 'react-router-dom'
import { Navbar } from '../../components/Navbar';
export default function CheckOut() {

    const history = useHistory();
    const goBack = () => {
        history.goBack()
      }

/////// CARRITO //////////////////////////////////////////////////////////
     const [cartItems, setCartItems] = useContext(GlobalCartItems)
     console.log(cartItems)



     const EliminarDelCarrito = () => {
         setCartItems(cartItems.precio=0)
     }

    const MostrarCarrito = () => {
        
        console.log(cartItems.price)

        if(cartItems.price == 0 || cartItems.precio == undefined){
            return(
                <h1 className="no-tienes-nada">No tienes nada en el carrito</h1>
            )
        }else{
            return (
                    <>
                        <div className="productos">
                            <img className="imagen-beat" src={cartItems.imagen}/>
                            <h1 className="titulo-beat">{cartItems.titulo}</h1>
                            <h1 className="precio-beat">{cartItems.precio}€</h1>
                            <div className="boton-eliminar">
                                <button className="eliminar-btn" onClick={() => EliminarDelCarrito()}>Eliminar</button>
                            </div>
                        </div>
                    </>
            )
        }
    }

    const ElementosCheckOut = () => {


        if(cartItems.price == 0 || cartItems.precio == undefined){
            return(
               <button onClick={() => goBack()} className="boton-volver">Volver</button>
               
            )
        }else{
            return (
                    <>
                        <h1 className="total-carrito">Total Carrito: {cartItems.precio}€</h1>
                        <button  className="procesar-pago">Procesar Pago</button>
                    </>
            )
        }
    }


/// INTEGRACION PAYPAL ///
const [paidFor, setPaidFor] = useState(false);
const [loaded, setLoaded] = useState(false);

let paypalRef = useRef();

useEffect(() => {
    // Load Paypal Script
    const script = document.createElement("script");
    script.src = "https://www.paypal.com/sdk/js?client-id=AX5-p_yzQRUEF47ZcnuFLpgWWkREnIXcWCphv0YbVGVzongEtyw0IOdEHXPSSu_qBzYICt4TQ-8uHpXe";
    script.addEventListener("load", () => setLoaded(true));
    document.body.appendChild(script);

    if(loaded){
        setTimeout(()=> {
            window.paypal
                .Buttons({
                    createOrder: (data, actions) => {
                        return actions.order.create({
                            purchase_units:[
                                {
                                description: cartItems.items,
                                amount: {
                                    currency_code: "USD",
                                    value: cartItems.precio
                                }
                            }

                            ]
                        });
                    },
                    onApprove: async(data, actions) => {
                        const order = await actions.order.capture();

                        setPaidFor(true);

                        console.log(order)
                    }
                })
                .render(paypalRef);
        });
    }
});






    
///////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <div className="contenedor-superior">
            {paidFor ? (
                <div>
                    <h1>Tu compra ha sido exitosa</h1>
                </div>

            ):(
            <>
                <Navbar/>
                <h1 className="tutilo-carrito">Carrito</h1>

            
                
                {
                    [cartItems].map(productos => (
                        <>
                            <MostrarCarrito/>
                            <ElementosCheckOut />
                        </>


                ))}
                <div ref={v => (paypalRef = v)}/>
            </>

           )}

            
        </div>
    )
}


