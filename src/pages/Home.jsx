import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Box,
} from '@mui/material';
import axiosClient from '../api/axiosClient';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hàm gọi API
  const fetchProducts = async () => {
    try {
      const response = await axiosClient.get('/products');
      console.log('Dữ liệu API trả về:', response.data);
      setProducts(response.data);
    } catch (err) {
      console.error('Lỗi gọi API:', err);
      setError('Không thể kết nối đến Backend. Hãy chắc chắn Backend đang chạy!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box component="main" sx={{ flex: 1, py: 4 }}>
        <Container maxWidth="xl">
          <Typography
            variant="h3"
            align="center"
            sx={{ mb: 4, fontWeight: 'bold' }}
          >
            Hust Luxury Menu
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={2}>
              {Array.isArray(products) &&
                products.map((product) => (
                  <Grid item key={product.productId} xs={12} sm={6} md={4} lg={3}>
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image={
                          product.urlImg || 'https://via.placeholder.com/150'
                        }
                        alt={product.name}
                        sx={{ objectFit: 'cover' }}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h6" noWrap>
                          {product.name}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
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
      <Footer />
    </div>
  );
}

export default Home;
