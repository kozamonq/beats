import React, {useState} from  'react'

const initialState = [];

export const GlobalSearchContext = React.createContext(initialState);

export default ({children}) => {
    const [buscador, setBuscador] = useState(initialState);

    return(
        <GlobalSearchContext.Provider value={[buscador, setBuscador]}>
            {children}
        </GlobalSearchContext.Provider>
    );
}








