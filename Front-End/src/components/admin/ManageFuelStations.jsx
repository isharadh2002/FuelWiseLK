import React, { useState, useEffect } from "react";

const ManageFuelStations = () => {
  const [search, setSearch] = useState("");
  const [stations, setStations] = useState([]);

  // Fetch stations data from backend
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch("http://backend-api.com/stations"); // Replace with your API URL
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
      await fetch(`http://backend-api.com/stations/${id}/approve`, {
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
      await fetch(`http://backend-api.com/stations/${id}/reject`, {
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
    <div className="min-h-screen p-8 bg-green-50">
      <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-center text-green-700">
          Manage Fuel Stations
        </h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name, location, or status"
            value={search}
            onChange={handleSearch}
            className="w-full px-4 py-2 text-black border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>
        <table className="w-full text-black border border-collapse border-gray-300">
          <thead>
            <tr className="bg-green-200">
              <th className="px-4 py-2 border">Station Name</th>
              <th className="px-4 py-2 border">Location</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStations.map((station) => (
              <tr key={station.id} className="odd:bg-white even:bg-green-50">
                <td className="px-4 py-2 border">{station.name}</td>
                <td className="px-4 py-2 border">{station.location}</td>
                <td className="px-4 py-2 border">{station.status}</td>
                <td className="px-4 py-2 text-center border">
                  {station.status === "Pending" && (
                    <>
                      <button
                        onClick={() => handleApprove(station.id)}
                        className="mx-2 text-green-700 hover:underline"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(station.id)}
                        className="mx-2 text-red-600 hover:underline"
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
