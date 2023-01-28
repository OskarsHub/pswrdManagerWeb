import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import Popup from "../component/Popup"
import "./afterLogin.css"
  
const AfterLoginPage = () => {

    let {user} = useContext(AuthContext)
    let {logoutUser} = useContext(AuthContext)
    
    const [isOpen, setIsOpen] = useState(false);
    const [passwords, setPasswords] = useState([]);

    /**
     * Get's users data from database when page is reloaded
     */
    useEffect(() => {
      axios.get('https://pswrdmanagerwebbackend.fly.dev/api/user', {
          params: {
            masterUser: user.username
          }
        }).then(res => {
            const response = res.data
            setPasswords(response)
          })
    }, [])

    /**
     * Set's popup to display or hide it
     */
    const togglePopup = () => {
      setIsOpen(!isOpen);
    }

    return (
    <div class="password-manager-container">
      <h1>Welcome {user.username},</h1>
      <br/>
      <h2>here is your passwords</h2>
      <div class="button-container">
        <button type="button" onClick={togglePopup}>Add password</button> 
        <button type="button" onClick={logoutUser}>Logout</button>
      </div>Popup
      <div class="password-list">
      <ul>
        {passwords.map((user) => {
          return (
              <li>Service: {user.service} | Username: {user.username} | Password: {user.password}</li>
            )
          })}
      </ul>
      </div>
      <div class="add-password-container">
      {isOpen && <Popup
          handleClose={togglePopup}
          />}
      </div>
    </div>
  );
};
  
export default AfterLoginPage;