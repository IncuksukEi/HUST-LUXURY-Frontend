import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider, createTheme, CircularProgress } from '@mui/material';

// Import Components (Critical - Load immediately)
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/home/HomePage';

// Lazy load non-critical pages
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const JewelryPage = lazy(() => import('./pages/jewelry/JewelryPage'));
const JewelryShopPage = lazy(() => import('./pages/jewelry/shop/JewelryShopPage'));
const AllProductsPage = lazy(() => import('./pages/jewelry/shop/AllProductsPage'));
const ProductDetailPage = lazy(() => import('./pages/jewelry/ProductDetailPage'));
const WishlistPage = lazy(() => import('./pages/WishlistPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const OrderHistoryPage = lazy(() => import('./pages/OrderHistoryPage'));
const AccountPage = lazy(() => import('./pages/AccountPage'));
const ChangePasswordPage = lazy(() => import('./pages/ChangePasswordPage'));

import { WishlistProvider } from './contexts/WishlistContext';
import { CartProvider } from './contexts/CartContext';

// Tạo theme (Font chữ bạn đã cài)
const theme = createTheme({
  typography: {
    fontFamily: '"Santral W01", "Times New Roman", serif',
  },
  palette: {
    primary: { main: '#000' }, // Đen sang trọng
    background: { default: '#fff' }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <WishlistProvider>
        <CartProvider>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            
            <Header />

          <Box component="main" sx={{ flexGrow: 1 }}>
            <Suspense fallback={
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <CircularProgress />
              </Box>
            }>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/jewelry" element={<JewelryPage />} />
                <Route path="/jewelry/shop" element={<AllProductsPage />} />
                <Route path="/jewelry/shop/:slug" element={<JewelryShopPage />} />
                <Route path="/jewelry/product/:productId" element={<ProductDetailPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/orders" element={<OrderHistoryPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/account/change-password" element={<ChangePasswordPage />} />
              </Routes>
            </Suspense>
          </Box>

            <Footer />
            
          </Box>
        </CartProvider>
      </WishlistProvider>
    </ThemeProvider>
  );
}

export default App;