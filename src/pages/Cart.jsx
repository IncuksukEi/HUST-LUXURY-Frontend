import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Alert,
  Snackbar,
  Checkbox,
  Fade,
  Slide,
} from '@mui/material';
import {
  X,
  ChevronDown,
  ChevronRight,
  ArrowLeft,
  Truck,
  CreditCard,
  Wrench,
  Info,
  Plus,
  Minus,
} from 'lucide-react';
import axiosClient from '../api/axiosClient';
import { useWishlist } from '../hooks/useWishlist';

// Component: Product Card cho recommended products - Enhanced with Tiffany-style animations
const ProductCard = ({ product, onAddToCart }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleProductClick = () => {
    navigate(`/jewelry/product/${product.id}`);
  };

  return (
    <Card
      elevation={0}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleProductClick}
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
        {/* Quick Add Button - Always visible for better UX */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            p: 1.5,
            zIndex: 10, // Ensure button is above all layers
            opacity: isHovered ? 1 : 0.9,
            transform: isHovered ? 'translateY(0)' : 'translateY(0)',
            transition: 'all 0.3s ease',
            pointerEvents: 'auto', // Ensure clicks work
          }}
        >
          <Button
            fullWidth
            size="small"
            variant="contained"
            onClick={handleAddToCart}
            sx={{
              bgcolor: 'rgba(255,255,255,0.95)',
              color: '#000',
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              py: 1,
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
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

// Component: Recommended Products Section - With Navigation Buttons (10 products, show 4 at a time)
const RecommendedSection = ({ products = [], onAddToCart, isLoading = false }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const PRODUCTS_PER_PAGE = 4;
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  
  // Get products for current page
  const startIndex = currentPage * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const displayProducts = products.slice(startIndex, endIndex);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  return (
    <Box sx={{ py: { xs: 4, md: 6 }, bgcolor: '#fafafa' }}>
      <Container maxWidth="xl">
        <Typography
          variant="h5"
          align="center"
          sx={{
            fontStyle: 'italic',
            fontWeight: 400,
            mb: { xs: 3, md: 5 },
            fontSize: { xs: '1.25rem', md: '1.5rem' },
          }}
        >
          Gợi ý cho bạn
        </Typography>

        {/* Loading State */}
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress sx={{ color: '#0ABAB5' }} />
          </Box>
        ) : products.length === 0 ? (
          <Typography align="center" color="text.secondary" sx={{ py: 4 }}>
            Hiện tại không có gợi ý nào.
          </Typography>
        ) : (
          <Box sx={{ position: 'relative' }}>
            {/* Navigation Buttons */}
            {totalPages > 1 && (
              <>
                <IconButton
                  onClick={handlePrevious}
                  disabled={currentPage === 0}
                  sx={{
                    position: 'absolute',
                    left: { xs: -8, md: -16 },
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 2,
                    bgcolor: '#fff',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 0,
                    width: { xs: 36, md: 48 },
                    height: { xs: 36, md: 48 },
                    '&:hover': {
                      bgcolor: '#f5f5f5',
                      borderColor: '#000',
                    },
                    '&:disabled': {
                      opacity: 0.3,
                      cursor: 'not-allowed',
                    },
                    display: { xs: currentPage === 0 ? 'none' : 'flex', md: 'flex' },
                  }}
                >
                  <ArrowLeft size={20} />
                </IconButton>
                <IconButton
                  onClick={handleNext}
                  disabled={currentPage === totalPages - 1}
                  sx={{
                    position: 'absolute',
                    right: { xs: -8, md: -16 },
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 2,
                    bgcolor: '#fff',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 0,
                    width: { xs: 36, md: 48 },
                    height: { xs: 36, md: 48 },
                    '&:hover': {
                      bgcolor: '#f5f5f5',
                      borderColor: '#000',
                    },
                    '&:disabled': {
                      opacity: 0.3,
                      cursor: 'not-allowed',
                    },
                    display: { xs: currentPage === totalPages - 1 ? 'none' : 'flex', md: 'flex' },
                  }}
                >
                  <ChevronRight size={20} />
                </IconButton>
              </>
            )}

            {/* Products Row - 4 products per row */}
            <Box
              sx={{
                display: 'flex',
                gap: { xs: 2, md: 3 },
                overflow: 'hidden',
                position: 'relative',
                width: '100%',
              }}
            >
              {displayProducts.map((product, index) => (
                <Fade in timeout={300 + index * 100} key={product.id}>
                  <Box
                    sx={{
                      flex: '0 0 calc(25% - 9px)',
                      minWidth: 0,
                      maxWidth: 'calc(25% - 9px)',
                      width: 'calc(25% - 9px)',
                    }}
                  >
                    <ProductCard product={product} onAddToCart={onAddToCart} />
                  </Box>
                </Fade>
              ))}
            </Box>

            {/* Page Indicators */}
            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mt: 3 }}>
                {Array.from({ length: totalPages }, (_, i) => (
                  <Box
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    sx={{
                      width: { xs: 8, md: 10 },
                      height: { xs: 8, md: 10 },
                      borderRadius: '50%',
                      bgcolor: currentPage === i ? '#000' : '#ddd',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: currentPage === i ? '#000' : '#999',
                      },
                    }}
                  />
                ))}
              </Box>
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
};

// Component: Cart Item with Checkbox
const CartItem = ({ item, isSelected, onToggleSelect, onQuantityChange, onRemove, onEdit, onSaveForLater, updatingItemId, removingItemId, savingItemId }) => {

  return (
    <Box
      sx={{
        py: 3,
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
        {/* Checkbox for selection */}
        <Checkbox
          checked={isSelected}
          onChange={() => onToggleSelect(item.id)}
          sx={{
            p: 0,
            mt: 0.5,
            color: '#ccc',
            '&.Mui-checked': {
              color: '#81d8d0',
            },
          }}
        />

        {/* Product Image */}
        <Box
          sx={{
            width: { xs: 80, sm: 100, md: 120 },
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
                fontWeight: 400,
                fontSize: { xs: '0.9rem', md: '1rem' },
                whiteSpace: 'nowrap',
              }}
            >
              {(item.price * item.quantity).toLocaleString('vi-VN')} VNĐ
            </Typography>
          </Box>

          {/* Quantity Selector */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
              Số lượng
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                size="small"
                onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1 || updatingItemId === item.id}
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
                  opacity: updatingItemId === item.id ? 0.6 : 1,
                }}
              >
                {updatingItemId === item.id ? (
                  <CircularProgress size={14} />
                ) : (
                  item.quantity
                )}
              </Typography>
              <IconButton
                size="small"
                onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                disabled={item.quantity >= 10 || updatingItemId === item.id}
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
                <Plus size={14} />
              </IconButton>
            </Box>
          </Box>

          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontSize: '0.8rem',
              mb: 1.5,
            }}
          >
            Giao hàng tiêu chuẩn miễn phí
          </Typography>

          {/* Action Links - Simple underline on hover */}
          <Stack direction="row" spacing={2.5} sx={{ mt: 'auto' }}>
            {[
              { label: 'Chỉnh sửa', onClick: () => onEdit(item.id), disabled: false },
              { 
                label: savingItemId === item.id ? 'Đang lưu...' : 'Lưu để sau', 
                onClick: () => onSaveForLater(item), 
                disabled: savingItemId === item.id 
              },
              { 
                label: removingItemId === item.id ? 'Đang xóa...' : 'Xóa', 
                onClick: () => onRemove(item.id), 
                disabled: removingItemId === item.id 
              },
            ].map((action) => (
              <Typography
                key={action.label}
                component="button"
                onClick={action.onClick}
                disabled={action.disabled}
                sx={{
                  background: 'none',
                  border: 'none',
                  cursor: action.disabled ? 'not-allowed' : 'pointer',
                  fontSize: '0.8rem',
                  color: action.disabled ? 'text.disabled' : 'text.secondary',
                  p: 0,
                  textDecoration: 'underline',
                  opacity: action.disabled ? 0.5 : 1,
                  '&:hover': {
                    color: action.disabled ? 'text.disabled' : 'text.primary',
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
const OrderSummary = ({ subtotal, shipping, tax, total, selectedCount, onCheckout }) => {

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
          <Typography variant="body2">Tạm tính ({selectedCount} sản phẩm)</Typography>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {subtotal.toLocaleString('vi-VN')} VNĐ
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2">Giao hàng tiêu chuẩn miễn phí</Typography>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {shipping === 0 ? 'Miễn phí' : `${shipping.toLocaleString('vi-VN')} VNĐ`}
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
              Thuế và các phương thức vận chuyển khác
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 0 }}>
            <Typography variant="caption" color="text.secondary">
              Vận chuyển nhanh có sẵn khi thanh toán
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Stack>

      <Divider sx={{ my: 2 }} />

      {/* Total */}
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Tổng ước tính
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {total.toLocaleString('vi-VN')} VNĐ
        </Typography>
      </Stack>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 3, display: 'block' }}>
        Giao hàng & Đổi trả miễn phí
      </Typography>

      {/* Checkout Buttons */}
      <Stack spacing={2}>
        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={onCheckout}
          disabled={selectedCount === 0}
          sx={{
            py: 1.5,
            bgcolor: '#000',
            color: '#fff',
            borderRadius: 0,
            fontSize: '0.875rem',
            letterSpacing: '0.1em',
            '&:hover': { bgcolor: '#333' },
            '&:disabled': { bgcolor: '#ccc', color: '#666' },
          }}
        >
          THANH TOÁN ({selectedCount})
        </Button>
        <Button
          fullWidth
          variant="outlined"
          size="large"
          disabled={selectedCount === 0}
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
          { icon: Truck, label: 'Giao hàng & Đổi trả' },
          { icon: CreditCard, label: 'Các loại thanh toán được chấp nhận' },
          { icon: Wrench, label: 'Chăm sóc & Sửa chữa sản phẩm' },
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
                Chi tiết về {item.label.toLowerCase()}...
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
            sx={{ fontWeight: 600, mb: 0.5 }}
          >
            Hộp Xanh Đặc Trưng®
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Mỗi giao dịch mua đều được đựng trong Hộp Xanh đặc trưng của chúng tôi với dải ruy băng trắng.
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
            fontStyle: 'italic',
            fontWeight: 400,
            mb: 4,
            fontSize: { xs: '1.25rem', md: '1.5rem' },
          }}
        >
          Giỏ hàng <Typography component="span" sx={{ color: 'text.secondary' }}>(0)</Typography>
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Giỏ hàng của bạn đang trống
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
            ĐĂNG NHẬP HOẶC TẠO TÀI KHOẢN
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
          Vui lòng đăng nhập để xem giỏ hàng
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
  const { addToWishlist } = useWishlist();

  // State
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [recommendedLoading, setRecommendedLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]); // For checkout selection like Shopee
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [savingItemId, setSavingItemId] = useState(null);

  // Fetch cart items from API
  const fetchCart = async () => {
    try {
      const response = await axiosClient.get('/cart');
      // Map API response to component format
      const items = response.data.map((item) => ({
        id: item.productId,
        name: item.name,
        description: item.description,
        price: item.price,
        quantity: item.quantity,
        image: item.urlImg,
      }));
      setCartItems(items);
      // Select all items by default
      setSelectedItems(items.map((item) => item.id));
    } catch (err) {
      console.error('Error fetching cart:', err);
      if (err.response?.status === 401) {
        setIsLoggedIn(false);
      } else {
        setError('Không thể tải giỏ hàng. Vui lòng thử lại.');
      }
    }
  };

  // Load recommended products from API (GET /api/products)
  const loadRecommendedProducts = async () => {
    try {
      const response = await axiosClient.get('/products');

      // API returns: [{ productId, name, description, urlImg, price }, ...]
      const products = response.data.slice(0, 10).map((product) => ({
        id: product.productId,
        name: product.name,
        price: product.price, // Number from API
        image: product.urlImg,
        description: product.description,
      }));

      setRecommendedProducts(products);
    } catch (err) {
      console.error('Error fetching recommended products:', err);
      // Leave empty on error - no fallback
    } finally {
      setRecommendedLoading(false);
    }
  };

  // Check login status and fetch cart
  useEffect(() => {
    const checkAuthAndFetchCart = async () => {
      setLoading(true);

      // Load recommended products immediately (local data)
      loadRecommendedProducts();

      const token = localStorage.getItem('token');

      if (!token) {
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }

      setIsLoggedIn(true);

      try {
        await fetchCart();
      } catch (err) {
        console.error('Error loading cart data:', err);
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

  // Toggle item selection for checkout
  const handleToggleSelect = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  // Select/Deselect all items
  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.id));
    }
  };

  // Update quantity via API
  const [updatingItemId, setUpdatingItemId] = useState(null);

  const handleQuantityChange = async (itemId, newQuantity) => {
    // Ensure newQuantity is a number
    const quantity = typeof newQuantity === 'string' ? parseInt(newQuantity, 10) : Number(newQuantity);
    
    if (isNaN(quantity) || quantity < 1) return;

    const oldItems = [...cartItems];
    setUpdatingItemId(itemId);

    // Optimistic update
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: quantity } : item
      )
    );

    try {
      // API docs: [{ "product_id": 1, "quantity": 5 }]
      const requestBody = [
        { product_id: itemId, quantity: quantity }
      ];
      
      await axiosClient.post('/cart/update', requestBody);
      
      // Refresh cart to ensure sync
      await fetchCart();
      
      setSnackbar({
        open: true,
        message: 'Đã cập nhật số lượng thành công',
        severity: 'success'
      });
    } catch (err) {
      console.error('Error updating quantity:', err);
      console.error('Request body:', [{ product_id: itemId, quantity: quantity }]);
      console.error('Error response:', err.response?.data);
      
      // Rollback on error
      setCartItems(oldItems);
      
      let errorMessage = 'Không thể cập nhật số lượng. Vui lòng thử lại.';
      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.';
          localStorage.removeItem('token');
          setTimeout(() => navigate('/login'), 1500);
        } else if (err.response.status === 400) {
          errorMessage = err.response.data?.message || 'Dữ liệu không hợp lệ.';
        } else if (err.response.status === 500) {
          errorMessage = 'Lỗi server. Vui lòng thử lại sau.';
        } else {
          errorMessage = err.response.data?.message || `Lỗi ${err.response.status}: ${err.response.statusText}`;
        }
      } else if (err.request) {
        errorMessage = 'Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.';
      }
      
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: 'error'
      });
    } finally {
      setUpdatingItemId(null);
    }
  };

  // Remove item via API
  const [removingItemId, setRemovingItemId] = useState(null);

  const handleRemoveItem = async (itemId) => {
    const oldItems = [...cartItems];
    setRemovingItemId(itemId);

    // Optimistic update
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    setSelectedItems((prev) => prev.filter((id) => id !== itemId));

    try {
      await axiosClient.delete(`/cart/delete/${itemId}`);
      
      // Refresh cart to ensure sync
      await fetchCart();
      
      setSnackbar({
        open: true,
        message: 'Item removed from cart',
        severity: 'success'
      });
    } catch (err) {
      console.error('Error removing item:', err);
      // Rollback on error
      setCartItems(oldItems);
      setSelectedItems(oldItems.map(item => item.id));
      
      let errorMessage = 'Không thể xóa sản phẩm. Vui lòng thử lại.';
      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = 'Session expired. Please login again.';
          localStorage.removeItem('token');
          setTimeout(() => navigate('/login'), 1500);
        } else if (err.response.status === 404) {
          errorMessage = 'Item not found in cart.';
        } else if (err.response.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        }
      }
      
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: 'error'
      });
    } finally {
      setRemovingItemId(null);
    }
  };

  // Add to cart via API
  const handleAddToCart = async (product) => {
    // Check if user is logged in first
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

    try {
      // Try with product_id (underscore format)
      const requestBody = {
        product_id: product.id,
        quantity: 1
      };

      await axiosClient.post('/cart/add', requestBody);

      // Refresh cart after adding
      await fetchCart();

      setSnackbar({
        open: true,
        message: `"${product.name}" added to cart!`,
        severity: 'success'
      });
    } catch (err) {
      console.error('Error adding to cart:', err);
      if (err.response?.status === 401) {
        setSnackbar({
          open: true,
          message: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
          severity: 'warning'
        });
        localStorage.removeItem('token');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setSnackbar({
          open: true,
          message: 'Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.',
          severity: 'error'
        });
      }
    }
  };

  const handleEditItem = (itemId) => {
    // Navigate to product detail page to view/edit product details
    navigate(`/jewelry/product/${itemId}`);
  };

  // Save item to wishlist and remove from cart
  const handleSaveForLater = async (item) => {
    setSavingItemId(item.id);
    
    try {
      // Add to wishlist
      addToWishlist({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        description: item.description,
      });
      
      // Remove from cart
      await handleRemoveItem(item.id);
      
      setSnackbar({
        open: true,
        message: `"${item.name}" đã được lưu vào mục đã lưu`,
        severity: 'success'
      });
    } catch (err) {
      console.error('Error saving for later:', err);
      setSnackbar({
        open: true,
        message: 'Không thể lưu sản phẩm. Vui lòng thử lại.',
        severity: 'error'
      });
    } finally {
      setSavingItemId(null);
    }
  };

  // Proceed to checkout with selected items
  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      setSnackbar({
        open: true,
        message: 'Vui lòng chọn ít nhất một sản phẩm để thanh toán',
        severity: 'warning'
      });
      return;
    }

    // Store selected items in sessionStorage for checkout page
    const checkoutItems = cartItems.filter((item) => selectedItems.includes(item.id));
    sessionStorage.setItem('checkoutItems', JSON.stringify(checkoutItems));

    navigate('/checkout');
  };

  // Calculate totals for selected items only
  const selectedCartItems = cartItems.filter((item) => selectedItems.includes(item.id));
  const selectedCount = selectedCartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = selectedCartItems.reduce(
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
                      fontStyle: 'italic',
                      fontWeight: 400,
                      mb: { xs: 3, md: 5 },
                      fontSize: { xs: '1.25rem', md: '1.5rem' },
                    }}
                  >
                    Giỏ hàng{' '}
                    <Typography component="span" sx={{ color: 'text.secondary' }}>
                      ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                    </Typography>
                  </Typography>

                  <Grid container spacing={{ xs: 2, md: 4 }}>
                    {/* Cart Items - 67% width */}
                    <Grid size={{ xs: 12, md: 8 }}>
                      {/* Select All Header */}
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          pb: 2,
                          borderBottom: '1px solid',
                          borderColor: 'divider',
                        }}
                      >
                        <Checkbox
                          checked={selectedItems.length === cartItems.length && cartItems.length > 0}
                          indeterminate={selectedItems.length > 0 && selectedItems.length < cartItems.length}
                          onChange={handleSelectAll}
                          sx={{
                            p: 0,
                            color: '#ccc',
                            '&.Mui-checked, &.MuiCheckbox-indeterminate': {
                              color: '#81d8d0',
                            },
                          }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          Chọn tất cả ({cartItems.length} sản phẩm)
                        </Typography>
                      </Box>

                      <Box>
                        {cartItems.map((item) => (
                          <CartItem
                            key={item.id}
                            item={item}
                            isSelected={selectedItems.includes(item.id)}
                            onToggleSelect={handleToggleSelect}
                            onQuantityChange={handleQuantityChange}
                            onRemove={handleRemoveItem}
                            onEdit={handleEditItem}
                            onSaveForLater={handleSaveForLater}
                            updatingItemId={updatingItemId}
                            removingItemId={removingItemId}
                            savingItemId={savingItemId}
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
                        selectedCount={selectedCount}
                        onCheckout={handleCheckout}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Slide>
            )}
          </Container>

          {/* Recommended Products Section - Always show */}
          <RecommendedSection
            products={recommendedProducts}
            onAddToCart={handleAddToCart}
            isLoading={recommendedLoading}
          />
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
            '& .MuiAlert-icon': { color: snackbar.severity === 'success' ? '#0ABAB5' : '#fff' },
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Cart;
