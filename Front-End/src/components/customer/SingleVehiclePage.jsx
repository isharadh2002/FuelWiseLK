import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

import ServerHost from "../../ServerHost.jsx";

const SingleVehiclePage = () => {
    const { vehicleId } = useParams();
    const [vehicle, setVehicle] = useState(null);
    const [qrCode, setQrCode] = useState(null);
    const [isQrGenerated, setIsQrGenerated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVehicleData = async () => {
            try {
                setLoading(true);
                const vehicleResponse = await axios.get(`${ServerHost}/api/v1/vehicles/get/${vehicleId}`);
                setVehicle(vehicleResponse.data);

                const qrResponse = await fetch(`${ServerHost}/api/v1/qr/${vehicleId}`);
                if (qrResponse.ok) {
                    const qrData = await qrResponse.json();
                    setQrCode(qrData);
                    setIsQrGenerated(true);
                }
            } catch (err) {
                setError("Error loading vehicle details or QR code.");
            } finally {
                setLoading(false);
            }
        };

        fetchVehicleData();
    }, [vehicleId]);

    const generateQRCode = async () => {
        try {
            const response = await axios.post(`${ServerHost}/api/v1/qr/generate/${vehicleId}`);
            setQrCode(response.data);
            setIsQrGenerated(true);
        } catch (error) {
            console.error("Error generating the QR code!", error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this vehicle?")) {
            try {
                await axios.delete(`${ServerHost}/api/v1/VehicleForm/deleteData/${vehicleId}`);
                alert("Vehicle deleted successfully!");
                navigate("/dashboard"); // Navigate to dashboard after successful deletion
            } catch (error) {
                console.error("Error deleting vehicle:", error);
                alert("Failed to delete vehicle.");
            }
        }
    };

    if (loading) {
        return <div className="text-center text-lg font-medium">Loading vehicle details...</div>;
    }

    if (error) {
        return <div className="text-center text-lg font-medium text-red-600">Error: {error}</div>;
    }

    if (!vehicle) {
        return <div className="text-center text-lg font-medium text-red-600">No vehicle data found.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Dashboard Header */}
            <Header />

            <div className="flex justify-center items-center py-8">
                <div className="p-6 bg-white border border-gray-300 rounded-lg shadow-lg w-full max-w-2xl">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Vehicle Details</h2>
                    <div className="space-y-2">
                        <p className="text-gray-700"><span className="font-medium">Vehicle ID:</span> {vehicle.vehicleId}</p>
                        <p className="text-gray-700"><span className="font-medium">License Plate:</span> {vehicle.registrationNumber}</p>
                        <p className="text-gray-700"><span className="font-medium">Fuel Quota:</span> {vehicle.vehicleFuelQuota}</p>
                    </div>

                    <div className="mt-6 flex space-x-4">
                        {!isQrGenerated ? (
                            <button
                                onClick={generateQRCode}
                                className="px-5 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 hover:text-white transition duration-300 ease-in-out"
                            >
                                Generate QR Code
                            </button>
                        ) : (
                            <Link
                                to={`/vehicle/${vehicleId}/qr`}
                                className="px-5 py-2 bg-teal-600 text-white text-sm rounded-lg hover:bg-teal-700 hover:text-white transition duration-300 ease-in-out"
                            >
                                View QR Code
                            </Link>
                        )}

                        {/* Manage Vehicle Button */}
                        <Link
                            to={`/manage-vehicle/${vehicleId}`}
                            className="px-5 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 hover:text-white transition duration-300 ease-in-out"
                        >
                            Manage Vehicle
                        </Link>

                        {/* Delete Vehicle Button */}
                        <button
                            onClick={handleDelete}
                            className="px-5 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 hover:text-white transition duration-300 ease-in-out"
                        >
                            Delete Vehicle
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleVehiclePage;
