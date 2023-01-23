import axios from 'axios'
import React, { useState} from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => { 

  const [data, setData] = useState({})

  const updateData = e => {
    setData({
        ...data,
        [e.target.name]: e.target.value
    })
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
  
  /**
   * Login method, that checks from backend if user exist. If true, then (in next update) allow to go afterLoginPage 
   */
  const login = (e) => {
    e.preventDefault()

    axios.post('http://localhost:3001/api/login', {
      username: data.username, 
      password: data.password
    })
    .then(res => {
      const response = res.data;
      if (response == false) {
        //If no username is found 
        alert("Incorrect username or password")
      }
      else if (response == true) {
        //Username and password matches to database
        alert("Correct. Sadly the next page is under construction :(")
      }
    })
    }


  return (
  <div>
  <h1>Login</h1>
  <form onSubmit={login}>
    <div>      
      <label htmlFor="username"/>Username:
      <input type="text" name="username" onChange={updateData} placeholder="Enter your username"/>
    </div>
    <div>      
      <label htmlFor="password"/>Password:
      <input type="password" name="password" onChange={updateData} placeholder="Enter your password"/>
    </div>
    <input type="submit" value="Login"></input>
  </form>
  <button onClick={ () => {changePage("/")} }>Cancel</button>
  </div>
  );
};
  
export default LoginPage;