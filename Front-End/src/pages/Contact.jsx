import React from "react";

const ContactUs = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      {/* Contact Form Section */}
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 mb-6">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-green-500 mb-6">
          Contact Us
        </h1>

        {/* Introduction */}
        <p className="text-gray-700 text-center">
          Have questions or need help?
        </p>
        <p className="text-gray-700 text-center mb-6">
          Feel free to get in touch with us by filling out the form below.
        </p>

        {/* Contact Form */}
        <form>
          {/* Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Message */}
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              placeholder="Enter your message"
              rows="5"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-md transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Google Maps Section */}
      <div className="w-full">
        <h2 className="text-2xl font-semibold text-center text-green-600 mb-4">
          Our Location
        </h2>
        <iframe
          title="Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509214!2d144.95373501531553!3d-37.817209742021955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce6e0!2sVictoria%20St%2C%20Melbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2slk!4v1678810447982!5m2!1sen!2slk"
          width="100%"
          height="300"
          className="rounded-lg shadow-lg"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;
