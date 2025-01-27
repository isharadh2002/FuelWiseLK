import { useEffect, useState } from "react";

const ViewAdmins = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    // Fetch admins data from an API or a static source
    fetch("/api/admins")
      .then((response) => response.json())
      .then((data) => setAdmins(data))
      .catch((error) => console.error("Error fetching admins:", error));
  }, []);

  return (
    <div className="container max-w-6xl px-4 py-8 mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-emerald-800">
        Administrator Management
      </h1>
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
                <th className="px-6 py-4 text-sm font-semibold tracking-wider text-left uppercase text-emerald-700">
                  Role
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-200">
              {admins.map((admin, index) => (
                <tr
                  key={admin.id}
                  className={`
                                        hover:bg-emerald-50 transition-colors duration-150 ease-in-out
                                        ${
                                          index % 2 === 0
                                            ? "bg-white"
                                            : "bg-emerald-50/50"
                                        }
                                    `}
                >
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-emerald-600">
                    {admin.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-emerald-900">
                      {admin.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-emerald-600">
                      {admin.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-sm font-medium rounded-full bg-emerald-100 text-emerald-800">
                      {admin.role}
                    </span>
                  </td>
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
