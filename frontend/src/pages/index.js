import React from "react";
import { useNavigate } from "react-router-dom";
  
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
    <div>
      <div>
      <h1>Welcome to pswrdManager Web-edition!</h1>
      </div>
      <div>
        <form>
          <button onClick={ () => {changePage("/login")} }>Login</button>
          <button onClick={ () => {changePage("/signup")} }>Signup</button>
        </form>
      </div>
    </div>
    );
};
  
export default HomePage;