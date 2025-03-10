import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

import ServerHost from "../../ServerHost.jsx";

const ManageVehiclePage = () => {
    const { vehicleId } = useParams();
    const navigate = useNavigate();
    const [vehicle, setVehicle] = useState({
        registrationNumber: "",
        vehicleModel: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVehicleData = async () => {
            try {
                const response = await axios.get(`${ServerHost}/api/v1/vehicles/get/${vehicleId}`);
                setVehicle(response.data);
            } catch (err) {
                setError("Error fetching vehicle details.");
            } finally {
                setLoading(false);
            }
        };

        fetchVehicleData();
    }, [vehicleId]);

    const handleChange = (e) => {
        setVehicle({ ...vehicle, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`${ServerHost}/api/v1/vehicles/update/${vehicleId}`, vehicle);
            alert("Vehicle updated successfully!");
            navigate(`/vehicle/${vehicleId}`);
        } catch (error) {
            console.error("Error updating vehicle:", error);
            alert("Failed to update vehicle.");
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this vehicle?")) {
            try {
                await axios.delete(`${ServerHost}/api/v1/VehicleForm/deleteData/${vehicleId}`);
                alert("Vehicle deleted successfully!");
                navigate("/dashboard");
            } catch (error) {
                console.error("Error deleting vehicle:", error);
                alert("Failed to delete vehicle.");
            }
        }
    };

    if (loading) return <div className="text-center text-lg font-medium">Loading vehicle details...</div>;
    if (error) return <div className="text-center text-lg font-medium text-red-600">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Dashboard Header */}
            <Header />

            <div className="flex justify-center items-center py-8">
                <div className="p-6 bg-white border border-gray-300 rounded-lg shadow-lg w-full max-w-2xl">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Manage Vehicle</h2>

                    {/* Vehicle Form */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium">License Plate</label>
                            <input
                                type="text"
                                name="licensePlate"
                                value={vehicle.licensePlate}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium">Model</label>
                            <input
                                type="text"
                                name="vehicleModel"
                                value={vehicle.vehicleModel}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex space-x-4">
                        <button
                            onClick={handleUpdate}
                            className="px-5 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
                        >
                            Save Changes
                        </button>
                        <button
                            onClick={handleDelete}
                            className="px-5 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition duration-300 ease-in-out"
                        >
                            Delete Vehicle
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageVehiclePage;
