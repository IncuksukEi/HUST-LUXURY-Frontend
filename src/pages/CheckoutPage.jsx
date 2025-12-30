import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Divider,
  Alert,
  CircularProgress,
  IconButton,
} from '@mui/material';
import { ArrowLeft, Plus, Minus, X } from 'lucide-react';
import axiosClient from '../api/axiosClient';
import { useCart } from '../contexts/CartContext';

const TIFFANY_BLUE = '#81d8d0';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, getTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [fetchingAddress, setFetchingAddress] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [address, setAddress] = useState('');
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  useEffect(() => {
    // Kiểm tra đăng nhập
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Nếu cart rỗng, redirect về cart page
    if (cart.length === 0) {
      navigate('/cart');
      return;
    }

    // Lấy address từ account
    fetchAccountAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart.length]);

  const fetchAccountAddress = async () => {
    try {
      setFetchingAddress(true);
      const response = await axiosClient.get('/user/profile');
      
      if (response.data && response.data.address) {
        setAddress(response.data.address);
      } else {
        setIsEditingAddress(true); // Nếu chưa có address, cho phép nhập
      }
    } catch (err) {
      console.error('Error fetching account address:', err);
      // Nếu không lấy được, cho phép nhập address cục bộ
      setIsEditingAddress(true);
    } finally {
      setFetchingAddress(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!address.trim()) {
      setError('Vui lòng nhập địa chỉ giao hàng');
      return;
    }

    if (cart.length === 0) {
      setError('Giỏ hàng của bạn đang trống');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      // Format items theo API yêu cầu
      const items = cart.map(item => ({
        productId: item.productId || item.id,
        name: item.name,
        description: item.description || '',
        urlImg: item.urlImg || item.image || '',
        quantity: item.quantity,
        price: item.price,
      }));

      await axiosClient.post('/orders', {
        address: address.trim(),
        items: items,
      });

      setSuccess('Đặt hàng thành công! Đang chuyển hướng...');
      
      // Xóa cart sau khi đặt hàng thành công
      clearCart();
      
      // Redirect sau 2 giây
      setTimeout(() => {
        navigate('/account');
      }, 2000);
    } catch (err) {
      console.error('Checkout error:', err);
      
      let errorMessage = 'Không thể đặt hàng. Vui lòng thử lại!';
      
      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!';
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        } else if (err.response.status === 400) {
          errorMessage = err.response.data?.message || 'Thông tin đơn hàng không hợp lệ.';
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

  const formatPrice = (price) => {
    // price is in VND, convert to USD for display
    const priceInUSD = price / 25000;
    return `$${priceInUSD.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  if (fetchingAddress) {
    return (
      <Container maxWidth="lg" sx={{ py: 10, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  const total = getTotal();

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 }, px: { xs: 2, md: 3 } }}>
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
          Quay lại
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
          Thanh toán
        </Typography>
      </Box>

      {/* Alerts */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {success}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          {/* Left Column - Shipping Address */}
          <Grid item xs={12} md={7}>
            <Paper 
              elevation={0}
              sx={{ 
                p: { xs: 3, md: 4 }, 
                mb: 3,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 0,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Times New Roman", Times, serif',
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  fontWeight: 600,
                  mb: 3,
                  letterSpacing: '0.05em',
                }}
              >
                Địa chỉ giao hàng
              </Typography>

              {!isEditingAddress && address ? (
                <Box>
                  <Box
                    sx={{
                      p: 2,
                      mb: 2,
                      bgcolor: '#fafafa',
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 0,
                    }}
                  >
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        mb: 0,
                        lineHeight: 1.6,
                        color: 'text.primary',
                      }}
                    >
                      {address}
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    onClick={() => setIsEditingAddress(true)}
                    sx={{
                      borderColor: '#000',
                      color: '#000',
                      borderRadius: 0,
                      textTransform: 'none',
                      fontSize: '0.875rem',
                      px: 3,
                      py: 1,
                      '&:hover': {
                        borderColor: TIFFANY_BLUE,
                        color: TIFFANY_BLUE,
                        bgcolor: 'transparent',
                      },
                    }}
                  >
                    Thay đổi địa chỉ
                  </Button>
                </Box>
              ) : (
                <TextField
                  fullWidth
                  label="Địa chỉ giao hàng"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  multiline
                  rows={4}
                  variant="outlined"
                  sx={{ 
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 0,
                      '&:hover fieldset': {
                        borderColor: TIFFANY_BLUE,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: TIFFANY_BLUE,
                      },
                    },
                  }}
                  placeholder="Nhập địa chỉ giao hàng đầy đủ của bạn..."
                />
              )}
            </Paper>

            {/* Order Summary */}
            <Paper 
              elevation={0}
              sx={{ 
                p: { xs: 3, md: 4 },
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 0,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Times New Roman", Times, serif',
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  fontWeight: 600,
                  mb: 3,
                  letterSpacing: '0.05em',
                }}
              >
                Tóm tắt đơn hàng ({cart.reduce((sum, item) => sum + item.quantity, 0)} sản phẩm)
              </Typography>

              {cart.map((item, index) => (
                <Box 
                  key={item.id} 
                  sx={{ 
                    mb: index < cart.length - 1 ? 3 : 0, 
                    pb: index < cart.length - 1 ? 3 : 0, 
                    borderBottom: index < cart.length - 1 ? '1px solid' : 'none',
                    borderColor: 'divider',
                    transition: 'background-color 0.2s',
                    '&:hover': {
                      bgcolor: 'transparent',
                    },
                  }}
                >
                  <Grid container spacing={3}>
                    <Grid item xs={4} sm={3}>
                      <Box
                        sx={{
                          width: { xs: 80, sm: 100, md: 120 },
                          height: { xs: 80, sm: 100, md: 120 },
                          bgcolor: '#f5f5f5',
                          overflow: 'hidden',
                          borderRadius: 1,
                          flexShrink: 0,
                          border: '1px solid',
                          borderColor: 'divider',
                          transition: 'transform 0.2s, box-shadow 0.2s',
                          '&:hover': {
                            transform: 'scale(1.02)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                          },
                        }}
                      >
                        <Box
                          component="img"
                          src={item.urlImg || item.image}
                          alt={item.name}
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={8} sm={9}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', height: '100%' }}>
                        <Box sx={{ flex: 1, pr: 2 }}>
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              fontWeight: 500, 
                              mb: 0.5,
                              fontSize: { xs: '0.9rem', md: '1rem' },
                              lineHeight: 1.4,
                            }}
                          >
                            {item.name}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            sx={{ 
                              mb: 1.5,
                              fontSize: { xs: '0.8rem', md: '0.875rem' },
                            }}
                          >
                            {formatPrice(item.price)} / sản phẩm
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <IconButton
                              size="small"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              sx={{ 
                                border: '1px solid',
                                borderColor: 'divider',
                                width: 32, 
                                height: 32,
                                '&:hover': {
                                  borderColor: TIFFANY_BLUE,
                                  color: TIFFANY_BLUE,
                                  bgcolor: 'transparent',
                                },
                                '&:disabled': {
                                  opacity: 0.4,
                                },
                              }}
                            >
                              <Minus size={14} />
                            </IconButton>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                minWidth: 40, 
                                textAlign: 'center',
                                fontWeight: 500,
                                fontSize: '0.875rem',
                              }}
                            >
                              {item.quantity}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              sx={{ 
                                border: '1px solid',
                                borderColor: 'divider',
                                width: 32, 
                                height: 32,
                                '&:hover': {
                                  borderColor: TIFFANY_BLUE,
                                  color: TIFFANY_BLUE,
                                  bgcolor: 'transparent',
                                },
                              }}
                            >
                              <Plus size={14} />
                            </IconButton>
                          </Box>
                        </Box>
                        <Box sx={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                          <IconButton
                            size="small"
                            onClick={() => removeFromCart(item.id)}
                            sx={{ 
                              color: 'text.secondary',
                              mb: 0.5,
                              '&:hover': {
                                color: '#d32f2f',
                                bgcolor: 'transparent',
                              },
                            }}
                          >
                            <X size={18} />
                          </IconButton>
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              fontWeight: 600, 
                              mt: 0.5,
                              fontSize: { xs: '0.9rem', md: '1rem' },
                              fontFamily: 'serif',
                            }}
                          >
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

          {/* Right Column - Order Total */}
          <Grid item xs={12} md={5}>
            <Paper 
              elevation={0}
              sx={{ 
                p: { xs: 3, md: 4 }, 
                position: { md: 'sticky' }, 
                top: { md: 20 },
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 0,
                bgcolor: '#fafafa',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Times New Roman", Times, serif',
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  fontWeight: 600,
                  mb: 3,
                  letterSpacing: '0.05em',
                }}
              >
                Tổng đơn hàng
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ fontSize: '0.875rem' }}
                  >
                    Tạm tính ({cart.reduce((sum, item) => sum + item.quantity, 0)} sản phẩm)
                  </Typography>
                  <Typography 
                    variant="body2"
                    sx={{ fontWeight: 500, fontSize: '0.875rem' }}
                  >
                    {formatPrice(total)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ fontSize: '0.875rem' }}
                  >
                    Vận chuyển
                  </Typography>
                  <Typography 
                    variant="body2"
                    sx={{ fontWeight: 500, fontSize: '0.875rem', color: TIFFANY_BLUE }}
                  >
                    Free
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600,
                      fontSize: { xs: '1rem', md: '1.125rem' },
                      fontFamily: 'serif',
                    }}
                  >
                    Tổng cộng
                  </Typography>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600,
                      fontSize: { xs: '1rem', md: '1.125rem' },
                      fontFamily: 'serif',
                    }}
                  >
                    {formatPrice(total)}
                  </Typography>
                </Box>
                <Typography 
                  variant="caption" 
                  color="text.secondary"
                  sx={{ 
                    display: 'block',
                    fontSize: '0.75rem',
                    fontStyle: 'italic',
                  }}
                >
                    Giao hàng & Đổi trả miễn phí
                </Typography>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading || cart.length === 0}
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
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: '#333',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  },
                  '&:disabled': {
                    bgcolor: '#ccc',
                    color: '#666',
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Đặt hàng'
                )}
              </Button>
              
              <Button
                fullWidth
                variant="text"
                onClick={() => navigate('/cart')}
                sx={{
                  color: 'text.secondary',
                  textTransform: 'none',
                  fontSize: '0.875rem',
                  textDecoration: 'underline',
                  '&:hover': {
                    color: 'text.primary',
                    bgcolor: 'transparent',
                    textDecoration: 'underline',
                  },
                }}
              >
                Quay lại giỏ hàng
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CheckoutPage;

