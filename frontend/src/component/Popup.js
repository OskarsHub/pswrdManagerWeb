import React, {useContext} from "react";
import axios from "axios";
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

        console.log(service, username, password)
  
        axios.post('http://localhost:3001/api/user', {
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
          console.log(response)
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
      <div class="popup-container" id="add-password-popup">
        <div class="popup-content">
          <h2>Add Password</h2>
          <label>Service:</label>
          <input type="text" id="service-input" placeholder="Enter the service name"/>
          <label>Username:</label>
          <input type="text" id="username-input" placeholder="Enter your username"/>
          <label>Password:</label>
          <input type="password" id="password-input" placeholder="Enter your password"/>
          <div class="button-container">
            <button class="add-password-button" type="button" onClick={Add}>Add</button>
            <button class="cancel-button"       type="button" onClick={props.handleClose}>Cancel</button>
          </div>
      </div>
    </div>
    )
}

export default Popup