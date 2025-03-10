import React, { useState, useEffect } from "react";
import { User, Mail } from "lucide-react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import ServerHost from "../../ServerHost.jsx";

const UpdateAdmin = () => {
  const { adminId } = useParams(); // Retrieve adminId from the URL
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState({
    adminName: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogType, setDialogType] = useState(""); // success or error

  useEffect(() => {
    if (!adminId) {
      console.error("adminId is undefined, cannot fetch admin data.");
      return;
    }
    // Fetch admin data based on adminId for updating
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(
          `${ServerHost}/api/v1/admins/get/${adminId}`
        );
        setAdminData(response.data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    fetchAdminData();
  }, [adminId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    const errors = {};
    if (!adminData.adminName) errors.adminName = "Admin Name is required";
    if (!adminData.email) errors.email = "Email is required";
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
      await axios.put(
        `${ServerHost}/api/v1/admins/update/${adminId}`,
        adminData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Simulate a successful update
      setDialogTitle("Success");
      setDialogMessage("Admin account updated successfully.");
      setDialogType("success");
      setDialogOpen(true);

      // Reset form after successful submission
      setAdminData({
        adminName: "",
        email: "",
      });

      const timer = setTimeout(() => {
        navigate("/admin-dashboard/view-admins");
      }, 2000);

      return () => clearTimeout(timer); // Cleanup timeout if component unmounts
    } catch (error) {
      console.error("Error updating admin:", error);
      setDialogTitle("Error");
      setDialogMessage("An error occurred while updating the admin account.");
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
        <div className="p-6 bg-gradient-to-r from-green-500 to-green-400">
          <h2 className="text-2xl font-bold text-white">
            Update Admin Account
          </h2>
          <p className="mt-1 text-indigo-100">
            Modify the administrator details
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="block text-gray-700">Admin Name</label>
            <div className="relative">
              <User className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type="text"
                name="adminName"
                className="w-full py-2 pl-10 text-gray-600 placeholder-gray-400 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={adminData.adminName}
                onChange={handleInputChange}
                placeholder="Enter admin name"
              />
            </div>
            {errors.adminName && (
              <p className="text-sm text-red-500">{errors.adminName}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">Email Address</label>
            <div className="relative">
              <Mail className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type="email"
                name="email"
                className="w-full py-2 pl-10 text-gray-600 placeholder-gray-400 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={adminData.email}
                onChange={handleInputChange}
                placeholder="admin@company.com"
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-6 text-white transition-all rounded-lg bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700"
          >
            Update Admin Account
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

export default UpdateAdmin;
