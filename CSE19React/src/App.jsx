import React, { useState } from 'react';
import CategoryItem from './CategoryItem';
import ProductCard from './ProductCard';
import './App.css';

// 1. Master product data array
const ALL_PRODUCTS = [
  { id: 'p1', category: 'veggies', time: '8 MINS', img: '🧅', name: 'Onion (Pyaz)', qty: '1 kg', price: 35 },
  { id: 'p2', category: 'veggies', time: '8 MINS', img: '🥔', name: 'Potato (Aloo)', qty: '1 kg', price: 28 },
  { id: 'p3', category: 'veggies', time: '12 MINS', img: '🍅', name: 'Tomato Hybrid', qty: '500 g', price: 15 },
  { id: 'p4', category: 'munchies', time: '6 MINS', img: '🥔', name: "Lay's Classic", qty: '50 g', price: 20 },
  { id: 'p5', category: 'munchies', time: '6 MINS', img: '🥤', name: 'Coke Zero', qty: '750 ml', price: 40 }
];

function App() {
  // State 1: Search query tracking
  const [searchQuery, setSearchQuery] = useState('');
  
  // State 2: Cart management tracking (Stores product objects with their added quantities)
  const [cart, setCart] = useState([]);
  
  // State 3: Toggle switch to show or hide the detailed cart overlay modal
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Function to add items or increment their quantity safely
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Derive total values cleanly from state calculations
  const totalItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const totalCartAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Filter products systematically based on input string matching
  const filteredProducts = ALL_PRODUCTS.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <header>
        <div className="top-bar">
          <div className="location">
            Home <span>▼ 123, Cyber Hub...</span>
          </div>
          <div className="profile-icon">👤</div>
        </div>
        <div className="search-container">
          <span>🔍</span>
          {/* Two-way state data binding on input box */}
          <input 
            type="text" 
            placeholder="Search for 'Milk', 'Chips'..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      {/* Categories Grid Layout */}
      <div className="section-title">Shop by category</div>
      <div className="categories-grid">
        <CategoryItem icon="🥬" name="Veggies" />
        <CategoryItem icon="🍎" name="Fruits" />
        <CategoryItem icon="🥛" name="Dairy" />
        <CategoryItem icon="🍞" name="Bakery" />
        <CategoryItem icon="🍫" name="Munchies" />
        <CategoryItem icon="🥤" name="Cold Drinks" />
        <CategoryItem icon="🧼" name="Cleaning" />
        <CategoryItem icon="🧴" name="Beauty" />
      </div>

      {/* Banner Advertisements Carousel */}
      <div className="banner-scroll">
        <div className="banner b1">
          <div>50% OFF<br /><span style={{ fontSize: '12px', fontWeight: '400' }}>On first order</span></div>
        </div>
        <div className="banner b2">
          <div>Free Delivery<br /><span style={{ fontSize: '12px', fontWeight: '400' }}>Above ₹199</span></div>
        </div>
      </div>

      {/* DYNAMIC PRODUCT GRID FILTER OVERVIEW */}
      <div className="section-title">
        {searchQuery ? `Search Results for "${searchQuery}"` : "Fresh Vegetables"}
      </div>
      <div className="product-scroll">
        {filteredProducts.filter(p => searchQuery || p.category === 'veggies').map(product => (
          <ProductCard 
            key={product.id}
            time={product.time} 
            img={product.img} 
            name={product.name} 
            qty={product.qty} 
            price={product.price} 
            onAdd={() => handleAddToCart(product)} 
          />
        ))}
      </div>

      {!searchQuery && (
        <>
          <div className="section-title">Munchies & Chips</div>
          <div className="product-scroll">
            {filteredProducts.filter(p => p.category === 'munchies').map(product => (
              <ProductCard 
                key={product.id}
                time={product.time} 
                img={product.img} 
                name={product.name} 
                qty={product.qty} 
                price={product.price} 
                onAdd={() => handleAddToCart(product)} 
              />
            ))}
          </div>
        </>
      )}

      {/* No matching elements error safety check */}
      {filteredProducts.length === 0 && (
        <div className="no-results">No items match your search entry.</div>
      )}
      
      <div style={{ height: '60px' }}></div>

      {/* Action Cart Controller Notification Banner */}
      {totalItemsCount > 0 && (
        <div className="cart-float" style={{ display: 'flex' }} onClick={() => setIsCartOpen(true)}>
          <span>{totalItemsCount} Item{totalItemsCount > 1 ? 's' : ''} | ₹{totalCartAmount}</span>
          <span>View Cart &gt;</span>
        </div>
      )}

      {/* INTERACTIVE DETAILED CART POPUP MODAL OVERLAY */}
      {isCartOpen && (
        <div className="cart-modal-overlay">
          <div className="cart-modal">
            <div className="modal-header">
              <h3>Basket Details</h3>
              <button className="close-modal-btn" onClick={() => setIsCartOpen(false)}>✕</button>
            </div>
            <div className="modal-items-list">
              {cart.map((item) => (
                <div className="modal-item-row" key={item.id}>
                  <span className="modal-item-img">{item.img}</span>
                  <div className="modal-item-details">
                    <div className="modal-item-name">{item.name}</div>
                    <div className="modal-item-qty">{item.qty} x {item.quantity}</div>
                  </div>
                  <span className="modal-item-price">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <div className="modal-total-row">
                <span>Grand Total:</span>
                <strong>₹{totalCartAmount}</strong>
              </div>
              <button className="checkout-btn" onClick={() => alert('Proceeding to Checkout step!')}>
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Footer Navigation Bar */}
      <nav className="bottom-nav">
        <div className="nav-item active">
          <div className="nav-icon">🏠</div>
          <div className="nav-text">Instamart</div>
        </div>
        <div className="nav-item">
          <div className="nav-icon">🍔</div>
          <div className="nav-text">Food</div>
        </div>
        <div className="nav-item">
          <div className="nav-icon">💳</div>
          <div className="nav-text">Genie</div>
        </div>
        <div className="nav-item">
          <div className="nav-icon">⚙️</div>
          <div className="nav-text">Dineout</div>
        </div>
      </nav>
    </div>
  );
}

export default App;