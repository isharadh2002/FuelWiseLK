import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ViewProfilePage from './ViewProfilePage'; // Assuming this is the correct path

function DashboardLayoutBasic() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(null); // Track current page
    
    const NAVIGATION = [
        { kind: "segment", segment: "viewProfile", title: "View Profile", icon: "👤", onclick: () => setCurrentPage('viewProfile') },
        { kind: "segment", segment: "manageProfile", title: "Manage Profile", icon: "⚙️", onclick: () => setCurrentPage('manageProfile') },
        { kind: "segment", segment: "viewVehicles", title: "View Vehicles", icon: "🚗", onclick: () => navigate("/view-vehicles") },
        { kind: "segment", segment: "addVehicle", title: "Add New Vehicle", icon: "➕", onclick: () => navigate("/add-vehicle") },
    ];

    const handleLogout = () => {
        localStorage.removeItem("userId");
        navigate("/login"); // Redirect to login page
    };

    function SmoothButton() {
        return (
            <button
                onClick={handleLogout}
                className="w-full px-6 py-3 rounded-md bg-green-500 text-white font-semibold text-lg transition-all duration-200 ease-in-out hover:bg-green-600 hover:shadow-xl focus:outline-none"
            >
                Sign Out
            </button>
        );
    }

    function Skeleton({ height }) {
        return (
            <div className="bg-gray-300 rounded-md" style={{ height: `${height}px` }}></div>
        );
    }

    return (
        <div className="m-0 overflow-hidden">
            <div className="rounded-2xl">
                <div className="flex items-center w-screen h-24 text-6xl font-extrabold text-center text-green-600 bg-green-300 ">
                    <div className="mx-auto">Dashboard</div>
                    <div className="flex mx-2">
                        <SmoothButton />
                    </div>
                </div>

                <div className="flex flex-col w-screen min-h-screen text-gray-900 bg-gray-100 md:flex-row">
                    {/* Sidebar */}
                    <nav className="w-full bg-green-100 shadow-md md:w-64">
                        <div className="p-4">
                            <h1 className="text-lg font-semibold text-gray-600">Navigation</h1>
                        </div>
                        <ul className="px-4 space-y-2">
                            {NAVIGATION.map((item, index) => {
                                if (item.kind === 'segment') {
                                    return (
                                        <li
                                            key={index}
                                            className="flex items-center p-2 space-x-2 rounded-md cursor-pointer hover:bg-green-600 hover:text-white"
                                            onClick={item.onclick}
                                        >
                                            <span>{item.icon}</span>
                                            <span>{item.title}</span>
                                        </li>
                                    );
                                }
                                return null;
                            })}
                        </ul>
                    </nav>

                    {/* Main Content */}
                    <div className="flex-1 p-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {/* Skeletons */}
                            {!currentPage && (
                                <>
                                    <div className="col-span-5 md:col-span-1">
                                        <Skeleton height={14} />
                                    </div>
                                    <div className="col-span-12">
                                        <Skeleton height={14} />
                                    </div>
                                    <div className="col-span-12">
                                        <Skeleton height={14} />
                                    </div>
                                    <div className="col-span-4">
                                        <Skeleton height={100} />
                                    </div>
                                    <div className="col-span-8">
                                        <Skeleton height={100} />
                                    </div>
                                    <div className="col-span-12">
                                        <Skeleton height={150} />
                                    </div>
                                    <div className="col-span-12">
                                        <Skeleton height={14} />
                                    </div>
                                    <div className="grid grid-cols-4 gap-4">
                                        <div className="col-span-1">
                                            <Skeleton height={100} />
                                        </div>
                                        <div className="col-span-1">
                                            <Skeleton height={100} />
                                        </div>
                                        <div className="col-span-1">
                                            <Skeleton height={100} />
                                        </div>
                                        <div className="col-span-1">
                                            <Skeleton height={100} />
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Dynamic Content */}
                            {currentPage === 'viewProfile' && <ViewProfilePage />}
                            {currentPage === 'manageProfile' && (
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-700">Manage Profile</h2>
                                    {/* Manage Profile Content */}
                                    <p className="text-lg text-gray-600">Manage your profile settings here.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardLayoutBasic;
