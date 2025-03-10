import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation , useParams } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Alert,
} from "@mui/material";

import ServerHost from "../../ServerHost.jsx";

const UpdateFuelStationForm = () => {
  const [stationData, setStationData] = useState({
    stationName: "",
    stationLocation: "",
    stationContact: "",
    userId: "",
  });
  const [errors, setErrors] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogType, setDialogType] = useState(""); // success or error
  const navigate = useNavigate();


  const { stationId } = useParams();

  
  useEffect(() => {
    
    if (!stationId) {
      console.error("Error: stationId is undefined.");
      return;
    }

    const fetchStationData = async () => {
      try {
        const response = await axios.get(
          `${ServerHost}/api/v1/FuelStation/getByID/${stationId}`
        );
        setStationData(response.data);
      } catch (error) {
        console.error("Error fetching station data:", error);
      }
    };

    fetchStationData();
  }, [stationId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${ServerHost}/api/v1/FuelStation/update/${stationId}`,
        stationData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Simulate a successful update
      setDialogTitle("Success");
      setDialogMessage("Fuel station updated successfully.");
      setDialogType("success");
      setDialogOpen(true);

      // Reset the form
      setStationData({
        stationName: "",
        stationLocation: "",
        stationContact: "",
        userId: "",
      });

      // Redirect to manage fuel station page after a delay
      setTimeout(() => {
        navigate("/admin-dashboard/manage-fuel-stations");
      }, 2000);
    } catch (error) {
      console.error("Error updating fuel station:", error);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-r from-green-100 via-green-200 to-green-300">
      <div className="overflow-hidden bg-white shadow-lg bg-opacity-90 w-96 rounded-2xl">
        <div className="p-6 bg-green-500">
          <h2 className="text-2xl font-bold text-white">Update Fuel Station</h2>
          <p className="mt-1 text-green-100">
            Enter updated details to modify the fuel station
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="block text-gray-700">Station Name</label>
            <input
              type="text"
              name="stationName"
              className="w-full py-2 pl-3 text-gray-600 placeholder-gray-400 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-transparent"
              value={stationData.stationName}
              onChange={handleInputChange}
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
              name="stationLocation"
              className="w-full py-2 pl-3 text-gray-600 placeholder-gray-400 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-transparent"
              value={stationData.stationLocation}
              onChange={handleInputChange}
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
              name="stationContact"
              className="w-full py-2 pl-3 text-gray-600 placeholder-gray-400 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-transparent"
              value={stationData.stationContact}
              onChange={handleInputChange}
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
              name="userId"
              className="w-full py-2 pl-3 text-gray-600 placeholder-gray-400 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-transparent"
              value={stationData.userId}
              onChange={handleInputChange}
              placeholder="Enter user ID"
            />
            {errors.userId && (
              <p className="text-sm text-red-500">{errors.userId}</p>
            )}
          </div>

          <button
            type="submit"
            className="px-4 py-2 text-white bg-green-500 rounded-lg"
          >
            Update Fuel Station
          </button>
        </form>

        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogContent>
            <Alert severity={dialogType}>{dialogMessage}</Alert>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default UpdateFuelStationForm;
