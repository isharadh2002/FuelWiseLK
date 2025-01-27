import React from "react";
import {Globe, Lock, BarChart3} from "lucide-react";
import Header from "../components/common/Header.jsx";
import Footer from "../components/common/Footer.jsx";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css"; // Import Swiper styles
import "swiper/css/pagination";
import "swiper/css/navigation";
import {Pagination, Navigation, Autoplay} from "swiper/modules";

const FuelManagementPlatform = () => {

    // Sliding images (replace with your own image URLs)
    const slidingImages = [
        "/HomePage/SlidingImages/Image1.jpg",
        "/HomePage/SlidingImages/Image2.jpg",
        "/HomePage/SlidingImages/Image3.jpeg",
        "/HomePage/SlidingImages/Image4.jpeg",
    ];

    // Custom green color palette
    const features = [
        {
            title: "Smart Fuel Tracking",
            description: "Track and manage fuel usage efficiently",
            icon: <BarChart3 className="w-8 h-8 text-green-600"/>,
        },
        {
            title: "Weekly QR Code",
            description: "Seamless fuel access with weekly generated codes",
            icon: <Lock className="w-8 h-8 text-green-600"/>,
        },
        {
            title: "Live Usage Tracking",
            description: "Monitor fuel usage in real-time",
            icon: <Globe className="w-8 h-8 text-green-600"/>,
        },
    ];

    const steps = [
        {
            number: 1,
            title: "Sign up for our platform and Get Your Weekly QR Code",
            team: "FuelSmart Team",
        },
        {
            number: 2,
            title: "Scan the QR code at the fuel station and start refueling",
            team: "FuelSmart Team",
        },
        {
            number: 3,
            title: "Track your fuel usage and manage your quota efficiently",
            team: "FuelSmart Team",
        },
    ];

    const testimonials = [
        {
            name: "Ronald S.",
            comment:
                "It's so convenient! I never have to worry about running out of fuel unexpectedly.",
            rating: 5,
        },
        {
            name: "Henry D.",
            comment:
                "The weekly QR code system is fast and secure. No more waiting in long queues.",
            rating: 5,
        },
        {
            name: "Karen P.",
            comment:
                "Knowing how much fuel I have left has made me more conscious of my usage.",
            rating: 5,
        },
    ];


    return (
        <>
            <Header/>
            <div className="min-h-screen bg-white">


                {/* Navigation */}
                {/*
            <nav className="flex items-center justify-between p-4 bg-green-50">
                <div className="text-xl font-bold text-green-800">FuelWise.lk</div>
                <div className="flex gap-6">
                    <a href="#" className="text-green-700 hover:text-green-900">Home</a>
                    <a href="#" className="text-green-700 hover:text-green-900">Features</a>
                    <a href="#" className="text-green-700 hover:text-green-900">How It Works</a>
                    <a href="#" className="text-green-700 hover:text-green-900">Testimonials</a>
                    <a href="#" className="text-green-700 hover:text-green-900">Sign Up</a>
                </div>
            </nav>
            */}

                {/* Sliding Images with Hero Section */}
                <div className="relative">
                    <Swiper
                        pagination={{clickable: true}}
                        navigation
                        loop
                        autoplay={{delay: 5000}} // Enable auto-slide with a 5-second interval
                        speed={2000} // Adjust the animation speed (1000ms = 1 second)
                        modules={[Pagination, Navigation, Autoplay]} // Add Autoplay module
                        className="h-[90vh]"
                    >
                        {slidingImages.map((image, index) => (
                            <SwiperSlide key={index}>
                                <div
                                    className="h-full bg-cover bg-center"
                                    style={{backgroundImage: `url(${image})`}}
                                ></div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Hero Section Overlay */}
                    <div
                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 pointer-events-none">
                        <div className="text-center text-white z-20 pointer-events-auto">
                            <h1 className="text-5xl font-bold mb-6">
                                Fuel Smarter, Not Harder —
                                <br/>
                                Your Weekly QR Code Awaits.
                            </h1>
                            <p className="mb-8 text-lg">
                                Access Fuel Seamlessly with a Secure Weekly QR Code System.
                            </p>
                            <button
                                className="bg-green-600 px-8 py-4 rounded-lg text-white font-semibold text-lg hover:bg-green-700">
                                Get Your QR Code Now
                            </button>
                        </div>
                    </div>
                </div>


                {/* Hero Section */}
                {/*
                <div className="text-center py-20 bg-green-50">
                    <h1 className="text-4xl font-bold mb-4 text-green-900">
                        Fuel Smarter, Not Harder —<br/>
                        Your Weekly QR Code Awaits.
                    </h1>
                    <p className="mb-8 text-green-700">Access Fuel Seamlessly with a Secure Weekly QR Code System.</p>
                    <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700">
                        Get Your QR Code Now
                    </button>
                </div>
                */}

                {/* Features Section */}
                <div className="py-16 px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-green-900">
                        Why Choose Our Fuel Management System?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {features.map((feature, index) => (
                            <div key={index} className="p-6 bg-green-100 rounded-lg">
                                <div className="mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold mb-2 text-green-800">{feature.title}</h3>
                                <p className="text-green-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* How It Works Section */}
                <div className="py-16 bg-green-50 px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-green-900">
                        How It Works — Simple Steps to Fuel Up
                    </h2>
                    <div className="max-w-4xl mx-auto">
                        {steps.map((step, index) => (
                            <div key={index} className="flex items-start mb-8 bg-white p-6 rounded-lg">
                                <div
                                    className="w-12 h-12 flex items-center justify-center bg-green-600 text-white rounded-full mr-4">
                                    {step.number}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2 text-green-800">{step.title}</h3>
                                    <p className="text-green-600">{step.team}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Testimonials Section */}
                <div className="py-16 px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-green-900">
                        See What Users Are Saying
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="p-6 bg-green-50 rounded-lg">
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-green-200 rounded-full mr-3"></div>
                                    <div className="font-semibold text-green-800">{testimonial.name}</div>
                                </div>
                                <p className="text-green-700 mb-4">{testimonial.comment}</p>
                                <div className="flex text-yellow-400">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <span key={i}>★</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="py-16 bg-green-50 px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4 text-green-900">
                        Fueling Has Never Been This Simple!
                    </h2>
                    <p className="mb-8 text-green-700">Get Your Weekly QR Code and Start Saving Time and Energy.</p>
                    <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700">
                        Get My QR Code
                    </button>
                </div>
            </div>

            <Footer/>
        </>
    );
};

export default FuelManagementPlatform;
