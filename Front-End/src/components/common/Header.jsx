<<<<<<< HEAD
import React from "react";
import "../../index.css";

function Header() {
  const pagesInHome = ["Home", "About Us", "Resources","Services","Contact Us"];
  const [value, setValue] = React.useState(0);
  const operations = ["signIn", "logIn"];

  const handleChange = (event, newValue) => setValue(newValue);

  // Render tabs dynamically using map()
  const headerInput = () => pagesInHome.map((page, index) => (<Tab key={index} label={page} />));
  const headerOperations = () => operations.map((page, index) => (<Tab key={index} label={page} />));
  
  return (
    <>
      
     <div class="w-screen flex flex-row bg-gradient-to-r from-green-800 via-green-600 to-green-200" >
      <div class=" basis-1/6 md:flex bg-cover flex flex-row justify-center items-center px-6  gap-12 space-x-9 ">
        <div class=" gap-2 rounded-xl ">
          <div class="rounded-lg bg-slate-50 w-auto h-auto"></div>
         <h1 class="font-semibold font-mono text-white ">FuelWise.lk</h1>
        </div>
        <div class=" flex flex-row basis-1/2 justify-between items-center   hover:shadow-lg">
          {pagesInHome.map((page, index) => (
            <a 
              key={index} 
              href={`/${page.replace(/\s+/g, '')}`} 
              class="bg-cover font-bold px-6 py-3 text-white h-fit hover:border-b-2 hover:border-green-600  focus:border-b-2 focus:border-green-600 active:border-b-2 active:border-black-500 hover:bg-slate-100 hover:text-green-600"
            >
              {page}
            </a>
          ))}
        </div>
            <div class="flex flex-row basis-1/3 justify-between items-center p-4 space-x-6 mx-6">
            <button class="bg-green-600 text-white px-4 py-2 hover:bg-white hover:text-green-600 hover:border-green-600 mx-3">
              Register
            </button>
            <button class="bg-white text-green-600 border border-green-600 px-4 py-2 mx-3 hover:text-white hover:bg-green-600 hover:border-none">
              LogIn
            </button>
            </div>
    </div >
    </div>
     
    </>
=======
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // React Router imports
import "../../index.css";

function Header() {
  const pagesInHome = ["Home", "About Us", "Resources", "Services", "Contact Us"];
  const [activeTab, setActiveTab] = useState('Home'); // Default active tab
  const [showMobileMenu, setShowMobileMenu] = useState(false); // Default menu state

  const navigate = useNavigate();
  const location = useLocation();

  // Set active tab based on URL
  useEffect(() => {
    const currentPath = location.pathname.replace("/", "").toLowerCase();
    setActiveTab(currentPath || 'home'); // Default to 'Home' if no path is found
  }, [location]);

  const handleTabClick = (page) => {
    setActiveTab(page.toLowerCase());
  };

  return (
    <>
      <header className="mx-4 my-2 w-screen rounded-md">
        <div className="flex ml-4 flex-wrap flex-row items-center justify-between px-4">
          {/* Logo Section */}
          <div className="flex items-center">
            <div className="bg-slate-600 w-12 h-12 rounded-full flex justify-center items-center">
              {/* Logo Image Placeholder */}
            </div>
            <h1 className="hidden md:flex flex-1 justify-center ml-4 font-semibold font-mono text-green-600 text-4xl">FuelWise.lk</h1>
            <h1 className="md:hidden flex-1 justify-center ml-4 font-semibold font-mono text-green-600 text-4xl">FuelWise.lk</h1>
          
          
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex flex-1 justify-center">
            {pagesInHome.map((page, index) => (
              <Link 
                key={index} 
                to={`/${page.replace(/\s+/g, '').toLowerCase()}`} 
                className={`px-4 py-3 font-bold ${activeTab === page.toLowerCase() ? 'border-b-4 border-green-600 text-green-700 bg-white rounded-t-lg hover:text-green-800' : 'text-green-600 hover:border-b-2 hover:border-green-600 hover:bg-green-50 hover:text-green-600'}`} 
                onClick={() => handleTabClick(page)}
              >
                {page}
              </Link>
            ))}
          </nav>

          {/* Authentication Buttons */}
          <div className="hidden md:flex space-x-4">
            <button 
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-white hover:text-green-600 hover:border-green-600"
              onClick={() => navigate('/register')}
            >
              Register
            </button>
            <button 
              className="bg-white text-green-600 border border-green-600 px-4 py-2 rounded-lg hover:text-white hover:bg-green-600 hover:border-none"
              onClick={() => navigate('/login')}
            >
              Log In
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="flex md:hidden justify-between items-center px-4">
          
          <button 
            className="p-2 m-6
             text-green-600 rounded-md hover:border-green-600" 
            aria-label="Toggle mobile navigation menu" 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            ☰
          </button>
        

        {/* Dropdown menu for mobile */}
        {showMobileMenu && (
          <div className="flex flex-col items-center mx-6 rounded-lg bg-green-600 text-white md:hidden">
            {pagesInHome.map((page, index) => (
              <Link 
                key={index} 
                to={`/${page.replace(/\s+/g, '').toLowerCase()}`} 
                className="py-4 w-4/5 text-center border-b border-white text-white"
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

            <div className="flex   items-center ">
              <button 
                className="bg-green-600 text-white  rounded-lg w-3/8 mx-6 hover:bg-white hover:text-green-600 hover:border-green-600 "
                onClick={() => navigate('/register')}
              >
                Register
              </button>
              <button 
                className="bg-white text-green-600 border border-green-600  rounded-lg w-3/8 hover:text-white hover:bg-green-600 hover:border-none"
                onClick={() => navigate('/login')}
              >
                Log In
              </button>
          </div>
          </div>
          
      
      </header>
   </>
>>>>>>> dev/Isuru
  );
}
// Put for navbar to breaking in to number of line that having in the screen
export default Header;
