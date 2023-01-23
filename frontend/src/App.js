import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from "./context/AuthContext";

import HomePage from "./pages";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/signUp";
import AfterLoginPage from "./pages/afterLogin";

function App() {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        <Route exact path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/signup' element={<SignUpPage/>} />
          <Route element={<PrivateRoute/>}>
            <Route path='/afterLogin' element={<AfterLoginPage/>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;