import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ServerHost from "../../ServerHost.jsx";

function ManageFuelStationProfile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            fetch(`${ServerHost}/api/v1/User/getMobileUser/${userId}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })
                .then((response) => response.json())
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

    useEffect(() => {
        if (!isUpdating && user) {
            navigate("/fuelStation-dashboard/manage-profile");
        }
    }, [isUpdating, navigate, user]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setIsUpdating(true);
        setError(null); // Reset error state

        const updatedData = {
            userName: e.target.userName.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            stationName: e.target.stationName.value,
            contact: e.target.contact.value,
            location: e.target.location.value,
        };

        const userId = localStorage.getItem("userId");

        try {
            console.log("Sending update request with data:", updatedData);

            const response = await fetch(`${ServerHost}/api/v1/User/updateMobileUser/${userId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });

            console.log("Response status:", response.status);

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to update profile: ${errorText}`);
            }

            // Check if response is JSON or plain text
            let responseData;
            const contentType = response.headers.get("Content-Type");
            if (contentType && contentType.includes("application/json")) {
                responseData = await response.json(); // Parse as JSON
            } else {
                responseData = await response.text(); // Parse as plain text
            }

            console.log("Update successful:", responseData);

            // Show success message (Optional)
            alert("Profile updated successfully");

            // Force reload to ensure UI updates properly
            window.location.reload();
        } catch (error) {
            console.error("Update failed:", error.message);
            setError(error.message);
        } finally {
            setIsUpdating(false);
        }
    };


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex flex-col mx-auto max-w-7xl md:flex-row">
                <main className="flex-1 p-4">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Manage Fuel Station Profile</h1>

                    <div className="p-6 bg-white rounded-lg shadow-sm">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Update Your Profile</h3>

                        <form onSubmit={handleUpdateProfile}>
                            <div className="space-y-4">
                                <div className="flex flex-col">
                                    <label className="text-sm font-semibold text-gray-600">Name</label>
                                    <input type="text" name="userName" defaultValue={user?.userName}
                                           className="p-2 border rounded-md w-full text-sm text-gray-900" required />
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-sm font-semibold text-gray-600">Email</label>
                                    <input type="email" name="email" defaultValue={user?.email}
                                           className="p-2 border rounded-md w-full text-sm text-gray-900" required />
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-sm font-semibold text-gray-600">Phone</label>
                                    <input type="text" name="phone" defaultValue={user?.phone}
                                           className="p-2 border rounded-md w-full text-sm text-gray-900" required />
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-sm font-semibold text-gray-600">Station Name</label>
                                    <input type="text" name="stationName" defaultValue={user?.stationName}
                                           className="p-2 border rounded-md w-full text-sm text-gray-900" required />
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-sm font-semibold text-gray-600">Contact</label>
                                    <input type="text" name="contact" defaultValue={user?.contact}
                                           className="p-2 border rounded-md w-full text-sm text-gray-900" required />
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-sm font-semibold text-gray-600">Location</label>
                                    <input type="text" name="location" defaultValue={user?.location}
                                           className="p-2 border rounded-md w-full text-sm text-gray-900" required />
                                </div>
                            </div>

                            <div className="mt-6">
                                <button type="submit" className="w-full px-4 py-2 text-white bg-emerald-600 rounded-md"
                                        disabled={isUpdating}>
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

export default ManageFuelStationProfile;
