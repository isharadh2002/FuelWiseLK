import {
  Car,
  Users,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

function Overview() {
  const stats = [
    { title: "Total Vehicles", value: 150, change: "5%", trend: "up" },
    { title: "Liters Pumped", value: 30, change: "8%", trend: "up" },
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

  function StatCard({ title, value, change, trend }) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="flex items-baseline mt-2">
          <p className="text-3xl font-semibold text-gray-900">{value}</p>
          <span
            className={`ml-2 flex items-center text-sm font-semibold ${trend === "up" ? "text-emerald-600" : "text-red-600"}`}
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

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">
        Fuel Station Dashboard Overview
      </h2>

      {/* Stats */}
      <div className="grid gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Status Overview */}
      <div className="grid gap-4 mb-6 lg:grid-cols-2">
        <StatusCard title="Vehicle Status Overview" items={vehicleStatus} />
        <StatusCard title="Fuel Station Status" items={fuelStationStatus} />
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
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
