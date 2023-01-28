import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css"
  
const HomePage = () => {

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
    <div className="board">
      <div className="welcome-container">
        <h1>Welcome to Password Manager Web-edition</h1>
        <div class="buttons-container">
          <button type="button" onClick={ () => {changePage("/login")} }>Login</button>
          <button type="button" onClick={ () => {changePage("/signup")} }>Sign Up</button>
        </div>
      </div>
    </div>

    );
};
  
export default HomePage;