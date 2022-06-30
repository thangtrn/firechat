import React, { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

const AuthContex = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    
    const navigate = useNavigate()
    
    useEffect(()=> {
        const unsub = onAuthStateChanged(auth,async currentUser => {
            setUser(currentUser)
            if(currentUser)
                navigate('/')
        }, error => {
            console.log(error.message)
            setUser(null)
        })
        
        return ()=> {
            unsub()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    
    console.log(user);

    return (
        <AuthContex.Provider value={{user}}>
            {children}
        </AuthContex.Provider>
  )
}

export function useAuth() {
    return useContext(AuthContex)
}

export default AuthProvider
