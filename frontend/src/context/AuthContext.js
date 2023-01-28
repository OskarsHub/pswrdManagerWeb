import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'


const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {


    let [authToken, setAuthToken] = useState(localStorage.getItem('authToken') ? localStorage.getItem('authToken') : null)
    let [user, setUser] = useState(localStorage.getItem('authToken') ? jwt_decode(localStorage.getItem('authToken')) : null)
    
    let navigate = useNavigate()

    const loginUser = async (e) => {
        e.preventDefault()
    
        axios.post('https://localhost:3001/api/login', {
          'username': e.target.username.value, 
          'password': e.target.password.value
        })
        .then(res => {
          const response = res.data.Token;
          console.log(response)
          if (response === undefined) {
            //If no username is found 
            alert("Incorrect username or password")
          }
          else{
            //Username and password matches to database
            setAuthToken(response)
            setUser(jwt_decode(response))
            localStorage.setItem('authToken', response)
            navigate ('/afterLogin')
          }
        })
        }

    let logoutUser = () => {
        localStorage.removeItem('authToken')
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