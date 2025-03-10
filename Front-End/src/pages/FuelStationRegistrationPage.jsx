import { useState } from "react";
import { MapPinIcon, PhoneIcon } from "@heroicons/react/24/solid";
import axios from "axios";

import ServerHost from "../ServerHost.jsx";

const FuelStationRegistrationPageNew = () => {
  const [formData, setFormData] = useState({
    name: "",
    Location: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function save(event) {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post(`${ServerHost}/api/v1/FuelStation/save`, {
        stationName: formData.name,
        location: formData.Location,
        phone: formData.phone,
      });
      alert("Fuel Station Registration Successfully");
    } catch (err) {
      alert("Registration failed: " + err.message);
    }
  }
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-br from-blue-50 to-green-100">
      <div className="w-full max-w-md p-8 space-y-6 transition-all duration-500 transform bg-white shadow-2xl bg-opacity-90 rounded-3xl hover:scale-105">
        <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600 drop-shadow-md">
          Register Fuel Station
        </h2>

        <form onSubmit={save} className="space-y-6">
          <div className="relative">
            <label className="block mb-2 text-lg font-semibold text-gray-800">
              Station Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-5 py-3 text-base text-gray-900 bg-white border-2 border-transparent rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
              placeholder="Enter station name"
              required
            />
          </div>
          <div className="relative">
            <label className="block mb-2 text-lg font-semibold text-gray-800">
              Location
            </label>
            <div className="relative">
              <input
                type="text"
                name="Location"
                value={formData.Location}
                onChange={handleChange}
                className="w-full px-5 py-3 text-base text-gray-900 bg-white border-2 border-transparent rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
                placeholder="Enter location"
                required
              />
              <MapPinIcon className="absolute w-6 h-6 text-gray-400 top-3 right-4" />
            </div>
          </div>
          <div className="relative">
            <label className="block mb-2 text-lg font-semibold text-gray-800">
              Phone
            </label>
            <div className="relative">
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-5 py-3 text-base text-gray-900 bg-white border-2 border-transparent rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
                placeholder="Enter phone number"
                required
              />
              <PhoneIcon className="absolute w-6 h-6 text-gray-400 top-3 right-4" />
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 text-lg font-semibold tracking-wide text-white transition-all duration-300 rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-500 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-green-400"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default FuelStationRegistrationPageNew;
