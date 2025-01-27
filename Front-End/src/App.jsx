import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import VehicleRegistrationPage from "./pages/VehicleRegistrationPage";
import Footer from "./components/common/Footer";
import {Global} from '@emotion/react';
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
import ManageFuelStations from "./pages/ManageFuelStations.jsx";
import ManageVehicles from "./pages/ManageVehicles.jsx";
import ViewAdmins from "./components/admin/ViewAdmins"; // Import the ViewAdmins component

function App() {
    return (
      <>
        <Router>
          <Global styles={globalStyles} />

          <Routes>
            <Route path="/m" element={<AdminDashboard />} />
            <Route path="/VehicleRegister" element={<VehicleForm />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/aboutUs" element={<About />} />
            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/" element={<VehicleRegistrationPage />} />
            <Route path="/footer" element={<Footer />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/terms" element={<Terms />} />
            <Route
              path="/FuelStation"
              element={<FuelStationRegistrationPage />}
            />
            <Route path="/QRCode" element={<QRCodePage />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/createAdmin" element={<CreateAdmins />} />
            <Route path="/admin/login" element={<AdminLoginForm />} />
            <Route path="/manage-vehicles" element={<ManageVehicles />} />
            <Route
              path="/manage-fuel-stations"
              element={<ManageFuelStations />}
            />
            <Route path="/Viewadmins" element={<ViewAdmins />} />
          </Routes>
        </Router>
      </>
    );
}

export default App;
