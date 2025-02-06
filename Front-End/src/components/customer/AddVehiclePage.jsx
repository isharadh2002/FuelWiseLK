import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddVehiclePage = () => {
  const [licensePlate, setLicensePlate] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleAddVehicle = async (e) => {
    e.preventDefault();

    const ownerId = localStorage.getItem("userId");
    if (!ownerId) {
      setError("User is not logged in.");
      return;
    }

    const vehicleData = {
      licensePlate,
      vehicleModel,
      ownerId: 8, // Hardcoded for now, replace with ownerId
    };

    console.log("Sending Vehicle Data:", vehicleData); // Log the request data for debugging

    try {
      setIsSubmitting(true);
      const response = await fetch("http://localhost:8080/api/v1/vehicles/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vehicleData),
      });

      if (!response.ok) {
        throw new Error("Failed to add vehicle");
      }

      // Assuming that a successful response means the vehicle has been added
      if (response.status === 200) {
        alert("Vehicle added successfully!");
        navigate("/dashboard");
      }

    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col mx-auto max-w-7xl md:flex-row">
        {/* Main content area */}
        <main className="flex-1 p-4">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">Add Vehicle</h1>

          {error && <div className="text-red-600 mb-4">{error}</div>}

          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Enter Vehicle Details</h3>

            <form onSubmit={handleAddVehicle}>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-600">License Plate</label>
                  <input
                    type="text"
                    value={licensePlate}
                    onChange={(e) => setLicensePlate(e.target.value)}
                    className="p-2 border rounded-md w-full text-sm text-gray-900"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-600">Vehicle Model</label>
                  <input
                    type="text"
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
                    className="p-2 border rounded-md w-full text-sm text-gray-900"
                    required
                  />
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white bg-emerald-600 rounded-md"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding..." : "Add Vehicle"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddVehiclePage;
