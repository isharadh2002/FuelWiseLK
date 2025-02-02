import { useState } from "react";
import { Car, Edit, Fuel } from "lucide-react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Alert } from "@mui/material";

const UpdateVehicleForm = ({ vehicle, onUpdate }) => {
  const [licensePlate, setLicensePlate] = useState(vehicle?.licensePlate || "");
  const [vehicleModel, setVehicleModel] = useState(vehicle?.vehicleModel || "");
  const [vehicleFuelQuota, setVehicleFuelQuota] = useState(vehicle?.vehicleFuelQuota || "");
  const [ownerId, setOwnerId] = useState(vehicle?.ownerId || "");
  const [errors, setErrors] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogType, setDialogType] = useState(""); // success or error

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
      // Simulated API call to update vehicle
      console.log("Vehicle updated:", { licensePlate, vehicleModel, vehicleFuelQuota, ownerId });

      // Simulate a successful update
      setDialogTitle("Success");
      setDialogMessage("Vehicle updated successfully.");
      setDialogType("success");
      setDialogOpen(true);

      // Reset form after successful update
      setLicensePlate("");
      setVehicleModel("");
      setVehicleFuelQuota("");
      setOwnerId("");
      
      // Trigger the callback function to update the vehicle in the parent component (if needed)
      onUpdate({ licensePlate, vehicleModel, vehicleFuelQuota, ownerId });

    } catch (error) {
      setDialogTitle("Error");
      setDialogMessage("An error occurred while updating the vehicle.");
      setDialogType("error");
      setDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-r from-green-100 via-green-200 to-green-300">
      <div className="overflow-hidden bg-white bg-opacity-90 shadow-lg w-96 rounded-2xl">
        <div className="p-6 bg-green-500">
          <h2 className="text-2xl font-bold text-white">Update Vehicle</h2>
          <p className="mt-1 text-green-100">Enter updated details to modify the vehicle</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="block text-gray-700">License Plate</label>
            <div className="relative">
              <Car className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type="text"
                className="w-full py-2 pl-10 text-gray-600 placeholder-gray-400 border rounded-lg border-green-200 focus:ring-2 focus:ring-green-200 focus:border-transparent"
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
                className="w-full py-2 pl-10 text-gray-600 placeholder-gray-400 border rounded-lg border-green-200 focus:ring-2 focus:ring-green-200 focus:border-transparent"
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
                className="w-full py-2 pl-10 text-gray-600 placeholder-gray-400 border rounded-lg border-green-200 focus:ring-2 focus:ring-green-200 focus:border-transparent"
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
                className="w-full py-2 pl-3 text-gray-600 placeholder-gray-400 border rounded-lg border-green-200 focus:ring-2 focus:ring-green-200 focus:border-transparent"
                value={ownerId}
                onChange={(e) => setOwnerId(e.target.value)}
                placeholder="Enter owner ID"
              />
            </div>
            {errors.ownerId && <p className="text-sm text-red-500">{errors.ownerId}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-6 text-white transition-all rounded-lg bg-green-500 hover:bg-green-600"
          >
            Update Vehicle
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

export default UpdateVehicleForm;
