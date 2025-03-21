import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';
import '../css/Footer.css';

const FooterSection = ({ title, children }) => (
  <div className="footer-section">
    <h3 className="footer-section-title">{title}</h3>
    {children}
  </div>
);

const SocialLinks = () => (
  <div className="social-links">
    <a href="#" className="social-link">
      <FaFacebook size={20} />
    </a>
    <a href="#" className="social-link">
      <FaTwitter size={20} />
    </a>
    <a href="#" className="social-link">
      <FaInstagram size={20} />
    </a>
    <a href="mailto:info@freshmart.com" className="social-link">
      <FaEnvelope size={20} />
    </a>
  </div>
);

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* About Section */}
          <FooterSection title="FreshMart">
            <p className="footer-description">
              Your one-stop shop for fresh groceries and quality products delivered to your doorstep.
            </p>
            <SocialLinks />
          </FooterSection>

          {/* Quick Links */}
          <FooterSection title="Quick Links">
            <ul className="footer-list">
              <li>
                <Link to="/" className="footer-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="footer-link">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="footer-link">
                  Cart
                </Link>
              </li>
            </ul>
          </FooterSection>

          {/* Categories */}
          <FooterSection title="Categories">
            <ul className="footer-list">
              <li>
                <Link to="/products" className="footer-link">
                  Vegetables
                </Link>
              </li>
              <li>
                <Link to="/products" className="footer-link">
                  Fruits
                </Link>
              </li>
              <li>
                <Link to="/products" className="footer-link">
                  Dairy
                </Link>
              </li>
              <li>
                <Link to="/products" className="footer-link">
                  Meat
                </Link>
              </li>
            </ul>
          </FooterSection>

          {/* Contact Info */}
          <FooterSection title="Contact Us">
            <ul className="footer-list">
              <li>123 Grocery Street</li>
              <li>City, State 12345</li>
              <li>Phone: (123) 456-7890</li>
              <li>Email: info@freshmart.com</li>
            </ul>
          </FooterSection>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} FreshMart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 