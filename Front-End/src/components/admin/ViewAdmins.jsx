import { useEffect, useState } from "react";
import axios from "axios";

const ViewAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/admins/getAll"
        );
        setAdmins(response.data);
      } catch (err) {
        console.error("Error fetching admins:", err);
        setError("Failed to load admin data.");
      }
    };

    fetchAdmins();
  }, []);

  return (
    <div className="container max-w-6xl px-4 py-8 mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-emerald-800">
        Administrator Management
      </h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="overflow-hidden bg-white border rounded-lg shadow-lg border-emerald-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-emerald-200">
            <thead className="bg-emerald-50">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold tracking-wider text-left uppercase text-emerald-700">
                  ID
                </th>
                <th className="px-6 py-4 text-sm font-semibold tracking-wider text-left uppercase text-emerald-700">
                  Name
                </th>
                <th className="px-6 py-4 text-sm font-semibold tracking-wider text-left uppercase text-emerald-700">
                  Email
                </th>
                {/* <th className="px-6 py-4 text-sm font-semibold tracking-wider text-left uppercase text-emerald-700">
                  Role
                </th> */}
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-200">
              {admins.map((admin, index) => (
                <tr
                  key={admin.id}
                  className={`hover:bg-emerald-50 transition-colors duration-150 ease-in-out ${
                    index % 2 === 0 ? "bg-white" : "bg-emerald-50/50"
                  }`}
                >
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-emerald-600">
                    {admin.adminid}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-emerald-900">
                      {admin.admin_name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-emerald-600">
                      {admin.email}
                    </div>
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-sm font-medium rounded-full bg-emerald-100 text-emerald-800">
                      {admin.role}
                    </span>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewAdmins;
