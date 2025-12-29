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
  Snackbar,
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
    id: 101,
    name: 'Jewelry Care Kit',
    price: 850000,
    image: 'https://picsum.photos/seed/jewelry1/300/300',
  },
  {
    id: 102,
    name: 'Jewelry Polishing Cloth',
    price: 450000,
    image: 'https://picsum.photos/seed/jewelry2/300/300',
  },
  {
    id: 103,
    name: 'Leather Care Kit',
    price: 1200000,
    image: 'https://picsum.photos/seed/jewelry3/300/300',
  },
  {
    id: 104,
    name: 'Silver Polishing Cloth',
    price: 550000,
    image: 'https://picsum.photos/seed/jewelry4/300/300',
  },
  {
    id: 105,
    name: 'Premium Care Set',
    price: 1500000,
    image: 'https://picsum.photos/seed/jewelry5/300/300',
  },
];

// Component: Product Card cho recommended products - Enhanced with Tiffany-style animations
const ProductCard = ({ product, index = 0, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('Adding to cart:', product);
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      console.log('onAddToCart is undefined!');
    }
  };

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
            onClick={handleAddToCart}
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

// Component: Recommended Products Section - Horizontal Scroll (5 products max)
const RecommendedSection = ({ onAddToCart }) => {
  // Limit to 5 products
  const displayProducts = recommendedProducts.slice(0, 5);

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

        {/* Horizontal Scroll Container */}
        <Box
          sx={{
            display: 'flex',
            gap: { xs: 2, md: 3 },
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            pb: 2,
            // Hide scrollbar but keep functionality
            '&::-webkit-scrollbar': {
              height: 6,
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#ddd',
              borderRadius: 3,
              '&:hover': {
                background: '#0ABAB5',
              },
            },
          }}
        >
          {displayProducts.map((product, index) => (
            <Fade in timeout={300 + index * 100} key={product.id}>
              <Box
                sx={{
                  flex: '0 0 auto',
                  width: { xs: 'calc(50% - 8px)', sm: 'calc(33.33% - 12px)', md: 'calc(20% - 12px)' },
                  minWidth: 180,
                  scrollSnapAlign: 'start',
                }}
              >
                <ProductCard product={product} index={index} onAddToCart={onAddToCart} />
              </Box>
            </Fade>
          ))}
        </Box>
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
      <Box sx={{ display: 'flex', gap: 2 }}>
        {/* Product Image */}
        <Box
          sx={{
            width: { xs: 100, sm: 120, md: 140 },
            flexShrink: 0,
          }}
        >
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
                display: 'block',
              }}
            />
          </Box>
        </Box>

        {/* Product Details + Price */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Top row: Name + Price */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              mb: 1.5,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'serif',
                fontSize: { xs: '0.9rem', md: '1rem' },
                fontWeight: 400,
                flex: 1,
                pr: 2,
              }}
            >
              {item.name}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'serif',
                fontWeight: 400,
                fontSize: { xs: '0.9rem', md: '1rem' },
                whiteSpace: 'nowrap',
              }}
            >
              {(item.price * item.quantity).toLocaleString('vi-VN')} VNĐ
            </Typography>
          </Box>

          {/* Quantity Selector */}
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
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
              mb: 1.5,
            }}
          >
            Complimentary Standard Delivery
          </Typography>

          {/* Action Links - Simple underline on hover */}
          <Stack direction="row" spacing={2.5} sx={{ mt: 'auto' }}>
            {[
              { label: 'Edit', onClick: () => onEdit(item.id) },
              { label: 'Save for Later', onClick: () => onSaveForLater(item.id) },
              { label: 'Delete', onClick: () => onRemove(item.id) },
            ].map((action) => (
              <Typography
                key={action.label}
                component="button"
                onClick={action.onClick}
                sx={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  color: 'text.secondary',
                  p: 0,
                  textDecoration: 'underline',
                  '&:hover': {
                    color: 'text.primary',
                  },
                }}
              >
                {action.label}
              </Typography>
            ))}
          </Stack>
        </Box>
      </Box>
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
        bgcolor: { xs: 'transparent', md: '#f7f7f7' },
        p: { xs: 0, md: 3 },
        borderRadius: 0,
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
            disableGutters
            elevation={0}
            square
            sx={{
              bgcolor: 'transparent',
              border: 'none',
              borderTop: index === 0 ? '1px solid' : 'none',
              borderBottom: '1px solid',
              borderColor: 'divider',
              '&:before': { display: 'none' },
              '&.Mui-expanded': { margin: 0 },
            }}
          >
            <AccordionSummary
              expandIcon={<ChevronDown size={16} />}
              sx={{
                px: 0,
                minHeight: 48,
                '&.Mui-expanded': { minHeight: 48 },
                '& .MuiAccordionSummary-content': {
                  margin: '12px 0',
                  '&.Mui-expanded': { margin: '12px 0' },
                },
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <item.icon size={18} />
                <Typography variant="body2">{item.label}</Typography>
              </Stack>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0, pt: 0, pb: 2 }}>
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
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  // Check login status and fetch cart
  useEffect(() => {
    const checkAuthAndFetchCart = async () => {
      setLoading(true);

      // Check if user is logged in
      // TEMPORARY: Force logged in for testing
      const token = localStorage.getItem('token');

      // For development testing, always set logged in
      setIsLoggedIn(true);

      // Skip the early return to always load cart
      // if (!token) {
      //   setIsLoggedIn(false);
      //   setLoading(false);
      //   return;
      // }

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
    // Find the item and show edit options
    const item = cartItems.find((i) => i.id === itemId);
    if (item) {
      // TODO: In production, open a modal or navigate to product page
      alert(`Edit: ${item.name}\nPrice: ${item.price.toLocaleString('vi-VN')} VNĐ\nQuantity: ${item.quantity}`);
    }
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
                    {/* Cart Items - 67% width */}
                    <Grid size={{ xs: 12, md: 8 }}>
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

                    {/* Order Summary - 33% width */}
                    <Grid size={{ xs: 12, md: 4 }}>
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
          {isLoggedIn && (
            <RecommendedSection
              onAddToCart={(product) => {
                console.log('onAddToCart called with:', product);
                // Add product to cart
                setCartItems((prev) => {
                  const existing = prev.find((i) => i.id === product.id);
                  if (existing) {
                    // Increase quantity if already exists
                    setSnackbar({
                      open: true,
                      message: `Increased quantity of "${product.name}" to ${existing.quantity + 1}`
                    });
                    return prev.map((i) =>
                      i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
                    );
                  }
                  // Add new item to end of list
                  setSnackbar({
                    open: true,
                    message: `"${product.name}" added to cart!`
                  });
                  return [...prev, { ...product, quantity: 1 }];
                });
              }}
            />
          )}
        </>
      )}

      {/* Snackbar notification for add to cart */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity="success"
          sx={{
            width: '100%',
            bgcolor: '#000',
            color: '#fff',
            '& .MuiAlert-icon': { color: '#0ABAB5' },
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Cart;
