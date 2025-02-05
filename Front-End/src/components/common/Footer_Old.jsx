import React from "react";
import "./Footer_Old.css";

function Footer_Old() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-logo">
                    <h2>Fuel Quota Management</h2>
                    <p>Efficient fuel management for a sustainable future.</p>
                </div>

                <div className="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/services">Services</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>

                <div className="footer-social">
                    <h4>Follow Us</h4>
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer">
                            <img src="/SocialMediaIcons/Facebook.png" alt='Facebook Logo'/>
                        </a>
                        <a href="https://x.com" target="_blank" rel="noreferrer">
                            <img src="/SocialMediaIcons/X.png" alt='Facebook Logo'/>
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noreferrer">
                            <img src="/SocialMediaIcons/YouTube.png" alt='Facebook Logo'/>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer">
                            <img src="/SocialMediaIcons/Instagram.png" alt='Facebook Logo'/>
                        </a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>
                    &copy; {new Date().getFullYear()} FuelWise.lk. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer_Old;
