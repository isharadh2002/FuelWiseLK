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
  );
}
// Put for navbar to breaking in to number of line that having in the screen
export default Header;
