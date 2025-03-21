import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../css/Checkout.css';

const FormInput = ({ label, id, name, type, value, onChange, required, placeholder }) => (
  <div className="form-group">
    <label className="form-label" htmlFor={id}>{label}</label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="form-input"
      required={required}
      placeholder={placeholder}
    />
  </div>
);

const OrderItem = ({ item }) => (
  <div className="order-item">
    <img
      src={item.image}
      alt={item.name}
      className="order-item-image"
    />
    <div className="order-item-info">
      <div className="order-item-name">{item.name}</div>
      <div className="order-item-quantity">Quantity: {item.quantity}</div>
      <div className="order-item-price">${(item.price * item.quantity).toFixed(2)}</div>
    </div>
  </div>
);

const OrderSummary = ({ cartItems, subtotal, shipping, total }) => (
  <div className="order-summary">
    <h2 className="order-summary-title">Order Summary</h2>
    <div className="order-items">
      {cartItems.map((item) => (
        <OrderItem key={item.id} item={item} />
      ))}
    </div>
    <div className="summary-totals">
      <div className="summary-row">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="summary-row">
        <span>Shipping</span>
        <span>${shipping.toFixed(2)}</span>
      </div>
      <div className="summary-row summary-total">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  </div>
);

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 5.99;
  const total = subtotal + shipping;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the payment processing
    clearCart();
    navigate('/products');
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-container">
        <div className="checkout-content">
          <h1 className="checkout-title">Your cart is empty</h1>
          <button 
            onClick={() => navigate('/products')}
            className="continue-shopping-button"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <h1 className="checkout-title">Checkout</h1>
        <div className="checkout-grid">
          <div className="checkout-form">
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <FormInput
                  label="First Name"
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
                <FormInput
                  label="Last Name"
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
                <FormInput
                  label="Email"
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <FormInput
                  label="Address"
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
                <FormInput
                  label="City"
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
                <FormInput
                  label="ZIP Code"
                  id="zipCode"
                  name="zipCode"
                  type="text"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="payment-section">
                <h2 className="payment-title">Payment Information</h2>
                <div className="payment-grid">
                  <FormInput
                    label="Card Number"
                    id="cardNumber"
                    name="cardNumber"
                    type="text"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                  />
                  <FormInput
                    label="Expiry Date"
                    id="expiryDate"
                    name="expiryDate"
                    type="text"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    required
                    placeholder="MM/YY"
                  />
                  <FormInput
                    label="CVV"
                    id="cvv"
                    name="cvv"
                    type="text"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="submit-button">
                Place Order
              </button>
            </form>
          </div>

          <OrderSummary
            cartItems={cartItems}
            subtotal={subtotal}
            shipping={shipping}
            total={total}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout; 