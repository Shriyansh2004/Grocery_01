import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../css/Home.css';

const HeroSection = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="hero-section"
    style={{
      backgroundImage: 'url("https://images.pexels.com/photos/3962294/pexels-photo-3962294.jpeg?auto=compress&cs=tinysrgb&w=1600")',
    }}
  >
    <div className="hero-overlay" />
    <div className="container">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="hero-content"
      >
        <h1 className="hero-title">
          Fresh Groceries Delivered to Your Door
        </h1>
        <p className="hero-subtitle">Shop fresh produce, dairy, and more with our easy online store.</p>
        <Link
          to="/products"
          className="hero-button"
        >
          Shop Now
        </Link>
      </motion.div>
    </div>
  </motion.div>
);

const FeaturedProduct = ({ product }) => (
  <motion.div
    whileHover={{ y: -10 }}
    className="product-card"
  >
    <div className="product-image-container">
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://via.placeholder.com/400x300?text=Product+Image';
        }}
      />
    </div>
    <h3 className="product-name">{product.name}</h3>
    <p className="product-price">${product.price}</p>
    <button className="add-to-cart-button">Add to Cart</button>
  </motion.div>
);

const FeatureCard = ({ title, description, icon }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="feature-card"
  >
    <div className="feature-icon">
      {icon}
    </div>
    <h3 className="feature-title">{title}</h3>
    <p className="feature-description">{description}</p>
  </motion.div>
);

const Home = () => {
  const featuredProducts = [
    {
      id: 1,
      name: 'Fresh Vegetables',
      image: 'https://images.pexels.com/photos/1458694/pexels-photo-1458694.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 12.99,
    },
    {
      id: 2,
      name: 'Organic Fruits',
      image: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 15.99,
    },
    {
      id: 3,
      name: 'Fresh Dairy',
      image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 8.99,
    },
  ];

  const features = [
    {
      title: 'Fast Delivery',
      description: 'Get your groceries delivered within 24 hours',
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Fresh Quality',
      description: '100% fresh and quality products',
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Best Prices',
      description: 'Competitive prices on all products',
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="home">
      <HeroSection />

      <div className="container">
        <h2 className="section-title">Featured Products</h2>
        <div className="featured-products">
          {featuredProducts.map((product) => (
            <FeaturedProduct key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div className="features-section">
        <div className="container">
          <div className="features-grid">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 