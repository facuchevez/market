import React from "react";
import { useState } from "react";
export const AuthContext = React.createContext();

const AuthProvider = ({children})=>{
    const [login, setLogin] = useState(localStorage.getItem('login')||false)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {})

    const handlerLogin = (userData) => {
        setLogin(true)
        localStorage.setItem('login',true)
        setUser(userData)
        localStorage.setItem('user',JSON.stringify(userData))
    }

    const handlerLogout = () => {
        setLogin(false)
        localStorage.removeItem('login')
        setUser()
        localStorage.removeItem('user')
    }

    return(
        <AuthContext.Provider
            value={{login,user,handlerLogin, handlerLogout}}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;