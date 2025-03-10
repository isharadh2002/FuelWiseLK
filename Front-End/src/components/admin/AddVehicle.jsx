import { useState } from "react";
import axios from "axios";
import { Car, Edit, Fuel } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Alert } from "@mui/material";

import ServerHost from "../../ServerHost.jsx";

const AddVehicleForm = () => {
  const [licensePlate, setLicensePlate] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleFuelQuota, setVehicleFuelQuota] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [errors, setErrors] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogType, setDialogType] = useState(""); // success or error

  const navigate = useNavigate();

  // Validate form inputs
  const validate = () => {
    const errors = {};
    if (!licensePlate) errors.licensePlate = "License Plate is required";
    if (!vehicleModel) errors.vehicleModel = "Vehicle Model is required";
    if (!vehicleFuelQuota || isNaN(vehicleFuelQuota)) errors.vehicleFuelQuota = "Fuel Quota is required and must be a valid number";
    if (!ownerId) errors.ownerId = "Owner ID is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // API call to add vehicle
      const response = await axios.post(
        `${ServerHost}/api/v1/vehicles/add`,
        {
          licensePlate,
          vehicleModel,
          vehicleFuelQuota,
          ownerId,
        }
      );

      if (response.status === 200) {
        console.log("Vehicle added:", response.data);

        // Simulate a successful submission
        setDialogTitle("Success");
        setDialogMessage("Vehicle added successfully.");
        setDialogType("success");
        setDialogOpen(true);

        // Reset form after successful submission
        setLicensePlate("");
        setVehicleModel("");
        setVehicleFuelQuota("");
        setOwnerId("");

        // Redirect to manage vehicles page
        navigate("/admin-dashboard/manage-vehicles");
      } else {
        throw new Error("Failed to add vehicle");
      }
    } catch (error) {
      setDialogTitle("Error");
      setDialogMessage("An error occurred while adding the vehicle.");
      setDialogType("error");
      setDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-r from-green-100 via-green-200 to-green-300">
      <div className="overflow-hidden bg-white shadow-lg bg-opacity-90 w-96 rounded-2xl">
        <div className="p-6 bg-green-500">
          <h2 className="text-2xl font-bold text-white">Add Vehicle</h2>
          <p className="mt-1 text-green-100">Enter vehicle details to add a new vehicle</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="block text-gray-700">License Plate</label>
            <div className="relative">
              <Car className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type="text"
                className="w-full py-2 pl-10 text-gray-600 placeholder-gray-400 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-transparent"
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
                placeholder="Enter license plate"
              />
            </div>
            {errors.licensePlate && <p className="text-sm text-red-500">{errors.licensePlate}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">Vehicle Model</label>
            <div className="relative">
              <Edit className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type="text"
                className="w-full py-2 pl-10 text-gray-600 placeholder-gray-400 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-transparent"
                value={vehicleModel}
                onChange={(e) => setVehicleModel(e.target.value)}
                placeholder="Enter vehicle model"
              />
            </div>
            {errors.vehicleModel && <p className="text-sm text-red-500">{errors.vehicleModel}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">Vehicle Fuel Quota</label>
            <div className="relative">
              <Fuel className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type="text"
                className="w-full py-2 pl-10 text-gray-600 placeholder-gray-400 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-transparent"
                value={vehicleFuelQuota}
                onChange={(e) => setVehicleFuelQuota(e.target.value)}
                placeholder="Enter fuel quota"
              />
            </div>
            {errors.vehicleFuelQuota && <p className="text-sm text-red-500">{errors.vehicleFuelQuota}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">Owner ID</label>
            <div className="relative">
              <input
                type="text"
                className="w-full py-2 pl-3 text-gray-600 placeholder-gray-400 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-transparent"
                value={ownerId}
                onChange={(e) => setOwnerId(e.target.value)}
                placeholder="Enter owner ID"
              />
            </div>
            {errors.ownerId && <p className="text-sm text-red-500">{errors.ownerId}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-6 text-white transition-all bg-green-500 rounded-lg hover:bg-green-600"
          >
            Add Vehicle
          </button>
        </form>
      </div>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle
          style={{
            textAlign: "center",
            fontSize: "1.8rem",
            fontWeight: "bold",
            color: dialogType === "success" ? "#4caf50" : "#f44336",
          }}
        >
          {dialogTitle}
        </DialogTitle>
        <DialogContent>
          <Alert
            severity={dialogType}
            style={{
              borderRadius: "20px",
              padding: "20px",
              fontSize: "1rem",
              fontWeight: "600",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            {dialogMessage}
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddVehicleForm;
