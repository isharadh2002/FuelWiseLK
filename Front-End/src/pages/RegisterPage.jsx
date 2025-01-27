import { useState } from "react";
import axios from "axios";
import TermsPopup from "./Terms";
import { Contact } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [formData, setFormData] = useState({
    ownerName: "",
    ownerPhone: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleOpenTerms = () => {
    setIsTermsOpen(true);
  };

  const handleCloseTerms = () => {
    setIsTermsOpen(false);
  };

  async function save(event) {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/v1/User/save", {
        userName: formData.ownerName,
        phone: formData.ownerPhone,
        email: formData.email,
        password: formData.password,
        role: "vehicle_owner",
        stationName: "",
        Contact: "",
        location: "",
      });
      alert("Vehicle Registration Successfully");
      navigate("/login");
    } catch (err) {
      alert("Registration failed: " + err.message);
    }
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-br from-green-100 via-teal-200 to-green-500">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl sm:w-[26rem]">
        <h2 className="mb-6 text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-500">
          User Registration
        </h2>

        <form onSubmit={save}>
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
              className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-4 focus:ring-green-400 focus:outline-none hover:shadow-md"
              required
            />
          </div>

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
              className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-4 focus:ring-green-400 focus:outline-none hover:shadow-md"
              required
            />
          </div>

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
              className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-4 focus:ring-green-400 focus:outline-none hover:shadow-md"
              required
            />
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
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-4 focus:ring-green-400 focus:outline-none hover:shadow-md"
              required
            />
          </div>

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
            <label
              htmlFor="termsAccepted"
              className="ml-2 text-sm text-gray-600"
            >
              I accept the{" "}
              <button
                type="button"
                onClick={handleOpenTerms}
                className="font-semibold text-green-600 hover:text-green-700"
              >
                Terms and Conditions
              </button>
            </label>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-teal-500 rounded-lg shadow-md hover:from-teal-500 hover:to-green-500 focus:ring-4 focus:ring-green-400"
          >
            Register User
          </button>
        </form>
      </div>

      <TermsPopup isOpen={isTermsOpen} onClose={handleCloseTerms} />
    </div>
  );
};

export default RegistrationForm;
