import { useState } from "react";
import axios from "axios";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    ownerName: "",
    ownerPhone: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  async function save(event) {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/v1/VehicleOwner/save", {
        ownerName: formData.ownerName,
        ownerPhone: formData.ownerPhone,
        ownerEmail: formData.email,
        ownerPassword: formData.password,
      });
      alert("Vehicle Registration Successfully");
    } catch (err) {
      alert("Registration failed: " + err.message);
    }
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-br from-green-100 via-teal-200 to-green-500">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl sm:w-[26rem]">
        {/* Vehicle Registration Heading */}
        <h2 className="mb-6 text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-500">
          User Registration
        </h2>

        <form onSubmit={save}>
          {/* Owner Name Input */}
          <div className="mb-6">
            <label
              htmlFor="ownerName"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Owner Name
            </label>
            <input
              type="text"
              id="ownerName"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleInputChange}
              placeholder="Enter owner name"
              className="w-full px-4 py-3 text-gray-700 transition-all duration-300 border border-gray-300 rounded-lg shadow-sm focus:ring-4 focus:ring-green-400 focus:outline-none focus:ring-opacity-50 hover:shadow-md"
              required
            />
          </div>

          {/* Owner Phone Input */}
          <div className="mb-6">
            <label
              htmlFor="ownerPhone"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Owner Phone
            </label>
            <input
              type="text"
              id="ownerPhone"
              name="ownerPhone"
              value={formData.ownerPhone}
              onChange={handleInputChange}
              placeholder="Enter owner phone"
              className="w-full px-4 py-3 text-gray-700 transition-all duration-300 border border-gray-300 rounded-lg shadow-sm focus:ring-4 focus:ring-green-400 focus:outline-none focus:ring-opacity-50 hover:shadow-md"
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 text-gray-700 transition-all duration-300 border border-gray-300 rounded-lg shadow-sm focus:ring-4 focus:ring-green-400 focus:outline-none focus:ring-opacity-50 hover:shadow-md"
              required
            />
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
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className="w-full px-4 py-3 text-gray-700 transition-all duration-300 border border-gray-300 rounded-lg shadow-sm focus:ring-4 focus:ring-green-400 focus:outline-none focus:ring-opacity-50 hover:shadow-md"
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
              className="w-full px-4 py-3 text-gray-700 transition-all duration-300 border border-gray-300 rounded-lg shadow-sm focus:ring-4 focus:ring-green-400 focus:outline-none focus:ring-opacity-50 hover:shadow-md"
              required
            />
          </div>

          {/* Terms and Conditions Checkbox */}
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
            <label
              htmlFor="termsAccepted"
              className="ml-2 text-sm text-gray-600"
            >
              I accept the{" "}
              <a
                href="/terms"
                className="font-semibold text-green-600 transition-colors duration-300 hover:text-green-700"
              >
                Terms and Conditions
              </a>
            </label>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full px-4 py-3 text-lg font-semibold text-white transition-all duration-300 rounded-lg shadow-md bg-gradient-to-r from-green-500 to-teal-500 hover:from-teal-500 hover:to-green-500 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-50"
          >
            Register User
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
