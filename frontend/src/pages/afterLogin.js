import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
  
const AfterLoginPage = () => {

    let {logoutUser} = useContext(AuthContext)

    return (
    <div>
      <h1>
        Here are you passwords
      </h1>
        <form onSubmit={logoutUser}>
        <div>
          <input type="submit" value="Logout"/>
        </div>
        </form>
    </div>
  );
};
  
export default AfterLoginPage;