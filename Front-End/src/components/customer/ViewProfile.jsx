// components/customer/ViewProfile.jsx
import React from "react";

function ViewProfile() {
    const user = {
        name: "John Doe",
        email: "johndoe@example.com",
        phone: "+1 234 567 890",
        address: "123 Main St, Springfield",
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-green-600 mb-4">Profile Details</h1>
            <div className="space-y-2">
                <div>
                    <strong>Name:</strong> {user.name}
                </div>
                <div>
                    <strong>Email:</strong> {user.email}
                </div>
                <div>
                    <strong>Phone:</strong> {user.phone}
                </div>
                <div>
                    <strong>Address:</strong> {user.address}
                </div>
            </div>
        </div>
    );
}

export default ViewProfile;
