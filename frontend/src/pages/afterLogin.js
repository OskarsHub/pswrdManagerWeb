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
    <div className="loggedIn">
      <h1 id="heading1">Welcome {user.username},</h1>
      <br/>
      <h2 id="heading2">here is your passwords</h2>
      <div className="btn">
        <button className="buttonAddPassword" type="button" onClick={togglePopup}>Add password</button> 
        <button className="buttonLogOut" type="button" onClick={logoutUser}>Logout</button>
      </div>
      <div className="passwordContainer">
      <ul className="ulList">
        {passwords.map((user) => {
          return (
              <li className="liList">Service: {user.service} <br/> Username: {user.username} <br/> Password: {user.password} <br/> ----------</li>
            )
          })}
      </ul>
      </div>
      <div className="add-password-container">
      {isOpen && <Popup
          handleClose={togglePopup}
          />}
      </div>
    </div>
  );
};
  
export default AfterLoginPage;