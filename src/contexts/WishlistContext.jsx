import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

const WISHLIST_STORAGE_KEY = 'wishlist_items';

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist từ localStorage khi component mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Error parsing wishlist:', error);
        setWishlist([]);
      }
    }
  }, []);

  // Save wishlist vào localStorage mỗi khi wishlist thay đổi
  useEffect(() => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  // Kiểm tra xem sản phẩm có trong wishlist không
  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  // Thêm sản phẩm vào wishlist
  const addToWishlist = (product) => {
    if (!isInWishlist(product.id)) {
      setWishlist(prev => [...prev, product]);
    }
  };

  // Xóa sản phẩm khỏi wishlist
  const removeFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
  };

  // Toggle wishlist (thêm nếu chưa có, xóa nếu đã có)
  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  // Xóa tất cả
  const clearWishlist = () => {
    setWishlist([]);
  };

  const value = {
    wishlist,
    wishlistCount: wishlist.length,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

