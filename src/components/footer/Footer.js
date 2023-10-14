// Footer.js
import React from 'react';
import logo from '../assets/logo.png'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-logo">
          <img src={logo} alt="SnapByte Logo" />
        </div>

        <div className="footer-section">
          <h2>FAQs</h2>
          <ul>
            <li><a href="#">How to get started?</a></li>
            <li><a href="#">Is my data secure?</a></li>
            <li><a href="#">How can I contact support?</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h2>Contact Us</h2>
          <p>Email: contact@snapbyte.com</p>
          <p>Phone: +1 111 112 3 </p>
        </div>
      </div>

      <div className="copyright">
        <p>&copy; {new Date().getFullYear()} SnapByte. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
