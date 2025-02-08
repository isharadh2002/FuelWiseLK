import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import ViewProfile from './ViewProfilePage'
import ManageProfile from './ManageProfilePage'
import VehicleListPage from "./VehicleListPage";
import SingleVehiclePage from "./SingleVehiclePage";
import AddVehiclePage from "./AddVehiclePage";


import {
    Car,
    CheckCircle,
    AlertTriangle,
    TrendingUpIcon,
    TrendingDownIcon,
  } from "lucide-react";

function CustomerDashboard() {
  const navigate = useNavigate();
  const [selectedView, setSelectedView] = useState("overview");

  const NAVIGATION = [
    { kind: "header", title: "Main items" },
    {
      kind: "segment",
      segment: "Overview",
      title: "Overview",
      onclick: () => setSelectedView("overview"),
    },
    {
      kind: "segment",
      segment: "View Profile",
      title: "View Profile",
      onclick: () => setSelectedView("viewProfile"),
    },
    {
      kind: "segment",
      segment: "Manage Profile",
      title: "Manage Profile",
      onclick: () => setSelectedView("manageProfile"),
    },
    {
      kind: "segment",
      segment: "View Vehicles",
      title: "View Vehicles",
      onclick: () => setSelectedView("viewVehicles"),
    },
    {
      kind: "segment",
      segment: "Add Vehicle",
      title: "Add Vehicle",
      onclick: () => setSelectedView("addVehicle"),
    },
  ];

  const stats = [
    {
      title: "Total Vehicles",
      value: "150",
    },
    {
      title: "Total Fuel Quota",
      value: "5000 Liters",
      trend: "+5%",
    },
    {
      title: "Total Fuel Usage",
      value: "3000 Liters",
      trend: "+2%",
    },
  ];

  const historyItems = [
    {
      icon: <Car className="w-5 h-5 text-emerald-500" />,
      text: "New vehicle added",
      time: "2 hours ago",
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-blue-500" />,
      text: "Vehicle data updated",
      time: "5 hours ago",
    },
    {
      icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
      text: "Fuel quota is over",
      time: "1 day ago",
    },
  ];

  const alerts = [
    { text: "Fuel quota is over", priority: "high" },
    { text: "Fuel quota is below 20%", priority: "medium" },
    { text: "Fuel quota is about to end", priority: "low" },
  ];

  function StatCard({ title, value, trend }) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="flex items-center justify-between">
          <p className="text-3xl font-semibold text-gray-900">{value}</p>
          {trend && (
            <span
              className={`text-sm font-semibold ${
                trend.startsWith("+") ? "text-emerald-600" : "text-red-600"
              }`}
            >
              {trend.startsWith("+") ? (
                <TrendingUpIcon className="w-4 h-4" />
              ) : (
                <TrendingDownIcon className="w-4 h-4" />
              )}
              {trend}
            </span>
          )}
        </div>
      </div>
    );
  }

  function HistoryCard({ icon, text, time }) {
    return (
      <div className="flex items-center space-x-3">
        {icon}
        <div className="flex justify-between flex-1">
          <p className="text-sm text-gray-600">{text}</p>
          <span className="text-xs text-gray-400">{time}</span>
        </div>
      </div>
    );
  }

  function AlertsCard({ text, priority }) {
    return (
      <div
        className={`rounded-lg border p-4 ${
          priority === "high"
            ? "border-red-200 bg-red-50"
            : priority === "medium"
            ? "border-yellow-200 bg-yellow-50"
            : "border-gray-200 bg-gray-50"
        }`}
      >
        <p className="text-sm font-medium text-gray-900">{text}</p>
      </div>
    );
  }

  // Placeholder content for each view (could be replaced with actual components/data)
  const renderContent = () => {
    switch (selectedView) {
      case "overview":
        return (
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Dashboard Overview</h2>

            <div className="grid gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-3">
              {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </div>

            <div className="grid gap-4 mb-6 lg:grid-cols-2">
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="mb-4 text-lg font-medium text-gray-900">Recent History</h3>
                <div className="space-y-4">
                  {historyItems.map((item, index) => (
                    <HistoryCard key={index} {...item} />
                  ))}
                </div>
              </div>

              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="mb-4 text-lg font-medium text-gray-900">Alerts</h3>
                <div className="space-y-4">
                  {alerts.map((alert, index) => (
                    <AlertsCard key={index} {...alert} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case "viewProfile":
        return <ViewProfile />;
      case "manageProfile":
        return <ManageProfile />;
      case "viewVehicles":
          return <VehicleListPage setSelectedView={setSelectedView} />;
      case "singleVehicle":
          return <SingleVehiclePage vehicleId={selectedView.vehicleId} />;
      case "addVehicle":
          return <AddVehiclePage />;
      default:
        return <div>Welcome to the Customer Dashboard</div>;
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      // If no user is logged in, redirect to login page
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header component */}
      <Header />

      <div className="flex flex-col mx-auto max-w-7xl md:flex-row">
        {/* Navigation */}
        <nav className="w-full p-4 bg-white shadow-sm shrink-0 md:w-64">
          <div className="mb-6">
            <h2 className="text-xs font-semibold tracking-wider text-gray-500 uppercase">Navigation</h2>
          </div>
          <ul className="space-y-1">
            {NAVIGATION.map((item, index) =>
              item.kind === "header" ? (
                <li key={index} className="px-3 pt-5 pb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">
                  {item.title}
                </li>
              ) : (
                <li key={index}>
                  <button
                    onClick={item.onclick}
                    className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 transition-colors rounded-lg hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    {item.title}
                  </button>
                </li>
              )
            )}
          </ul>
        </nav>

        {/* Main content area */}
        <main className="flex-1 p-4">
          <div>{renderContent()}</div> {/* Dynamically render content */}
        </main>
      </div>
    </div>
  );
}

export default CustomerDashboard;
