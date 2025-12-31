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
  const { clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [fetchingAddress, setFetchingAddress] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [checkoutItems, setCheckoutItems] = useState([]);
  
  const [address, setAddress] = useState('');
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  useEffect(() => {
    // Kiểm tra đăng nhập
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Load selected items from sessionStorage
    const items = sessionStorage.getItem('checkoutItems');
    if (!items) {
      navigate('/cart');
      return;
    }

    try {
      const parsedItems = JSON.parse(items);
      if (!Array.isArray(parsedItems) || parsedItems.length === 0) {
        navigate('/cart');
        return;
      }
      setCheckoutItems(parsedItems);
    } catch (err) {
      console.error('Error parsing checkout items:', err);
      navigate('/cart');
      return;
    }

    // Lấy address từ account
    fetchAccountAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

    if (checkoutItems.length === 0) {
      setError('Giỏ hàng của bạn đang trống');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      // Format items theo API yêu cầu
      const items = checkoutItems.map(item => ({
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
      // Xóa checkoutItems từ sessionStorage
      sessionStorage.removeItem('checkoutItems');
      
      // Redirect về trang chủ sau 2 giây
      setTimeout(() => {
        navigate('/');
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

  // Helper function để format price VND
  const formatPriceVND = (price) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    if (isNaN(numPrice)) return '0 ₫';
    
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numPrice);
  };

  if (fetchingAddress) {
    return (
      <Container maxWidth="lg" sx={{ py: 10, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  // Calculate total from checkoutItems
  const total = checkoutItems.reduce(
    (sum, item) => sum + (item.price * item.quantity),
    0
  );

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 }, px: { xs: 2, md: 4 } }}>
      {/* Header */}
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Button
          startIcon={<ArrowLeft size={18} />}
          onClick={() => navigate(-1)}
          sx={{
            color: 'text.secondary',
            mb: 2,
            textTransform: 'none',
            fontSize: '0.875rem',
            px: 0,
            '&:hover': { 
              color: '#000',
              bgcolor: 'transparent',
            },
          }}
        >
          Quay lại
        </Button>
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: '1.5rem', md: '2rem' },
            fontWeight: 400,
            mb: 1,
          }}
        >
          Thanh toán
        </Typography>
      </Box>

      {/* Alerts */}
      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 3, borderRadius: 0 }}
          onClose={() => setError('')}
        >
          {error}
        </Alert>
      )}
      {success && (
        <Alert 
          severity="success" 
          sx={{ mb: 3, borderRadius: 0 }}
          onClose={() => setSuccess('')}
        >
          {success}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: { xs: 'block', md: 'flex' }, gap: { md: 4 } }}>
          {/* Left Column - Shipping Address */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Paper 
              elevation={0}
              sx={{ 
                p: { xs: 3, md: 4 }, 
                mb: 3,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 0,
                bgcolor: '#fff',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  fontWeight: 600,
                  mb: 3,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                Địa chỉ giao hàng
              </Typography>

              {!isEditingAddress && address ? (
                <Box>
                  <Box
                    sx={{
                      p: 2.5,
                      mb: 2.5,
                      bgcolor: '#fafafa',
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 0,
                      minHeight: 80,
                    }}
                  >
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        mb: 0,
                        lineHeight: 1.7,
                        color: 'text.primary',
                        fontSize: '0.9375rem',
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
                      py: 1.25,
                      '&:hover': {
                        borderColor: '#000',
                        bgcolor: '#f5f5f5',
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
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 0,
                      '&:hover fieldset': {
                        borderColor: '#000',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#000',
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
                bgcolor: '#fff',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  fontWeight: 600,
                  mb: 3,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                Tóm tắt đơn hàng ({checkoutItems.reduce((sum, item) => sum + item.quantity, 0)} sản phẩm)
              </Typography>

              {checkoutItems.map((item, index) => (
                <Box 
                  key={item.id} 
                  sx={{ 
                    mb: index < checkoutItems.length - 1 ? 2.5 : 0, 
                    pb: index < checkoutItems.length - 1 ? 2.5 : 0, 
                    borderBottom: index < checkoutItems.length - 1 ? '1px solid' : 'none',
                    borderColor: 'divider',
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    {/* Product Image */}
                    <Box
                      onClick={() => navigate(`/jewelry/product/${item.id}`)}
                      sx={{
                        width: { xs: 100, sm: 120, md: 140 },
                        height: { xs: 100, sm: 120, md: 140 },
                        flexShrink: 0,
                        bgcolor: '#f5f5f5',
                        overflow: 'hidden',
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: 'divider',
                        cursor: 'pointer',
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

                    {/* Product Info */}
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                        <Typography 
                          variant="body1" 
                          onClick={() => navigate(`/jewelry/product/${item.id}`)}
                          sx={{ 
                            fontWeight: 500, 
                            fontSize: { xs: '0.9rem', md: '1rem' },
                            lineHeight: 1.4,
                            cursor: 'pointer',
                            flex: 1,
                            pr: 2,
                            '&:hover': {
                              color: TIFFANY_BLUE,
                            },
                          }}
                        >
                          {item.name}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => {
                            setCheckoutItems(prev => prev.filter(i => i.id !== item.id));
                            // Update sessionStorage
                            const updated = checkoutItems.filter(i => i.id !== item.id);
                            sessionStorage.setItem('checkoutItems', JSON.stringify(updated));
                          }}
                          sx={{ 
                            color: 'text.secondary',
                            width: 32,
                            height: 32,
                            flexShrink: 0,
                            '&:hover': {
                              color: '#d32f2f',
                              bgcolor: '#ffebee',
                            },
                          }}
                        >
                          <X size={16} />
                        </IconButton>
                      </Box>
                      
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ 
                          mb: 1.5,
                          fontSize: { xs: '0.8rem', md: '0.875rem' },
                        }}
                      >
                        {formatPriceVND(item.price)} / sản phẩm
                      </Typography>

                      {/* Quantity Controls */}
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 'auto' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => {
                              const newQuantity = item.quantity - 1;
                              if (newQuantity >= 1) {
                                setCheckoutItems(prev => 
                                  prev.map(i => i.id === item.id ? { ...i, quantity: newQuantity } : i)
                                );
                              }
                            }}
                            disabled={item.quantity <= 1}
                            sx={{ 
                              border: '1px solid',
                              borderColor: 'divider',
                              width: 32, 
                              height: 32,
                              borderRadius: 0,
                              '&:hover': {
                                borderColor: '#000',
                                bgcolor: '#f5f5f5',
                              },
                              '&:disabled': {
                                opacity: 0.3,
                                cursor: 'not-allowed',
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
                            onClick={() => {
                              const newQuantity = item.quantity + 1;
                              if (newQuantity <= 10) {
                                const updated = checkoutItems.map(i => 
                                  i.id === item.id ? { ...i, quantity: newQuantity } : i
                                );
                                setCheckoutItems(updated);
                                sessionStorage.setItem('checkoutItems', JSON.stringify(updated));
                              }
                            }}
                            disabled={item.quantity >= 10}
                            sx={{ 
                              border: '1px solid',
                              borderColor: 'divider',
                              width: 32, 
                              height: 32,
                              borderRadius: 0,
                              '&:hover': {
                                borderColor: '#000',
                                bgcolor: '#f5f5f5',
                              },
                            }}
                          >
                            <Plus size={14} />
                          </IconButton>
                        </Box>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            fontWeight: 600, 
                            fontSize: { xs: '0.9rem', md: '1rem' },
                            ml: 2,
                          }}
                        >
                          {formatPriceVND(item.price * item.quantity)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Paper>
          </Box>

          {/* Right Column - Order Total */}
          <Box sx={{ width: { xs: '100%', md: 400 }, flexShrink: 0 }}>
            <Paper 
              elevation={0}
              sx={{ 
                p: { xs: 3, md: 4 }, 
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 0,
                bgcolor: '#fafafa',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  fontWeight: 600,
                  mb: 3,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                Tổng đơn hàng
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ fontSize: '0.875rem' }}
                  >
                    Tạm tính ({checkoutItems.reduce((sum, item) => sum + item.quantity, 0)} sản phẩm)
                  </Typography>
                  <Typography 
                    variant="body2"
                    sx={{ fontWeight: 500, fontSize: '0.875rem' }}
                  >
                    {formatPriceVND(total)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ fontSize: '0.875rem' }}
                  >
                    Vận chuyển
                  </Typography>
                  <Typography 
                    variant="body2"
                    sx={{ fontWeight: 500, fontSize: '0.875rem', color: '#000' }}
                  >
                    Miễn phí
                  </Typography>
                </Box>
                <Divider sx={{ my: 2.5 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600,
                      fontSize: { xs: '1rem', md: '1.125rem' },
                    }}
                  >
                    Tổng cộng
                  </Typography>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600,
                      fontSize: { xs: '1rem', md: '1.125rem' },
                    }}
                  >
                    {formatPriceVND(total)}
                  </Typography>
                </Box>
                <Typography 
                  variant="caption" 
                  color="text.secondary"
                  sx={{ 
                    display: 'block',
                    fontSize: '0.75rem',
                    mt: 1,
                  }}
                >
                  Giao hàng & Đổi trả miễn phí
                </Typography>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading || checkoutItems.length === 0}
                sx={{
                  bgcolor: '#000',
                  color: '#fff',
                  borderRadius: 0,
                  py: 1.5,
                  fontSize: '0.875rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  mb: 2,
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: '#333',
                  },
                  '&:disabled': {
                    bgcolor: '#ccc',
                    color: '#666',
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={20} color="inherit" />
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
                  py: 1,
                  '&:hover': {
                    color: '#000',
                    bgcolor: 'transparent',
                    textDecoration: 'underline',
                  },
                }}
              >
                Quay lại giỏ hàng
              </Button>
            </Paper>
          </Box>
        </Box>
      </form>
    </Container>
  );
};

export default CheckoutPage;

