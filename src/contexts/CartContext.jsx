import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CART_STORAGE_KEY = 'cart_items';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart từ localStorage khi component mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing cart:', error);
        setCart([]);
      }
    }
  }, []);

  // Save cart vào localStorage mỗi khi cart thay đổi
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  // Kiểm tra xem sản phẩm có trong cart không
  const isInCart = (productId) => {
    return cart.some(item => item.id === productId);
  };

  // Thêm sản phẩm vào cart
  const addToCart = (product, quantity = 1) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(prev => prev.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart(prev => [...prev, {
        id: product.id,
        productId: product.id,
        name: product.name,
        description: product.description || '',
        urlImg: product.image || product.urlImg || '',
        quantity: quantity,
        price: parseFloat(product.price.replace(/[^0-9.]/g, '')) * 25000 || 0, // Convert USD back to VND
      }]);
    }
  };

  // Cập nhật số lượng sản phẩm trong cart
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prev => prev.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      ));
    }
  };

  // Xóa sản phẩm khỏi cart
  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  // Xóa tất cả
  const clearCart = () => {
    setCart([]);
  };

  // Tính tổng tiền
  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const value = {
    cart,
    cartCount: cart.reduce((sum, item) => sum + item.quantity, 0),
    isInCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotal,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

