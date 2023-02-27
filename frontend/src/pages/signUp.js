import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./signUp.css"
  
const SignUpPage = () => {

  /**
   * Setting body element background colors
   */
  document.documentElement.style.setProperty('--c1', '#f9deb3');
  document.documentElement.style.setProperty('--c2', '#295e82');


    /**
     * Signup method.
     */
    const signup = (e ) => {
      e.preventDefault()
      var username = document.getElementById("username").value;
      var password = document.getElementById("password").value;
      var passwordAgain = document.getElementById("password-again").value;

      if (!username|| !password|| !passwordAgain) {
        alert("You must fill everything")
        return
      }

      /**
       * Tries if the passwords are same. If true, then checks from backend if username is reserve and if not,
       * then makes new user to database
       */
      if (password === passwordAgain) {

        axios.post('https://pswrdmanagerwebbackend.fly.dev/api/signup', { 
            username: username, 
            password: password
        })
        .then(res => {
          const response = res.data;
          if(response === '42P07'){
            //If username is reserved
            alert('Username is already taken')
          }else{
            //New user added
            alert("New user made")
            changePage("/")
          }
      })
      }else {
        //if password and passwordAgain doesn't match
        alert("Passwords don't match")
      }
    }
    

    /**
    * Changes do different page.
    * @param {string} page - url of the destination page.
    */
    let navigate = useNavigate();
    const changePage = (page) => {
        let path = page;
        navigate(path);
    }

  return (
    <motion.div className="form"
      initial={{opacity: 0}}
      animate={{opacity: 1}}
    >
    <p id="heading">Sign Up</p>
    <div className="field">
      <input autoComplete="off" placeholder="Username" id="username" className="input-field" type="text"/>
    </div>
    <div className="field">
      <input autoComplete="new-password" placeholder="Password" id="password" className="input-field" type="password"/>
    </div>
    <div className="field">
      <input autoComplete="new-password" placeholder="Password again" id="password-again" className="input-field" type="password"/>
    </div>
    <div className="btnSignUp">
      <button className="buttonSignUp" onClick={signup}>Sign Up</button>
      <button className="buttonCancel" onClick={ () => {changePage("/")} }>Cancel</button>
    </div>
    </motion.div>
  );
};
  
export default SignUpPage;