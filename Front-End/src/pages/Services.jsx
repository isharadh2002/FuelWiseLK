import React from "react";
import Header from "../components/common/Header.jsx";
import Footer from "../components/common/Footer.jsx";

function Services() {
    return (
       <> 
         <Header />
         <div className="container mx-auto p-6">
           <h1 className="text-3xl font-bold text-center mb-6 mt-10 text-green-600">Our Services</h1>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
             
             {/* Service 1 */}
             <div className="shadow-lg p-8 rounded-2xl border border-green-200 bg-green-50 transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl min-h-[250px] flex flex-col justify-between">
               <div className="flex flex-col items-center text-center">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-600" width="40" height="40">
                   <path d="M3 12l9-9 9 9M12 3v18"></path>
                 </svg>
                 <h2 className="text-xl font-semibold mt-4 text-green-600">Vehicle Registration</h2>
                 <p className="text-black mt-8 text-center leading-relaxed font-medium">
                   Register your vehicle online and get a unique QR code upon successful verification.
                 </p>
               </div>
             </div>
             
             {/* Service 2 */}
             <div className="shadow-lg p-8 rounded-2xl border border-green-200 bg-green-50 transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl min-h-[250px] flex flex-col justify-between">
               <div className="flex flex-col items-center text-center">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500" width="40" height="40">
                   <path d="M20 9V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v5m0 6v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5m-14 0h8"></path>
                 </svg>
                 <h2 className="text-xl font-semibold mt-4 text-green-600">Fuel Station Registration</h2>
                 <p className="text-black mt-8 text-center leading-relaxed font-medium">
                   Fuel station owners can register and manage their stations on our dedicated portal.
                 </p>
               </div>
             </div>
             
             {/* Service 3 */}
             <div className="shadow-lg p-8 rounded-2xl border border-green-200 bg-green-50 transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl min-h-[250px] flex flex-col justify-between">
               <div className="flex flex-col items-center text-center">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-700" width="40" height="40">
                   <path d="M6 2a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h2zm12 0a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h2z"></path>
                 </svg>
                 <h2 className="text-xl font-semibold mt-4 text-green-600">QR Code Scanning</h2>
                 <p className="text-black mt-6 text-center leading-relaxed font-medium">
                   Fuel station operators can scan vehicle QR codes to check fuel quotas instantly.
                 </p>
               </div>
             </div>
             
             {/* Service 4 */}
             <div className="shadow-lg p-8 rounded-2xl border border-green-200 bg-green-50 transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl min-h-[250px] flex flex-col justify-between">
               <div className="flex flex-col items-center text-center">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-400" width="40" height="40">
                   <path d="M12 7V4m5 6h2M6 9h2m2 10H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H12m0 0V7"></path>
                 </svg>
                 <h2 className="text-xl font-semibold mt-4 text-green-600">Real-time Validation</h2>
                 <p className="text-black mt-8 text-center leading-relaxed font-medium">
                   Vehicle details are validated against the Department of Motor Traffic database.
                 </p>
               </div>
             </div>
             
             {/* Service 5 */}
             <div className="shadow-lg p-8 rounded-2xl border border-green-200 bg-green-50 transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl min-h-[250px] flex flex-col justify-between">
               <div className="flex flex-col items-center text-center">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-800" width="40" height="40">
                   <path d="M5 4v16l7-7 7 7V4"></path>
                 </svg>
                 <h2 className="text-xl font-semibold mt-4 text-green-600">Instant Notifications</h2>
                 <p className="text-black mt-8 text-center leading-relaxed font-medium">
                   Receive SMS or email notifications whenever fuel is pumped.
                 </p>
               </div>
             </div>
             
             {/* Service 6 */}
             <div className="shadow-lg p-8 rounded-2xl border border-green-200 bg-green-50 transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl min-h-[250px] flex flex-col justify-between">
               <div className="flex flex-col items-center text-center">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-300" width="40" height="40">
                   <path d="M4 9V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4m-2 0v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9m14 0H6"></path>
                 </svg>
                 <h2 className="text-xl font-semibold mt-4 text-green-600">Secure Authentication</h2>
                 <p className="text-black mt-8 text-center leading-relaxed font-medium">
                   All transactions and logins are secured using JWT-based authentication.
                 </p>
               </div>
             </div>
             
           </div>
         </div>
         <Footer />
       </>
    );
}

export default Services;
