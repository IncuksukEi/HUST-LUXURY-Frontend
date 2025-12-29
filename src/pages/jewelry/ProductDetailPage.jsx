import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Breadcrumbs,
  Link,
  IconButton,
  Button,
  Divider,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Heart, Share2, ChevronRight, ArrowLeft } from 'lucide-react';
import axiosClient from '../../api/axiosClient';
import { useWishlist } from '../../hooks/useWishlist';
import { useCart } from '../../contexts/CartContext';

const TIFFANY_BLUE = '#81d8d0';

// Mapping categoryId sang category name và slug
const CATEGORY_ID_TO_INFO = {
  1: { name: 'Necklaces & Pendants', slug: 'necklaces-pendants' },
  2: { name: 'Earrings', slug: 'earrings' },
  3: { name: 'Bracelets', slug: 'bracelets' },
  4: { name: 'Rings', slug: 'rings' },
};

// Helper function để format price từ VND sang USD
const formatPrice = (price) => {
  // Assuming price is in VND, convert to USD (1 USD ≈ 25,000 VND)
  const priceInUSD = price / 25000;
  return `$${priceInUSD.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const isWishlisted = product ? isInWishlist(product.id) : false;

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  // Auto hide success message after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await axiosClient.get(`/products/${productId}`);
      
      // Map API response to component format
      const categoryInfo = CATEGORY_ID_TO_INFO[response.data.categoryId] || { 
        name: 'Unknown', 
        slug: 'all-products' 
      };
      
      const mappedProduct = {
        id: response.data.productId,
        name: response.data.name,
        description: response.data.description || '',
        price: formatPrice(response.data.price),
        priceRaw: response.data.price,
        image: response.data.urlImg,
        stock: response.data.stock,
        category: categoryInfo.name,
        categorySlug: categoryInfo.slug,
        categoryId: response.data.categoryId,
        collection: response.data.collectionName || 'Unknown Collection',
        collectionId: response.data.collectionId,
        material: response.data.materialName || 'Unknown Material',
        materialId: response.data.materialId,
      };
      
      setProduct(mappedProduct);
    } catch (err) {
      console.error('Fetch product error:', err);
      
      let errorMessage = 'Không thể tải thông tin sản phẩm. Vui lòng thử lại!';
      
      if (err.response) {
        if (err.response.status === 500) {
          errorMessage = 'Lỗi server. Vui lòng thử lại sau!';
        } else if (err.response.status === 404) {
          errorMessage = 'Không tìm thấy sản phẩm.';
        } else {
          errorMessage = err.response.data?.message || `Lỗi ${err.response.status}: ${err.response.statusText}`;
        }
      } else if (err.request) {
        errorMessage = 'Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng!';
      } else {
        errorMessage = err.message || errorMessage;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 10, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container maxWidth="lg" sx={{ py: 10, textAlign: 'center' }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error || 'Sản phẩm không tồn tại'}
        </Alert>
        <Button
          component={RouterLink}
          to="/jewelry/shop"
          startIcon={<ArrowLeft size={20} />}
          sx={{
            color: '#000',
            borderColor: '#000',
            '&:hover': {
              borderColor: TIFFANY_BLUE,
              color: TIFFANY_BLUE,
            },
          }}
        >
          Quay lại danh sách
        </Button>
      </Container>
    );
  }

  const handleWishlist = () => {
    if (product) {
      toggleWishlist(product);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, 1);
      setSuccess('Đã thêm vào giỏ hàng!');
    }
  };

  const handleShare = () => {
    // TODO: Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 }, px: { xs: 2, md: 3 } }}>
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {success}
        </Alert>
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 4, md: 6 },
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        {/* Left Side - Product Image */}
        <Box
          sx={{
            width: { xs: '100%', md: 'calc(50% - 24px)' },
            flexShrink: 0,
            maxWidth: { md: '50%' },
            boxSizing: 'border-box',
          }}
        >
          <Box
            sx={{
              width: '100%',
              aspectRatio: '1',
              position: 'relative',
              bgcolor: '#f5f5f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <Box
              component="img"
              src={product.image}
              alt={product.name}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
        </Box>

        {/* Right Side - Product Information */}
        <Box
          sx={{
            width: { xs: '100%', md: 'calc(50% - 24px)' },
            flexShrink: 0,
            maxWidth: { md: '50%' },
            boxSizing: 'border-box',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', pl: { md: 2 } }}>
            {/* Breadcrumbs */}
            <Breadcrumbs
              separator={<ChevronRight size={14} />}
              sx={{ mb: 4, fontSize: '0.75rem' }}
            >
              <Link
                component={RouterLink}
                to="/"
                underline="hover"
                sx={{ color: 'text.secondary', fontSize: '0.75rem', '&:hover': { color: TIFFANY_BLUE } }}
              >
                Home
              </Link>
              <Link
                component={RouterLink}
                to="/jewelry"
                underline="hover"
                sx={{ color: 'text.secondary', fontSize: '0.75rem', '&:hover': { color: TIFFANY_BLUE } }}
              >
                Jewelry
              </Link>
              <Link
                component={RouterLink}
                to={`/jewelry/shop/${product.categorySlug}`}
                underline="hover"
                sx={{ color: 'text.secondary', fontSize: '0.75rem', '&:hover': { color: TIFFANY_BLUE } }}
              >
                {product.category}
              </Link>
            </Breadcrumbs>

            {/* Title Section */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Times New Roman", Times, serif',
                  fontSize: { xs: '0.875rem', md: '1rem' },
                  fontWeight: 300,
                  mb: 0.5,
                  lineHeight: 1.2,
                  color: 'text.secondary',
                  letterSpacing: '0.05em',
                }}
              >
                {product.collection}
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: '"Times New Roman", Times, serif',
                  fontSize: { xs: '1.75rem', md: '2.75rem' },
                  fontWeight: 400,
                  mb: 1.5,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                }}
              >
                {product.name}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '0.875rem', md: '1rem' },
                  color: 'text.secondary',
                  mb: 2.5,
                  fontWeight: 300,
                }}
              >
                in {product.material}
              </Typography>

              {/* Action Icons */}
              <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', mb: 3 }}>
                <IconButton
                  onClick={handleShare}
                  sx={{
                    color: 'text.secondary',
                    p: 1,
                    '&:hover': { color: TIFFANY_BLUE, bgcolor: 'transparent' },
                  }}
                >
                  <Share2 size={18} />
                </IconButton>
                <IconButton
                  onClick={handleWishlist}
                  sx={{
                    color: isWishlisted ? TIFFANY_BLUE : 'text.secondary',
                    p: 1,
                    '&:hover': { color: TIFFANY_BLUE, bgcolor: 'transparent' },
                  }}
                >
                  <Heart size={18} fill={isWishlisted ? TIFFANY_BLUE : 'none'} />
                </IconButton>
              </Box>
            </Box>

            <Divider sx={{ mb: 4 }} />

            {/* Price */}
            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Times New Roman", Times, serif',
                fontSize: { xs: '1.5rem', md: '2rem' },
                fontWeight: 400,
                mb: 4,
                letterSpacing: '-0.01em',
              }}
            >
              {product.price}
            </Typography>

            {/* Description Section */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Times New Roman", Times, serif',
                  fontSize: { xs: '0.875rem', md: '1rem' },
                  fontWeight: 600,
                  mb: 2,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                Description & Details
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '0.875rem', md: '0.95rem' },
                  lineHeight: 1.8,
                  color: 'text.secondary',
                  mb: 3,
                  fontWeight: 300,
                }}
              >
                {product.description}
              </Typography>

              {/* Stock Info */}
              {product.stock !== undefined && (
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: '0.875rem', md: '0.9rem' },
                      color: product.stock > 0 ? 'text.secondary' : 'error.main',
                      fontWeight: 300,
                    }}
                  >
                    <Box component="span" sx={{ fontWeight: 600, mr: 1 }}>Stock:</Box>
                    {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Product Details */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="body2"
                sx={{
                  fontSize: '0.875rem',
                  color: 'text.secondary',
                  mb: 0.5,
                  fontWeight: 300,
                }}
              >
                <Box component="span" sx={{ fontWeight: 600, mr: 1 }}>Category:</Box>
                {product.category}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: '0.875rem',
                  color: 'text.secondary',
                  mb: 0.5,
                  fontWeight: 300,
                }}
              >
                <Box component="span" sx={{ fontWeight: 600, mr: 1 }}>Collection:</Box>
                {product.collection}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: '0.875rem',
                  color: 'text.secondary',
                  mb: 0.5,
                  fontWeight: 300,
                }}
              >
                <Box component="span" sx={{ fontWeight: 600, mr: 1 }}>Material:</Box>
                {product.material}
              </Typography>
              {product.gemstone !== 'No Gemstones' && (
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '0.875rem',
                    color: 'text.secondary',
                    fontWeight: 300,
                  }}
                >
                  <Box component="span" sx={{ fontWeight: 600, mr: 1 }}>Gemstone:</Box>
                  {product.gemstone}
                </Typography>
              )}
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, mt: 'auto' }}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleAddToCart}
                sx={{
                  bgcolor: '#000',
                  color: '#fff',
                  borderRadius: 0,
                  py: 1.75,
                  fontSize: '0.875rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  '&:hover': {
                    bgcolor: '#333',
                  },
                }}
              >
                Add to Bag
              </Button>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  borderColor: '#000',
                  color: '#000',
                  borderRadius: 0,
                  py: 1.75,
                  fontSize: '0.875rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  '&:hover': {
                    borderColor: TIFFANY_BLUE,
                    color: TIFFANY_BLUE,
                    bgcolor: 'transparent',
                  },
                }}
              >
                Contact
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default ProductDetailPage;

