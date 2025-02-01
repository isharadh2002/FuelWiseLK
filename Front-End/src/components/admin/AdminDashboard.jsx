import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ChevronDownIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  Users,
  Car,
  Fuel,
  AlertTriangle,
  Bell,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function DashboardLayoutBasic() {
  const navigate = useNavigate();

  const NAVIGATION = [
    { kind: "header", title: "Main items" },
    {
      kind: "segment",
      segment: "Manage Admins",
      title: "Manage Admins",
      icon: <Users className="w-5 h-5" />,
      onclick: () => navigate("/Viewadmins"),
    },
    {
      kind: "segment",
      segment: "Manage Vehicles",
      title: "Manage Vehicles",
      icon: <Car className="w-5 h-5" />,
      onclick: () => navigate("/manage-vehicles"),
    },
    {
      kind: "segment",
      segment: "Manage Fuelstations",
      title: "Manage Fuelstations",
      icon: <Fuel className="w-5 h-5" />,
      onclick: () => navigate("/manage-fuel-stations"),
    },
    
  ];

  const stats = [
    {
      title: "Total Vehicles",
      value: "147",
      change: "+12.5%",
      trend: "up",
    },
    {
      title: "Active Fuel Stations",
      value: "24",
      change: "+4.3%",
      trend: "up",
    },
    {
      title: "Total Admins",
      value: "38",
      change: "-2.7%",
      trend: "down",
    },
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

  function StatCard({ title, value, change, trend }) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="flex items-baseline mt-2">
          <p className="text-3xl font-semibold text-gray-900">{value}</p>
          <span
            className={`ml-2 flex items-baseline text-sm font-semibold ${
              trend === "up" ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {trend === "up" ? (
              <TrendingUpIcon className="w-4 h-4" />
            ) : (
              <TrendingDownIcon className="w-4 h-4" />
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
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className={`rounded-full px-3 py-1 text-sm ${item.color}`}>
                {item.status}
              </div>
              <span className="font-semibold text-gray-900">{item.count}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function DropDown({ pathToImage }) {
    return (
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-full group bg-white/10 hover:bg-white/20">
            <img
              className="object-cover w-8 h-8 transition-all rounded-full ring-2 ring-white/20 group-hover:ring-white/40"
              src={pathToImage}
              alt="Avatar"
            />
            <ChevronDownIcon className="w-4 h-4 opacity-70" />
          </MenuButton>
        </div>

        <MenuItems className="absolute right-0 z-10 w-56 py-2 mt-2 origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-black/5 focus:outline-none">
          <MenuItem>
            {({ active }) => (
              <a
                href="#"
                className={`block px-4 py-2 text-sm ${
                  active ? "bg-emerald-50 bg-purple-100" : "text-gray-700"
                }`}
              >
                Account settings
              </a>
            )}
          </MenuItem>
          <MenuItem>
            {({ active }) => (
              <a
                href="#"
                className={`block px-4 py-2 text-sm ${
                  active ? "bg-emerald-50 bg-purple-100" : "text-gray-700"
                }`}
              >
                Support
              </a>
            )}
          </MenuItem>
          <MenuItem>
            {({ active }) => (
              <button
                className={`block w-full px-4 py-2 text-left text-sm ${
                  active ? "bg-red-50 text-red-700" : "text-gray-700"
                }`}
              >
                Sign out
              </button>
            )}
          </MenuItem>
        </MenuItems>
      </Menu>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="relative z-10 bg-purple-600 shadow-lg">
        <div className="flex items-center justify-between h-16 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <DropDown pathToImage="/api/placeholder/32/32" />
        </div>
      </header>

      <div className="flex flex-col mx-auto max-w-7xl md:flex-row">
        <nav className="w-full p-4 bg-white shadow-sm shrink-0 md:w-64">
          <div className="mb-6">
            <h2 className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
              Navigation
            </h2>
          </div>
          <ul className="space-y-1">
            {NAVIGATION.map((item, index) =>
              item.kind === "header" ? (
                <li
                  key={index}
                  className="px-3 pt-5 pb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase"
                >
                  {item.title}
                </li>
              ) : (
                <li key={index}>
                  <button
                    onClick={item.onclick}
                    className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 transition-colors rounded-lg hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.title}
                  </button>
                </li>
              )
            )}
          </ul>
        </nav>

        <main className="flex-1 p-4">
          <div className="grid gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          <div className="grid gap-4 mb-6 lg:grid-cols-2">
            <StatusCard title="Vehicle Status Overview" items={vehicleStatus} />
            <StatusCard title="Fuel Station Status" items={fuelStationStatus} />
          </div>

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
                    icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
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

            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="mb-4 text-lg font-medium text-gray-900">Alerts</h3>
              <div className="space-y-4">
                {[
                  { text: "3 vehicles due for maintenance", priority: "high" },
                  {
                    text: "Fuel station #12 inventory below 20%",
                    priority: "medium",
                  },
                  {
                    text: "5 admin accounts inactive for 30+ days",
                    priority: "low",
                  },
                ].map((alert, index) => (
                  <div
                    key={index}
                    className={`rounded-lg border p-4 ${
                      alert.priority === "high"
                        ? "border-red-200 bg-red-50"
                        : alert.priority === "medium"
                        ? "border-yellow-200 bg-yellow-50"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <p className="text-sm font-medium text-gray-900">
                      {alert.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayoutBasic;
