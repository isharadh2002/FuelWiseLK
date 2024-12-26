import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import VehicleRegistrationPage from "./pages/VehicleRegistrationPage";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import {Global} from '@emotion/react';
import globalStyles from './styles/global';
import LoginForm from './pages/LoginPage';
import RegisterPage from "./pages/RegisterPage";

function App() {
    return (
      <>
        <Router>
          <Global styles={globalStyles} />
          
            <Routes>
              <Route path="/home" element={<Header />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/" element={<VehicleRegistrationPage />} />
              <Route path="/footer" element={<Footer />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
            
        </Router>
      </>
    );
}

export default App;

