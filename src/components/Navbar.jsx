import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaBars, FaTimes, FaStore } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import '../css/Navbar.css';

const NavbarBrand = () => (
  <div className="navbar-brand">
    <Link to="/" className="navbar-logo">
      <FaStore className="navbar-logo-icon" />
      <span className="navbar-logo-text">FreshMart</span>
    </Link>
  </div>
);

const DesktopMenu = ({ cartCount }) => (
  <div className="navbar-desktop-menu">
    <Link to="/" className="navbar-link">
      Home
    </Link>
    <Link to="/products" className="navbar-link">
      Products
    </Link>
    <Link to="/cart" className="navbar-cart">
      <FaShoppingCart className="navbar-cart-icon" />
      {cartCount > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="navbar-cart-count"
        >
          {cartCount}
        </motion.span>
      )}
    </Link>
  </div>
);

const MobileMenuButton = ({ isOpen, onToggle }) => (
  <div className="navbar-mobile-menu-button">
    <button
      onClick={onToggle}
      className="navbar-link"
    >
      {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
    </button>
  </div>
);

const MobileMenu = ({ isOpen, cartCount }) => (
  isOpen && (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="navbar-mobile-menu active"
    >
      <div className="navbar-mobile-menu-content">
        <Link
          to="/"
          className="navbar-mobile-link"
        >
          Home
        </Link>
        <Link
          to="/products"
          className="navbar-mobile-link"
        >
          Products
        </Link>
        <Link
          to="/cart"
          className="navbar-mobile-link"
        >
          Cart {cartCount > 0 && `(${cartCount})`}
        </Link>
      </div>
    </motion.div>
  )
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <NavbarBrand />
          <DesktopMenu cartCount={cartCount} />
          <MobileMenuButton isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
        </div>
      </div>
      <MobileMenu isOpen={isOpen} cartCount={cartCount} />
    </nav>
  );
};

export default Navbar; 