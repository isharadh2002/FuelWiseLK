import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Assuming you're using React Router for navigation
import "../../index.css";


function Header() {
  const pagesInHome = ["Home", "About Us", "Resources", "Services", "Contact Us"];
  const [activeTab, setActiveTab] = useState(); // State to track the active tab
  const [showMobileMenu, setShowMobileMenu] = useState();

  const handleTabClick = (page) => {
    setActiveTab(page);
  };
 

  return (
    <>
      <div className="">
    <header className="mx-4 my-2 w-screen rounded-md ">
      <div className="flex flex-wrap flex-row items-center justify-between px-4">
        {/* Logo Section */}
        <div className="flex items-center">
          <div className="bg-slate-600 w-12 h-12 rounded-full flex justify-center items-center">
            {/* Logo Image Placeholder */}
          </div>
          <h1 className="ml-4 font-semibold font-mono text-green-600 text-xl">FuelWise.lk</h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 flex justify-center ">
          {pagesInHome.map((page, index) => (
            <Link 
              key={index} 
              to={`/${page.replace(/\s+/g, '')}`} 
              className={`px-4 py-3 font-bold ${
                activeTab === page 
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
        <div className="flex space-x-4">
          <button 
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-white hover:text-green-600 hover:border-green-600"
            onClick={() => alert('Register button clicked!')} // Placeholder for register action
          >
            Register
          </button>
          <button 
            className="bg-white text-green-600 border border-green-600 px-4 py-2 rounded-lg hover:text-white hover:bg-green-600 hover:border-none"
            onClick={() => alert('Login button clicked!')} // Placeholder for login action
          >
            Log In
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <button 
          className="p-2 text-white" 
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          ☰ {/* Unicode for hamburger menu icon */}
        </button>
      </div>

      {/* Dropdown menu for mobile */}
      {showMobileMenu && (
        <div className="flex flex-col items-center bg-green-600 text-white">
          {pagesInHome.map((page, index) => (
            <Link 
              key={index} 
              to={`/${page.replace(/\s+/g, '')}`} 
              className="py-2 w-full text-center border-b border-white"
              onClick={() => {
                handleTabClick(page);
                setShowMobileMenu(false);
              }}
            >
              {page}
            </Link>
          ))}
        </div>
      )}
        </header>
        </div>
      </>
  );
}

export default Header;
