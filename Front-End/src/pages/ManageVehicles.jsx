import React, { useState } from "react";

const ManageVehicles = () => {
  const [search, setSearch] = useState("");
  const [vehicles, setVehicles] = useState([
    { id: 1, number: "ABC-1234", owner: "John Doe", model: "Toyota Prius" },
    { id: 2, number: "XYZ-5678", owner: "Jane Smith", model: "Honda Civic" },
    { id: 3, number: "DEF-9101", owner: "Mark Lee", model: "Nissan Leaf" },
  ]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
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
                  <button className="text-green-700 hover:underline mx-2">
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline mx-2">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageVehicles;
