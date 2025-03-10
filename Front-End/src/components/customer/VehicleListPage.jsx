import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ServerHost from "../../ServerHost.jsx";

const VehicleListPage = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [qrCodes, setQrCodes] = useState({});

    const ownerID = localStorage.getItem("ownerId");

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await fetch(`${ServerHost}/api/v1/vehicles/getAllByOwnerID/${ownerID}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch vehicles");
                }
                const data = await response.json();
                setVehicles(data);

                const qrCodePromises = data.map(async (vehicle) => {
                    const qrResponse = await fetch(`${ServerHost}/api/v1/qr/${vehicle.vehicleId}`);
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
        return <div className="text-center text-base font-medium">Loading vehicles...</div>;
    }

    if (error) {
        return <div className="text-center text-base font-medium text-red-600">Error: {error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl"> {/* Adjusted padding */}
            {vehicles.length > 0 ? (
                vehicles.map((vehicle) => (
                    <div
                        key={vehicle.vehicleId}
                        className="flex justify-between items-center p-4 bg-white border border-gray-300 rounded-lg shadow-sm mb-4 hover:shadow-md transition-all ease-in-out"
                    >
                        {/* Vehicle Details */}
                        <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
                            <div className="text-sm font-medium text-teal-600">Vehicle ID: {vehicle.vehicleId}</div>
                            <div className="text-sm text-gray-700">Reg. No: {vehicle.registrationNumber}</div>
                            <div className="text-sm text-gray-700">Vehicle Model: {vehicle.vehicleModel}</div>
                            <div className="text-sm text-gray-700">Fuel Quota: {vehicle.vehicleFuelQuota}</div>
                        </div>

                        {/* Buttons Section */}
                        <div className="flex space-x-3">
                            <Link
                                to={`/vehicle/${vehicle.vehicleId}`}
                                className="px-5 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                View Vehicle
                            </Link>
                            {qrCodes[vehicle.vehicleId] ? (
                                // If QR code exists, show View QR Code button
                                <Link
                                    to={`/vehicle/${vehicle.vehicleId}/qr`}
                                    className="px-5 py-2 bg-teal-600 text-white text-sm rounded-lg hover:bg-teal-700 hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
                                >
                                    View QR Code
                                </Link>
                            ) : (
                                // If no QR code, show Generate QR Code button
                                <button
                                    onClick={async () => {
                                        const response = await fetch(`${ServerHost}/api/v1/qr/generate/${vehicle.vehicleId}`, { method: 'POST' });
                                        if (response.ok) {
                                            setQrCodes(prevState => ({
                                                ...prevState,
                                                [vehicle.vehicleId]: { qrCodeGenerated: true }
                                            }));
                                        }
                                    }}
                                    className="px-5 py-2 bg-yellow-600 text-white text-sm rounded-lg hover:bg-yellow-700 hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
                                >
                                    Generate QR Code
                                </button>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center text-base font-medium">No vehicles found.</div>
            )}
        </div>
    );
};

export default VehicleListPage;
