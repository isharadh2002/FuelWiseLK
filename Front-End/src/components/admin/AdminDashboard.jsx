import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Users, Car, Fuel, TrendingUp, Clipboard } from "lucide-react";
import Header from "./Header";

function AdminDashboard() {
  const navigate = useNavigate();
  const [selectedView, setSelectedView] = useState("overview");

  const NAVIGATION = [
    {
      title: "Overview",
      icon: <TrendingUp className="w-5 h-5" />,
      view: "overview",
    },
    {
      title: "Manage Admins",
      icon: <Users className="w-5 h-5" />,
      view: "view-admins",
    },
    {
      title: "Manage Vehicles",
      icon: <Car className="w-5 h-5" />,
      view: "manage-vehicles",
    },
    {
      title: "Manage Fuelstations",
      icon: <Fuel className="w-5 h-5" />,
      view: "manage-fuel-stations",
    },
    {
      title: "Manage Quotas",
      icon: <Clipboard className="w-5 h-5" />,
      view: "manage-fuel-quota",
    },
  ];

  useEffect(() => {
    const adminId = localStorage.getItem("adminId");
    if (!adminId) navigate("/admin-login");
  }, [navigate]);

  return (
    <div className="w-full bg-green-600 shadow-lg">
      <Header />
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <aside className="w-64 p-5 text-white bg-green-600">
          <nav>
            <ul className="space-y-2">
              {NAVIGATION.map((item, index) => (
                <li
                  key={index}
                  className={`flex items-center p-2 rounded cursor-pointer ${selectedView === item.view ? "bg-green-800" : "hover:bg-green-700"}`}
                  onClick={() => navigate(`/admin-dashboard/${item.view}`)}
                >
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
