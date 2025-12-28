import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';

// Import Components
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/home/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import JewelryPage from './pages/jewelry/JewelryPage';
import JewelryShopPage from './pages/jewelry/shop/JewelryShopPage';

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
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        
        <Header />

        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/jewelry" element={<JewelryPage />} />
            <Route path="/jewelry/shop/:slug" element={<JewelryShopPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Box>

        <Footer />
        
      </Box>
    </ThemeProvider>
  );
}

export default App;