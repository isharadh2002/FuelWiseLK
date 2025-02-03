import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VehicleRegistrationPage from "./pages/VehicleRegistrationPage.jsx";
import Footer from "./components/common/Footer";
import { Global } from '@emotion/react';
import globalStyles from './styles/global';
import LoginForm from './pages/LoginPage';
import RegistrationForm from "./pages/RegisterPage";
import PageNotFound from "./pages/PageNotFound";
import FuelStationRegistrationPage from "./pages/FuelStationRegistrationPage";
import Terms from "./pages/Terms";
import About from "./pages/About";
import ContactUs from "./pages/Contact";
import Home from "./pages/Home.jsx";
import VehicleForm from "./pages/VehicleForm.jsx";
import AdminDashboard from "./components/admin/AdminDashboard";
import CreateAdmins from "./components/admin/CreateAdmins";
import ManageFuelStations from "./components/admin/ManageFuelStations.jsx";
import ManageVehicles from "./components/admin/ManageVehicles.jsx";
import CustomerDashboard from "./components/customer/CustomerDashboard";
import ViewAdmins from "./components/admin/ViewAdmins";
<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
>>>>>>> Stashed changes
import SingleVehiclePage from "./components/customer/SingleVehiclePage";
import ManageVehiclePage from "./components/customer/ManageVehiclePage.jsx";
import QRCodePage from "./components/customer/QrCodePage.jsx";
import AddVehicleForm from "./components/admin/AddVehicle.jsx";
import UpdateVehicleForm from "./components/admin/UpdateVehicle.jsx";
import UpdateFuelStationForm from "./components/admin/UpdatefuelStation.jsx";
import AddFuelStationForm from "./components/admin/AddFuelStation.jsx";

// import QTY from "./pages/QTY.jsx";
<<<<<<< Updated upstream
=======
=======
import FuelStationDashBoard from "./components/fuelStation/FuelStationDashBoard.jsx";
import AdminLoginForm from "./pages/AdminLoginPage.jsx";
// import QTY from "./pages/QTY.jsx"; 
>>>>>>> Stashed changes
>>>>>>> Stashed changes

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
                <Route path="/add-vehicle" element={<AddVehicleForm />} />
                <Route path="/update-vehicle" element={<UpdateVehicleForm />} />

                <Route
                  path="/manage-fuel-stations" element={<ManageFuelStations />}
                />
                  <Route
                  path="/add-fuel-station" element={<AddFuelStationForm />}
                />
                  <Route
                  path="/update-fuel-station" element={<UpdateFuelStationForm />}
                />
                <Route path="/Viewadmins" element={<ViewAdmins />} />
                {/* <Route path={"/qa"} element={<QTY/>}/> */}

                {/* Customer Routes */}
                <Route path="/dashboard" element={<CustomerDashboard />} />
                <Route path="/VehicleRegister" element={<VehicleForm />} />
<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
=======
                <Route path="/vehicles" element={<VehicleListpage />} />
                <Route path="/fuelStation/login/dashboard" element={<FuelStationDashBoard/>}/>
>>>>>>> Stashed changes
>>>>>>> Stashed changes
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
