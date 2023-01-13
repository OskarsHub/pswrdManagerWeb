import React from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => { 

  /**
   * Login method.
   */
  const login = () => {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    document.getElementById('username').value = "";
    document.getElementById('password').value = "";

    // isValid = checkUser()
    if (username == "Testaaja" && password == "salasana"){
      var isValid = true
    }
    else{
      var isValid = false
    }
    
    if (isValid) {
      changePage("/afterLogin")
    }
    else{
      alert("wrong username or password")
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
  <h1>Login</h1>
  <div>      
    <label htmlFor="username">Username:</label>
    <input type="text" id="username" name="username" placeholder="Enter your username"></input>
  </div>
  <div>      
    <label htmlFor="password">Password:</label>
    <input type="password" id="password" name="password" placeholder="Enter your password"></input>
  </div>
  <input type="button" value="Login" onClick={login}></input>
  <button onClick={ () => {changePage("/")} }>Cancel</button>
  </div>
  );
};
  
export default LoginPage;