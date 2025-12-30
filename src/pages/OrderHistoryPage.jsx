import React, { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  Alert,
  CircularProgress,
  Button,
  Grid,
  Chip,
} from '@mui/material';
import { ArrowLeft, Package } from 'lucide-react';
import axiosClient from '../api/axiosClient';

const TIFFANY_BLUE = '#81d8d0';

// Map status to color
const getStatusColor = (status) => {
  switch (status?.toUpperCase()) {
    case 'PENDING':
      return 'warning';
    case 'CONFIRMED':
      return 'info';
    case 'SHIPPED':
      return 'primary';
    case 'DELIVERED':
      return 'success';
    case 'CANCELLED':
      return 'error';
    default:
      return 'default';
  }
};

// Map status to Vietnamese
const getStatusLabel = (status) => {
  switch (status?.toUpperCase()) {
    case 'PENDING':
      return 'Đang chờ xử lý';
    case 'CONFIRMED':
      return 'Đã xác nhận';
    case 'SHIPPED':
      return 'Đang giao hàng';
    case 'DELIVERED':
      return 'Đã giao hàng';
    case 'CANCELLED':
      return 'Đã hủy';
    default:
      return status || 'Unknown';
  }
};

// Format price from VND to USD
const formatPrice = (price) => {
  const priceInUSD = price / 25000;
  return `$${priceInUSD.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

// Format date
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const OrderHistoryPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Kiểm tra đăng nhập
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await axiosClient.get('/orders');
      
      if (!Array.isArray(response.data)) {
        throw new Error('Invalid response format: expected array');
      }
      
      // Sort orders by orderTime (newest first)
      const sortedOrders = response.data.sort((a, b) => {
        const dateA = new Date(a.orderTime);
        const dateB = new Date(b.orderTime);
        return dateB - dateA;
      });
      
      setOrders(sortedOrders);
    } catch (err) {
      console.error('Fetch orders error:', err);
      
      let errorMessage = 'Không thể tải lịch sử đơn hàng. Vui lòng thử lại!';
      
      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!';
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        } else if (err.response.status === 404) {
          errorMessage = 'Không tìm thấy đơn hàng nào.';
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

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 10, textAlign: 'center' }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Button
          startIcon={<ArrowLeft size={20} />}
          onClick={() => navigate(-1)}
          sx={{
            color: '#000',
            borderColor: '#000',
            '&:hover': {
              borderColor: TIFFANY_BLUE,
              color: TIFFANY_BLUE,
            },
          }}
        >
          Quay lại
        </Button>
      </Container>
    );
  }

  if (orders.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 } }}>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Package size={64} strokeWidth={1} color="#ccc" style={{ margin: '0 auto 24px', display: 'block' }} />
          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Times New Roman", Times, serif',
              fontSize: { xs: '1.5rem', md: '2rem' },
              fontWeight: 400,
              mb: 2,
            }}
          >
            Lịch sử đơn hàng
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '0.875rem', md: '1rem' },
              mb: 4,
            }}
          >
            Bạn chưa đặt đơn hàng nào.
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
            Bắt đầu mua sắm
          </Button>
        </Box>
      </Container>
    );
  }

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
          Lịch sử đơn hàng
        </Typography>
      </Box>

      {/* Orders List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {orders.map((order) => (
          <Paper key={order.orderId} sx={{ p: { xs: 3, md: 4 } }}>
            {/* Order Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, flexWrap: 'wrap', gap: 2 }}>
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Đơn hàng #{order.orderId}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(order.orderTime)}
                </Typography>
              </Box>
              <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                <Chip
                  label={getStatusLabel(order.status)}
                  color={getStatusColor(order.status)}
                  size="small"
                  sx={{ mb: 1 }}
                />
                <Typography variant="h6" sx={{ fontWeight: 600, mt: 1 }}>
                  {formatPrice(order.totalPrice)}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Shipping Address */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontWeight: 600 }}>
                Địa chỉ giao hàng:
              </Typography>
              <Typography variant="body2">
                {order.orderAddress}
              </Typography>
            </Box>

            {/* Products */}
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontWeight: 600 }}>
                Products ({order.products?.length || 0}):
              </Typography>
              <Grid container spacing={2}>
                {order.products?.map((product, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Box
                        component="img"
                        src={product.urlImg}
                        alt={product.name}
                        sx={{
                          width: 80,
                          height: 80,
                          objectFit: 'cover',
                          bgcolor: '#f5f5f5',
                          flexShrink: 0,
                        }}
                      />
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
                          {product.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                          {product.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Số lượng: {product.quantity} × {formatPrice(product.price)}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Paper>
        ))}
      </Box>
    </Container>
  );
};

export default OrderHistoryPage;

