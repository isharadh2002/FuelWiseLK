import React, { useState, useEffect } from "react";
import {Globe, Lock, BarChart3} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header.jsx";
import Footer from "../components/common/Footer.jsx";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css"; // Import Swiper styles
import "swiper/css/pagination";
import "swiper/css/navigation";
import {Pagination, Navigation, Autoplay} from "swiper/modules";
import {motion} from "framer-motion";

const HomePage = () => {

    const navigate = useNavigate();
    const [userRole, setUserRole] = useState(null);

    // Sliding images (replace with your own image URLs)
    const slidingImages = [
        "/HomePage/SlidingImages/Image1.jpg",
        "/HomePage/SlidingImages/Image2.jpg",
        "/HomePage/SlidingImages/Image3.jpeg",
        "/HomePage/SlidingImages/Image4.jpeg",
        "/HomePage/SlidingImages/Image5.jpg",
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

    useEffect(() => {
      // Fetch user role from local storage
      const role = localStorage.getItem("userRole");
      setUserRole(role);
    }, []);

        const handleButtonClick = () => {
          if (userRole === "vehicle_owner") {
            navigate("/dashboard");
          } else if (userRole === "fuel_station") {
            navigate("/fuelStation-dashboard");
          } else {
            navigate("/services");
          }
        };

        const getButtonText = () => {
          if (userRole === "vehicle_owner") {
            return "Get Your QR Code Now";
          } else if (userRole === "fuel_station") {
            return "See Transactions";
          } else {
            return "See our Services";
          }
        };


    return (
      <>
        <Header />
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
              pagination={{ clickable: true }}
              navigation
              loop
              autoplay={{ delay: 5000 }} // Enable auto-slide with a 5-second interval
              speed={2000} // Adjust the animation speed (1000ms = 1 second)
              modules={[Pagination, Navigation, Autoplay]} // Add Autoplay module
              className="h-[90vh]"
            >
              {slidingImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="h-full bg-center bg-cover"
                    style={{ backgroundImage: `url(${image})` }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Hero Section Overlay */}
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 pointer-events-none">
              <div className="z-20 m-10 text-center text-white pointer-events-auto">
                <h1 className="mb-6 text-5xl font-bold">
                  Fuel Smarter, Not Harder
                  <br />
                  Your Weekly QR Code Awaits.
                </h1>
                <p className="mb-8 text-lg">
                  Access Fuel Seamlessly with a Secure Weekly QR Code System.
                </p>

                <button
                  onClick={handleButtonClick}
                  className="px-8 py-4 text-lg font-semibold text-white transition-all transform bg-green-600 rounded-lg hover:bg-green-700 hover:scale-105"
                >
                  {getButtonText()}
                </button>
              </div>
            </div>
          </div>

          {/* Hero Section */}
          {/*
                <div className="py-20 text-center bg-green-50">
                    <h1 className="mb-4 text-4xl font-bold text-green-900">
                        Fuel Smarter, Not Harder —<br/>
                        Your Weekly QR Code Awaits.
                    </h1>
                    <p className="mb-8 text-green-700">Access Fuel Seamlessly with a Secure Weekly QR Code System.</p>
                    <button className="px-6 py-3 text-white bg-green-600 rounded-md hover:bg-green-700">
                        Get Your QR Code Now
                    </button>
                </div>
                */}

          {/* Features Section */}
          <div className="px-4 py-16">
            <h2 className="mb-12 text-3xl font-bold text-center text-green-800">
              Why Choose Our Fuel Management System?
            </h2>
            <div className="grid max-w-6xl grid-cols-1 gap-8 mx-auto md:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="p-6 bg-green-100 rounded-lg"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.25 }}
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="mb-2 text-xl font-semibold text-green-800">
                    {feature.title}
                  </h3>
                  <p className="text-green-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* How It Works Section */}
          <div className="px-4 py-16 bg-green-50">
            <h2 className="mb-12 text-3xl font-bold text-center text-green-800">
              How It Works — Simple Steps to Fuel Up
            </h2>
            <div className="max-w-4xl mx-auto">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className="flex items-start p-6 mb-8 bg-white rounded-lg"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.5 }}
                >
                  <div className="flex items-center justify-center w-12 h-12 mr-4 text-white bg-green-600 rounded-full">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-green-800">
                      {step.title}
                    </h3>
                    <p className="text-green-600">{step.team}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="px-4 py-16">
            <h2 className="mb-12 text-3xl font-bold text-center text-green-800">
              See What Users Are Saying
            </h2>
            <div className="grid max-w-6xl grid-cols-1 gap-8 mx-auto md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="p-6 rounded-lg bg-green-50">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 mr-3 bg-green-200 rounded-full"></div>
                    <div className="font-semibold text-green-800">
                      {testimonial.name}
                    </div>
                  </div>
                  <p className="mb-4 text-green-700">{testimonial.comment}</p>
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
          <div className="px-4 py-16 text-center bg-green-50">
            <h2 className="mb-4 text-3xl font-bold text-green-800">
              Fueling Has Never Been This Simple!
            </h2>
            <p className="mb-8 text-green-700">
              Get Your Weekly QR Code and Start Saving Time and Energy.
            </p>
            <button className="px-6 py-3 text-white bg-green-600 rounded-md hover:bg-green-700">
              Get My QR Code
            </button>
          </div>
        </div>

        <Footer />
      </>
    );
};

export default HomePage;
