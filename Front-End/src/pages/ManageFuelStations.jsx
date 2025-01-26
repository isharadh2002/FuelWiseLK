import React, { useState } from "react";

const ManageFuelStations = () => {
  const [search, setSearch] = useState("");
  const [stations, setStations] = useState([
    { id: 1, name: "Station A", location: "Colombo", status: "Pending" },
    { id: 2, name: "Station B", location: "Kandy", status: "Approved" },
    { id: 3, name: "Station C", location: "Galle", status: "Rejected" },
  ]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredStations = stations.filter(
    (station) =>
      station.name.toLowerCase().includes(search.toLowerCase()) ||
      station.location.toLowerCase().includes(search.toLowerCase()) ||
      station.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-green-700 mb-4 text-center">
          Manage Fuel Stations
        </h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name, location, or status"
            value={search}
            onChange={handleSearch}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none text-black"
          />
        </div>
        <table className="w-full border-collapse border border-gray-300 text-black">
          <thead>
            <tr className="bg-green-200">
              <th className="border px-4 py-2">Station Name</th>
              <th className="border px-4 py-2">Location</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStations.map((station) => (
              <tr key={station.id} className="odd:bg-white even:bg-green-50">
                <td className="border px-4 py-2">{station.name}</td>
                <td className="border px-4 py-2">{station.location}</td>
                <td className="border px-4 py-2">{station.status}</td>
                <td className="border px-4 py-2 text-center">
                  {station.status === "Pending" && (
                    <>
                      <button className="text-green-700 hover:underline mx-2">
                        Approve
                      </button>
                      <button className="text-red-600 hover:underline mx-2">
                        Reject
                      </button>
                    </>
                  )}
                  {station.status !== "Pending" && (
                    <span className="text-gray-600">{station.status}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageFuelStations;
