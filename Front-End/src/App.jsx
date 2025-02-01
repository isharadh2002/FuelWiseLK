import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VehicleRegistrationPage from "./pages/VehicleRegistrationPage";
import Footer from "./components/common/Footer";
import { Global } from '@emotion/react';
import globalStyles from './styles/global';
import LoginForm from './pages/LoginPage';
import AdminLoginForm from './pages/AdminLoginPage';
import RegistrationForm from "./pages/RegisterPage";
import PageNotFound from "./pages/PageNotFound";
import FuelStationRegistrationPage from "./pages/FuelStationRegistrationPage";
import Terms from "./pages/Terms";
import About from "./pages/About";
import ContactUs from "./pages/Contact";
import Home from "./pages/Home.jsx";
import VehicleForm from "./pages/VehicleForm";
import AdminDashboard from "./components/admin/AdminDashboard";
import QRCodePage from "./pages/QRCodePage"; // Import the new QR Code page
import CreateAdmins from "./components/admin/CreateAdmins";
import ManageFuelStations from "./components/admin/ManageFuelStations.jsx";
import ManageVehicles from "./components/admin/ManageVehicles.jsx";
import CustomerDashboard from "./components/customer/CustomerDashboard";
import ViewAdmins from "./components/admin/ViewAdmins";
import SingleVehiclePage from "./components/customer/SingleVehiclePage";
import ManageVehiclePage from "./components/customer/ManageVehiclePage.jsx";
// import QTY from "./pages/QTY.jsx"; 

function App() {
    return (
      
          <>
            <Router>
              <Global styles={globalStyles} />

              <Routes>
                {/* Admin Routes */}
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/createAdmin" element={<CreateAdmins />} />
                <Route path="/admin/login" element={<AdminLoginForm />} />
                <Route path="/manage-vehicles" element={<ManageVehicles />} />
                <Route
                  path="/manage-fuel-stations"
                  element={<ManageFuelStations />}
                />
                <Route path="/Viewadmins" element={<ViewAdmins />} />
                {/* <Route path={"/qa"} element={<QTY/>}/> */}

                {/* Customer Routes */}
                <Route path="/dashboard" element={<CustomerDashboard />} />
                <Route path="/VehicleRegister" element={<VehicleForm />} />
                <Route
                  path="/vehicle/:vehicleId"
                  element={<SingleVehiclePage />}
                />{" "}
                {/* QR Code Routes */}
                <Route
                  path="/manage-vehicle/:vehicleId"
                  element={<ManageVehiclePage />}
                />{" "}
                {/* QR Code Routes */}
                <Route
                  path="/vehicle/:vehicleId/qr"
                  element={<QRCodePage />}
                />{" "}

                {/* Single Vehicle Details */}
                <Route path="/home" element={<Home />} />
                <Route path="/register" element={<RegistrationForm />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/" element={<VehicleRegistrationPage />} />
                <Route path="/footer" element={<Footer />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/terms" element={<Terms />} />
                <Route
                  path="/FuelStation"
                  element={<FuelStationRegistrationPage />}
                />
                
                {/* QR Code Page for Specific Vehicle */}
                {/* Catch-All Route for 404 */}
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Router>
          </>
          

    );
}

export default App;
