import React, {useState} from  'react'

const initialSong = {currentPlaying:'hola'};

export const GlobalSongContext = React.createContext(initialSong);

export default ({children}) => {
    const [currentSong, setCurrentSong] = useState(initialSong);

    return(
        <GlobalSongContext.Provider value={[currentSong, setCurrentSong]}>
            {children}
        </GlobalSongContext.Provider>
    );
}
