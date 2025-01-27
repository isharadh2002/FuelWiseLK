import {Mail, MapPin, Phone, Clock} from "lucide-react";
import Header from "../components/common/Header.jsx";

const ContactUs = () => {
    return (
        <>
            <Header/>
            <div className="min-h-screen px-4 py-12 bg-gradient-to-b from-green-50 to-white">
                <div className="mx-auto max-w-7xl">
                    {/* Header Section */}
                    <div className="mb-16 text-center">
                        <h1 className="mb-4 text-4xl font-bold text-green-600">
                            Get In Touch
                        </h1>
                        <div className="w-24 h-1 mx-auto mb-4 bg-green-500"></div>
                        <p className="max-w-2xl mx-auto text-gray-600">
                            Ready to join our network of fuel stations? We&apos;re here to help
                            you get started. Fill out the form below and our team will get back
                            to you shortly.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Contact Information */}
                        <div className="lg:col-span-1">
                            <div className="h-full p-8 text-white bg-green-600 rounded-xl">
                                <h2 className="mb-6 text-2xl font-bold">Contact Information</h2>
                                <div className="space-y-6">
                                    <div className="flex items-center space-x-4">
                                        <Phone className="w-6 h-6"/>
                                        <div>
                                            <p className="font-semibold">Phone</p>
                                            <p className="text-green-100">+1 (555) 123-4567</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <Mail className="w-6 h-6"/>
                                        <div>
                                            <p className="font-semibold">Email</p>
                                            <p className="text-green-100">support@fuelstation.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <MapPin className="w-6 h-6"/>
                                        <div>
                                            <p className="font-semibold">Address</p>
                                            <p className="text-green-100">
                                                Victoria St, Melbourne VIC, Australia
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <Clock className="w-6 h-6"/>
                                        <div>
                                            <p className="font-semibold">Business Hours</p>
                                            <p className="text-green-100">
                                                Mon - Fri: 9:00 AM - 6:00 PM
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="p-8 bg-white shadow-lg rounded-xl">
                                <form className="space-y-6">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-3 transition duration-200 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                placeholder="John"
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-3 transition duration-200 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                placeholder="Doe"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                className="w-full px-4 py-3 transition duration-200 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                className="w-full px-4 py-3 transition duration-200 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                placeholder="+1 (555) 000-0000"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-700">
                                            Station Name
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 transition duration-200 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            placeholder="Enter your fuel station name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-700">
                                            Message
                                        </label>
                                        <textarea
                                            rows="4"
                                            className="w-full px-4 py-3 transition duration-200 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            placeholder="Tell us about your fuel station and any specific requirements..."
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transform hover:scale-[1.02] transition-all duration-200"
                                    >
                                        Submit Registration
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Map Section */}
                    <div className="mt-16">
                        <h2 className="mb-8 text-2xl font-bold text-center text-green-600">
                            Our Location
                        </h2>
                        <div className="overflow-hidden shadow-lg rounded-xl">
                            <iframe
                                title="Google Maps"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509214!2d144.95373501531553!3d-37.817209742021955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce6e0!2sVictoria%20St%2C%20Melbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2slk!4v1678810447982!5m2!1sen!2slk"
                                width="100%"
                                height="400"
                                style={{border: 0}}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactUs;
