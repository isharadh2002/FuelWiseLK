import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../../index.css";

function Header() {
  const pagesInHome = ["Home", "About Us", "Resources", "Services", "Contact Us"];
  const [activeTab, setActiveTab] = useState('Home');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname.replace("/", "");
    setActiveTab(currentPath || 'home');
  }, [location]);

  const handleTabClick = (page) => {
    setActiveTab(page);
  };

  return (
      <header className="w-full px-2 py-2">
        <div className="max-w-8xl mx-auto">
          <div className="mx-5 flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <img src="/website_logo.svg" alt="Website Logo" className="w-10 h-10" />
              </div>
              <h1 className="font-semibold font-mono text-green-600 text-2xl md:text-4xl">
                FuelWise.lk
              </h1>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center justify-center flex-1 px-4">
              {pagesInHome.map((page, index) => (
                  <Link
                      key={index}
                      to={`/${page.replace(/\s+/g, '')}`}
                      className={`px-3 py-2 mx-1 font-bold transition-colors ${
                          activeTab === page.toLowerCase()
                              ? 'border-b-4 border-green-600 text-green-700 bg-white rounded-t-lg hover:text-green-800'
                              : 'text-green-600 hover:border-b-2 hover:border-green-600 hover:bg-green-50 hover:text-green-600'
                      }`}
                      onClick={() => handleTabClick(page)}
                  >
                    {page}
                  </Link>
              ))}
            </nav>

            {/* Authentication Buttons */}
            <div className="hidden md:flex items-center space-x-2">
              <button
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-white hover:text-green-600 border border-transparent hover:border-green-600 transition-colors"
                  onClick={() => navigate('/register')}
              >
                Register
              </button>
              <button
                  className="bg-white text-green-600 border border-green-600 px-4 py-2 rounded-lg hover:text-white hover:bg-green-600 transition-colors"
                  onClick={() => navigate('/login')}
              >
                Log In
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                ☰
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {showMobileMenu && (
              <div className="md:hidden mt-2">
                <div className="flex flex-col space-y-2 bg-white rounded-lg shadow-lg p-4">
                  {pagesInHome.map((page, index) => (
                      <Link
                          key={index}
                          to={`/${page.replace(/\s+/g, '')}`}
                          className="py-2 px-4 text-green-600 hover:bg-green-50 rounded-lg"
                          onClick={() => {
                            handleTabClick(page);
                            setShowMobileMenu(false);
                          }}
                      >
                        {page}
                      </Link>
                  ))}
                  <div className="flex flex-col space-y-2 pt-2 border-t">
                    <button
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                        onClick={() => navigate('/register')}
                    >
                      Register
                    </button>
                    <button
                        className="bg-white text-green-600 border border-green-600 px-4 py-2 rounded-lg hover:bg-green-50"
                        onClick={() => navigate('/login')}
                    >
                      Log In
                    </button>
                  </div>
                </div>
              </div>
          )}
        </div>
      </header>
  );
}

export default Header;