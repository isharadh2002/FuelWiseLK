import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Alert,
} from "@mui/material";

import ServerHost from "../ServerHost.jsx";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogType, setDialogType] = useState(""); // Track success or error
  const navigate = useNavigate();

  const validateFields = () => {
    let isValid = true;

    // Email validation
    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Password validation
    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (password.length < 5) {
      setPasswordError("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  async function login(event) {
    event.preventDefault();

    if (!validateFields()) {
      return;
    }

    try {
      const response = await axios.post(
        `${ServerHost}/api/v1/User/login`,
        {
          email: email,
          password: password,
        }
      );

      const res = response.data;

      if (res.message === "Email not exists") {
        setDialogTitle("Login Failed");
        setDialogMessage("Email does not exist.");
        setDialogType("error");
        setDialogOpen(true);
      } else if (res.message === "Login Success") {
        const userId = res.userId;
        const userRole = res.role; // Get the user role

        if (userId && userRole) {
          
            localStorage.setItem("userId", userId);
            localStorage.setItem("userRole", userRole); // Store role in localStorage

          if(userRole === 'fuel_station'){
            try {
              const response = await axios.get(
                  `${ServerHost}/api/v1/FuelStation/getStationID/${userId}`
              );

              const stationId = response.data; // Since response is a raw integer
              localStorage.setItem("stationId", stationId); // Store in localStorage

              console.log("Fuel Station ID:", stationId); // Debugging log

              // Additional logic can go here if needed

            } catch (error) {
              console.error("Failed to fetch fuel station ID:", error);

              setDialogTitle("Error");
              setDialogMessage("Unable to retrieve Fuel Station ID. Please try again.");
              setDialogType("error");
              setDialogOpen(true);
            }
          }

          else if(userRole === 'vehicle_owner'){
            try {
              const response = await axios.get(
                  `${ServerHost}/api/v1/VehicleOwner/getOwnerID/${userId}`
              );

              const ownerId = response.data; // Since response is a raw integer
              localStorage.setItem("ownerId", ownerId); // Store in localStorage

              console.log("Vehicle Owner ID:", ownerId); // Debugging log

              // Additional logic can go here if needed

            } catch (error) {
              console.error("Failed to fetch vehicle owner ID:", error);

              setDialogTitle("Error");
              setDialogMessage("Unable to retrieve Vehicle Owner ID. Please try again.");
              setDialogType("error");
              setDialogOpen(true);
            }
          }

            setDialogTitle("Login Success");
            setDialogMessage("Successfully logged in!");
            setDialogType("success");
            setDialogOpen(true);

            setTimeout(() => {
              if (userRole === "vehicle_owner") {
                navigate("/home");
              } else if (userRole === "fuel_station") {
                navigate("/home");
              } else {
                navigate("/home"); // Fallback route
              }
            }, 1500);
          
        } else {
          setDialogTitle("Login Success");
          setDialogMessage(
            "Login Success, but userId not provided by the server."
          );
          setDialogType("success");
          setDialogOpen(true);
        }
      } else {
        setDialogTitle("Login Failed");
        setDialogMessage("Incorrect Email or Password.");
        setDialogType("error");
        setDialogOpen(true);
      }
    } catch (err) {
      console.error(err);
      setDialogTitle("Error");
      setDialogMessage("An error occurred during login. Please try again.");
      setDialogType("error");
      setDialogOpen(true);
    }
  }

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-br from-green-100 via-green-300 to-green-500">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl sm:w-[26rem]">
        {/* Title */}
        <h2 className="mb-6 text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-500 drop-shadow-md">
          Welcome Back
        </h2>

        <form onSubmit={login}>
          {/* Email Input */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Username
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 text-gray-700 transition-all duration-300 border border-gray-300 rounded-lg shadow-sm focus:ring-4 focus:ring-green-400 focus:outline-none focus:ring-opacity-50 hover:shadow-md"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            {emailError && (
              <p className="mt-2 text-sm text-red-600">{emailError}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 text-gray-700 transition-all duration-300 border border-gray-300 rounded-lg shadow-sm focus:ring-4 focus:ring-green-400 focus:outline-none focus:ring-opacity-50 hover:shadow-md"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {passwordError && (
              <p className="mt-2 text-sm text-red-600">{passwordError}</p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full px-4 py-3 text-lg font-semibold text-white transition-all duration-300 rounded-lg shadow-md bg-gradient-to-r from-green-500 to-teal-500 hover:from-teal-500 hover:to-green-500 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-50"
          >
            Login
          </button>

          <div className="mt-4 text-sm text-center text-gray-600">
            {/* Register Button */}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="w-full px-5 py-3 text-lg font-semibold text-white border rounded-lg bg-gradient-to-r from-green-400 to-emerald-600 "
            >
              Register
            </button>
          </div>
        </form>
      </div>

      {/* Dialog Popup */}
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

export default LoginForm;
