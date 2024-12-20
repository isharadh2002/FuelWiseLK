import React, { useState } from "react";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    vehicleNumber: "",
    ownerName: "",
    vehicleModel: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        {/* Vehicle Registration Heading */}
        <h2 className="text-2xl font-bold text-black text-center mb-6">
          Vehicle Registration
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Vehicle Number Input */}
          <div className="mb-4">
            <label
              htmlFor="vehicleNumber"
              className="block text-sm font-medium text-black mb-1"
            >
              Vehicle Number
            </label>
            <input
              type="text"
              id="vehicleNumber"
              name="vehicleNumber"
              value={formData.vehicleNumber}
              onChange={handleInputChange}
              placeholder="Enter vehicle number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none text-black"
              required
            />
          </div>

          {/* Owner Name Input */}
          <div className="mb-4">
            <label
              htmlFor="ownerName"
              className="block text-sm font-medium text-black mb-1"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none text-black"
              required
            />
          </div>

          {/* Vehicle Model Input */}
          <div className="mb-4">
            <label
              htmlFor="vehicleModel"
              className="block text-sm font-medium text-black mb-1"
            >
              Vehicle Model
            </label>
            <input
              type="text"
              id="vehicleModel"
              name="vehicleModel"
              value={formData.vehicleModel}
              onChange={handleInputChange}
              placeholder="Enter vehicle model"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none text-black"
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black mb-1"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none text-black"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-black mb-1"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none text-black"
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-black mb-1"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none text-black"
              required
            />
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="termsAccepted"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleInputChange}
              className="h-4 w-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
              required
            />
            <label htmlFor="termsAccepted" className="ml-2 text-sm text-black">
              I accept the{" "}
              <a href="/terms" className="text-green-600 hover:underline">
                Terms and Conditions
              </a>
            </label>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Register Vehicle
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
