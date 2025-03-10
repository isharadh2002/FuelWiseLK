import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import ServerHost from "../ServerHost.jsx";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    userName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "vehicle_owner",
    stationName: "",
    contact: "",
    location: "",
    termsAccepted: false,
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const navigate = useNavigate();

  // Handle input change and ensure proper state updates
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => {
      const updatedFormData = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      // Ensure role updates correctly when "Register as Fuel Station" is checked
      if (name === "isFuelStation") {
        updatedFormData.role = checked ? "fuel_station" : "vehicle_owner";
      }

      // Store role in local storage
      // localStorage.setItem("userRole", updatedFormData.role);

      return updatedFormData;
    });

    console.log("Updated formData:", formData); // Debugging
  };

  // Validate form inputs
  const validateForm = () => {
    if (!formData.userName) return "Username is required";
    if (!/^\d+$/.test(formData.phone))
      return "Phone number must contain only digits";
    if (!formData.email) return "Email is required";
    if (formData.password !== formData.confirmPassword)
      return "Passwords do not match";
    if (!formData.termsAccepted) return "Please accept terms and conditions";
    if (formData.role === "fuel_station") {
      if (!formData.stationName) return "Station name is required";
      if (!formData.contact) return "Station contact is required";
      if (!formData.location) return "Station location is required";
    }
    return null;
  };


  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");

  // Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  const error = validateForm();

  if (error) {
    setAlertMessage(error);
    setAlertType("error");
    setShowAlert(true);
    return;
  }

  try {
    await axios.post(`${ServerHost}/api/v1/User/save`, {
      userName: formData.userName,
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      stationName: formData.role === "fuel_station" ? formData.stationName : "",
      contact: formData.role === "fuel_station" ? formData.contact : "",
      location: formData.role === "fuel_station" ? formData.location : "",
    });

    // Show Dialog Instead of Alert
    setDialogTitle("Registration Successful!");
    setDialogMessage(
      "Your account has been created successfully. Redirecting to login..."
    );
    setDialogOpen(true);

    // Redirect after 2 seconds
    setTimeout(() => navigate("/login"), 2000);
  } catch (error) {
    setAlertMessage("Registration failed. Please try again.");
    setAlertType("error");
    setShowAlert(true);
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-green-100 via-teal-200 to-green-500">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-green-600">
          User Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              className="w-full p-2 text-gray-900 border rounded focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-2 text-gray-900 border rounded focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 text-gray-900 border rounded focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 text-gray-900 border rounded focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full p-2 text-gray-900 border rounded focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isFuelStation"
              checked={formData.role === "fuel_station"}
              onChange={handleInputChange}
              className="text-green-500 rounded focus:ring-green-400"
            />
            <label className="text-sm text-gray-700">
              Register as Fuel Station
            </label>
          </div>

          {formData.role === "fuel_station" && (
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Station Name
                </label>
                <input
                  type="text"
                  name="stationName"
                  value={formData.stationName}
                  onChange={handleInputChange}
                  className="w-full p-2 text-gray-900 border rounded focus:ring-2 focus:ring-green-400"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Station Contact
                </label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className="w-full p-2 text-gray-900 border rounded focus:ring-2 focus:ring-green-400"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Station Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full p-2 text-gray-900 border rounded focus:ring-2 focus:ring-green-400"
                />
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleInputChange}
              className="text-green-500 rounded focus:ring-green-400"
            />
            <label className="text-sm text-gray-700">
              I accept the Terms and Conditions
            </label>
          </div>

          {showAlert && (
            <div
              className={`p-2 text-white text-center rounded ${alertType === "error" ? "bg-red-500" : "bg-green-500"}`}
            >
              {alertMessage}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 text-white bg-green-500 rounded hover:bg-green-600 focus:ring-2 focus:ring-green-400"
          >
            Register
          </button>
        </form>
        {/* Dialog Box for Registration Success */}
        {dialogOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-green-600">
                {dialogTitle}
              </h2>
              <p className="mt-2">{dialogMessage}</p>
              <button
                onClick={() => setDialogOpen(false)}
                className="px-4 py-2 mt-4 text-white bg-green-500 rounded hover:bg-green-600"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
