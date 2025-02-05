import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Global } from "@emotion/react";
import globalStyles from "./styles/global";

// Common Components
import Footer from "./components/common/Footer";

// Public Pages
import Home from "./pages/Home.jsx";
import LoginForm from "./pages/LoginPage";
import RegistrationForm from "./pages/RegisterPage";
import Terms from "./pages/Terms";
import About from "./pages/About";
import ContactUs from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";

// Vehicle Registration
import VehicleRegistrationPage from "./pages/VehicleRegistrationPage.jsx";
import VehicleForm from "./pages/VehicleForm.jsx";

// Customer Dashboard
import CustomerDashboard from "./components/customer/CustomerDashboard";
import SingleVehiclePage from "./components/customer/SingleVehiclePage";
import ManageVehiclePage from "./components/customer/ManageVehiclePage.jsx";
import QRCodePage from "./components/customer/QrCodePage.jsx";

// Admin Dashboard
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminLoginForm from "./pages/AdminLoginPage.jsx";
import CreateAdmins from "./components/admin/CreateAdmins";
import ViewAdmins from "./components/admin/ViewAdmins";
import ManageFuelStations from "./components/admin/ManageFuelStations.jsx";
import ManageVehicles from "./components/admin/ManageVehicles.jsx";
import AddVehicleForm from "./components/admin/AddVehicle.jsx";
import UpdateVehicleForm from "./components/admin/UpdateVehicle.jsx";
import AddFuelStationForm from "./components/admin/AddFuelStation.jsx";
import UpdateFuelStationForm from "./components/admin/UpdatefuelStation.jsx";

// Fuel Station Dashboard
import FuelStationRegistrationPage from "./pages/FuelStationRegistrationPage";
import FuelStationDashBoard from "./components/fuelStation/FuelStationDashBoard.jsx";

function App() {
    return (
        <>
            <Router>
                <Global styles={globalStyles} />
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<VehicleRegistrationPage />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegistrationForm />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/footer" element={<Footer />} />

                    {/* Customer Routes */}
                    <Route path="/dashboard" element={<CustomerDashboard />} />
                    <Route path="/VehicleRegister" element={<VehicleForm />} />
                    <Route path="/vehicle/:vehicleId" element={<SingleVehiclePage />} />
                    <Route path="/manage-vehicle/:vehicleId" element={<ManageVehiclePage />} />
                    <Route path="/vehicle/:vehicleId/qr" element={<QRCodePage />} />

                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<AdminLoginForm />} />
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    <Route path="/createAdmin" element={<CreateAdmins />} />
                    <Route path="/Viewadmins" element={<ViewAdmins />} />
                    <Route path="/manage-vehicles" element={<ManageVehicles />} />
                    <Route path="/add-vehicle" element={<AddVehicleForm />} />
                    <Route path="/update-vehicle" element={<UpdateVehicleForm />} />
                    <Route path="/manage-fuel-stations" element={<ManageFuelStations />} />
                    <Route path="/add-fuel-station" element={<AddFuelStationForm />} />
                    <Route path="/update-fuel-station" element={<UpdateFuelStationForm />} />

                    {/* Fuel Station Routes */}
                    <Route path="/FuelStation" element={<FuelStationRegistrationPage />} />
                    <Route path="/fuelStation/login/dashboard" element={<FuelStationDashBoard />} />

                    {/* 404 Page */}
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
