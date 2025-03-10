import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Alert,
} from "@mui/material";
import { useParams } from "react-router-dom";

import ServerHost from "../../ServerHost.jsx";

const AddFuelStationForm = () => {
  const [stationName, setStationName] = useState("");
  const [stationLocation, setStationLocation] = useState("");
  const [stationContact, setStationContact] = useState("");
  const [userId, setUserId] = useState("");
  const [stationID, setStationID] = useState(null); // Add state for stationID
  const [errors, setErrors] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogType, setDialogType] = useState(""); // success or error

  const navigate = useNavigate();
  const { stationId } = useParams();

  // Validate form inputs
  const validate = () => {
    const errors = {};
    if (!stationName) errors.stationName = "Station Name is required";
    if (!stationLocation)
      errors.stationLocation = "Station Location is required";
    if (!stationContact) errors.stationContact = "Station Contact is required";
    if (!userId) errors.userId = "User ID is required";
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
      // API call to add fuel station
      const response = await axios.post(
        `${ServerHost}/api/v1/FuelStation/save`,
        {
          stationName,
          stationLocation,
          stationContact,
          userID: parseInt(userId, 10),
        }
      );

      console.log("Sending data:", {
        stationName,
        stationLocation,
        stationContact,
        userID: parseInt(userId, 10),
      });

      if (response.data?.message === "Fuel Station added successfully") {
        console.log("Fuel Station added:", response.data);

        // Simulate a successful submission
        setDialogTitle("Success");
        setDialogMessage("Fuel Station added successfully.");
        setDialogType("success");
        setDialogOpen(true);

        // Reset form after successful submission
        setStationName("");
        setStationLocation("");
        setStationContact("");
        setUserId("");

        setTimeout(() => {
          navigate("/admin-dashboard/manage-fuel-stations"); // ✅ Correct navigation
        }, 2000); // ✅ Wait 2 seconds before navigating
      } else {
        throw new Error("Failed to add fuel station");
      }
    } catch (error) {
      setDialogTitle("Error");
      setDialogMessage("An error occurred while adding the fuel station.");
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
        <div className="p-6 bg-gradient-to-r from-green-500 to-green-600">
          <h2 className="text-2xl font-bold text-white">Add Fuel Station</h2>
          <p className="mt-1 text-green-100">
            Enter fuel station details to add a new station
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="block text-gray-700">Station Name</label>
            <input
              type="text"
              className="w-full py-2 pl-4 text-gray-600 placeholder-gray-400 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-transparent"
              value={stationName}
              onChange={(e) => setStationName(e.target.value)}
              placeholder="Enter station name"
            />
            {errors.stationName && (
              <p className="text-sm text-red-500">{errors.stationName}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">Station Location</label>
            <input
              type="text"
              className="w-full py-2 pl-4 text-gray-600 placeholder-gray-400 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-transparent"
              value={stationLocation}
              onChange={(e) => setStationLocation(e.target.value)}
              placeholder="Enter station location"
            />
            {errors.stationLocation && (
              <p className="text-sm text-red-500">{errors.stationLocation}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">Station Contact</label>
            <input
              type="text"
              className="w-full py-2 pl-4 text-gray-600 placeholder-gray-400 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-transparent"
              value={stationContact}
              onChange={(e) => setStationContact(e.target.value)}
              placeholder="Enter station contact"
            />
            {errors.stationContact && (
              <p className="text-sm text-red-500">{errors.stationContact}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">User ID</label>
            <input
              type="text"
              className="w-full py-2 pl-4 text-gray-600 placeholder-gray-400 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-transparent"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter user ID"
            />
            {errors.userId && (
              <p className="text-sm text-red-500">{errors.userId}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-6 text-white transition-all rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
          >
            Add Fuel Station
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

export default AddFuelStationForm;
