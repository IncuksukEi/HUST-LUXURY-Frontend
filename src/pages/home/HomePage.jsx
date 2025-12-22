import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, CircularProgress, Alert, Box } from '@mui/material';
import axiosClient from '../../api/axiosClient'; // Chú ý đường dẫn import
import HeroSection from '../../components/HeroSection';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axiosClient.get('/products'); 
      setProducts(response.data);
    } catch (err) {
      console.error("Lỗi gọi API:", err);
      setError("Không thể kết nối đến Backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Box>
      {/* 1. Banner Chính */}
      <HeroSection />

      {/* 2. Phần danh sách sản phẩm (New Arrivals) */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Typography 
            variant='h4' 
            align='center' 
            sx={{ mb: 6, fontFamily: 'MyLuxuryFont, serif', letterSpacing: 1 }}
        >
          NEW ARRIVALS
        </Typography>
        
        {error && <Alert severity="error">{error}</Alert>}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>
        ) : (
          <Grid container spacing={4}>
            {Array.isArray(products) && products.slice(0, 8).map((product) => ( // Chỉ lấy 8 sản phẩm mới nhất
              <Grid item key={product.productId} xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ height: '100%', borderRadius: 0, boxShadow: 'none', border: '1px solid #eee' }}>
                  <CardMedia
                    component="img"
                    height="300" // Ảnh cao hơn cho sang
                    image={product.urlImg || "https://via.placeholder.com/300"}
                    alt={product.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ fontFamily: 'serif', fontSize: '1.1rem' }} noWrap>
                      {product.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                      {product.price.toLocaleString()} VNĐ
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default HomePage;