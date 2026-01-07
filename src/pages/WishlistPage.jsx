import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Divider,
  Alert,
  Link,
  Stack,
  Snackbar,
} from '@mui/material';
import { Heart, ChevronRight, ArrowLeft, X, ShoppingBag, Eye } from 'lucide-react';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../contexts/CartContext';
import axiosClient from '../api/axiosClient';

const TIFFANY_BLUE = '#81d8d0';

const WishlistPage = () => {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist, clearWishlist, wishlistCount } = useWishlist();
  const { addToCart } = useCart();
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [addingToCartId, setAddingToCartId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleRemove = (productId, e) => {
    e.stopPropagation();
    removeFromWishlist(productId);
    setSnackbar({
      open: true,
      message: 'Đã xóa khỏi mục đã lưu',
      severity: 'success'
    });
  };

  const handleViewDetails = (productId, e) => {
    e.stopPropagation();
    navigate(`/jewelry/product/${productId}`);
  };

  const handleAddToCart = async (product, e) => {
    e.stopPropagation();
    
    const token = localStorage.getItem('token');
    if (!token) {
      setSnackbar({
        open: true,
        message: 'Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng',
        severity: 'warning'
      });
      setTimeout(() => navigate('/login'), 1500);
      return;
    }

    setAddingToCartId(product.id);
    try {
      await axiosClient.post('/cart/add', {
        product_id: product.id,
        quantity: 1
      });
      
      setSnackbar({
        open: true,
        message: `"${product.name}" đã được thêm vào giỏ hàng`,
        severity: 'success'
      });
    } catch (err) {
      console.error('Error adding to cart:', err);
      let errorMessage = 'Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.';
      if (err.response?.status === 401) {
        errorMessage = 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.';
        localStorage.removeItem('token');
        setTimeout(() => navigate('/login'), 1500);
      }
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: 'error'
      });
    } finally {
      setAddingToCartId(null);
    }
  };

  if (wishlistCount === 0) {
    return (
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 6.5 } }}>
        <Box sx={{ textAlign: 'center', py: 8, px: { xs: 2, md: 6.5 } }}>
          <Heart size={64} strokeWidth={1} color="#ccc" style={{ margin: '0 auto 24px', display: 'block' }} />
          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Times New Roman", Times, serif',
              fontSize: { xs: '1.5rem', md: '2rem' },
              fontWeight: 400,
              mb: 2,
            }}
          >
            Mục đã lưu của bạn
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '0.875rem', md: '1rem' },
              mb: 4,
            }}
          >
            Bạn chưa lưu mục nào.
          </Typography>
          <Button
            component={RouterLink}
            to="/jewelry/shop"
            variant="outlined"
            sx={{
              borderColor: '#000',
              color: '#000',
              borderRadius: 0,
              px: 4,
              py: 1.5,
              textTransform: 'none',
              fontSize: '0.875rem',
              '&:hover': {
                borderColor: TIFFANY_BLUE,
                color: TIFFANY_BLUE,
              },
            }}
          >
            Bắt đầu mua sắm
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 }, px: { xs: 2, md: 4 } }}>
      {/* Header */}
      <Box sx={{ mb: { xs: 4, md: 6 } }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Link
              component={RouterLink}
              to="/"
              underline="hover"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                color: 'text.secondary',
                fontSize: '0.875rem',
                mb: 2,
                '&:hover': { color: TIFFANY_BLUE },
              }}
            >
              <ArrowLeft size={16} style={{ marginRight: 8 }} />
              Trang chủ
            </Link>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: '1.5rem', md: '2rem' },
                fontWeight: 400,
                textDecoration: 'underline',
                textUnderlineOffset: '0.2em',
                textDecorationThickness: '1px',
              }}
            >
              Mục đã lưu
            </Typography>
          </Box>
          {wishlistCount > 0 && (
            <Button
              variant="text"
              onClick={clearWishlist}
              sx={{
                textTransform: 'none',
                color: 'text.secondary',
                fontSize: '0.875rem',
                textDecoration: 'underline',
                textUnderlineOffset: '2px',
                alignSelf: 'flex-start',
                mt: { xs: 0, md: 5 },
                '&:hover': { color: '#000', bgcolor: 'transparent' },
              }}
            >
              Xóa tất cả
            </Button>
          )}
        </Box>
      </Box>

      {/* Product List - Vertical Layout */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, md: 3 }, maxWidth: { xs: '100%', md: '900px' }, mx: 'auto' }}>
        {wishlist.map((product) => (
          <Box
            key={product.id}
            sx={{
              position: 'relative',
              display: 'flex',
              gap: { xs: 2, md: 3 },
              p: { xs: 2, md: 2.5 },
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 0,
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: '#000',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              },
            }}
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            {/* Remove Button - Top Right */}
            <IconButton
              size="small"
              onClick={(e) => handleRemove(product.id, e)}
              sx={{
                position: 'absolute',
                top: { xs: 8, md: 12 },
                right: { xs: 8, md: 12 },
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 0,
                color: 'text.secondary',
                width: { xs: 32, md: 36 },
                height: { xs: 32, md: 36 },
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                zIndex: 10,
                '&:hover': {
                  borderColor: '#000',
                  color: '#000',
                  bgcolor: '#fff',
                },
              }}
            >
              <X size={16} />
            </IconButton>

            {/* Product Image - Fixed Size */}
            <Box
              onClick={() => navigate(`/jewelry/product/${product.id}`)}
              sx={{
                width: { xs: 120, sm: 150, md: 180 },
                height: { xs: 120, sm: 150, md: 180 },
                flexShrink: 0,
                bgcolor: '#f5f5f5',
                overflow: 'hidden',
                borderRadius: 1,
                cursor: 'pointer',
                position: 'relative',
                '&:hover .product-image': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              <Box
                component="img"
                src={product.image}
                alt={product.name}
                className="product-image"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.4s ease',
                  mixBlendMode: 'multiply',
                }}
              />
            </Box>

            {/* Product Info & Actions */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>
              {/* Product Details */}
              <Box sx={{ flex: 1 }}>
                {product.collection && (
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: '0.75rem', md: '0.875rem' },
                      fontWeight: 500,
                      color: 'text.secondary',
                      mb: 0.5,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {product.collection}
                  </Typography>
                )}
                <Typography
                  variant="h6"
                  onClick={() => navigate(`/jewelry/product/${product.id}`)}
                  sx={{
                    fontSize: { xs: '0.9375rem', md: '1.125rem' },
                    fontWeight: 400,
                    color: 'text.primary',
                    mb: 1,
                    cursor: 'pointer',
                    '&:hover': {
                      color: TIFFANY_BLUE,
                    },
                  }}
                >
                  {product.name}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: '0.9375rem', md: '1.125rem' },
                    fontWeight: 500,
                    color: 'text.primary',
                    mb: 2,
                  }}
                >
                  {product.price}
                </Typography>
              </Box>

              {/* Action Buttons - Bottom Right */}
              <Stack 
                direction="row" 
                spacing={1.5} 
                sx={{ 
                  justifyContent: 'flex-end',
                  flexWrap: 'wrap', 
                  gap: 1,
                  mt: 'auto',
                }}
              >
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<ShoppingBag size={16} />}
                  onClick={(e) => handleAddToCart(product, e)}
                  disabled={addingToCartId === product.id}
                  sx={{
                    borderColor: '#000',
                    color: '#000',
                    borderRadius: 0,
                    textTransform: 'none',
                    fontSize: '0.875rem',
                    px: 2,
                    py: 0.75,
                    '&:hover': {
                      borderColor: '#000',
                      bgcolor: '#f5f5f5',
                    },
                    '&:disabled': {
                      borderColor: '#ccc',
                      color: '#ccc',
                    },
                  }}
                >
                  {addingToCartId === product.id ? 'Đang thêm...' : 'Thêm vào giỏ'}
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Eye size={16} />}
                  onClick={(e) => handleViewDetails(product.id, e)}
                  sx={{
                    borderColor: '#000',
                    color: '#000',
                    borderRadius: 0,
                    textTransform: 'none',
                    fontSize: '0.875rem',
                    px: 2,
                    py: 0.75,
                    '&:hover': {
                      borderColor: '#000',
                      bgcolor: '#f5f5f5',
                    },
                  }}
                >
                  Xem chi tiết
                </Button>
              </Stack>
            </Box>
          </Box>
        ))}
      </Box>

      {/* View All Saved Products Link */}
      {wishlistCount > 0 && (
        <>
          <Divider sx={{ my: { xs: 4, md: 6 } }} />
          <Box sx={{ textAlign: 'center' }}>
            <Link
              component={RouterLink}
              to="/jewelry/shop"
              underline="hover"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                color: 'text.secondary',
                fontSize: '0.875rem',
                fontWeight: 500,
                transition: 'color 0.2s ease',
                '&:hover': { color: TIFFANY_BLUE },
              }}
            >
              Xem tất cả sản phẩm đã lưu
              <ChevronRight size={16} style={{ marginLeft: 4 }} />
            </Link>
          </Box>
        </>
      )}

      {/* Snackbar notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity || 'success'}
          sx={{
            width: '100%',
            bgcolor: snackbar.severity === 'error' ? '#d32f2f' :
              snackbar.severity === 'warning' ? '#ed6c02' : '#000',
            color: '#fff',
            '& .MuiAlert-icon': { color: snackbar.severity === 'success' ? TIFFANY_BLUE : '#fff' },
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default WishlistPage;

