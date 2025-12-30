import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  IconButton,
  Divider,
  Alert,
  Link,
} from '@mui/material';
import { Heart, ChevronRight, ArrowLeft, X } from 'lucide-react';
import { useWishlist } from '../hooks/useWishlist';

const TIFFANY_BLUE = '#81d8d0';

const WishlistPage = () => {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist, clearWishlist, wishlistCount } = useWishlist();
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const handleRemove = (productId, e) => {
    e.stopPropagation();
    removeFromWishlist(productId);
  };

  const handleProductClick = (productId) => {
    navigate(`/jewelry/product/${productId}`);
  };

  if (wishlistCount === 0) {
    return (
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 } }}>
        <Box sx={{ textAlign: 'center', py: 8 }}>
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
    <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 } }}>
      {/* Header */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
          <Box>
            <Link
              component={RouterLink}
              to="/"
              underline="hover"
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'text.secondary',
                fontSize: '0.875rem',
                mb: 2,
                '&:hover': { color: TIFFANY_BLUE },
              }}
            >
              <ArrowLeft size={16} style={{ marginRight: 8 }} />
              Đăng nhập
            </Link>
            <Typography
              variant="h3"
              sx={{
                fontFamily: '"Times New Roman", Times, serif',
                fontSize: { xs: '1.75rem', md: '2.5rem' },
                fontWeight: 400,
                textDecoration: 'underline',
                textUnderlineOffset: '0.2em',
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
                '&:hover': { color: '#000', bgcolor: 'transparent' },
              }}
            >
              Xóa tất cả
            </Button>
          )}
        </Box>
      </Box>

      {/* Product Grid */}
      <Grid container spacing={3}>
        {wishlist.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Box
              sx={{
                position: 'relative',
                cursor: 'pointer',
                '&:hover': {
                  '& .product-image': {
                    transform: 'scale(1.05)',
                  },
                },
              }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              onClick={() => handleProductClick(product.id)}
            >
              {/* Product Image */}
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  paddingTop: '100%',
                  bgcolor: '#f9f9f9',
                  mb: 2,
                  overflow: 'hidden',
                }}
              >
                <Box
                  component="img"
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                  }}
                />
              </Box>

              {/* Product Info */}
              <Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: '"Times New Roman", Times, serif',
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    fontWeight: 400,
                    mb: 0.5,
                  }}
                >
                  {product.collection || 'Collection'}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: { xs: '0.8rem', md: '0.9rem' },
                    color: 'text.secondary',
                    mb: 1,
                  }}
                >
                  {product.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: { xs: '0.8rem', md: '0.9rem' },
                    fontWeight: 500,
                    mb: 2,
                  }}
                >
                  {product.price}
                </Typography>

                {/* Remove Button */}
                <Box
                  component="button"
                  onClick={(e) => handleRemove(product.id, e)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    color: 'text.secondary',
                    fontSize: '0.875rem',
                    p: 0,
                    '&:hover': {
                      color: '#000',
                    },
                  }}
                >
                  Xóa
                  <ChevronRight size={16} style={{ marginLeft: 4 }} />
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* View All Saved Products Link */}
      {wishlistCount > 0 && (
        <>
          <Divider sx={{ my: 6 }} />
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
                '&:hover': { color: TIFFANY_BLUE },
              }}
            >
              Xem tất cả sản phẩm đã lưu
              <ChevronRight size={16} style={{ marginLeft: 4 }} />
            </Link>
          </Box>
        </>
      )}
    </Container>
  );
};

export default WishlistPage;

