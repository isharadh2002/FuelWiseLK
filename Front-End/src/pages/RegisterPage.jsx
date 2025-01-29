import { useState } from "react";
import axios from "axios";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";  // Import the useNavigate hook

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    ownerName: "",
    ownerPhone: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogType, setDialogType] = useState(""); // success or error
  const navigate = useNavigate();  // Initialize the navigate hook

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateFields = () => {
    let isValid = true;

    if (!formData.ownerName) {
      setDialogTitle("Validation Error");
      setDialogMessage("Owner name is required.");
      setDialogType("error");
      setDialogOpen(true);
      isValid = false;
    } else if (!/^\d+$/.test(formData.ownerPhone)) {
      setDialogTitle("Validation Error");
      setDialogMessage("Phone number must contain only digits.");
      setDialogType("error");
      setDialogOpen(true);
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      setDialogTitle("Validation Error");
      setDialogMessage("Passwords do not match.");
      setDialogType("error");
      setDialogOpen(true);
      isValid = false;
    } else if (!formData.termsAccepted) {
      setDialogTitle("Validation Error");
      setDialogMessage("You must accept the terms and conditions.");
      setDialogType("error");
      setDialogOpen(true);
      isValid = false;
    }

    return isValid;
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    if (!validateFields()) return;

    try {
      await axios.post("http://localhost:8080/api/v1/User/save", {
        userName: formData.ownerName,
        phone: formData.ownerPhone,
        email: formData.email,
        password: formData.password,
        role: "vehicle_owner",
        stationName: "",
        contact: "",
        location: "",
      });
      setDialogTitle("Registration Successful");
      setDialogMessage("Your registration is complete.");
      setDialogType("success");
      setDialogOpen(true);

      // Redirect to login page after successful registration
      setTimeout(() => {
        navigate("/login");  // Adjust the path if needed
      }, 2000);  // Wait 2 seconds before redirecting
    } catch (error) {
      setDialogTitle("Registration Failed");
      setDialogMessage("An error occurred. Please try again.");
      setDialogType("error");
      setDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-br from-green-100 via-teal-200 to-green-500">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl sm:w-[26rem]">
        <h2 className="mb-6 text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-500">
          User Registration
        </h2>

        <form onSubmit={handleRegister}>
          <div className="mb-6">
            <label htmlFor="ownerName" className="block mb-2 text-sm font-semibold text-gray-700">
              Owner Name
            </label>
            <input
              type="text"
              id="ownerName"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleInputChange}
              placeholder="Enter owner name"
              className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-4 focus:ring-green-400 focus:outline-none hover:shadow-md"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="ownerPhone" className="block mb-2 text-sm font-semibold text-gray-700">
              Owner Phone
            </label>
            <input
              type="text"
              id="ownerPhone"
              name="ownerPhone"
              value={formData.ownerPhone}
              onChange={handleInputChange}
              placeholder="Enter owner phone"
              className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-4 focus:ring-green-400 focus:outline-none hover:shadow-md"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-4 focus:ring-green-400 focus:outline-none hover:shadow-md"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-4 focus:ring-green-400 focus:outline-none hover:shadow-md"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-semibold text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
              className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-4 focus:ring-green-400 focus:outline-none hover:shadow-md"
              required
            />
          </div>

          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="termsAccepted"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleInputChange}
              className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-400"
              required
            />
            <label htmlFor="termsAccepted" className="ml-2 text-sm text-gray-600">
              I accept the Terms and Conditions
            </label>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-teal-500 rounded-lg shadow-md hover:from-teal-500 hover:to-green-500 focus:ring-4 focus:ring-green-400"
          >
            Register
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

export default RegistrationForm;
