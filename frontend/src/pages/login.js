import React, { useContext} from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from '../context/AuthContext';
import "./login.css"

const LoginPage = () => { 

  /**
   * Changes do different page.
   * @param {string} page - url of the destination page.
   */
  let navigate = useNavigate();
  const changePage = (page) => {
      let path = page;
      navigate(path);
  }
  
  /**
   * Login method, that checks from backend if user exist. If true, then (in next update) allow to go afterLoginPage 
   */
  let{loginUser} = useContext(AuthContext)

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" placeholder="Enter your username"/>
        <br/>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" placeholder="Enter your password"/>
        <br/>
        <button type="submit">Login</button>
        <button onClick={ () => {changePage("/")} }>Cancel</button>
      </form>
    </div>
  );
};
  
export default LoginPage;