import './Footer.css'; // Import CSS for styling

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-section">
                    <h3>Fuel Quota Management</h3>
                    <p>
                        Your trusted solution to manage fuel quotas effectively during crises.
                    </p>
                </div>
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/about-us">About Us</a></li>
                        <li><a href="/contact">Contact</a></li>
                        <li><a href="/faq">FAQ</a></li>
                        <li><a href="/support">Support</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Connect With Us</h4>
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="icon facebook">F</a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="icon twitter">T</a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="icon instagram">I</a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="icon linkedin">L</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Fuel Quota Management System. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
