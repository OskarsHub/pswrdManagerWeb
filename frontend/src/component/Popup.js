import React, {useContext} from "react";
import axios from "axios";
import { motion } from "framer-motion";
import AuthContext from "../context/AuthContext";
import './Popup.css'

const Popup = props => {

    let {user} = useContext(AuthContext)
    let {logoutUser} = useContext(AuthContext)

    /**
     * Method for adding new data for database
     */
    const Add = (e) => {
        e.preventDefault()

        var service  = document.getElementById("service-input").value;
        var username = document.getElementById("username-input").value;
        var password = document.getElementById("password-input").value;

        if (!service|| !username|| !password) {
          alert("You must fill everything")
          return
        }
  
        axios.post('https://pswrdmanagerwebbackend.fly.dev/api/user', {
          masterUser: user.username,
          service:    service,
          username:   username, 
          password:   password},
          {
            headers: {
            'authorization': localStorage.getItem('authToken')
          }
        })
        .then(res => {
          const response = res.data
          if (response === 'logout'){
            //If backens sends logout, it means authtoken is expired. Beacuse that, logout user and send alarm
            logoutUser()
            alert('for verify, please login again')
          }
          if (response === 'added') {
            //If adding data was successful, then close popup and refresh page to see new data
            props.handleClose()
            window.location.reload()
          }
        })
      }

    return(
      <motion.div className="popup-container"
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      >
        <div className="popup-content">
          <h2 id="headingPopup">Add Password</h2>
          <div className="field">
            <input type="text" id="service-input" className="input-field" placeholder="Enter the service name" maxLength="22"/>
          </div>
          <div className="field">
            <input type="text" id="username-input" className="input-field" placeholder="Enter username" maxLength="22"/>
          </div>
          <div className="field">
          <input autoComplete="new-password" type="password" id="password-input" className="input-field" placeholder="Enter password" maxLength="22"/>
          </div>
          <div className="button-container">
            <button className="buttonAddPassword" type="button" onClick={Add}>Add</button>
            <button className="buttonCancelNewPassword" type="button" onClick={props.handleClose}>Cancel</button>
          </div>
      </div>
    </motion.div>
    )
}

export default Popup