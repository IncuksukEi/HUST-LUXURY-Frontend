import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';

const CartContext = createContext();

const CART_STORAGE_KEY = 'cart_items';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isLoggedIn = !!localStorage.getItem('token');

  // Load cart từ API nếu đã login, hoặc từ localStorage nếu chưa login
  useEffect(() => {
    const loadCart = async () => {
      if (isLoggedIn) {
        // Load from API
        setIsLoading(true);
        try {
          const response = await axiosClient.get('/cart');
          if (response.data && Array.isArray(response.data)) {
            // Map API response to cart format
            const mappedCart = response.data.map(item => ({
              id: item.productId,
              productId: item.productId,
              name: item.name,
              description: item.description || '',
              urlImg: item.urlImg || '',
              quantity: item.quantity || 1,
              price: item.price || 0,
            }));
            setCart(mappedCart);
          }
        } catch (error) {
          console.error('Error loading cart from API:', error);
          setCart([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        // Load from localStorage
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
          try {
            setCart(JSON.parse(savedCart));
          } catch (error) {
            console.error('Error parsing cart:', error);
            setCart([]);
          }
        }
      }
    };
    loadCart();
  }, [isLoggedIn]);

  // Save cart vào localStorage chỉ khi chưa login
  useEffect(() => {
    if (!isLoggedIn && cart.length > 0) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart, isLoggedIn]);

  // Kiểm tra xem sản phẩm có trong cart không
  const isInCart = (productId) => {
    return cart.some(item => item.id === productId);
  };

  // Thêm sản phẩm vào cart
  const addToCart = async (product, quantity = 1) => {
    if (isLoggedIn) {
      // Add via API
      try {
        await axiosClient.post('/cart/add', {
          product_id: product.id,
          quantity: quantity,
        });
        // Reload cart from API
        const response = await axiosClient.get('/cart');
        if (response.data && Array.isArray(response.data)) {
          const mappedCart = response.data.map(item => ({
            id: item.productId,
            productId: item.productId,
            name: item.name,
            description: item.description || '',
            urlImg: item.urlImg || '',
            quantity: item.quantity || 1,
            price: item.price || 0,
          }));
          setCart(mappedCart);
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
      }
    } else {
      // Add to local cart
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
    }
  };

  // Cập nhật số lượng sản phẩm trong cart
  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    if (isLoggedIn) {
      // Update via API
      try {
        await axiosClient.post('/cart/update', [
          { product_id: productId, quantity: quantity }
        ]);
        // Reload cart from API
        const response = await axiosClient.get('/cart');
        if (response.data && Array.isArray(response.data)) {
          const mappedCart = response.data.map(item => ({
            id: item.productId,
            productId: item.productId,
            name: item.name,
            description: item.description || '',
            urlImg: item.urlImg || '',
            quantity: item.quantity || 1,
            price: item.price || 0,
          }));
          setCart(mappedCart);
        }
      } catch (error) {
        console.error('Error updating cart:', error);
        throw error;
      }
    } else {
      // Update local cart
      setCart(prev => prev.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      ));
    }
  };

  // Xóa sản phẩm khỏi cart
  const removeFromCart = async (productId) => {
    if (isLoggedIn) {
      // Delete via API
      try {
        await axiosClient.delete(`/cart/delete/${productId}`);
        // Reload cart from API
        const response = await axiosClient.get('/cart');
        if (response.data && Array.isArray(response.data)) {
          const mappedCart = response.data.map(item => ({
            id: item.productId,
            productId: item.productId,
            name: item.name,
            description: item.description || '',
            urlImg: item.urlImg || '',
            quantity: item.quantity || 1,
            price: item.price || 0,
          }));
          setCart(mappedCart);
        }
      } catch (error) {
        console.error('Error removing from cart:', error);
        throw error;
      }
    } else {
      // Remove from local cart
      setCart(prev => prev.filter(item => item.id !== productId));
    }
  };

  // Xóa tất cả
  const clearCart = async () => {
    if (isLoggedIn) {
      // Clear via API - delete all items one by one
      try {
        const deletePromises = cart.map(item => 
          axiosClient.delete(`/cart/delete/${item.productId}`)
        );
        await Promise.all(deletePromises);
        setCart([]);
      } catch (error) {
        console.error('Error clearing cart:', error);
        throw error;
      }
    } else {
      // Clear local cart
      setCart([]);
    }
  };

  // Tính tổng tiền
  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const value = {
    cart,
    cartCount: cart.reduce((sum, item) => sum + item.quantity, 0),
    isLoading,
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

