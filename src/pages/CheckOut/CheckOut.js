import React, {useContext, useState, useRef, useEffect} from 'react'
import {GlobalCartItems} from '../../contexts/CartContext'
import './CheckOut.css'
import {Link, useHistory} from 'react-router-dom'
import { Navbar } from '../../components/Navbar';
import PayPal from '../../components/PayPal';


export default function CheckOut() {
    const [checkout, setCheckout] = useState(false)




    const history = useHistory();
    const goBack = () => {
        history.goBack()
    }




/////// CARRITO //////////////////////////////////////////////////////////
    
    const [cartItems, setCartItems] = useContext(GlobalCartItems)
    /*  console.log(cartItems) */

    


    const EliminarDelCarrito = (index) => {
        console.log('hola')
        console.log(index)
        
        var newCartItems = cartItems
        
        var newItems = cartItems.splice(index, 1)
        
      /*   console.log(newCartItems)
        console.log(newCartItems[0]) */


        setCartItems(cartItems) 
        setCartItems(cartItems.splice(!index))
    }





    const MostrarCarrito = () => {
        
       /*  console.log(cartItems[0]) */

        if(cartItems.length == 0){
            return(
                <h1 className="no-tienes-nada">No tienes nada en el carrito</h1>
            )
        }else{
            return (




                    <div className="general-all-carrito">

                        {cartItems.map((cart, index, key) => (
                        
                            <div className="contenedor-carrito-beats">
                                <img className="imagen-beat" src={cart.imagen}/>
                                <h1 className="titulo-beat">{cart.titulo}</h1>
                                <h1 className="titulo-beat">{index}</h1>
                                <h1 className="precio-beat">{cart.precio}€</h1>
                                <div className="boton-eliminar">
                                    <button className="eliminar-btn" onClick={() => EliminarDelCarrito(index)}>Eliminar</button>
                                </div>
                            </div>
                        ))}

                    </div>





            )
        }
    }








    const ElementosCheckOut = () => {

        var carritoTotal = []


        for(var i = 0; i<cartItems.length; i++){
            carritoTotal.push(parseInt(cartItems[i].precio))
           
        }
        console.log(carritoTotal)

        let total = carritoTotal.reduce((a, b) => a + b, 0);
        console.log(total)


        if(cartItems.length == 0){
            return(
                <div className="div-volver">
                    <button onClick={() => goBack()} className="boton-volver">Volver</button>
                </div>
               
            )
        }else{
            return (
                <>

                   


                    <h1 className="total-carrito">Total Carrito: {total}€</h1>
                    {checkout ? (
                        <PayPal />
                    ):(
                    <div className="div-procesar-pago">
                        <button onClick={() => {setCheckout(true)}} className="procesar-pago">Procesar Pago</button>
                    </div>
                    )}
                </>
            )
        }
    }



    console.log(cartItems)




    

return (
   
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
         
</>
       

        
  
)
}


