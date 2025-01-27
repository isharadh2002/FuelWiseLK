import React, { useEffect, useState } from 'react';

const ViewAdmins = () => {
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        // Fetch admins data from an API or a static source
        fetch('/api/admins')
            .then(response => response.json())
            .then(data => setAdmins(data))
            .catch(error => console.error('Error fetching admins:', error));
    }, []);

    return (
        <div className="container p-4 mx-auto">
            <h1 className="mb-4 text-2xl font-bold">View Admins</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b">ID</th>
                            <th className="px-4 py-2 border-b">Name</th>
                            <th className="px-4 py-2 border-b">Email</th>
                            <th className="px-4 py-2 border-b">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.map(admin => (
                            <tr key={admin.id}>
                                <td className="px-4 py-2 border-b">{admin.id}</td>
                                <td className="px-4 py-2 border-b">{admin.name}</td>
                                <td className="px-4 py-2 border-b">{admin.email}</td>
                                <td className="px-4 py-2 border-b">{admin.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewAdmins;