import { useState, useEffect } from "react";
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

import ServerHost from "../../ServerHost.jsx";

const AdminLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogType, setDialogType] = useState(""); // success or error
  const navigate = useNavigate();

  const validateFields = () => {
    let isValid = true;

    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };


const login = async (event) => {
  event.preventDefault();

  if (!validateFields()) return;

  try {
    const response = await axios.post(
      `${ServerHost}/api/v1/admins/login`,
      { email, password }
    );

    console.log("Response Data:", response.data);

    if (response.data.message === "Login Success") {
      localStorage.setItem("adminId", response.data?.adminId ?? "unknown");
      setDialogTitle("Login Success");
      setDialogMessage("Successfully logged in!");
      setDialogType("success");
      setDialogOpen(true);

      // Navigate to dashboard after a short delay
      setTimeout(() => {
        navigate("/admin-dashboard");
      }, 1000);
    } else {
      setDialogTitle("Login Failed");
      setDialogMessage(response.data.message);
      setDialogType("error");
      setDialogOpen(true);
    }
  } catch (err) {
    console.error("Login error:", err);
    setDialogTitle("Error");
    setDialogMessage("An error occurred during login.");
    setDialogType("error");
    setDialogOpen(true);
  }
};

  

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-r from-green-100 via-green-300 to-green-500">
      <div className="w-full max-w-lg p-10 bg-white rounded-lg shadow-xl bg-opacity-90">
        <h2 className="mb-8 text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-500 drop-shadow-md">
          Admin Login
        </h2>

        <form onSubmit={login}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Admin Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your admin email"
              className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-4 focus:ring-indigo-400 focus:outline-none"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            {emailError && (
              <p className="mt-2 text-sm text-red-600">{emailError}</p>
            )}
          </div>

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
              className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-4 focus:ring-indigo-400 focus:outline-none"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {passwordError && (
              <p className="mt-2 text-sm text-red-600">{passwordError}</p>
            )}
          </div>

          <button
                      type="submit"
                      className="w-full px-4 py-3 text-lg font-semibold text-white rounded-lg shadow-md bg-gradient-to-r from-green-400 to-green-600 focus:outline-none focus:ring-4 focus:ring-green-300"
                    >
                      Login
                    </button>

          <div className="mt-8 text-sm text-center text-gray-600">
            Return to{" "}
            <a
              href="/home"
              className="font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Home Page
            </a>
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

export default AdminLoginForm;
