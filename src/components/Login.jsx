import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaShoppingCart } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import '../css/Login.css';

const FormInput = ({ 
  label, 
  id, 
  name, 
  type, 
  value, 
  onChange, 
  error, 
  icon: Icon,
  placeholder,
  showPassword,
  onTogglePassword
}) => (
  <div className="form-group">
    <label htmlFor={id} className="form-label">
      {label}
    </label>
    <div className="input-container">
      <div className="input-icon">
        <Icon className="icon" />
      </div>
      <input
        id={id}
        name={name}
        type={showPassword ? 'text' : type}
        value={value}
        onChange={onChange}
        className={`form-input ${error ? 'error' : ''}`}
        placeholder={placeholder}
      />
      {type === 'password' && (
        <button
          type="button"
          onClick={() => onTogglePassword(name)}
          className="password-toggle"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
    </div>
    {error && (
      <motion.p 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="error-message"
      >
        {error}
      </motion.p>
    )}
  </div>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await login(formData);
        navigate('/home', { replace: true });
      } catch (error) {
        console.error('Login failed:', error);
      }
    }
  };

  return (
    <div className="login-container">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="login-content"
      >
        <motion.div 
          variants={itemVariants}
          className="login-header"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="logo-container"
          >
            <div className="logo">
              <FaShoppingCart className="logo-icon" />
            </div>
          </motion.div>
          <h2 className="title">
            Welcome to Grocery Store
          </h2>
          <p className="subtitle">
            New here?{' '}
            <Link 
              to="/signup" 
              className="signup-link"
            >
              Create an account
            </Link>
          </p>
        </motion.div>

        <motion.form 
          variants={itemVariants}
          className="login-form"
          onSubmit={handleSubmit}
        >
          <div className="form-fields">
            <motion.div variants={itemVariants}>
              <FormInput
                label="Email address"
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                icon={FaEnvelope}
                placeholder="Enter your email"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <FormInput
                label="Password"
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                icon={FaLock}
                placeholder="Enter your password"
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
              />
            </motion.div>
          </div>

          <motion.div 
            variants={itemVariants}
            className="form-options"
          >
            <div className="remember-me">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="checkbox"
              />
              <label htmlFor="remember-me" className="checkbox-label">
                Remember me
              </label>
            </div>

            <Link to="/forgot-password" className="forgot-password">
              Forgot password?
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>
            <button
              type="submit"
              className="submit-button"
            >
              Sign in
            </button>
          </motion.div>
        </motion.form>

        <motion.p 
          variants={itemVariants}
          className="terms"
        >
          By signing in, you agree to our{' '}
          <a href="#" className="terms-link">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="terms-link">Privacy Policy</a>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login; 