import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ServerHost from "../../ServerHost.jsx";

function ManageProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
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

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setIsUpdating(true);

    const updatedData = {
      userName: e.target.userName.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
    };

    const userId = localStorage.getItem("userId");

    fetch(`${ServerHost}/api/v1/User/update/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then(() => {
        setIsUpdating(false);
      })
      .catch((error) => {
        alert("Profile updated successfully!");
        navigate("/dashboard");
        setIsUpdating(false);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col mx-auto max-w-7xl md:flex-row">
        {/* Main content area */}
        <main className="flex-1 p-4">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">Manage Profile</h1>

          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Update Your Profile</h3>

            <form onSubmit={handleUpdateProfile}>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-600">Name</label>
                  <input
                    type="text"
                    name="userName"
                    defaultValue={user.userName}
                    className="p-2 border rounded-md w-full text-sm text-gray-900"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-600">Email</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={user.email}
                    className="p-2 border rounded-md w-full text-sm text-gray-900"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-600">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    defaultValue={user.phone}
                    className="p-2 border rounded-md w-full text-sm text-gray-900"
                    required
                  />
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white bg-emerald-600 rounded-md"
                  disabled={isUpdating}
                >
                  {isUpdating ? "Updating..." : "Update Profile"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ManageProfile;
