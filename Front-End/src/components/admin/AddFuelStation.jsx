import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Alert } from "@mui/material";

const AddFuelStationForm = () => {
  const [stationName, setStationName] = useState("");
  const [stationLocation, setStationLocation] = useState("");
  const [stationContact, setStationContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [errors, setErrors] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogType, setDialogType] = useState(""); // success or error

  // Validate email format
  const isValidEmail = (email) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
  };

  // Validate form inputs
  const validate = () => {
    const errors = {};
    if (!stationName) errors.stationName = "Station Name is required";
    if (!stationLocation) errors.stationLocation = "Station Location is required";
    if (!stationContact) errors.stationContact = "Station Contact is required";
    if (!email) errors.email = "Email is required";
    else if (!isValidEmail(email)) errors.email = "Invalid email format";
    if (!password) errors.password = "Password is required";
    if (!confirmPassword) errors.confirmPassword = "Confirm Password is required";
    else if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match";
    if (!phone) errors.phone = "Phone Number is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const registrationData = {
      userName: stationName, // Using stationName as userName like Flutter
      email,
      password,
      phone,
      role: "fuel_station",
      stationName,
      contact: stationContact,
      location: stationLocation,
    };

    try {
      const response = await fetch("http://localhost:8080/api/v1/User/RegMobileUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registrationData),
      });

      const data = await response.text();
      console.log("Response:", data);

      if (response.ok && data.includes("Fuel Station Owner registered successfully")) {
        setDialogTitle("Success");
        setDialogMessage("Fuel Station registered successfully.");
        setDialogType("success");
        setDialogOpen(true);

        // Reset form
        setStationName("");
        setStationLocation("");
        setStationContact("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setPhone("");
      } else {
        setDialogTitle("Error");
        setDialogMessage("Registration failed. " + (data || ""));
        setDialogType("error");
        setDialogOpen(true);
      }
    } catch (error) {
      setDialogTitle("Error");
      setDialogMessage("An error occurred while registering the fuel station.");
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
        <div className="p-6 bg-gradient-to-r from-green-500 to-green-600">
          <h2 className="text-2xl font-bold text-white">Register Fuel Station</h2>
          <p className="mt-1 text-green-100">Enter details to register</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {[
            { label: "Station Name", value: stationName, setter: setStationName, error: errors.stationName },
            { label: "Station Location", value: stationLocation, setter: setStationLocation, error: errors.stationLocation },
            { label: "Station Contact", value: stationContact, setter: setStationContact, error: errors.stationContact },
            { label: "Email", value: email, setter: setEmail, error: errors.email },
            { label: "Password", value: password, setter: setPassword, error: errors.password, type: "password" },
            { label: "Confirm Password", value: confirmPassword, setter: setConfirmPassword, error: errors.confirmPassword, type: "password" },
            { label: "Phone Number", value: phone, setter: setPhone, error: errors.phone },
          ].map(({ label, value, setter, error, type = "text" }) => (
            <div key={label} className="space-y-2">
              <label className="block text-gray-700">{label}</label>
              <input
                type={type}
                className="w-full py-2 pl-4 text-gray-600 placeholder-gray-400 border rounded-lg border-green-200 focus:ring-2 focus:ring-green-200 focus:border-transparent"
                value={value}
                onChange={(e) => setter(e.target.value)}
                placeholder={`Enter ${label.toLowerCase()}`}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-2 mt-6 text-white transition-all rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
          >
            Register Fuel Station
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
