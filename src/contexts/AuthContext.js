import React, {useContext, useState, useEffect} from 'react'
import {auth} from '../firebase'
import {createUserDocument} from '../firebase'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}


export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    
    
    function registro(email, password, displayName){
        return auth.createUserWithEmailAndPassword(email, password)
      
    }
        

   



    function inicioSesion(email, password){
        return auth.signInWithEmailAndPassword(email,password)
    }

 

    function logout(){
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password){
        return currentUser.updatePassword(password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe

    }, [])

    const value = {
        currentUser,
        inicioSesion,
        registro,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }

    return (
            <AuthContext.Provider value={value}>
                {!loading && children}
            </AuthContext.Provider>
    )
}
