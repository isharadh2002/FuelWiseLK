import React from "react";
import "../../index.css";



function Header() {
  const pagesInHome = ["Home", "About Us", "Resources"];
    const [value, setValue] = React.useState(0);
    const operations = ["signIn", "logIn"];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Render tabs dynamically using map()
  const headerInput = () => {
    return pagesInHome.map((page, index) => (
      <Tab key={index} label={page} />
    ));
  };
    const headerOperations = () => {
        return operations.map((page, index) => (
            <Tab key={index} label={page} />
        ));
  };
  const div = [""];
 

  return (
     
    <>
      


      <div class="flex-row justify-evenly grid grid-flow-row-dense grid-cols-2  "> 
        <div class="flex flex-wrap flex-row w-2/">
    <nav class="flex justify-center space-x-3">

      <div class="flex flex-wrap flex-row align-middle
       w-full">
                    <div class="w-auto h-auto">
                        <a href="/Home" 
                          class="font-bold px-3 py-2 text-slate-700 
                          hover:border-b-2 hover:border-black 
                          focus:border-b-2 focus:border-black 
                          active:border-b-2 active:border-black-500 
                          hover:bg-slate-100 hover:text-slate-900">
                          Home
                        </a>
                    </div>
                    <div class="w-auto h-auto">
                        <a href="/About Us" 
                          class="font-bold px-3 py-2 text-slate-700 
                          hover:border-b-2 hover:border-black 
                          focus:border-b-2 focus:border-black 
                          active:border-b-2 active:border-black-500 
                          hover:bg-slate-100 hover:text-slate-900">
                          About Us
                        </a>
                  </div>
          
                <div class="w-auto h-auto">
                        <a href="/Resources" 
                        class="font-bold px-3 py-2 text-slate-700 
                        hover:border-b-2 hover:border-black 
                        focus:border-b-2 focus:border-black 
                        active:border-b-2 active:border-black-500 
                        hover:bg-slate-100 hover:text-slate-900">
                        Resources
                        </a>
              </div>
     <div class="flex flex-wrap flex-row 
        w-full">
              <div class="mx-5">
                      <button class=" bg-slate-800 w-15 text-white hover:bg-white hover:text-black">
                        Register
                      </button>
              </div>
              <div class="mx-5">
                      <button class="bg-white w-15 m-0 border-slate-800 text-slate-800 hover:text-white hover:bg-black ">
                        LogIn
                      </button>
              </div>
      </div>
        </div>
          </nav>
          </div>
      
      </div>
      
    </>
    
  );
}

export default Header;
