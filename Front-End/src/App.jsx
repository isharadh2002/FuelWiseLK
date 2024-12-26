<<<<<<< HEAD
import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import VehicleRegistrationPage from "./pages/VehicleRegistrationPage";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import {Global} from '@emotion/react';
import globalStyles from './styles/global';
import LoginForm from './pages/LoginPage';


function App() {
    return (
      <>
        <Router>
          <Global styles={globalStyles} />
          
            <Routes>
              <Route path="/home" element={<Header />} />
              <Route path="/" element={<VehicleRegistrationPage />} />
              <Route path="/footer" element={<Footer />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
            
        </Router>
      </>
    );
=======

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/common/Header";
import VehicleForm from "./components/vehicle/VehicleForm";


function App() {
  return (
    <Router>
      
      <Routes>

        <Route path="/Home" element={<Header />} />
        <Route path="/VehicleRegister" element={<VehicleForm />} />
        
      </Routes>
    </Router>
  );
>>>>>>> dev/Isuru
}

export default App;

