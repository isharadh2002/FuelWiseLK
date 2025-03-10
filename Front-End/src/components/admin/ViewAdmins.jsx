import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import ServerHost from "../../ServerHost.jsx";

const ViewAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(
          `${ServerHost}/api/v1/admins/getAll`
        );
        setAdmins(response.data);
      } catch (err) {
        console.error("Error fetching admins:", err);
        setError("Failed to load admin data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(
          `${ServerHost}/api/v1/admins/getAll`
        );
        setAdmins(response.data);
      } catch (err) {
        console.error("Error fetching admins:", err);
        setError("Failed to load admin data.");
      }
    };

    fetchAdmins();
  }, []);

  const handleDelete = async (adminId) => {
    try {
      await axios.delete(
        `${ServerHost}/api/v1/admins/delete/${adminId}`
      );
      setAdmins(admins.filter((admin) => admin.adminID !== adminId));
    } catch (err) {
      console.error("Error deleting admin:", err);
      setError("Failed to delete admin.");
    }
  };

  const handleUpdate = (adminId) => {
    navigate(`/admin-dashboard/update-admin/${adminId}`);
  };

  return (
    <div className="container max-w-6xl px-4 py-8 mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-black md:text-4xl">
        Administrator Management
      </h1>
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={() => navigate("/admin-dashboard/createAdmin")}
        className="px-4 py-2 mb-4 text-white bg-green-600 rounded-lg hover:bg-green-700"
      >
        Create Admin
      </button>
      <div className="overflow-hidden bg-white border border-purple-100 rounded-lg shadow-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-purple-200">
            <thead className="bg-purple-50">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold tracking-wider text-left text-black uppercase">
                  ID
                </th>
                <th className="px-6 py-4 text-sm font-semibold tracking-wider text-left text-black uppercase">
                  Name
                </th>
                <th className="px-6 py-4 text-sm font-semibold tracking-wider text-left text-black uppercase">
                  Email
                </th>
                <th className="px-6 py-4 text-sm font-semibold tracking-wider text-left text-black uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-200">
              {admins.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No admins found.
                  </td>
                </tr>
              ) : (
                admins.map((admin, index) => (
                  <tr
                    key={admin.adminID} // Ensure you use the correct property here
                    className={`hover:bg-purple-50 transition-colors duration-150 ease-in-out ${
                      index % 2 === 0 ? "bg-white" : "bg-purple-50/50"
                    }`}
                  >
                    <td className="px-6 py-4 text-sm text-black whitespace-nowrap">
                      {admin.adminID}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-black">
                        {admin.adminName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-black">{admin.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleUpdate(admin.adminID)}
                        className="px-2 py-1 mr-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(admin.adminID)}
                        className="px-2 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewAdmins;
