import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import ServerHost from "../../ServerHost.jsx";

const ManageVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();

  // Fetch vehicles from backend
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(
          `${ServerHost}/api/v1/vehicles/all`
        );
        console.log("API Response:", response.data);

        if (Array.isArray(response.data)) {
          setVehicles(response.data);
        } else {
          setVehicles([]);
        }
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        setVehicles([]);
      }
    };

    fetchVehicles();
  }, []);

  // Navigate to the update page for a vehicle
  const handleEdit = (vehicleId) => {
    navigate(`/admin-dashboard/update-vehicle/${vehicleId}`);
  };

  // Delete vehicle from the backend and update state
  const handleDelete = async (vehicleId) => {
    try {
      await axios.delete(
        `${ServerHost}/api/v1/vehicles/delete/${vehicleId}`
      );
      setVehicles((prevVehicles) =>
        prevVehicles.filter((vehicle) => vehicle.vehicleId !== vehicleId)
      );
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-green-50">
      <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-center text-green-600">
          Manage Vehicles
        </h1>
        <button
          onClick={() => navigate("/admin-dashboard/add-vehicle")}
          className="px-6 py-3 mb-6 text-white bg-green-500 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Add Vehicle
        </button>
        <table className="w-full text-black border border-collapse border-gray-300">
          <thead>
            <tr className="bg-green-200">
              <th className="px-4 py-2 border">Vehicle Number</th>
              <th className="px-4 py-2 border">Owner</th>
              <th className="px-4 py-2 border">Quota</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(vehicles) && vehicles.length > 0 ? (
              vehicles.map((vehicle) => (
                <tr
                  key={vehicle.vehicleId}
                  className="odd:bg-white even:bg-green-50"
                >
                  <td className="px-4 py-2 border">
                    {vehicle.registrationNumber}
                  </td>
                  <td className="px-4 py-2 border">{vehicle.ownerName}</td>
                  <td className="px-4 py-2 border">
                    {vehicle.vehicleFuelQuota}
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleEdit(vehicle.vehicleId)}
                      className="px-2 py-1 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(vehicle.vehicleId)}
                      className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-2 text-center">
                  No vehicles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageVehicles;
