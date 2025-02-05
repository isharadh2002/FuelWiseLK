import React from "react";
import FuelImage from '/src/assets/Fuel_About.png';
import Header from "../components/common/Header.jsx";
import Footer from "../components/common/Footer.jsx";

const About = () => {
    return (
        <>
            <Header/>
            <div className="flex items-center justify-center min-h-screen bg-green-50">
                <div className="max-w-5xl bg-light green rounded-lg shadow-lg p-8 my-5">
                    {/* Heading */}
                    <h1 className="text-4xl font-bold text-center text-green-500 mb-6">
                        About Us
                    </h1>

                    <img
                        src={FuelImage}
                        alt="Description of the image"
                        className="w-full h-auto mb-6 rounded-lg" // Makes the image full-width with auto height and adds some margin
                    />

                    {/* Introduction */}
                    <p className="text-black text-lg mb-6 leading-relaxed">
                        In the face of fuel crises, effective management is crucial to ensure
                        equitable distribution and reduce inconvenience for citizens. Our{" "}
                        <span className="font[550] text-green-600">
            Fuel Quota Management System
          </span>{" "}
                        is tailored to streamline fuel allocation and distribution in Sri
                        Lanka. With a technology-driven approach, this system serves vehicle
                        owners, fuel station operators, and administrators alike.
                    </p>

                    {/* Section: Our Purpose */}
                    <h2 className="text-2xl font-semibold text-green-600 mb-4">
                        Our Purpose
                    </h2>
                    <p className="text-black text-lg mb-6 leading-relaxed">
                        We aim to deliver a comprehensive system to address fuel shortages
                        effectively by ensuring a fair distribution mechanism. Through this
                        platform, we seek to minimize inefficiencies, eliminate manual errors,
                        and offer convenience for all stakeholders involved in fuel
                        distribution.
                    </p>

                    {/* Section: Key Features */}
                    <h2 className="text-2xl font-semibold text-green-600 mb-4">
                        Key Features
                    </h2>
                    <ul className="list-disc pl-6 space-y-2 mb-6 text-black text-lg">
                        <li>
                            <strong>Vehicle Registration Portal:</strong> Vehicle owners can
                            securely register their vehicles online.
                        </li>
                        <li>
                            <strong>Fuel Station Operator App:</strong> Android app for scanning
                            QR codes, updating quotas, and logging pumped fuel.
                        </li>
                        <li>
                            <strong>Administrator Portal:</strong> A secure platform for
                            managing fuel station registrations and monitoring distribution.
                        </li>
                        <li>
                            <strong>Notification System:</strong> SMS or email notifications to
                            keep users updated on fuel usage and quotas.
                        </li>
                    </ul>

                    {/* Section: Our Mission */}
                    <h2 className="text-2xl font-semibold text-green-600 mb-4">
                        Our Mission
                    </h2>
                    <p className="text-black text-lg mb-6 leading-relaxed">
                        Our mission is to create a transparent, efficient, and user-friendly
                        fuel quota management system tailored to address the fuel crisis in
                        Sri Lanka. By leveraging technology, we aim to empower stakeholders
                        to manage resources effectively while minimizing errors.
                    </p>

                </div>
            </div>
            <Footer/>
        </>
    );
};

export default About;
