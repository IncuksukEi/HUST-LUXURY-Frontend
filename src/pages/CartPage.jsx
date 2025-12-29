import React from 'react';
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
} from '@mui/material';
import { ArrowLeft, Plus, Minus, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const TIFFANY_BLUE = '#81d8d0';

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, getTotal, clearCart } = useCart();

  const formatPrice = (price) => {
    // price is in VND, convert to USD for display
    const priceInUSD = price / 25000;
    return `$${priceInUSD.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

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
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            sx={{ border: '1px solid #ddd', width: 32, height: 32 }}
                          >
                            <Minus size={14} />
                          </IconButton>
                          <Typography variant="body2" sx={{ minWidth: 40, textAlign: 'center' }}>
                            {item.quantity}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            sx={{ border: '1px solid #ddd', width: 32, height: 32 }}
                          >
                            <Plus size={14} />
                          </IconButton>
                        </Box>
                      </Box>
                      <Box sx={{ textAlign: 'right', ml: 2 }}>
                        <IconButton
                          size="small"
                          onClick={() => removeFromCart(item.id)}
                          sx={{ color: 'text.secondary', mb: 1 }}
                        >
                          <X size={18} />
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
              onClick={clearCart}
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
              }}
            >
              Clear Cart
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage;

