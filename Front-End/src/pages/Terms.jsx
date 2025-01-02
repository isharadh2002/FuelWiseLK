import React from "react";

const TermsPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div className="relative w-full max-w-3xl p-8 mx-auto bg-white border-t-4 border-green-500 shadow-xl rounded-xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        {/* Popup Header */}
        <h1 className="mb-6 text-4xl font-extrabold text-center text-green-700">
          Terms and Conditions
        </h1>
        <p className="mb-8 text-sm text-center text-green-500">
          Last Updated: October 2024
        </p>

        {/* Scrollable Content */}
        <div
          className="overflow-y-auto max-h-[70vh] px-4"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#10B981 #F3F4F6" }}
        >
          {/* Introduction Section */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-green-800">
              Introduction
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Welcome to FuelWiseLK. By using our application, you agree to
              comply with and be bound by the following terms and conditions.
              Please review them carefully.
            </p>
          </section>

          {/* Account Requirements Section */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-green-800">
              Account Requirements
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Users must be at least 18 years old to create an account. You are
              responsible for maintaining the confidentiality of your account
              information and for all activities that occur under your account.
              We reserve the right to suspend or terminate accounts that violate
              our terms.
            </p>
          </section>

          {/* Prohibited Activities Section */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-green-800">
              Prohibited Activities
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Users are prohibited from engaging in activities such as misuse of
              the platform, illegal activities, or sharing false information.
              Any violation may result in account suspension or termination.
            </p>
          </section>

          {/* Data Collection and Usage Section */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-green-800">
              Data Collection and Usage
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              We collect data to improve our services. This includes personal
              information and usage data. We take measures to protect your
              privacy and ensure data security.
            </p>
          </section>

          {/* Payment Terms Section */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-green-800">
              Payment Terms
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              All payments are subject to our payment policies. Refunds are
              provided under specific conditions. Please review our payment
              terms for more details.
            </p>
          </section>

          {/* Liability and Warranties Section */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-green-800">
              Liability and Warranties
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              We do not guarantee that the application will be error-free or
              uninterrupted. Our liability is limited to the maximum extent
              permitted by law.
            </p>
          </section>

          {/* Termination Clause Section */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-green-800">
              Termination Clause
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Both users and the provider can terminate this agreement at any
              time. Termination will result in the deactivation of your account.
            </p>
          </section>

          {/* Changes to Terms Section */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-green-800">
              Changes to Terms
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              We may update these terms from time to time. Users will be
              notified of any changes through the application or via email.
            </p>
          </section>

          {/* Contact Information Section */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-green-800">
              Contact Information
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              If you have any questions or concerns, please contact us at{" "}
              <a
                href="mailto:support@fuelwiselk.com"
                className="text-green-600 transition duration-200 hover:text-green-800"
              >
                support@fuelwiselk.com
              </a>
              .
            </p>
          </section>

          {/* Governing Law Section */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-green-800">
              Governing Law
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              These terms are governed by the laws of Sri Lanka.
            </p>
          </section>
        </div>
        <div className="mt-4 text-center">
          <button
            onClick={onClose}
            className="px-8 py-2 text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-teal-500 rounded-lg shadow-md hover:from-teal-500 hover:to-green-500 focus:ring-4 focus:ring-green-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsPopup;
