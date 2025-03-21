import { motion } from 'framer-motion';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Cart.css';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="cart-item"
  >
    <div className="cart-item-image-container">
      <img
        src={item.image}
        alt={item.name}
        className="cart-item-image"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://via.placeholder.com/200x200?text=Product+Image';
        }}
      />
    </div>
    <div className="cart-item-info">
      <h3 className="cart-item-name">{item.name}</h3>
      <p className="cart-item-price">${item.price}</p>
    </div>
    <div className="cart-item-actions">
      <div className="quantity-controls">
        <button
          onClick={() => onUpdateQuantity(item.id, -1)}
          className="quantity-button"
        >
          <FaMinus />
        </button>
        <span className="quantity-value">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.id, 1)}
          className="quantity-button"
        >
          <FaPlus />
        </button>
      </div>
      <button
        onClick={() => onRemove(item.id)}
        className="remove-button"
      >
        <FaTrash />
      </button>
    </div>
  </motion.div>
);

const OrderSummary = ({ total, onCheckout }) => (
  <div className="order-summary">
    <h2 className="order-summary-title">Order Summary</h2>
    <div className="summary-details">
      <div className="summary-row">
        <span>Subtotal</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <div className="summary-row">
        <span>Shipping</span>
        <span>$5.00</span>
      </div>
      <div className="summary-row summary-total">
        <span>Total</span>
        <span>${(total + 5).toFixed(2)}</span>
      </div>
    </div>
    <button 
      onClick={onCheckout}
      className="checkout-button"
    >
      Proceed to Checkout
    </button>
  </div>
);

const EmptyCart = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="empty-cart"
  >
    <div>
      <p className="empty-cart-title">Your cart is empty</p>
      <p className="empty-cart-subtitle">Add some products to your cart to see them here</p>
      <Link to="/products" className="continue-shopping-button">
        Continue Shopping
      </Link>
    </div>
  </motion.div>
);

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const total = getCartTotal();

  return (
    <div className="cart-container">
      <h1 className="cart-title">Shopping Cart</h1>

      {cartItems.length > 0 ? (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
              />
            ))}
          </div>

          <OrderSummary
            total={total}
            onCheckout={() => navigate('/checkout')}
          />
        </div>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};

export default Cart; 