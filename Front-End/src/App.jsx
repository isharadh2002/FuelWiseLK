import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import VehicleRegistrationPage from "./pages/VehicleRegistrationPage";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer.jsx";

function App() {
    return (
        <>
            <Router>

                <Routes>

                    <Route path="/Home" element={<Header/>}/>
                    <Route path="/" element={<VehicleRegistrationPage/>}/>
                </Routes>
            </Router>
            <Footer/>
        </>
    );
}

export default App;
