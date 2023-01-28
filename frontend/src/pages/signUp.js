import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./signUp.css"
  
const SignUpPage = () => {

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
  <div class="signup-container">
    <h1>Sign Up</h1>
      <label htmlFor="username">Username:</label>
      <input type="text" id="username" placeholder="Enter your username"/>
      <br/>
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" placeholder="Enter your password"/>
      <br/>
      <label htmlFor="password-again">Password Again:</label>
      <input type="password" id="password-again" placeholder="Enter your password again"/>
      <br/>
      <div className="button-row">
      <button type="button" onClick={signup}>Sign Up</button>
      <button type="button" onClick={ () => {changePage("/")} }>Cancel</button>
      </div>
      <button type="button" onClick={ () => {changePage("/login")} }>Already have an account?</button>
  </div>
  );
};
  
export default SignUpPage;