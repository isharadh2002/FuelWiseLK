import React from "react";

const About = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="max-w-4xl bg-white rounded-lg shadow-lg p-8">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
          About Us
        </h1>

        {/* Introduction */}
        <p className="text-black text-lg mb-6">
          In the face of fuel crises, effective management is crucial to ensure
          equitable distribution and reduce inconvenience for citizens. Our{" "}
          <span className="font-semibold">Fuel Quota Management System</span> is
          designed to streamline fuel allocation and distribution with a
          technology-driven solution that serves vehicle owners, fuel station
          operators, and administrators alike.
        </p>

        {/* Section: Our Purpose */}
        <h2 className="text-2xl font-semibold text-green-700 mb-4">
          Our Purpose
        </h2>
        <p className="text-black mb-6">
          We aim to deliver a comprehensive system to address fuel shortages
          effectively by ensuring a fair distribution mechanism. Through this
          platform, we seek to reduce inefficiencies, eliminate manual errors,
          and offer convenience for all stakeholders in the fuel distribution
          process.
        </p>

        {/* Section: Key Features */}
        <h2 className="text-2xl font-semibold text-green-700 mb-4">
          Key Features
        </h2>
        <ul className="list-disc pl-6 space-y-2 mb-6 text-black">
          <li>
            <strong>Vehicle Registration Portal:</strong> Vehicle owners can
            register their details online with a simple and secure process.
          </li>
          <li>
            <strong>Fuel Station Operator App:</strong> Android app for scanning
            QR codes, real-time updates on fuel quotas, and accurate logging of
            pumped fuel quantities.
          </li>
          <li>
            <strong>Administrator Portal:</strong> A secure platform for
            monitoring and managing fuel station registrations and fuel
            distribution tracking.
          </li>
          <li>
            <strong>Notification System:</strong> SMS or email notifications
            detailing fuel pumping and remaining quotas.
          </li>
        </ul>

        {/* Section: Technology Stack */}
        <h2 className="text-2xl font-semibold text-green-700 mb-4">
          Technology Stack
        </h2>
        <ul className="list-disc pl-6 space-y-2 mb-6 text-black">
          <li>
            <strong>Backend REST API:</strong> Java with Spring Boot for
            scalable operations.
          </li>
          <li>
            <strong>Database:</strong> JPA-based solution for seamless data
            access.
          </li>
          <li>
            <strong>Frontend Frameworks:</strong> React, Vue, or Angular for
            responsive single-page applications.
          </li>
          <li>
            <strong>Authentication:</strong> JWT tokens with Spring Security.
          </li>
        </ul>

        {/* Section: Our Mission */}
        <h2 className="text-2xl font-semibold text-green-700 mb-4">
          Our Mission
        </h2>
        <p className="text-black mb-6">
          Our mission is to create a transparent, efficient, and user-friendly
          fuel quota management system that empowers stakeholders to manage
          resources effectively while minimizing errors.
        </p>

        {/* Section: Our Team */}
        <h2 className="text-2xl font-semibold text-green-700 mb-4">
          Our Team
        </h2>
        <p className="text-black">
          This project is a collaborative effort of six enthusiastic developers
          working under the principles of Software Architecture and teamwork.
          Each member contributes expertise to different aspects of the system,
          from backend development to UI/UX design, ensuring excellence in every
          feature.
        </p>
      </div>
    </div>
  );
};

export default About;
