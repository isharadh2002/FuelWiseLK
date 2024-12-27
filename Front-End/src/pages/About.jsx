import React from "react";

const About = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="max-w-4xl bg-light green rounded-lg shadow-lg p-8">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-green-500 mb-6">
          About Us
        </h1>

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
        <p className="text-black mb-6 leading-relaxed">
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
        <ul className="list-disc pl-6 space-y-2 mb-6 text-black">
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

        {/* Section: Technology Stack */}
        <h2 className="text-2xl font-semibold text-green-600 mb-4">
          Technology Stack
        </h2>
        <ul className="list-disc pl-6 space-y-2 mb-6 text-black">
          <li>
            <strong>Backend REST API:</strong> Built with Java and Spring Boot
            for robust and scalable operations.
          </li>
          <li>
            <strong>Database:</strong> MySQL integrated with JPA for efficient
            data handling.
          </li>
          <li>
            <strong>Frontend Frameworks:</strong> React for responsive and
            dynamic single-page applications.
          </li>
          <li>
            <strong>Authentication:</strong> JWT tokens with Spring Security to
            ensure secure access.
          </li>
          <li>
            <strong>Mobile App:</strong> Android app developed using Kotlin.
          </li>
        </ul>

        {/* Section: Our Mission */}
        <h2 className="text-2xl font-semibold text-green-600 mb-4">
          Our Mission
        </h2>
        <p className="text-black mb-6 leading-relaxed">
          Our mission is to create a transparent, efficient, and user-friendly
          fuel quota management system tailored to address the fuel crisis in
          Sri Lanka. By leveraging technology, we aim to empower stakeholders
          to manage resources effectively while minimizing errors.
        </p>

        {/* Section: Our Team */}
        <h2 className="text-2xl font-semibold text-green-600 mb-4">
          Our Team
        </h2>
        <p className="text-black leading-relaxed">
          This project is a collaborative effort by six dedicated developers,
          each contributing expertise in areas such as backend development,
          mobile application development, and UI/UX design. Together, we aim to
          deliver excellence in every feature of the system.
        </p>
      </div>
    </div>
  );
};

export default About;
