import React from "react";
import VehicleForm from "./VehicleForm";

const VehicleRegistrationPage = () => (
    <div className="container" style={divStyles}>
        <h1>Vehicle Registration</h1>
        <p>Register your vehicle to receive your fuel quota QR code.</p>
        <VehicleForm/>
    </div>

);

export default VehicleRegistrationPage;


const divStyles = {
    color: '#000',
    fontSize: '1.2rem',
    flexGrow: 1,
    flexShrink: 1
}