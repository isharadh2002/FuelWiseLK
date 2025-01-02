import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import { Global } from '@emotion/react';
import globalStyles from './styles/global';
import LoginForm from './pages/LoginPage';
import RegisterPage from "./pages/RegisterPage";
import PageNotFound from "./pages/PageNotFound";
import VehicleForm from "./pages/VehicleForm";
import AdminDashboard from "./components/admin/AdminDashboard";
function App() {
    return (
      <>
        <Router>
          <Global styles={globalStyles} />
          
          <Routes>
              <Route path="/m" element={<AdminDashboard/>}/>
              <Route path="/VehicleRegister" element={<VehicleForm />} />           
              <Route path="/home" element={<Header />} />
              <Route path="/register" element={<RegisterPage />} />
             
              <Route path="/footer" element={<Footer />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="*" element={<PageNotFound/>} />
            </Routes>
            
        </Router>
      </>
    );
}


export default App;
