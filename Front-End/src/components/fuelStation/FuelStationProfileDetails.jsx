import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

import ServerHost from "../../ServerHost.jsx";

function FuelStationProfileView() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      // Fetch the profile data using the userId
      fetch(`${ServerHost}/api/v1/User/get/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch profile");
          }
          return response.json();
        })
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
      setError("User ID not found in localStorage");
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation and Header would be shared from the CustomerDashboard */}
      <div className="flex flex-col mx-auto max-w-7xl md:flex-row">
        {/* Main content area */}
        <main className="flex-1 p-4">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">Profile Details</h1>

          <div className="grid gap-4 mb-6 lg:grid-cols-2">
            {/* Profile Card */}
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <strong className="text-sm font-semibold text-gray-600">Name:</strong>
                  <p className="text-sm text-gray-900">{user.userName}</p>
                </div>
                <div className="flex justify-between">
                  <strong className="text-sm font-semibold text-gray-600">Email:</strong>
                  <p className="text-sm text-gray-900">{user.email}</p>
                </div>
                <div className="flex justify-between">
                  <strong className="text-sm font-semibold text-gray-600">Phone:</strong>
                  <p className="text-sm text-gray-900">{user.phone}</p>
                </div>
              </div>
            </div>

            {/* Account Activity Card */}
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <p className="text-sm text-gray-600">Profile viewed</p>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <p className="text-sm text-gray-600">Profile updated</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default FuelStationProfileView;
