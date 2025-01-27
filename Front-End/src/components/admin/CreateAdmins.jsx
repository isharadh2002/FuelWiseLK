import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Alert } from "@mui/material";

const CreateAdminForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogType, setDialogType] = useState(""); // success or error
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
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    // Confirm password validation
    if (!confirmPassword) {
      setConfirmPasswordError("Confirm password is required.");
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match.");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    return isValid;
  };

  async function createAdmin(event) {
    event.preventDefault();

    if (!validateFields()) {
      return;
    }

    try {
      await axios
        .post("http://localhost:8080/api/v1/Admin/create", {
          email: email,
          password: password,
        })
        .then(
          (res) => {
            if (res.data.message === "Admin created successfully") {
              setDialogMessage("Admin account created successfully!");
              setDialogTitle("Creation Success");
              setDialogType("success"); // success message
              setDialogOpen(true);
              // Redirect to login page after successful creation
              setTimeout(() => navigate("/admin/login"), 2000);
            } else {
              setDialogMessage("Failed to create admin account.");
              setDialogTitle("Creation Failed");
              setDialogType("error"); // error message
              setDialogOpen(true);
            }
          },
          (fail) => {
            console.error(fail);
            setDialogMessage("An error occurred. Please try again.");
            setDialogTitle("Error");
            setDialogType("error"); // error message
            setDialogOpen(true);
          }
        );
    } catch (err) {
      setDialogMessage("An error occurred. Please try again.");
      setDialogTitle("Error");
      setDialogType("error"); // error message
      setDialogOpen(true);
    }
  }

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-r from-blue-300 via-indigo-400 to-purple-500">
      <div className="w-full max-w-lg p-10 bg-white bg-opacity-90 rounded-lg shadow-xl">
        <h2 className="mb-8 text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 drop-shadow-md">
          Create Admin Account
        </h2>

        <form onSubmit={createAdmin}>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-700">
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
            {emailError && <p className="mt-2 text-sm text-red-600">{emailError}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-700">
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
            {passwordError && <p className="mt-2 text-sm text-red-600">{passwordError}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-semibold text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-4 focus:ring-indigo-400 focus:outline-none"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
            {confirmPasswordError && <p className="mt-2 text-sm text-red-600">{confirmPasswordError}</p>}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 text-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-400"
          >
            Create Account
          </button>

          <div className="mt-8 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <a href="/admin/login" className="font-semibold text-indigo-600 hover:text-indigo-700">
              Login here
            </a>
          </div>
        </form>
      </div>

      {/* Dialog Popup */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle
          style={{
            textAlign: 'center',
            fontSize: '1.8rem',
            fontWeight: 'bold',
            color: dialogType === 'success' ? '#4caf50' : '#f44336',
          }}
        >
          {dialogTitle}
        </DialogTitle>
        <DialogContent>
          <Alert
            severity={dialogType}
            style={{
              borderRadius: '20px',
              padding: '20px',
              fontSize: '1rem',
              fontWeight: '600',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
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

export default CreateAdminForm;
