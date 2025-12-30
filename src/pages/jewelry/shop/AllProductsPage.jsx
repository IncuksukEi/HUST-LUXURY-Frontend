import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, CircularProgress, Alert } from '@mui/material';
import JewelryProduct from '../../../components/jewelry/JewelryProduct';
import axiosClient from '../../../api/axiosClient';

// Helper function to format price from VND to USD
const formatPrice = (price) => {
  // Assuming price is in VND, convert to USD (1 USD ≈ 25,000 VND)
  const priceInUSD = price / 25000;
  return `$${priceInUSD.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

// Map API product to JewelryProduct format
const mapProductToJewelryFormat = (apiProduct, index) => {
  return {
    id: apiProduct.productId,
    name: apiProduct.name,
    description: apiProduct.description || `${apiProduct.name} - A luxurious piece crafted with exceptional attention to detail.`,
    price: formatPrice(apiProduct.price),
    image: apiProduct.urlImg,
    collection: apiProduct.collectionName || null,
    material: apiProduct.materialName || null,
    gemstone: apiProduct.gemstoneName || null,
    isNew: index < 4, // First 4 products are "New"
    category: 'All Products',
  };
};

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Try /products endpoint (baseURL already includes /api)
      const response = await axiosClient.get('/products');
      
      // Check if response.data is an array
      if (!Array.isArray(response.data)) {
        throw new Error('Invalid response format: expected array');
      }
      
      // Map API products to JewelryProduct format
      const mappedProducts = response.data.map((product, index) => 
        mapProductToJewelryFormat(product, index)
      );
      
      setProducts(mappedProducts);
    } catch (err) {
      console.error('Fetch products error:', err);
      
      // Better error handling
      let errorMessage = 'Không thể tải danh sách sản phẩm. Vui lòng thử lại!';
      
      if (err.response) {
        // Server responded with error
        if (err.response.status === 500) {
          errorMessage = 'Lỗi server. Vui lòng thử lại sau!';
        } else if (err.response.status === 404) {
          errorMessage = 'Không tìm thấy endpoint API.';
        } else {
          errorMessage = err.response.data?.message || `Lỗi ${err.response.status}: ${err.response.statusText}`;
        }
      } else if (err.request) {
        // Request made but no response
        errorMessage = 'Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng!';
      } else {
        // Something else happened
        errorMessage = err.message || errorMessage;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 10, textAlign: 'center' }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Box>
      <Container maxWidth="xl" sx={{ py: 8, px: { xs: 2, md: 4 } }}>
        {/* Header */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Times New Roman", Times, serif',
              fontSize: { xs: '1.5rem', md: '2.5rem' },
              fontWeight: 400,
              mb: 2,
            }}
          >
            All Products
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '0.875rem', md: '1rem' },
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            Discover our complete collection of luxury jewelry and accessories, each piece crafted with exceptional attention to detail.
          </Typography>
        </Box>

        {/* Product Grid & Filter */}
        <JewelryProduct products={products} />
      </Container>
    </Box>
  );
};

export default AllProductsPage;

