import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const VehicleListPage = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [qrCodes, setQrCodes] = useState({}); // Store the state of QR codes for vehicles

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/v1/vehicles");
                if (!response.ok) {
                    throw new Error("Failed to fetch vehicles");
                }
                const data = await response.json();
                setVehicles(data);

                const qrCodePromises = data.map(async (vehicle) => {
                    const qrResponse = await fetch(`http://localhost:8080/api/v1/qr/${vehicle.vehicleId}`);
                    if (qrResponse.ok) {
                        const qrData = await qrResponse.json();
                        return { vehicleId: vehicle.vehicleId, qrCode: qrData };
                    }
                    return { vehicleId: vehicle.vehicleId, qrCode: null };
                });

                const qrCodeResults = await Promise.all(qrCodePromises);
                const qrCodeMap = qrCodeResults.reduce((acc, { vehicleId, qrCode }) => {
                    acc[vehicleId] = qrCode;
                    return acc;
                }, {});
                setQrCodes(qrCodeMap);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchVehicles();
    }, []);

    if (loading) {
        return <div className="text-center text-xl font-semibold">Loading vehicles...</div>;
    }

    if (error) {
        return <div className="text-center text-xl font-semibold text-red-600">Error: {error}</div>;
    }

    return (
        <div className="w-screen min-h-screen bg-gradient-to-br from-green-100 via-green-300 to-green-500">
            {/* Header Section */}
            <div className="flex justify-between items-center p-6 bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white shadow-lg">
                <h1 className="text-5xl font-extrabold">My Vehicles</h1>
                <p className="text-lg font-medium">Username: JohnDoe</p>
            </div>

            {/* Vehicle List Section */}
            <div className="container mx-auto px-12 py-12 max-w-7xl"> {/* Wider container */}
                {vehicles.length > 0 ? (
                    vehicles.map((vehicle) => (
                        <div
                            key={vehicle.vehicleId}
                            className="flex justify-between items-center p-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl mb-6 hover:shadow-2xl transition-all ease-in-out"
                        >
                            {/* Vehicle Details */}
                            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                                <div className="text-xl font-semibold text-teal-600">Vehicle ID: {vehicle.vehicleId}</div>
                                <div className="text-lg text-gray-700">Owner: {vehicle.ownerName}</div>
                                <div className="text-lg text-gray-700">Reg. No: {vehicle.registrationNumber}</div>
                                <div className="text-lg text-gray-700">Fuel Quota: {vehicle.vehicleFuelQuota}</div>
                            </div>

                            {/* Buttons Section */}
                            <div className="flex space-x-4">
                                <Link
                                    to={`/vehicle/${vehicle.vehicleId}`}
                                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105"
                                >
                                    View Vehicle
                                </Link>
                                {qrCodes[vehicle.vehicleId] ? (
                                    // If QR code exists, show View QR Code button
                                    <Link
                                        to={`/vehicle/${vehicle.vehicleId}/qr`}
                                        className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition duration-300 ease-in-out transform hover:scale-105"
                                    >
                                        View QR Code
                                    </Link>
                                ) : (
                                    // If no QR code, show Generate QR Code button
                                    <button
                                        onClick={async () => {
                                            const response = await fetch(`http://localhost:8080/api/v1/qr/generate/${vehicle.vehicleId}`, { method: 'POST' });
                                            if (response.ok) {
                                                setQrCodes(prevState => ({
                                                    ...prevState,
                                                    [vehicle.vehicleId]: { qrCodeGenerated: true }
                                                }));
                                            }
                                        }}
                                        className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition duration-300 ease-in-out transform hover:scale-105"
                                    >
                                        Generate QR Code
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-xl font-semibold">No vehicles found.</div>
                )}
            </div>
        </div>
    );
};

export default VehicleListPage;
