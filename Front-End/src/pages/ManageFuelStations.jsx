import React, { useState, useEffect } from "react";

const ManageFuelStations = () => {
  const [search, setSearch] = useState("");
  const [stations, setStations] = useState([]);

  // Fetch stations data from backend
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch("http://your-backend-api.com/stations"); // Replace with your API URL
        const data = await response.json();
        setStations(data);
      } catch (error) {
        console.error("Error fetching stations:", error);
      }
    };
    fetchStations();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleApprove = async (id) => {
    try {
      await fetch(`http://your-backend-api.com/stations/${id}/approve`, {
        method: "POST",
      });
      setStations((prevStations) =>
        prevStations.map((station) =>
          station.id === id ? { ...station, status: "Approved" } : station
        )
      );
    } catch (error) {
      console.error("Error approving station:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await fetch(`http://your-backend-api.com/stations/${id}/reject`, {
        method: "POST",
      });
      setStations((prevStations) =>
        prevStations.map((station) =>
          station.id === id ? { ...station, status: "Rejected" } : station
        )
      );
    } catch (error) {
      console.error("Error rejecting station:", error);
    }
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
                      <button
                        onClick={() => handleApprove(station.id)}
                        className="text-green-700 hover:underline mx-2"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(station.id)}
                        className="text-red-600 hover:underline mx-2"
                      >
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
