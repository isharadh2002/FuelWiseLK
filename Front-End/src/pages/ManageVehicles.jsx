import React, { useState, useEffect } from "react";

const ManageVehicles = () => {
  const [search, setSearch] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch vehicles from backend
  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://backend-api.com/vehicles"); // Replace with your API URL
        if (!response.ok) {
          throw new Error("Failed to fetch vehicles");
        }
        const data = await response.json();
        setVehicles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleEdit = (id) => {
    // Add logic to edit vehicle 
    console.log("Edit vehicle with ID:", id);
  };

  const handleDelete = async (id) => {
    // Add delete functionality
    try {
      await fetch(`http://backend-api.com/vehicles/${id}`, {
        method: "DELETE",
      });
      setVehicles((prevVehicles) =>
        prevVehicles.filter((vehicle) => vehicle.id !== id)
      );
    } catch (err) {
      console.error("Error deleting vehicle:", err);
    }
  };

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.number.toLowerCase().includes(search.toLowerCase()) ||
      vehicle.owner.toLowerCase().includes(search.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-green-700 mb-4 text-center">
          Manage Vehicles
        </h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by vehicle number, owner, or model"
            value={search}
            onChange={handleSearch}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none text-black"
          />
        </div>
        {loading ? (
          <p className="text-center text-green-700">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300 text-black">
            <thead>
              <tr className="bg-green-100">
                <th className="border px-4 py-2">Vehicle Number</th>
                <th className="border px-4 py-2">Owner</th>
                <th className="border px-4 py-2">Model</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id} className="odd:bg-white even:bg-green-50">
                  <td className="border px-4 py-2">{vehicle.number}</td>
                  <td className="border px-4 py-2">{vehicle.owner}</td>
                  <td className="border px-4 py-2">{vehicle.model}</td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => handleEdit(vehicle.id)}
                      className="text-green-700 hover:underline mx-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(vehicle.id)}
                      className="text-red-600 hover:underline mx-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageVehicles;
