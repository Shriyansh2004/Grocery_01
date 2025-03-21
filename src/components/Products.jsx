import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import '../css/Products.css';

const ProductCard = ({ product, onAddToCart }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
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
    <div className="product-info">
      <div className="product-header">
        <div>
          <h3 className="product-name">{product.name}</h3>
          <span className="product-category">{product.category}</span>
        </div>
        <span className="product-price">${product.price}</span>
      </div>
      <button 
        onClick={() => onAddToCart(product)}
        className="add-to-cart-button"
      >
        <FaShoppingCart />
        <span>Add to Cart</span>
      </button>
    </div>
  </motion.div>
);

const SearchAndFilter = ({ searchQuery, onSearchChange, selectedCategory, onCategoryChange, categories }) => (
  <div className="products-header">
    <div className="search-container">
      <input
        type="text"
        placeholder="Search products..."
        className="search-input"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <FaSearch className="search-icon" />
    </div>
    <div className="filter-container">
      <FaFilter className="filter-icon" />
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="category-select"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>
    </div>
  </div>
);

const EmptyState = () => (
  <div className="empty-state">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <p className="empty-state-title">No products found</p>
      <p className="empty-state-subtitle">Try adjusting your search or filter criteria</p>
    </motion.div>
  </div>
);

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToCart } = useCart();

  const categories = ['all', 'vegetables', 'fruits', 'dairy', 'meat', 'bakery'];

  const products = [
    {
      id: 1,
      name: 'Fresh Tomatoes',
      category: 'vegetables',
      price: 2.99,
      image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 2,
      name: 'Organic Bananas',
      category: 'fruits',
      price: 3.99,
      image: 'https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 3,
      name: 'Fresh Milk',
      category: 'dairy',
      price: 4.99,
      image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 4,
      name: 'Whole Chicken',
      category: 'meat',
      price: 12.99,
      image: 'https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 5,
      name: 'Fresh Bread',
      category: 'bakery',
      price: 3.49,
      image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 6,
      name: 'Bell Peppers',
      category: 'vegetables',
      price: 1.99,
      image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 7,
      name: 'Fresh Apples',
      category: 'fruits',
      price: 2.49,
      image: 'https://images.pexels.com/photos/1510392/pexels-photo-1510392.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 8,
      name: 'Cheese Block',
      category: 'dairy',
      price: 6.99,
      image: 'https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg?auto=compress&cs=tinysrgb&w=800',
    }
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="products-container">
      <SearchAndFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && <EmptyState />}
    </div>
  );
};

export default Products; 