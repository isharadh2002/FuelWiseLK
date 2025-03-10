import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Global} from "@emotion/react";
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
import Services from "./pages/Services.jsx";
import PageNotFound from "./pages/PageNotFound";
import FuelStationRegistrationPage from "./pages/FuelStationRegistrationPage";

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
import UpdateAdmin from "./components/admin/UpdateAdmin.jsx";
import ManageFuelQuota from "./components/admin/ManageFuelQuota.jsx";

// Fuel Station Dashboard
import FuelStationRegistrationPageNew from "./pages/FuelStationRegistrationPage";
import FuelStationDashboard from "./components/fuelStation/FuelStationDashboard.jsx";
import FuelStationOverview from "./components/fuelStation/Overview.jsx";
import FuelStationProfileView from "./components/fuelStation/FuelStationProfileDetails.jsx";
import ManageFuelStationProfile from "./components/fuelStation/ManageFuelStationProfile.jsx";
import FuelTransactionDetails from "./components/fuelStation/FuelTransactionDetails.jsx";
import ServerHost from "./ServerHost.jsx";

console.log("Server Host : " + ServerHost);

function App() {
    return (
      <>
        <Router>
          <Global styles={globalStyles} />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/footer" element={<Footer />} />

            {/* Fuel Station Registration NEW*/}
            <Route
              path="/fuel-registration"
              element={<FuelStationRegistrationPageNew />}
            />

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
              <Route path="update-admin/:adminId" element={<UpdateAdmin />} />
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
                path="update-fuel-station/:stationId"
                element={<UpdateFuelStationForm />}
              />
              <Route path="manage-fuel-quota" element={<ManageFuelQuota />} />
            </Route>

            {/* Fuel Station Routes */}
            <Route
              path="/FuelStation"
              element={<FuelStationRegistrationPage />}
            />
            <Route
              path="/fuelStation-dashboard"
              element={<FuelStationDashboard />}
            >
              <Route index element={<FuelStationOverview />} />
              <Route path="overview" element={<FuelStationOverview />} />
              <Route path="profile" element={<FuelStationProfileView />} />
              <Route
                path="manage-profile"
                element={<ManageFuelStationProfile />}
              />
              <Route
                path="fuel-transactions"
                element={<FuelTransactionDetails />}
              />
            </Route>

            {/* 404 Page */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </>
    );
}

export default App;
