import { createContext, useState } from "react";
import { useNavigate } from 'react-router-dom'


const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {

    let [user, setUser] = useState(null)
    
    let navigate = useNavigate()

    let loginUser = ()=> {

        console.log("pöö")
    }

    let logoutUser = () => {
        localStorage.removeItem('authTokens')
        navigate ('/')
    }

    let contextData = {
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser,

    }   

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}