import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { TrendingUp, User, UserPen, History } from "lucide-react";
import Header from "./Header";

function FuelStationDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedView, setSelectedView] = useState("overview");

  const NAVIGATION = [
    { title: "Overview", icon: <TrendingUp className="w-5 h-5" />, view: "overview" },
    { title: "View Profile", icon: <User className="w-5 h-5" />, view: "profile" },
    { title: "Manage Profile", icon: <UserPen className="w-5 h-5" />, view: "manage-profile" },
    { title: "View Fuel Transaction", icon: <History className="w-5 h-5" />, view: "fuel-transactions" },
  ];

  useEffect(() => {
    const adminId = localStorage.getItem("userId");
    if (!adminId) navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const currentView = location.pathname.split("/").pop();
    setSelectedView(currentView || "overview");
  }, [location]);

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
                        className={`flex items-center p-2 rounded cursor-pointer ${
                            selectedView === item.view ? "bg-green-800" : "hover:bg-green-700"
                        }`}
                        onClick={() => navigate(`/fuelStation-dashboard/${item.view}`)}
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

export default FuelStationDashboard;
