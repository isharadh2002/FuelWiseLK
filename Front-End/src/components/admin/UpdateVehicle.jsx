import React, { useState, useEffect } from "react";
import axios from "axios";
import { Car } from "lucide-react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import ServerHost from "../../ServerHost.jsx";

const UpdateVehicleForm = () => {
  
  const { vehicleId } = useParams(); // Retrieve vehicleId from the URL

  const [vehicleData, setVehicleData] = useState({
    licensePlate: "",
    vehicleModel: "",
    vehicleFuelQuota: "",
    ownerId: "",
  });
  const [errors, setErrors] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!vehicleId) {
      console.error("vehicleId is undefined, cannot fetch vehicle data.");
      return;
    }
    // Fetch vehicle data based on vehicleId for updating
    const fetchVehicleData = async () => {
      try {
        const response = await axios.get(
          `${ServerHost}/api/v1/vehicles/get/${vehicleId}`
        );
        setVehicleData(response.data);
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      }
    };

    fetchVehicleData();
  }, [vehicleId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicleData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${ServerHost}/api/v1/vehicles/update/${vehicleId}`,
        vehicleData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Simulate a successful update
      setDialogTitle("Success");
      setDialogMessage("Vehicle updated successfully.");
      setDialogType("success");
      setDialogOpen(true);

      // Reset the form
      setVehicleData({
        licensePlate: "",
        vehicleModel: "",
        vehicleFuelQuota: "",
        ownerId: "",
      });

      const timer = setTimeout(() => {
        navigate("/admin-dashboard/manage-vehicles");
      }, 2000);

      return () => clearTimeout(timer); // Cleanup timeout if component unmounts
      
    } catch (error) {
      console.error("Error updating vehicle:", error);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-r from-green-100 via-green-200 to-green-300">
      <div className="overflow-hidden bg-white shadow-lg bg-opacity-90 w-96 rounded-2xl">
        <div className="p-6 bg-green-500">
          <h2 className="text-2xl font-bold text-white">Update Vehicle</h2>
          <p className="mt-1 text-green-100">
            Enter updated details to modify the vehicle
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="block text-gray-700">License Plate</label>
            <div className="relative">
              <Car className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type="text"
                name="licensePlate"
                className="w-full py-2 pl-10 text-gray-600 placeholder-gray-400 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-transparent"
                value={vehicleData.licensePlate}
                onChange={handleInputChange}
                placeholder="Enter license plate"
              />
            </div>
            {errors.licensePlate && (
              <p className="text-sm text-red-500">{errors.licensePlate}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">Vehicle Model</label>
            <div className="relative">
              <Car className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type="text"
                name="vehicleModel"
                className="w-full py-2 pl-10 text-gray-600 placeholder-gray-400 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-transparent"
                value={vehicleData.vehicleModel}
                onChange={handleInputChange}
                placeholder="Enter vehicle model"
              />
            </div>
            {errors.vehicleModel && (
              <p className="text-sm text-red-500">{errors.vehicleModel}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">Vehicle Fuel Quota</label>
            <div className="relative">
              <Car className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type="text"
                name="vehicleFuelQuota"
                className="w-full py-2 pl-10 text-gray-600 placeholder-gray-400 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-transparent"
                value={vehicleData.vehicleFuelQuota}
                onChange={handleInputChange}
                placeholder="Enter vehicle fuel quota"
              />
            </div>
            {errors.vehicleFuelQuota && (
              <p className="text-sm text-red-500">{errors.vehicleFuelQuota}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">Owner ID</label>
            <div className="relative">
              <Car className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type="text"
                name="ownerId"
                className="w-full py-2 pl-10 text-gray-600 placeholder-gray-400 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-transparent"
                value={vehicleData.ownerId}
                onChange={handleInputChange}
                placeholder="Enter owner ID"
              />
            </div>
            {errors.ownerId && (
              <p className="text-sm text-red-500">{errors.ownerId}</p>
            )}
          </div>

          <button
            type="submit"
            className="px-4 py-2 text-white bg-green-500 rounded-lg"
          >
            Update Vehicle
          </button>
        </form>

        {dialogOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h2
                className={`text-2xl font-bold ${dialogType === "success" ? "text-green-500" : "text-red-500"}`}
              >
                {dialogTitle}
              </h2>
              <p className="mt-2">{dialogMessage}</p>
              <button
                onClick={handleCloseDialog}
                className="px-4 py-2 mt-4 text-white bg-green-500 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateVehicleForm;
