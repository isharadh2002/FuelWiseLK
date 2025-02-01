import { useNavigate } from "react-router-dom";

const Sidebar = ({ setCurrentTab }) => {
  const navigate = useNavigate();

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold">FuelWiseLK</h2>
      <ul className="mt-4">
        <li className="py-2 hover:bg-gray-700 px-2 rounded cursor-pointer" onClick={() => setCurrentTab("dashboard")}>
          Dashboard
        </li>
        <li className="py-2 hover:bg-gray-700 px-2 rounded cursor-pointer" onClick={() => setCurrentTab("routine")}>
          Routine
        </li>
        <li className="py-2 hover:bg-gray-700 px-2 rounded cursor-pointer" onClick={() => setCurrentTab("profile")}>
          Profile
        </li>
        <li className="py-2 hover:bg-red-700 px-2 rounded cursor-pointer" onClick={() => navigate("/logout")}>
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
