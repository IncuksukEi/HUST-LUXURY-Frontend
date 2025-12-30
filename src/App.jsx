import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider, createTheme, CircularProgress } from '@mui/material';

// Import Components (Critical - Load immediately)
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/home/HomePage';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ProductManagement from './pages/admin/ProductManagement';
import AdminLogin from './pages/admin/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';
import OrderManagement from './pages/admin/OrderManagement';

// Lazy load non-critical pages
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const JewelryPage = lazy(() => import('./pages/jewelry/JewelryPage'));
const JewelryShopPage = lazy(() => import('./pages/jewelry/shop/JewelryShopPage'));
const AllProductsPage = lazy(() => import('./pages/jewelry/shop/AllProductsPage'));
const ProductDetailPage = lazy(() => import('./pages/jewelry/ProductDetailPage'));
const WishlistPage = lazy(() => import('./pages/WishlistPage'));
const Cart = lazy(() => import('./pages/Cart'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const OrderHistoryPage = lazy(() => import('./pages/OrderHistoryPage'));
const AccountPage = lazy(() => import('./pages/AccountPage'));
const ChangePasswordPage = lazy(() => import('./pages/ChangePasswordPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

import { WishlistProvider } from './contexts/WishlistContext';
import { CartProvider } from './contexts/CartContext';

// Tạo theme (Font chữ bạn đã cài)
const theme = createTheme({

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
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/jewelry" element={<JewelryPage />} />
                  <Route path="/jewelry/shop" element={<AllProductsPage />} />
                  <Route path="/jewelry/shop/:slug" element={<JewelryShopPage />} />
                  <Route path="/jewelry/product/:productId" element={<ProductDetailPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/orders" element={<OrderHistoryPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/account" element={<AccountPage />} />
                  <Route path="/account/change-password" element={<ChangePasswordPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route element={<ProtectedRoute />}>
                    <Route path="/admin" element={<AdminLayout />}>
                      <Route index element={<Dashboard />} />
                      <Route path="products" element={<ProductManagement />} />
                      <Route path="orders" element={<OrderManagement />} />
                    </Route>
                  </Route>
                  <Route path="*" element={<Navigate to="/" replace />} />
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