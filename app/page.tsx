'use client'

import { useState } from 'react'

interface Product {
  id: number
  name: string
  category: string
  price: number
  icon: string
}

interface CartItem extends Product {
  quantity: number
}

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)

  const products: Product[] = [
    { id: 1, name: 'Classic Cotton T-Shirt', category: 'Men', price: 29.99, icon: '👕' },
    { id: 2, name: 'Slim Fit Jeans', category: 'Men', price: 79.99, icon: '👖' },
    { id: 3, name: 'Leather Jacket', category: 'Men', price: 199.99, icon: '🧥' },
    { id: 4, name: 'Summer Dress', category: 'Women', price: 89.99, icon: '👗' },
    { id: 5, name: 'Elegant Blouse', category: 'Women', price: 59.99, icon: '👚' },
    { id: 6, name: 'Denim Skirt', category: 'Women', price: 49.99, icon: '🩱' },
    { id: 7, name: 'Wool Sweater', category: 'Men', price: 69.99, icon: '🧶' },
    { id: 8, name: 'Sports Hoodie', category: 'Unisex', price: 54.99, icon: '🎽' },
    { id: 9, name: 'Casual Sneakers', category: 'Unisex', price: 89.99, icon: '👟' },
    { id: 10, name: 'Winter Coat', category: 'Women', price: 179.99, icon: '🧥' },
    { id: 11, name: 'Formal Shirt', category: 'Men', price: 64.99, icon: '👔' },
    { id: 12, name: 'Yoga Pants', category: 'Women', price: 44.99, icon: '🩳' },
  ]

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (id: number, delta: number) => {
    setCart(prevCart =>
      prevCart
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter(item => item.quantity > 0)
    )
  }

  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id))
  }

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
  }

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0)
  }

  return (
    <>
      <header className="header">
        <nav className="nav">
          <a href="/" className="logo">Fashion Hub</a>
          <ul className="nav-links">
            <li><a href="#men">Men</a></li>
            <li><a href="#women">Women</a></li>
            <li><a href="#new">New Arrivals</a></li>
            <li><a href="#sale">Sale</a></li>
          </ul>
          <div className="cart-icon" onClick={() => setCartOpen(true)}>
            🛒
            {getTotalItems() > 0 && (
              <span className="cart-count">{getTotalItems()}</span>
            )}
          </div>
        </nav>
      </header>

      <div className={`overlay ${cartOpen ? 'show' : ''}`} onClick={() => setCartOpen(false)} />

      <aside className={`cart-sidebar ${cartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="close-cart" onClick={() => setCartOpen(false)}>×</button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#999' }}>Your cart is empty</p>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">{item.icon}</div>
                <div className="cart-item-details">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">${item.price}</div>
                  <div className="cart-item-quantity">
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                </div>
                <button className="remove-item" onClick={() => removeFromCart(item.id)}>×</button>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span>${getTotalPrice()}</span>
            </div>
            <button className="checkout-button" onClick={() => alert('Checkout functionality coming soon!')}>
              Checkout
            </button>
          </div>
        )}
      </aside>

      <section className="hero">
        <h1>Discover Your Style</h1>
        <p>Premium clothing for the modern wardrobe</p>
        <button className="cta-button" onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}>
          Shop Now
        </button>
      </section>

      <div className="container">
        <h2 className="section-title">Shop by Category</h2>
        <div className="categories">
          <div className="category-card">
            <div className="category-icon">👨</div>
            <h3>Men&apos;s Wear</h3>
            <p>Contemporary styles for him</p>
          </div>
          <div className="category-card">
            <div className="category-icon">👩</div>
            <h3>Women&apos;s Wear</h3>
            <p>Elegant fashion for her</p>
          </div>
          <div className="category-card">
            <div className="category-icon">✨</div>
            <h3>New Arrivals</h3>
            <p>Latest trends & styles</p>
          </div>
          <div className="category-card">
            <div className="category-icon">🏷️</div>
            <h3>Sale</h3>
            <p>Up to 50% off</p>
          </div>
        </div>

        <h2 className="section-title">Featured Products</h2>
        <div className="products">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">{product.icon}</div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-category">{product.category}</p>
                <div className="product-price">${product.price}</div>
                <button className="add-to-cart" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Us</h3>
            <ul>
              <li><a href="#about">Our Story</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#sustainability">Sustainability</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Customer Service</h3>
            <ul>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#shipping">Shipping Info</a></li>
              <li><a href="#returns">Returns</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <ul>
              <li><a href="#instagram">Instagram</a></li>
              <li><a href="#facebook">Facebook</a></li>
              <li><a href="#twitter">Twitter</a></li>
              <li><a href="#pinterest">Pinterest</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Newsletter</h3>
            <p>Subscribe for exclusive offers</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Fashion Hub. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}
