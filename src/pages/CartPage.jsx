import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Divider,
  IconButton,
  Alert,
  CircularProgress,
} from '@mui/material';
import { ArrowLeft, Plus, Minus, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import axiosClient from '../api/axiosClient';

const TIFFANY_BLUE = '#81d8d0';

const CartPage = () => {
  const navigate = useNavigate();
  const { cart: localCart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const isLoggedIn = !!localStorage.getItem('token');

  // Fetch cart from API when logged in, or use CartContext when not logged in
  useEffect(() => {
    const loadCart = async () => {
      if (isLoggedIn) {
        setLoading(true);
        try {
          const response = await axiosClient.get('/cart');
          if (response.data && Array.isArray(response.data)) {
            // Map API response to cart format
            const mappedCart = response.data.map(item => ({
              id: item.productId,
              productId: item.productId,
              name: item.name,
              description: item.description || '',
              urlImg: item.urlImg || '',
              quantity: item.quantity || 1,
              price: item.price || 0,
            }));
            setCart(mappedCart);
          }
        } catch (err) {
          console.error('Error loading cart:', err);
          setError('Không thể tải giỏ hàng. Vui lòng thử lại!');
        } finally {
          setLoading(false);
        }
      } else {
        // Use CartContext for non-logged in users
        setCart(localCart || []);
        setLoading(false);
      }
    };
    loadCart();
  }, [isLoggedIn, localCart]);

  // Reload cart after update/remove operations
  const reloadCart = async () => {
    if (isLoggedIn) {
      try {
        const response = await axiosClient.get('/cart');
        if (response.data && Array.isArray(response.data)) {
          const mappedCart = response.data.map(item => ({
            id: item.productId,
            productId: item.productId,
            name: item.name,
            description: item.description || '',
            urlImg: item.urlImg || '',
            quantity: item.quantity || 1,
            price: item.price || 0,
          }));
          setCart(mappedCart);
        }
      } catch (err) {
        console.error('Error reloading cart:', err);
      }
    } else {
      // Sync with localCart when not logged in
      setCart(localCart || []);
    }
  };

  // Sync cart with localCart when not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      setCart(localCart || []);
    }
  }, [localCart, isLoggedIn]);

  const [updatingItemId, setUpdatingItemId] = useState(null);
  const [removingItemId, setRemovingItemId] = useState(null);

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setUpdatingItemId(productId);
    setError('');
    try {
      await updateQuantity(productId, newQuantity);
      // CartContext đã tự động reload cart, nhưng CartPage cần reload để sync state
      if (isLoggedIn) {
        await reloadCart();
      }
    } catch (err) {
      console.error('Error updating quantity:', err);
      let errorMessage = 'Không thể cập nhật số lượng. Vui lòng thử lại!';
      
      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.';
        } else if (err.response.status === 400) {
          errorMessage = err.response.data?.message || 'Dữ liệu không hợp lệ.';
        } else if (err.response.status === 500) {
          errorMessage = 'Lỗi server. Vui lòng thử lại sau!';
        }
      }
      
      setError(errorMessage);
      setTimeout(() => setError(''), 5000);
    } finally {
      setUpdatingItemId(null);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    setRemovingItemId(productId);
    setError('');
    try {
      await removeFromCart(productId);
      // CartContext đã tự động reload cart, nhưng CartPage cần reload để sync state
      if (isLoggedIn) {
        await reloadCart();
      }
    } catch (err) {
      console.error('Error removing item:', err);
      let errorMessage = 'Không thể xóa sản phẩm. Vui lòng thử lại!';
      
      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.';
        } else if (err.response.status === 404) {
          errorMessage = 'Sản phẩm không tồn tại trong giỏ hàng.';
        } else if (err.response.status === 500) {
          errorMessage = 'Lỗi server. Vui lòng thử lại sau!';
        }
      }
      
      setError(errorMessage);
      setTimeout(() => setError(''), 5000);
    } finally {
      setRemovingItemId(null);
    }
  };

  const [clearingCart, setClearingCart] = useState(false);

  const handleClearCart = async () => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa tất cả sản phẩm khỏi giỏ hàng?')) {
      return;
    }

    setClearingCart(true);
    setError('');
    try {
      await clearCart();
      setCart([]);
      if (isLoggedIn) {
        await reloadCart();
      }
    } catch (err) {
      console.error('Error clearing cart:', err);
      let errorMessage = 'Không thể xóa giỏ hàng. Vui lòng thử lại!';
      
      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.';
        } else if (err.response.status === 500) {
          errorMessage = 'Lỗi server. Vui lòng thử lại sau!';
        }
      }
      
      setError(errorMessage);
      setTimeout(() => setError(''), 5000);
    } finally {
      setClearingCart(false);
    }
  };

  const formatPrice = (price) => {
    // price is in VND, convert to USD for display
    const priceInUSD = price / 25000;
    return `$${priceInUSD.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error && cart.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 } }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Button
          variant="outlined"
          onClick={() => navigate('/jewelry/shop')}
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
          Start Shopping
        </Button>
      </Container>
    );
  }

  if (cart.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 } }}>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <ShoppingBag size={64} strokeWidth={1} color="#ccc" style={{ margin: '0 auto 24px', display: 'block' }} />
          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Times New Roman", Times, serif',
              fontSize: { xs: '1.5rem', md: '2rem' },
              fontWeight: 400,
              mb: 2,
            }}
          >
            Your Shopping Bag
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '0.875rem', md: '1rem' },
              mb: 4,
            }}
          >
            Your bag is empty.
          </Typography>
          <Button
            variant="outlined"
            onClick={() => navigate('/jewelry/shop')}
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
            Start Shopping
          </Button>
        </Box>
      </Container>
    );
  }

  const total = getTotal();

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 }, px: { xs: 2, md: 3 } }}>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowLeft size={20} />}
          onClick={() => navigate(-1)}
          sx={{
            color: 'text.secondary',
            mb: 3,
            textTransform: 'none',
            '&:hover': { color: TIFFANY_BLUE },
          }}
        >
          Continue Shopping
        </Button>
        <Typography
          variant="h3"
          sx={{
            fontFamily: '"Times New Roman", Times, serif',
            fontSize: { xs: '1.75rem', md: '2.5rem' },
            fontWeight: 400,
            mb: 2,
          }}
        >
          Shopping Bag
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Left Column - Cart Items */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: { xs: 3, md: 4 } }}>
            {cart.map((item) => (
              <Box key={item.id} sx={{ mb: 3, pb: 3, borderBottom: '1px solid #f0f0f0', '&:last-child': { mb: 0, pb: 0, borderBottom: 'none' } }}>
                <Grid container spacing={3}>
                  <Grid item xs={4} sm={3}>
                    <Box
                      component="img"
                      src={item.urlImg || item.image}
                      alt={item.name}
                      onClick={() => navigate(`/jewelry/product/${item.id}`)}
                      sx={{
                        width: '100%',
                        aspectRatio: '1',
                        objectFit: 'cover',
                        bgcolor: '#f5f5f5',
                        cursor: 'pointer',
                      }}
                    />
                  </Grid>
                  <Grid item xs={8} sm={9}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', height: '100%' }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="body1"
                          onClick={() => navigate(`/jewelry/product/${item.id}`)}
                          sx={{
                            fontWeight: 500,
                            mb: 0.5,
                            cursor: 'pointer',
                            '&:hover': { color: TIFFANY_BLUE },
                          }}
                        >
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {formatPrice(item.price)} each
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1 || updatingItemId === item.id}
                            sx={{ 
                              border: '1px solid #ddd', 
                              width: 32, 
                              height: 32,
                              '&:disabled': { opacity: 0.5 }
                            }}
                          >
                            {updatingItemId === item.id ? (
                              <CircularProgress size={12} />
                            ) : (
                              <Minus size={14} />
                            )}
                          </IconButton>
                          <Typography variant="body2" sx={{ minWidth: 40, textAlign: 'center' }}>
                            {item.quantity}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            disabled={updatingItemId === item.id}
                            sx={{ 
                              border: '1px solid #ddd', 
                              width: 32, 
                              height: 32,
                              '&:disabled': { opacity: 0.5 }
                            }}
                          >
                            {updatingItemId === item.id ? (
                              <CircularProgress size={12} />
                            ) : (
                              <Plus size={14} />
                            )}
                          </IconButton>
                        </Box>
                      </Box>
                      <Box sx={{ textAlign: 'right', ml: 2 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleRemoveFromCart(item.id)}
                          disabled={removingItemId === item.id}
                          sx={{ 
                            color: 'text.secondary', 
                            mb: 1,
                            '&:disabled': { opacity: 0.5 }
                          }}
                        >
                          {removingItemId === item.id ? (
                            <CircularProgress size={12} />
                          ) : (
                            <X size={18} />
                          )}
                        </IconButton>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {formatPrice(item.price * item.quantity)}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Right Column - Order Summary */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: { xs: 3, md: 4 }, position: { md: 'sticky' }, top: { md: 20 } }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Times New Roman", Times, serif',
                fontSize: { xs: '1rem', md: '1.25rem' },
                fontWeight: 600,
                mb: 3,
              }}
            >
              Order Summary
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)
                </Typography>
                <Typography variant="body2">
                  {formatPrice(total)}
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Total
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {formatPrice(total)}
                </Typography>
              </Box>
            </Box>

            <Button
              fullWidth
              variant="contained"
              onClick={() => navigate('/checkout')}
              sx={{
                bgcolor: '#000',
                color: '#fff',
                borderRadius: 0,
                py: 1.75,
                fontSize: '0.875rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                fontWeight: 500,
                mb: 2,
                '&:hover': {
                  bgcolor: '#333',
                },
              }}
            >
              Proceed to Checkout
            </Button>

            <Button
              fullWidth
              variant="outlined"
              onClick={handleClearCart}
              disabled={cart.length === 0 || clearingCart}
              sx={{
                borderColor: '#000',
                color: '#000',
                borderRadius: 0,
                py: 1.5,
                fontSize: '0.875rem',
                textTransform: 'none',
                '&:hover': {
                  borderColor: TIFFANY_BLUE,
                  color: TIFFANY_BLUE,
                },
                '&:disabled': {
                  borderColor: '#ccc',
                  color: '#ccc',
                },
              }}
            >
              {clearingCart ? (
                <>
                  <CircularProgress size={16} sx={{ mr: 1 }} />
                  Đang xóa...
                </>
              ) : (
                'Clear Cart'
              )}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage;

