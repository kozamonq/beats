import React, {useContext, useState, useEffect} from 'react'
import {auth} from '../firebase'


const initialCartItems = [];
const initialCartItemsPrice = 0;

export const GlobalCartItems = React.createContext(initialCartItems);



export default ({children}) => {
    const [cartItems, setCartItems] = useState(initialCartItems);
   /*  const [cartItemsPrice, setItemsPrice] = useState(initialCartItemsPrice) */

    return(
        <GlobalCartItems.Provider value={[cartItems, setCartItems]}>
            {children}
        </GlobalCartItems.Provider>
    );
}



