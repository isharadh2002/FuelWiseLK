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
                <Routes>
                    <Global styles={globalStyles}/>
                    <LoginForm/>
                    <Route path="/Home" element={<Header/>}/>
                    <Route path="/" element={<VehicleRegistrationPage/>}/>
                    <Route path='/footer' element={<Footer/>}/>
                </Routes>
            </Router>
        </>
    );
}

export default App;

