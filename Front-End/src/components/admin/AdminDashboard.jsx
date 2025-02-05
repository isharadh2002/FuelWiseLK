import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ManageVehicles from "./ManageVehicles";
import ManageFuelStations from "./ManageFuelStations";
import {
  Users,
  Car,
  User,
  Fuel,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  CheckCircle,
  AlertTriangle,
  Menu,
} from "lucide-react";
import ViewAdmins from "./ViewAdmins";
import Header from "./Header";

function AdminDashboard() {
  const navigate = useNavigate();
  const [selectedView, setSelectedView] = useState("overview");

  // Navigation Items
  const NAVIGATION = [
    {
      title: "Overview",
      icon: <TrendingUp className="w-5 h-5" />,
      view: "overview",
    },
    {
      title: "Manage Admins",
      icon: <Users className="w-5 h-5" />,
      view: "manageAdmins",
    },
    {
      title: "Manage Vehicles",
      icon: <Car className="w-5 h-5" />,
      view: "manageVehicles",
    },
    {
      title: "Manage Fuelstations",
      icon: <Fuel className="w-5 h-5" />,
      view: "manageFuelStations",
    },
  ];

  // Stats & Status Data
  const stats = [
    { title: "Total Vehicles", value: 150, change: "5%", trend: "up" },
    { title: "Active Admins", value: 20, change: "1%", trend: "up" },
    { title: "Pending Issues", value: 3, change: "2%", trend: "down" },
  ];

  const vehicleStatus = [
    { status: "Active", count: 120, color: "bg-emerald-100 text-emerald-700" },
    {
      status: "Maintenance",
      count: 15,
      color: "bg-yellow-100 text-yellow-700",
    },
    { status: "Out of Service", count: 12, color: "bg-red-100 text-red-700" },
  ];

  const fuelStationStatus = [
    {
      status: "Operational",
      count: 18,
      color: "bg-emerald-100 text-emerald-700",
    },
    { status: "Low Stock", count: 4, color: "bg-yellow-100 text-yellow-700" },
    { status: "Closed", count: 2, color: "bg-red-100 text-red-700" },
  ];

  // Card Components
  function StatCard({ title, value, change, trend }) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="flex items-baseline mt-2">
          <p className="text-3xl font-semibold text-gray-900">{value}</p>
          <span
            className={`ml-2 flex items-center text-sm font-semibold ${
              trend === "up" ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {trend === "up" ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span className="ml-1">{change}</span>
          </span>
        </div>
      </div>
    );
  }

  function StatusCard({ title, items }) {
    return (
      
      <div className="p-6 bg-white rounded-lg shadow-sm">
        
        <h3 className="mb-4 text-lg font-medium text-gray-900">{title}</h3>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className={`p-2 rounded ${item.color}`}>
              <span className="font-semibold">{item.status}:</span> {item.count}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Render Content Based on Selected View
  const renderContent = () => {
    switch (selectedView) {
      case "manageAdmins":
        return <ViewAdmins />;
      case "manageVehicles":
        return <ManageVehicles />;
      case "manageFuelStations":
        return <ManageFuelStations />;
      default:
        return (
          <div>
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Admin Dashboard Overview
            </h2>

            {/* Stats */}
            <div className="grid gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-3">
              {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </div>

            {/* Status Overview */}
            <div className="grid gap-4 mb-6 lg:grid-cols-2">
              <StatusCard
                title="Vehicle Status Overview"
                items={vehicleStatus}
              />
              <StatusCard
                title="Fuel Station Status"
                items={fuelStationStatus}
              />
            </div>

            {/* Activities & Alerts */}
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="mb-4 text-lg font-medium text-gray-900">
                  Recent Activities
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      icon: <Car className="w-5 h-5 text-emerald-500" />,
                      text: "New vehicle added to fleet",
                      time: "2 hours ago",
                    },
                    {
                      icon: <CheckCircle className="w-5 h-5 text-blue-500" />,
                      text: "Maintenance completed for Vehicle #127",
                      time: "5 hours ago",
                    },
                    {
                      icon: (
                        <AlertTriangle className="w-5 h-5 text-yellow-500" />
                      ),
                      text: "Fuel station #8 reported low inventory",
                      time: "1 day ago",
                    },
                    {
                      icon: <Users className="w-5 h-5 text-purple-500" />,
                      text: "New admin account created",
                      time: "2 days ago",
                    },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      {activity.icon}
                      <div className="flex justify-between flex-1">
                        <p className="text-sm text-gray-600">{activity.text}</p>
                        <span className="text-xs text-gray-400">
                          {activity.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  // User Authentication Check
  useEffect(() => {
    const adminId = localStorage.getItem("adminId");
    if (!adminId) {
      navigate("/admin-login");
    }
  }, [navigate]);

  return (
    <div className="w-full bg-purple-600 shadow-lg">
      <Header/>
      <div className="flex min-h-screen bg-gray-50">
        {/* Side Navigation Bar */}
        <aside className="w-64 p-5 text-white bg-purple-600">
          {/* <h2 className="mb-6 text-lg font-bold">Admin Dashboard</h2> */}
          <nav>
            <ul className="space-y-2">
              {NAVIGATION.map((item, index) => (
                <li
                  key={index}
                  className={`flex items-center p-2 rounded cursor-pointer ${
                    selectedView === item.view
                      ? "bg-purple-800"
                      : "hover:bg-purple-700"
                  }`}
                  onClick={() => setSelectedView(item.view)}
                >
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">{renderContent()}</main>
      </div>
    </div>
  );
}

export default AdminDashboard;
