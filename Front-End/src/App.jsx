// src/App.jsx
// eslint-disable-next-line no-unused-vars
import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import VehicleRegistrationPage from "./pages/VehicleRegistrationPage";
import Footer from "./components/common/Footer.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<VehicleRegistrationPage/>}/>
                {/* Add other routes for fuel station and admin */}
                <Route path='/' element={<Footer/>}/>
            </Routes>
        </Router>
    );
}

export default App;
