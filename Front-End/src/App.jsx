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
import AdminLoginForm from "./components/admin/AdminLoginPage.jsx";
import CreateAdmins from "./components/admin/CreateAdmins";
import ViewAdmins from "./components/admin/ViewAdmins";
import ManageFuelStations from "./components/admin/ManageFuelStations.jsx";
import ManageVehicles from "./components/admin/ManageVehicles.jsx";
import AddVehicleForm from "./components/admin/AddVehicle.jsx";
import UpdateVehicleForm from "./components/admin/UpdateVehicle.jsx";
import AddFuelStationForm from "./components/admin/AddFuelStation.jsx";
import UpdateFuelStationForm from "./components/admin/UpdatefuelStation.jsx";
import Overview from "./components/admin/Overview.jsx";

// Fuel Station Dashboard
import FuelStationRegistrationPage from "./pages/FuelStationRegistrationPage";
import FuelStationDashboard from "./components/fuelStation/FuelStationDashboard.jsx";
import FuelStaionOverview from "./components/fuelStation/Overview.jsx";

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
            <Route
              path="/manage-vehicle/:vehicleId"
              element={<ManageVehiclePage />}
            />
            <Route path="/vehicle/:vehicleId/qr" element={<QRCodePage />} />

            {/* Admin Routes */}
            <Route path="/admin-login" element={<AdminLoginForm />} />

            {/* Admin Dashboard with Nested Routes */}
            <Route path="/admin-dashboard" element={<AdminDashboard />}>
              <Route index element={<Overview />} />
                <Route path="overview" element={<Overview />} />
              <Route path="createAdmin" element={<CreateAdmins />} />
              <Route path="view-admins" element={<ViewAdmins />} />
              <Route path="manage-vehicles" element={<ManageVehicles />} />
              <Route path="add-vehicle" element={<AddVehicleForm />} />
              <Route
                path="update-vehicle/:vehicleId"
                element={<UpdateVehicleForm />}
              />
              <Route
                path="manage-fuel-stations"
                element={<ManageFuelStations />}
              />
              <Route path="add-fuel-station" element={<AddFuelStationForm />} />
              <Route
                path="update-fuel-station/:id"
                element={<UpdateFuelStationForm />}
              />
            </Route>

            {/* Fuel Station Routes */}
            <Route
              path="/FuelStation"
              element={<FuelStationRegistrationPage />}
            />
            <Route path="/fuelStation-dashboard" element={<FuelStationDashboard />}>
              <Route index element={<FuelStaionOverview/>} />
              <Route path="overview" element={<FuelStaionOverview />} />
            </Route>

            {/* 404 Page */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </>
    );
}

export default App;
