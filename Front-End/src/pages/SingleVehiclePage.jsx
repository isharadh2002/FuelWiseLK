import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const SingleVehiclePage = () => {
    const { vehicleId } = useParams();
    const [vehicle, setVehicle] = useState(null);
    const [qrCode, setQrCode] = useState(null);
    const [isQrGenerated, setIsQrGenerated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVehicleData = async () => {
            try {
                setLoading(true);
                console.log("Fetching vehicle data for vehicleId:", vehicleId);

                // Fetch vehicle details
                const vehicleResponse = await axios.get(`http://localhost:8080/api/v1/vehicles/${vehicleId}`);
                console.log("Vehicle data response:", vehicleResponse.data);
                setVehicle(vehicleResponse.data);

                // Fetch QR code for the vehicle if it exists
                const qrResponse = await fetch(`http://localhost:8080/api/v1/qr/${vehicleId}`);
                if (qrResponse.ok) {
                    const qrData = await qrResponse.json();
                    setQrCode(qrData); // Set the QR code data
                    setIsQrGenerated(true); // QR code exists, set isQrGenerated to true
                }
            } catch (err) {
                setError("Error loading vehicle details or QR code.");
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchVehicleData();
    }, [vehicleId]);

    const generateQRCode = async () => {
        try {
            console.log("Generating QR code for vehicleId:", vehicleId);
            const response = await axios.post(`http://localhost:8080/api/v1/qr/generate/${vehicleId}`);
            console.log("QR code generated:", response.data);
            setQrCode(response.data);
            setIsQrGenerated(true); // QR code generated successfully
        } catch (error) {
            console.error("Error generating the QR code!", error);
        }
    };

    if (loading) {
        return <div className="text-center text-xl font-semibold">Loading vehicle details...</div>;
    }

    if (error) {
        return <div className="text-center text-xl font-semibold text-red-600">Error: {error}</div>;
    }

    if (!vehicle) {
        return <div className="text-center text-xl font-semibold text-red-600">No vehicle data found.</div>;
    }

    return (
        <div className="w-screen min-h-screen bg-gradient-to-br from-green-100 via-green-300 to-green-500">
            {/* Header Section */}
            <div className="flex justify-between items-center p-6 bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white shadow-lg">
                <h1 className="text-5xl font-extrabold">Vehicle Details</h1>
                <p className="text-lg font-medium">Username: JohnDoe</p>
            </div>

            {/* Vehicle Detail Section */}
            <div className="container mx-auto px-12 py-12 max-w-7xl">
                <div className="p-6 bg-white border-2 border-green-300 rounded-lg shadow-xl">
                    <h2 className="text-2xl font-semibold text-green-700 mb-4">Vehicle ID: {vehicle.vehicleId}</h2>
                    <p className="text-lg text-green-600 mb-4">License Plate: {vehicle.registrationNumber}</p>
                    <p className="text-lg text-green-600 mb-2">Fuel Quota: {vehicle.vehicleFuelQuota}</p>

                    {/* QR Code and Manage Vehicle Section */}
                    <div className="mt-6 flex space-x-4">
                        {!isQrGenerated ? (
                            <button
                                onClick={generateQRCode}
                                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                Generate QR Code
                            </button>
                        ) : (
                            <Link
                                to={`/vehicle/${vehicleId}/qr`}
                                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                View QR Code
                            </Link>
                        )}

                        <Link
                            to={`/manage-vehicle/${vehicleId}`}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Manage Vehicle
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleVehiclePage;
