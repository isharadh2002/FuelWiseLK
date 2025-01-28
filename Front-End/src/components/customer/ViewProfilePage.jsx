import React, { useEffect, useState } from "react";

function ViewProfile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            // Fetch the profile data using the userId
            fetch(`http://10.0.2.2:8080/api/v1/User/profile/${userId}`, {
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
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-green-600 mb-4">Profile Details</h1>
            <div className="space-y-2">
                <div>
                    <strong>Name:</strong> {user.userName}
                </div>
                <div>
                    <strong>Email:</strong> {user.email}
                </div>
                <div>
                    <strong>Phone:</strong> {user.phone}
                </div>
            </div>
        </div>
    );
}

export default ViewProfile;
