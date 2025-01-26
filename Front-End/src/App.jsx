import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import VehicleRegistrationPage from "./pages/VehicleRegistrationPage";
import Footer from "./components/common/Footer";
import {Global} from '@emotion/react';
import globalStyles from './styles/global';
import LoginForm from './pages/LoginPage';
import RegistrationForm from "./pages/RegisterPage";
import PageNotFound from "./pages/PageNotFound";
import FuelStationRegistrationPage from "./pages/FuelStationRegistrationPage";
import Terms from "./pages/Terms";
import About from "./pages/About";
import ContactUs from "./pages/Contact";
import Home from "./pages/Home.jsx";
import VehicleForm from "./pages/VehicleForm";
import AdminDashboard from "./components/admin/AdminDashboard";
import Quota from "./pages/Quota.jsx";
import "react";

function App() {
    return (
        <>
            <Router>
                <Global styles={globalStyles}/>

                <Routes>
                    <Route path="/m" element={<AdminDashboard/>}/>
                    <Route path="/VehicleRegister" element={<VehicleForm/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/register" element={<RegistrationForm/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/q" element={<Quota/>}/>
                    <Route path="/contact" element={<ContactUs/>}/>
                    <Route path="/" element={<VehicleRegistrationPage/>}/>
                    <Route path="/footer" element={<Footer/>}/>
                    <Route path="/login" element={<LoginForm/>}/>
                    <Route path="/terms" element={<Terms/>}/>
                    <Route
                        path="/FuelStation"
                        element={<FuelStationRegistrationPage/>}
                    />
                    <Route path="*" element={<PageNotFound/>}/>
                </Routes>
            </Router>
        </>
    );
}


export default App;
