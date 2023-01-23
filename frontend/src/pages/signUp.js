import axios, { AxiosHeaders } from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
  
const SignUpPage = () => {

    /**
     * Signup method.
     */
    const signup = (e ) => {
      e.preventDefault()
      var username = document.getElementById("username").value;
      var password = document.getElementById("password").value;
      var passwordAgain = document.getElementById("passwordAgain").value;

      /**
       * Tries if the passwords are same. If true, then checks from backend if username is reserve and if not,
       * then makes new user to database
       */
      if (password == passwordAgain) {
        const formdata = new FormData();
        formdata.append(username, password)

        axios.get('http://localhost:3001/api/signup', { 
          params: {
            username: username, 
            password: password,
          }
        })
        .then(res => {
          const response = res.data;
          if(response.name == 'error'){
            //If username is reserved
            alert('Username is taken')
          }else{
            //New user added
            alert('New user made')
          }
      })
      }else {
        //if password and passwordAgain doesn't match
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
      <h1>Sign up</h1>
      <div>
        <h2>WARNING! passwords are not yet hashed when stored in database. Please don't use your right passwords for now.</h2>
      </div>
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