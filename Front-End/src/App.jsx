
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/common/Header";
import VehicleForm from "./components/vehicle/VehicleForm";


function App() {
  return (
    <Router>
      
      <Routes>

        <Route path="/Home" element={<Header />} />
        <Route path="/VehicleRegister" element={<VehicleForm />} />
        
      </Routes>
    </Router>
  );
}

export default App;
