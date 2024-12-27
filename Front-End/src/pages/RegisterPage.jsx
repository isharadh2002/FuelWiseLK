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
    <div className="flex items-center justify-center overflow-hidden bg-gray-500">
      <div className="w-full p-7 bg-gray-100 rounded-lg shadow-md sm:w-[26rem]">
        {/* Vehicle Registration Heading */}
        <h2 className="mb-6 text-2xl font-bold text-center text-green-600">
          Vehicle Registration
        </h2>

        <form onSubmit={save}>


          {/* Owner Name Input */}
          <div className="mb-4">
            <label
              htmlFor="ownerName"
              className="block mb-1 text-sm font-medium text-black"
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
              className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          {/* Owner Phone Input */}
          <div className="mb-4">
            <label
              htmlFor="ownerPhone"
              className="block mb-1 text-sm font-medium text-black"
            >
              Owner Phone
            </label>
            <input
              type="text"
              id="ownerPhone"
              name="ownerPhone"
              value={formData.ownerPhone}
              onChange={handleInputChange}
              placeholder="Enter vehicle model"
              className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-black"
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
              className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-black"
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
              className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block mb-1 text-sm font-medium text-black"
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
              className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="termsAccepted"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleInputChange}
              className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
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
            className="w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Register Vehicle
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
