import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VehicleRegistrationPage from "./pages/VehicleRegistrationPage";
import Header from "./components/common/Header";

function App() {
  return (
    <Router>
      
      <Routes>

        <Route path="/Home" element={<Header />} />
        <Route path="/" element={<VehicleRegistrationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
