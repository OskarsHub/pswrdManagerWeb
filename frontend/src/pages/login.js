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
   * Login method, that checks from backend if user exixst and tries input password to password found in database
   */
  const login = (e) => {
    e.preventDefault()

    axios.get('http://localhost:3001/api/login/'+data.username)

    .then(res => {
      const response = res.data;
      if (response == null) {
        //If no username is found 
        alert("Incorrect username or password")
      }
      if (response.password == data.password) {
        //Username and password matches to database
        alert("Correct. Sadly the next page is under construction :(")
      }
      else {
        //Wrong password
        alert("Incorrect username or password")
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