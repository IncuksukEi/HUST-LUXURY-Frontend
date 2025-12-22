import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';

// Import Components
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/home/HomePage';

// Tạo theme (Font chữ bạn đã cài)
const theme = createTheme({
  typography: {
    fontFamily: '"MyLuxuryFont", "Times New Roman", serif',
  },
  palette: {
    primary: { main: '#111' }, // Đen sang trọng
    background: { default: '#fff' }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* Layout Flexbox để Footer luôn ở dưới cùng */}
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        
        {/* Header luôn hiển thị */}
        <Header />

        {/* Phần nội dung thay đổi theo Router */}
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Sau này thêm: <Route path="/shop" element={<ShopPage />} /> */}
          </Routes>
        </Box>

        {/* Footer luôn hiển thị */}
        <Footer />
        
      </Box>
    </ThemeProvider>
  );
}

export default App;