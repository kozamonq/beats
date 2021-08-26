import React, {useState} from  'react'

const initialState = {beatActivo: '1'};

export const GlobalStateContext = React.createContext(initialState);

export default ({children}) => {
    const [globalState, setGlobalState] = useState(initialState);

    return(
        <GlobalStateContext.Provider value={[globalState, setGlobalState]}>
            {children}
        </GlobalStateContext.Provider>
    );
}
