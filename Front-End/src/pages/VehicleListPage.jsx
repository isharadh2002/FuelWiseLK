import React from "react";
import { Link } from "react-router-dom";

const VehicleRegistrationPage = ({ vehicles }) => {
    return (
        <div className="min-h-screen bg-white p-6">
            <h1 className="text-3xl font-bold text-green-800 mb-6">My Vehicles</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vehicles.map((vehicle) => (
                    <div key={vehicle.id} className="p-4 border-2 border-green-300 rounded-lg">
                        <h2 className="text-xl font-semibold text-green-700">Vehicle ID: {vehicle.id}</h2>
                        <p className="text-green-600">Model: {vehicle.model}</p>
                        <p className="text-green-600">License Plate: {vehicle.licensePlate}</p>
                        <Link
                            to={`/vehicle/${vehicle.id}/qr`}
                            className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                        >
                            View QR Code
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VehicleRegistrationPage;
