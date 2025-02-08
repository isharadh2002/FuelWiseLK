import React, {useState, useEffect} from "react";
import {Link, useNavigate, useLocation} from "react-router-dom";
import "../../index.css";

function Header() {
    const navigationLinks = [
        {name: "Home", path: "/home"},
        {name: "About Us", path: "/about"},
        {name: "Services", path: "/services"},
        {name: "Contact Us", path: "/contact"}
    ];

    const [activeTab, setActiveTab] = useState('Home');
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Check if user is logged in
        const userId = localStorage.getItem('userId');
        setIsLoggedIn(!!userId);

        // Find the navigation item that matches the current path
        const currentNav = navigationLinks.find(nav => nav.path === location.pathname);
        if (currentNav) {
            setActiveTab(currentNav.name);
        }
    }, [location]);

    const handleTabClick = (pageName) => {
        setActiveTab(pageName);
    };

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.clear();
        setIsLoggedIn(false);
        navigate('/home');
    };

const AuthButtons = () => {
  if (isLoggedIn) {
    const userRole = localStorage.getItem("userRole");
    const dashboardPath =
      userRole === "fuel_station" ? "/fuelStation-dashboard" : "/dashboard";

    return (
      <>
        <button
          className="px-4 py-2 text-white transition-colors bg-green-600 border border-transparent rounded-lg hover:bg-white hover:text-green-600 hover:border-green-600"
          onClick={() => navigate(dashboardPath)}
        >
          Dashboard
        </button>
        <button
          className="px-4 py-2 text-green-600 transition-colors bg-white border border-green-600 rounded-lg hover:text-white hover:bg-green-600"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </>
    );
  }

  return (
    <>
      <button
        className="px-4 py-2 text-white transition-colors bg-green-600 border border-transparent rounded-lg hover:bg-white hover:text-green-600 hover:border-green-600"
        onClick={() => navigate("/register")}
      >
        Register
      </button>
      <button
        className="px-4 py-2 text-green-600 transition-colors bg-white border border-green-600 rounded-lg hover:text-white hover:bg-green-600"
        onClick={() => navigate("/login")}
      >
        Log In
      </button>
    </>
  );
};

const MobileAuthButtons = () => {
  if (isLoggedIn) {
    const userRole = localStorage.getItem("userRole");
    const dashboardPath =
      userRole === "fuel_station" ? "/fuelStation-dashboard" : "/dashboard";

    return (
      <>
        <button
          className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
          onClick={() => navigate(dashboardPath)}
        >
          Dashboard
        </button>
        <button
          className="px-4 py-2 text-green-600 bg-white border border-green-600 rounded-lg hover:bg-green-50"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </>
    );
  }

  return (
    <>
      <button
        className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
        onClick={() => navigate("/register")}
      >
        Register
      </button>
      <button
        className="px-4 py-2 text-green-600 bg-white border border-green-600 rounded-lg hover:bg-green-50"
        onClick={() => navigate("/login")}
      >
        Log In
      </button>
    </>
  );
};

    // const MobileAuthButtons = () => {
    //     if (isLoggedIn) {
    //         const userRole = localStorage.getItem("userRole");
    //         const dashboardPath =
    //           userRole === "fuel_station"
    //             ? "/fuelStation-dashboard"
    //             : "/dashboard";

    //         return (
    //           <>
    //             <button
    //               className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
    //               onClick={() => navigate(dashboardPath)}
    //             >
    //               Dashboard
    //             </button>
    //             <button
    //               className="px-4 py-2 text-green-600 bg-white border border-green-600 rounded-lg hover:bg-green-50"
    //               onClick={handleLogout}
    //             >
    //               Log Out
    //             </button>
    //           </>
    //         );
    //     }

    //     return (
    //         <>
    //             <button
    //                 className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
    //                 onClick={() => navigate('/register')}
    //             >
    //                 Register
    //             </button>
    //             <button
    //                 className="px-4 py-2 text-green-600 bg-white border border-green-600 rounded-lg hover:bg-green-50"
    //                 onClick={() => navigate('/login')}
    //             >
    //                 Log In
    //             </button>
    //         </>
    //     );
    // };

    return (
        <header className="w-full px-2 py-2">
            <div className="mx-auto max-w-8xl">
                <div className="flex items-center justify-between mx-5">
                    {/* Logo Section */}
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full">
                            <img src="/website_logo.svg" alt="Website Logo" className="w-10 h-10"/>
                        </div>
                        <h1 className="font-mono text-2xl font-semibold text-green-600 md:text-4xl">
                            FuelWise.lk
                        </h1>
                    </div>

                    {/* Navigation Links */}
                    <nav className="items-center justify-center flex-1 hidden px-4 md:flex">
                        {navigationLinks.map((navItem, index) => (
                            <Link
                                key={index}
                                to={navItem.path}
                                className={`px-3 py-2 mx-1 font-bold transition-colors ${
                                    activeTab === navItem.name
                                        ? 'border-b-4 border-green-600 text-green-700 bg-white rounded-t-lg hover:text-green-800'
                                        : 'text-green-600 hover:border-b-2 hover:border-green-600 hover:bg-green-50 hover:text-green-600'
                                }`}
                                onClick={() => handleTabClick(navItem.name)}
                            >
                                {navItem.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Authentication Buttons */}
                    <div className="items-center hidden space-x-2 md:flex">
                        <AuthButtons/>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center md:hidden">
                        <button
                            className="p-2 text-green-600 rounded-lg hover:bg-green-50"
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                        >
                            ☰
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {showMobileMenu && (
                    <div className="mt-2 md:hidden">
                        <div className="flex flex-col p-4 space-y-2 bg-white rounded-lg shadow-lg">
                            {navigationLinks.map((navItem, index) => (
                                <Link
                                    key={index}
                                    to={navItem.path}
                                    className={`py-2 px-4 rounded-lg ${
                                        activeTab === navItem.name
                                            ? 'bg-green-50 text-green-700'
                                            : 'text-green-600 hover:bg-green-50'
                                    }`}
                                    onClick={() => {
                                        handleTabClick(navItem.name);
                                        setShowMobileMenu(false);
                                    }}
                                >
                                    {navItem.name}
                                </Link>
                            ))}
                            <div className="flex flex-col pt-2 space-y-2 border-t">
                                <MobileAuthButtons/>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;