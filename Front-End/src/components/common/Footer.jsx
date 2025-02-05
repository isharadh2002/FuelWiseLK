import React from "react";

const Footer = () => {
    return (
        <footer className="w-full bg-gradient-to-br from-green-500 via-green-600 to-green-800 text-white py-10">
            <div className="max-w-5xl mx-auto px-4">
                {/* Main Footer_Old Content */}
                <div className="w-full grid grid-cols-1 md:grid-cols-3 justify-items-center gap-16 mb-8">
                    {/* Logo Section */}
                    <div className="w-full max-w-xs flex flex-col items-center">
                        <h2 className="text-2xl font-bold mb-4 text-center">Fuel Quota Management</h2>
                        <p className="text-sm leading-relaxed text-center">
                            Efficient fuel management for a sustainable future.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="w-full max-w-xs flex flex-col items-center">
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-center">
                            {[
                                { text: "Home", href: "/" },
                                { text: "About Us", href: "/about" },
                                { text: "Services", href: "/services" },
                                { text: "Contact", href: "/contact" },
                            ].map((link) => (
                                <li key={link.text}>
                                    <a
                                        href={link.href}
                                        className="text-green-50 hover:text-green-200 transition-colors duration-200 text-sm"
                                    >
                                        {link.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="w-full max-w-xs flex flex-col items-center">
                        <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                        <div className="flex flex-row space-x-4">
                            {[
                                { name: "Facebook", href: "https://facebook.com", icon: "/SocialMediaIcons/Facebook.png" },
                                { name: "X", href: "https://x.com", icon: "/SocialMediaIcons/X.png" },
                                { name: "YouTube", href: "https://youtube.com", icon: "/SocialMediaIcons/YouTube.png" },
                                { name: "Instagram", href: "https://instagram.com", icon: "/SocialMediaIcons/Instagram.png" },
                            ].map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-10 h-10 border border-green-50 rounded-full flex items-center justify-center hover:bg-green-400 hover:border-green-400 hover:text-green-800 transition-all duration-300"
                                >
                                    <img
                                        src={social.icon}
                                        alt={`${social.name} Logo`}
                                        className="w-full h-full p-0 m-0 rounded-full"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer_Old Bottom */}
                <div className="w-full pt-8 border-t border-white/20 text-center">
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} FuelWise.lk. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;