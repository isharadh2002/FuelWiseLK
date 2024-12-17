// src/pages/VehicleRegistrationPage.jsx
// eslint-disable-next-line no-unused-vars
import React from "react";
import VehicleForm from "../components/vehicle/VehicleForm";

const VehicleRegistrationPage = () => (
    <div className="container">
        <h1>Vehicle Registration</h1>
        <p>Register your vehicle to receive your fuel quota QR code.</p>
        <VehicleForm/>
    </div>

);

export default VehicleRegistrationPage;
