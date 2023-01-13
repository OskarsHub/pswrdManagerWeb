import React from "react";
import { useNavigate } from "react-router-dom";
  
const SignUpPage = () => {

    /**
     * Signup method.
     */
    const signup = () => {
      var username = document.getElementById("username").value;
      var password = document.getElementById("password").value;
      var passwordAgain = document.getElementById("passwordAgain").value;

      /**
       * Tries if the passwords are same.
       */
      if (password == passwordAgain) {
        console.log("Making new account")
      }
      else {
        console.log("Passwords don't match")
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
      <div>
      <h1>Signup</h1>
      <div>      
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" placeholder="Enter your username"></input>
      </div>
      <div>      
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" placeholder="Enter your password"></input> 
      </div>
      <div>      
        <label htmlFor="passwordAgain">Password again:</label>
        <input type="password" id="passwordAgain" name="passwordAgain" placeholder="Password again"></input>
      </div>
      <input type="button" value="Signup" onClick={signup}></input>
      <button onClick={ () => {changePage("/login")} }>Already got account?</button>
      <button onClick={ () => {changePage("/")} }>Cancel</button>
      </div>
  );
};
  
export default SignUpPage;