import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Divider,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Stack,
  Select,
  MenuItem,
  FormControl,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Alert,
  useTheme,
  useMediaQuery,
  Fade,
  Slide,
  Grow,
  Zoom,
} from '@mui/material';
import {
  X,
  ChevronDown,
  Truck,
  CreditCard,
  Wrench,
  Info,
} from 'lucide-react';

// Mock data cho recommended products
const recommendedProducts = [
  {
    id: 1,
    name: 'Jewelry Care Kit',
    price: 850000,
    image: 'https://via.placeholder.com/300x300/81D8D0/fff?text=Care+Kit',
  },
  {
    id: 2,
    name: 'Jewelry Polishing Cloth',
    price: 450000,
    image: 'https://via.placeholder.com/300x300/0ABAB5/fff?text=Polish+Cloth',
  },
  {
    id: 3,
    name: 'Leather Care Kit',
    price: 1200000,
    image: 'https://via.placeholder.com/300x300/81D8D0/fff?text=Leather+Kit',
  },
  {
    id: 4,
    name: 'Silver Polishing Cloth',
    price: 550000,
    image: 'https://via.placeholder.com/300x300/0ABAB5/fff?text=Silver+Cloth',
  },
  {
    id: 5,
    name: 'Premium Care Set',
    price: 1500000,
    image: 'https://via.placeholder.com/300x300/81D8D0/fff?text=Premium+Set',
  },
];

// Component: Product Card cho recommended products - Enhanced with Tiffany-style animations
const ProductCard = ({ product, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      elevation={0}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        bgcolor: 'transparent',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        '&:hover': {
          boxShadow: '0 12px 40px rgba(10, 186, 181, 0.15)',
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 1,
          bgcolor: '#E8F5F4',
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.03), transparent)',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
          },
        }}
      >
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{
            aspectRatio: '1/1',
            objectFit: 'cover',
            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: isHovered ? 'scale(1.08)' : 'scale(1)',
          }}
        />
        {/* Quick Add Button - Tiffany style */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            p: 1.5,
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.3s ease',
          }}
        >
          <Button
            fullWidth
            size="small"
            sx={{
              bgcolor: 'rgba(255,255,255,0.95)',
              color: '#000',
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              py: 1,
              '&:hover': {
                bgcolor: '#000',
                color: '#fff',
              },
            }}
          >
            ADD TO CART
          </Button>
        </Box>
      </Box>
      <CardContent sx={{ px: 0, pt: 2 }}>
        <Typography
          variant="body2"
          sx={{
            fontFamily: 'serif',
            fontSize: '0.875rem',
            color: 'text.primary',
            mb: 0.5,
            transition: 'color 0.3s ease',
            '&:hover': { color: '#0ABAB5' },
          }}
        >
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontFamily: 'serif',
            fontSize: '0.875rem',
            color: 'text.secondary',
          }}
        >
          {product.price.toLocaleString('vi-VN')} VNĐ
        </Typography>
      </CardContent>
    </Card>
  );
};

// Component: Recommended Products Section
const RecommendedSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ py: { xs: 4, md: 6 }, bgcolor: '#fafafa' }}>
      <Container maxWidth="xl">
        <Typography
          variant="h5"
          align="center"
          sx={{
            fontFamily: 'serif',
            fontStyle: 'italic',
            fontWeight: 400,
            mb: { xs: 3, md: 5 },
            fontSize: { xs: '1.25rem', md: '1.5rem' },
          }}
        >
          Recommended for You
        </Typography>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {recommendedProducts.slice(0, isMobile ? 2 : isTablet ? 3 : 5).map((product, index) => (
            <Fade in timeout={300 + index * 100} key={product.id}>
              <Grid item xs={6} sm={4} md={2.4}>
                <ProductCard product={product} />
              </Grid>
            </Fade>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

// Component: Cart Item
const CartItem = ({ item, onQuantityChange, onRemove, onEdit, onSaveForLater }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        py: 3,
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Grid container spacing={2}>
        {/* Product Image */}
        <Grid item xs={3} sm={2}>
          <Box
            sx={{
              bgcolor: '#E8F5F4',
              borderRadius: 1,
              overflow: 'hidden',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: '100%',
                aspectRatio: '1/1',
                objectFit: 'cover',
              }}
            />
          </Box>
        </Grid>

        {/* Product Details */}
        <Grid item xs={9} sm={10}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'serif',
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  fontWeight: 400,
                  mb: 1,
                }}
              >
                {item.name}
              </Typography>

              {/* Quantity Selector */}
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
                <Typography variant="body2" color="text.secondary">
                  Qty
                </Typography>
                <FormControl size="small" variant="standard">
                  <Select
                    value={item.quantity}
                    onChange={(e) => onQuantityChange(item.id, e.target.value)}
                    sx={{
                      fontSize: '0.875rem',
                      '&:before': { borderBottom: 'none' },
                      '&:after': { borderBottom: 'none' },
                      '&:hover:not(.Mui-disabled):before': { borderBottom: 'none' },
                    }}
                    IconComponent={ChevronDown}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <MenuItem key={num} value={num}>
                        {num}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>

              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.8rem',
                  mb: 2,
                }}
              >
                Complimentary Standard Delivery
              </Typography>

              {/* Action Links - Tiffany style with animated underline */}
              <Stack direction="row" spacing={3}>
                <Typography
                  component="button"
                  onClick={() => onEdit(item.id)}
                  sx={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    color: 'text.primary',
                    p: 0,
                    position: 'relative',
                    transition: 'color 0.3s ease',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: '0%',
                      height: '1px',
                      bottom: -2,
                      left: 0,
                      backgroundColor: '#0ABAB5',
                      transition: 'width 0.3s ease-in-out',
                    },
                    '&:hover': {
                      color: '#0ABAB5',
                    },
                    '&:hover::after': {
                      width: '100%',
                    },
                  }}
                >
                  Edit
                </Typography>
                <Typography
                  component="button"
                  onClick={() => onSaveForLater(item.id)}
                  sx={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    color: 'text.primary',
                    p: 0,
                    position: 'relative',
                    transition: 'color 0.3s ease',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: '0%',
                      height: '1px',
                      bottom: -2,
                      left: 0,
                      backgroundColor: '#0ABAB5',
                      transition: 'width 0.3s ease-in-out',
                    },
                    '&:hover': {
                      color: '#0ABAB5',
                    },
                    '&:hover::after': {
                      width: '100%',
                    },
                  }}
                >
                  Save for Later
                </Typography>
                <Typography
                  component="button"
                  onClick={() => onRemove(item.id)}
                  sx={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    color: 'text.primary',
                    p: 0,
                    position: 'relative',
                    transition: 'color 0.3s ease',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: '0%',
                      height: '1px',
                      bottom: -2,
                      left: 0,
                      backgroundColor: '#d32f2f',
                      transition: 'width 0.3s ease-in-out',
                    },
                    '&:hover': {
                      color: '#d32f2f',
                    },
                    '&:hover::after': {
                      width: '100%',
                    },
                  }}
                >
                  Delete
                </Typography>
              </Stack>
            </Box>

            {/* Price */}
            <Box
              sx={{
                textAlign: { xs: 'left', md: 'right' },
                mt: { xs: 2, md: 0 },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'serif',
                  fontWeight: 400,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                }}
              >
                {(item.price * item.quantity).toLocaleString('vi-VN')} VNĐ
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

// Component: Order Summary
const OrderSummary = ({ subtotal, shipping, tax, total }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        bgcolor: { xs: 'transparent', md: '#fafafa' },
        p: { xs: 0, md: 3 },
        borderRadius: 1,
        position: { md: 'sticky' },
        top: { md: 140 },
      }}
    >
      {/* Summary Details */}
      <Stack spacing={2} sx={{ mb: 3 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2">Subtotal</Typography>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {subtotal.toLocaleString('vi-VN')} VNĐ
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2">Complimentary Standard Delivery</Typography>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {shipping === 0 ? 'Free' : `${shipping.toLocaleString('vi-VN')} VNĐ`}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Typography variant="body2">Estimated Tax</Typography>
            <Info size={14} color="#999" />
          </Stack>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {tax > 0 ? `${tax.toLocaleString('vi-VN')} VNĐ` : '-'}
          </Typography>
        </Stack>

        {/* Expandable shipping methods */}
        <Accordion
          elevation={0}
          disableGutters
          sx={{
            bgcolor: 'transparent',
            '&:before': { display: 'none' },
          }}
        >
          <AccordionSummary
            expandIcon={<ChevronDown size={16} />}
            sx={{
              px: 0,
              minHeight: 'auto',
              '& .MuiAccordionSummary-content': { my: 0 },
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Taxes and other shipping methods
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 0 }}>
            <Typography variant="caption" color="text.secondary">
              Express shipping available at checkout
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Stack>

      <Divider sx={{ my: 2 }} />

      {/* Total */}
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Estimated Total
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {total.toLocaleString('vi-VN')} VNĐ
        </Typography>
      </Stack>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 3, display: 'block' }}>
        Complimentary Delivery & Returns
      </Typography>

      {/* Checkout Buttons */}
      <Stack spacing={2}>
        <Button
          fullWidth
          variant="contained"
          size="large"
          component={RouterLink}
          to="/checkout"
          sx={{
            py: 1.5,
            bgcolor: '#000',
            color: '#fff',
            borderRadius: 0,
            fontSize: '0.875rem',
            letterSpacing: '0.1em',
            '&:hover': { bgcolor: '#333' },
          }}
        >
          CHECKOUT
        </Button>
        <Button
          fullWidth
          variant="outlined"
          size="large"
          sx={{
            py: 1.5,
            borderColor: '#ccc',
            color: '#000',
            borderRadius: 0,
            fontSize: '0.875rem',
            '&:hover': { borderColor: '#000', bgcolor: 'transparent' },
          }}
        >
          <img
            src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg"
            alt="PayPal"
            style={{ height: 20, marginRight: 8 }}
          />
          PayPal
        </Button>
      </Stack>

      {/* Info Accordions */}
      <Box sx={{ mt: 4 }}>
        {[
          { icon: Truck, label: 'Delivery & Returns' },
          { icon: CreditCard, label: 'Accepted Payment Types' },
          { icon: Wrench, label: 'Product Care & Repair' },
        ].map((item, index) => (
          <Accordion
            key={index}
            elevation={0}
            disableGutters
            sx={{
              bgcolor: 'transparent',
              borderBottom: '1px solid',
              borderColor: 'divider',
              '&:before': { display: 'none' },
            }}
          >
            <AccordionSummary
              expandIcon={<ChevronDown size={16} />}
              sx={{
                px: 0,
                '& .MuiAccordionSummary-content': { my: 1.5 },
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <item.icon size={18} />
                <Typography variant="body2">{item.label}</Typography>
              </Stack>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0 }}>
              <Typography variant="caption" color="text.secondary">
                Details about {item.label.toLowerCase()}...
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      {/* Tiffany Blue Box Banner */}
      <Box
        sx={{
          mt: 4,
          p: 2,
          bgcolor: '#E8F5F4',
          borderRadius: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Box
          sx={{
            width: 60,
            height: 60,
            bgcolor: '#0ABAB5',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Typography
            sx={{
              color: 'white',
              fontFamily: 'serif',
              fontWeight: 600,
              fontSize: '0.6rem',
              textAlign: 'center',
            }}
          >
            HUST<br />LUXURY
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="body2"
            sx={{ fontFamily: 'serif', fontWeight: 600, mb: 0.5 }}
          >
            The Signature Blue Box®
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Every purchase comes in our iconic Blue Box® crowned with a white ribbon.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

// Component: Empty Cart View
const EmptyCartView = ({ isLoggedIn, onSignIn }) => {
  return (
    <Fade in timeout={500}>
      <Box sx={{ textAlign: 'center', py: { xs: 6, md: 10 } }}>
        <Typography
          variant="h5"
          sx={{
            fontFamily: 'serif',
            fontStyle: 'italic',
            fontWeight: 400,
            mb: 4,
            fontSize: { xs: '1.25rem', md: '1.5rem' },
          }}
        >
          Shopping Cart <Typography component="span" sx={{ color: 'text.secondary' }}>(0)</Typography>
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Your Shopping Cart is Empty
        </Typography>

        {!isLoggedIn && (
          <Button
            variant="outlined"
            size="large"
            onClick={onSignIn}
            sx={{
              px: 6,
              py: 1.5,
              borderColor: '#000',
              color: '#000',
              borderRadius: 0,
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              '&:hover': {
                borderColor: '#000',
                bgcolor: '#f5f5f5',
              },
            }}
          >
            SIGN IN OR CREATE AN ACCOUNT
          </Button>
        )}
      </Box>
    </Fade>
  );
};

// Component: Not Logged In View
const NotLoggedInView = ({ onSignIn }) => {
  return (
    <Fade in timeout={500}>
      <Box sx={{ textAlign: 'center', py: { xs: 6, md: 10 } }}>
        <Typography
          variant="h5"
          sx={{
            fontFamily: 'serif',
            fontStyle: 'italic',
            fontWeight: 400,
            mb: 4,
            fontSize: { xs: '1.25rem', md: '1.5rem' },
          }}
        >
          Shopping Cart
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Please sign in to view your cart
        </Typography>

        <Button
          variant="outlined"
          size="large"
          onClick={onSignIn}
          sx={{
            px: 6,
            py: 1.5,
            borderColor: '#000',
            color: '#000',
            borderRadius: 0,
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            '&:hover': {
              borderColor: '#000',
              bgcolor: '#f5f5f5',
            },
          }}
        >
          SIGN IN OR CREATE AN ACCOUNT
        </Button>
      </Box>
    </Fade>
  );
};

// Main Cart Component
function Cart() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // State
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState('');

  // Check login status and fetch cart
  useEffect(() => {
    const checkAuthAndFetchCart = async () => {
      setLoading(true);

      // Check if user is logged in
      const token = localStorage.getItem('token');

      if (!token) {
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }

      setIsLoggedIn(true);

      // TODO: Fetch cart items from API
      // For now, using mock data
      try {
        // Simulating API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Mock cart data - set to empty array for empty cart, or add items
        const mockCartItems = [
          {
            id: 1,
            name: 'HUST LUXURY Leather Care Kit with Cloth and Spray',
            price: 1200000,
            quantity: 1,
            image: 'https://via.placeholder.com/150x150/81D8D0/fff?text=Care+Kit',
          },
        ];

        setCartItems(mockCartItems);
      } catch (err) {
        console.error('Error fetching cart:', err);
        setError('Unable to load cart. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetchCart();
  }, []);

  // Handlers
  const handleSignIn = () => {
    navigate('/login');
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleEditItem = (itemId) => {
    // Navigate to product page or open edit modal
    console.log('Edit item:', itemId);
  };

  const handleSaveForLater = (itemId) => {
    // Move item to saved items
    console.log('Save for later:', itemId);
    handleRemoveItem(itemId);
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0; // Complimentary
  const tax = 0; // Will be calculated at checkout
  const total = subtotal + shipping + tax;

  // Determine cart state
  const hasItems = cartItems.length > 0;

  return (
    <Box
      sx={{
        minHeight: '60vh',
        bgcolor: '#fff',
      }}
    >
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 400,
            }}
          >
            <CircularProgress sx={{ color: '#0ABAB5' }} />
          </Box>
        ) : (
          <>
            {error && (
              <Container maxWidth="xl" sx={{ mt: 4 }}>
                <Alert severity="error">{error}</Alert>
              </Container>
            )}

            <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
              {!isLoggedIn ? (
                // Not logged in view
                <NotLoggedInView onSignIn={handleSignIn} />
              ) : !hasItems ? (
                // Empty cart view
                <EmptyCartView isLoggedIn={isLoggedIn} onSignIn={handleSignIn} />
              ) : (
                // Cart with items
                <Slide direction="up" in timeout={400}>
                  <Box>
                    <Typography
                      variant="h5"
                      align="center"
                      sx={{
                        fontFamily: 'serif',
                        fontStyle: 'italic',
                        fontWeight: 400,
                        mb: { xs: 3, md: 5 },
                        fontSize: { xs: '1.25rem', md: '1.5rem' },
                      }}
                    >
                      Shopping Cart{' '}
                      <Typography component="span" sx={{ color: 'text.secondary' }}>
                        ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                      </Typography>
                    </Typography>

                    <Grid container spacing={{ xs: 2, md: 4 }}>
                      {/* Cart Items */}
                      <Grid item xs={12} md={7} lg={8}>
                        <Box>
                          {cartItems.map((item) => (
                            <CartItem
                              key={item.id}
                              item={item}
                              onQuantityChange={handleQuantityChange}
                              onRemove={handleRemoveItem}
                              onEdit={handleEditItem}
                              onSaveForLater={handleSaveForLater}
                            />
                          ))}
                        </Box>
                      </Grid>

                      {/* Order Summary */}
                      <Grid item xs={12} md={5} lg={4}>
                        <OrderSummary
                          subtotal={subtotal}
                          shipping={shipping}
                          tax={tax}
                          total={total}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Slide>
              )}
            </Container>

            {/* Recommended Products Section - shown for empty cart or with items */}
            {isLoggedIn && <RecommendedSection />}
          </>
        )}
    </Box>
  );
}

export default Cart;
