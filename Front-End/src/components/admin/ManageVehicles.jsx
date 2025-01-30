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
    <div className="min-h-screen p-8 bg-green-50">
      <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-center text-green-700">
          Manage Vehicles
        </h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by vehicle number, owner, or model"
            value={search}
            onChange={handleSearch}
            className="w-full px-4 py-2 text-black border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>
        {loading ? (
          <p className="text-center text-green-700">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <table className="w-full text-black border border-collapse border-gray-300">
            <thead>
              <tr className="bg-green-100">
                <th className="px-4 py-2 border">Vehicle Number</th>
                <th className="px-4 py-2 border">Owner</th>
                <th className="px-4 py-2 border">Model</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id} className="odd:bg-white even:bg-green-50">
                  <td className="px-4 py-2 border">{vehicle.number}</td>
                  <td className="px-4 py-2 border">{vehicle.owner}</td>
                  <td className="px-4 py-2 border">{vehicle.model}</td>
                  <td className="px-4 py-2 text-center border">
                    <button
                      onClick={() => handleEdit(vehicle.id)}
                      className="mx-2 text-green-700 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(vehicle.id)}
                      className="mx-2 text-red-600 hover:underline"
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
