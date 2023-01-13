import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/signUp";
import AfterLoginPage from "./pages/afterLogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/signup' element={<SignUpPage/>} />
        <Route path='/afterLogin' element={<AfterLoginPage/>} />
      </Routes>
    </Router>
  );
}

export default App;