import React, { useContext} from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from '../context/AuthContext';
import "./login.css"
import { motion } from "framer-motion";

const LoginPage = () => {

  
    /**
   * Setting body element background colors
   */
  document.documentElement.style.setProperty('--c1', '#ffd89b');
  document.documentElement.style.setProperty('--c2', '#19547b');

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
    <motion.form onSubmit={loginUser} className="form"
      initial={{opacity: 0}}
       animate={{opacity: 1}}
    >
    <p id="heading">Welcome to use Password manager</p>
    <div className="field">
      <input autoComplete="off" placeholder="Username" id="username" className="input-field" type="text"/>
    </div>
    <div className="field">
      <input autoComplete="new-password" placeholder="Password" id="password" className="input-field" type="password"/>
    </div>
    <div className="btn">
      <button className="buttonLogin" type="submit">Login</button>
    </div>
    <button className="buttonNewAccount" type="button" onClick={ () => {changePage("/signup")} }>Don't have an account</button>
    </motion.form>
  );
};
  
export default LoginPage;