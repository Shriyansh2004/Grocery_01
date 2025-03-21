import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaShoppingBag, FaHome } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import '../css/OrderSuccess.css';

const OrderSuccess = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear the cart after successful order
    clearCart();
  }, [clearCart]);

  return (
    <div className="order-success-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="order-success-content"
      >
        <div className="success-icon-container">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FaCheckCircle className="success-icon" />
          </motion.div>
        </div>
        
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="success-title"
        >
          Thank You for Your Order!
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="success-message"
        >
          Your order has been successfully placed and is being processed.
          We'll send you an email confirmation with your order details shortly.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="success-actions"
        >
          <Link
            to="/products"
            className="action-button continue-shopping-button"
          >
            <FaShoppingBag className="button-icon" />
            Continue Shopping
          </Link>
          
          <Link
            to="/"
            className="action-button home-button"
          >
            <FaHome className="button-icon" />
            Back to Home
          </Link>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="order-note"
        >
          Need help? Contact our support team at support@freshmart.com
        </motion.p>
      </motion.div>
    </div>
  );
};

export default OrderSuccess; 