import React, { useState, useRef } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Typography,
  IconButton,
  Button,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Stack,
  InputBase,
  useScrollTrigger,
  Slide,
  useTheme,
  useMediaQuery,
  Link,
  Popper,
  Paper,
  Fade,
  CircularProgress,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  X as CloseIcon,
  Search,
  MapPin,
  MessageCircle,
  Calendar,
  User,
  Heart,
  ShoppingBag,
  ChevronRight,
} from "lucide-react";
import { useWishlist } from "../hooks/useWishlist";
import { useCart } from "../contexts/CartContext";

// --- CẤU HÌNH MENU CHÍNH ---
const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "High Jewelry", href: "/high-jewelry" },
  { label: "Jewelry", href: "/jewelry" },
  { label: "Contact", href: "/contact" },
];

const TIFFANY_BLUE = "#81d8d0";

// --- MOCK DATA (Đã refactor sang dạng Object) ---
const JEWELRY_MENU_DATA = {
  categories: [
    { label: "Necklaces & Pendants", href: "/jewelry/shop/necklaces-pendants" },
    { label: "Earrings", href: "/jewelry/shop/earrings" },
    { label: "Bracelets", href: "/jewelry/shop/bracelets" },
    { label: "Rings", href: "/jewelry/shop/rings" },
    { label: "Brooches", href: "/jewelry/shop/brooches" },
    { label: "Explore All Jewelry >", href: "/jewelry" }
  ],
  collections: [
    { label: "Tiffany HardWear", href: "/jewelry/shop/tiffany-hardwear" },
    { label: "Tiffany Lock", href: "/jewelry/shop/tiffany-lock" },
    { label: "Tiffany Knot", href: "/jewelry/shop/tiffany-knot" },
    { label: "Tiffany T", href: "/jewelry/shop/tiffany-t" },
    { label: "Bird on a Rock", href: "/jewelry/shop/bird-on-a-rock" },
    { label: "Sixteen Stone", href: "/jewelry/shop/sixteen-stone" },
    { label: "Elsa Peretti™", href: "/jewelry/shop/elsa-peretti" },
    { label: "Return to Tiffany™", href: "/jewelry/shop/return-to-tiffany" },
    { label: "Explore All Jewelry Collections >", href: "/collections" }
  ],
  featured: [
    { label: "New Arrivals", href: "/jewelry/shop/new-jewelry/" },
    { label: "Most Popular Jewelry", href: "/jewelry/shop/most-popular-jewelry/" },
  ],
  image: "/image/NAV_Gifts.webp"
};

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Header = (props) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // --- STATE ---
  const [userAnchorEl, setUserAnchorEl] = useState(null);
  const userTimeoutRef = useRef(null);
  const isUserOpen = Boolean(userAnchorEl);

  // Cart popup state
  const [cartAnchorEl, setCartAnchorEl] = useState(null);
  const cartTimeoutRef = useRef(null);
  const isCartOpen = Boolean(cartAnchorEl);
  const [cartItems, setCartItems] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);

  const [activeMenu, setActiveMenu] = useState(null);
  const menuTimeoutRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const isLoggedIn = !!localStorage.getItem('token');
  const { wishlistCount, wishlist } = useWishlist();
  const { cartCount } = useCart();

  // --- STATE FOR WISHLIST MENU ---
  const [wishlistAnchorEl, setWishlistAnchorEl] = useState(null);
  const wishlistTimeoutRef = useRef(null);
  const isWishlistOpen = Boolean(wishlistAnchorEl);

  // Fetch cart items from API when cart popup opens
  const fetchCartItems = async () => {
    if (!isLoggedIn) return;
    setCartLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/cart`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCartItems(data.slice(0, 3)); // Show max 3 items in preview
      }
    } catch (err) {
      console.error('Error fetching cart:', err);
    } finally {
      setCartLoading(false);
    }
  };


  // --- HANDLERS ---
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleUserClick = () => {
    if (isLoggedIn) navigate('/account');
    else navigate('/login');
  };

  // Wishlist Hover Logic
  const handleWishlistMouseEnter = (event) => {
    if (wishlistTimeoutRef.current) clearTimeout(wishlistTimeoutRef.current);
    setWishlistAnchorEl(event.currentTarget);
  };
  const handleWishlistMouseLeave = () => {
    wishlistTimeoutRef.current = setTimeout(() => setWishlistAnchorEl(null), 200);
  };
  const handleWishlistMenuEnter = () => {
    if (wishlistTimeoutRef.current) clearTimeout(wishlistTimeoutRef.current);
  };
  const handleWishlistMenuLeave = () => {
    wishlistTimeoutRef.current = setTimeout(() => setWishlistAnchorEl(null), 200);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserAnchorEl(null);
    navigate('/');
    window.location.reload(); // Reload để cập nhật isLoggedIn state
  };

  // User Hover Logic
  const handleUserMouseEnter = (event) => {
    if (userTimeoutRef.current) clearTimeout(userTimeoutRef.current);
    setUserAnchorEl(event.currentTarget);
  };
  const handleUserMouseLeave = () => {
    userTimeoutRef.current = setTimeout(() => setUserAnchorEl(null), 200);
  };
  const handleUserMenuEnter = () => {
    if (userTimeoutRef.current) clearTimeout(userTimeoutRef.current);
  };
  const handleUserMenuLeave = () => {
    userTimeoutRef.current = setTimeout(() => setUserAnchorEl(null), 200);
  };

  // Cart Hover Logic
  const handleCartMouseEnter = (event) => {
    if (cartTimeoutRef.current) clearTimeout(cartTimeoutRef.current);
    setCartAnchorEl(event.currentTarget);
    if (isLoggedIn) {
      fetchCartItems();
    }
  };
  const handleCartMouseLeave = () => {
    cartTimeoutRef.current = setTimeout(() => setCartAnchorEl(null), 200);
  };
  const handleCartMenuEnter = () => {
    if (cartTimeoutRef.current) clearTimeout(cartTimeoutRef.current);
  };
  const handleCartMenuLeave = () => {
    cartTimeoutRef.current = setTimeout(() => setCartAnchorEl(null), 200);
  };
  const handleViewCart = () => {
    setCartAnchorEl(null);
    navigate('/cart');
  };

  // Mega Menu Hover Logic
  const handleNavMouseEnter = (menuName) => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    if (menuName === "Jewelry") {
      setActiveMenu("Jewelry");
    } else {
      setActiveMenu(null);
    }
  };

  const handleNavMouseLeave = () => {
    menuTimeoutRef.current = setTimeout(() => setActiveMenu(null), 200);
  };

  const handleMegaMenuEnter = () => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
  };

  const handleMegaMenuLeave = () => {
    menuTimeoutRef.current = setTimeout(() => setActiveMenu(null), 200);
  };

  const drawerContent = (
    <Box sx={{ width: 300, pt: 2, pb: 2, height: "100%", position: "relative" }} role="presentation">
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 3, pb: 2, borderBottom: 1, borderColor: "divider" }}>
        <Typography variant="h6" sx={{ textTransform: "uppercase", letterSpacing: 1 }}>
          Menu
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon size={24} />
        </IconButton>
      </Stack>
      <List>
        {navLinks.map((item) => (
          <ListItem
            key={item.label}
            component={RouterLink}
            to={item.href}
            onClick={handleDrawerToggle}
            sx={{
              py: 2,
              px: 3,
              borderBottom: "1px solid",
              borderColor: "divider",
              color: location.pathname === item.href ? "text.primary" : "text.secondary",
              bgcolor: location.pathname === item.href ? "action.hover" : "transparent",
            }}
          >
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontSize: "0.875rem",
                textTransform: "uppercase",
                letterSpacing: 1,
                fontWeight: location.pathname === item.href ? 700 : 500,
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* --- OVERLAY --- */}
      <Fade in={activeMenu === "Jewelry"}>
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            bgcolor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1200,
            transition: "opacity 0.3s ease",
          }}
        />
      </Fade>

      <HideOnScroll {...props}>
        <AppBar
          position="fixed"
          color="default"
          elevation={0}
          sx={{
            bgcolor: "background.paper",
            boxShadow: "none",
            borderBottom: "none",
            zIndex: 1300,
            pt: 2,
            pb: 2
          }}
        >
          <Container maxWidth="xl">
            <Toolbar
              disableGutters
              sx={{
                height: 50,
                minHeight: "50px !important",
                justifyContent: "space-between",
                position: "relative",
                zIndex: 1400,
              }}
            >
              {/* LEFT */}
              <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, md: 1 }} sx={{ flex: 1, minWidth: 0 }}>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleDrawerToggle}
                  sx={{ display: { lg: "none" }, p: { xs: 0.75 } }}
                >
                  <MenuIcon size={20} strokeWidth={1.5} />
                </IconButton>
                <IconButton 
                  color="inherit" 
                  onClick={() => setSearchOpen(!searchOpen)}
                  sx={{ p: { xs: 0.75 } }}
                >
                  <Search size={18} strokeWidth={1.5} />
                </IconButton>
                <Box sx={{ display: { xs: "none", lg: "flex" }, alignItems: "center", gap: 1.5, ml: 1 }}>
                  <IconButton component={RouterLink} to="/stores" color="inherit" sx={{ p: 0.75 }}>
                    <MapPin size={18} strokeWidth={1.5} />
                  </IconButton>
                  <Button
                    component={RouterLink}
                    to="/contact"
                    startIcon={<MessageCircle size={16} strokeWidth={1.5} />}
                    sx={{
                      display: { xs: "none", xl: "flex" },
                      color: "text.primary",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      letterSpacing: 0.5,
                      px: 1,
                      py: 0.5,
                      "&:hover": { color: TIFFANY_BLUE, bgcolor: "transparent" },
                    }}
                  >
                    Client Care
                  </Button>
                </Box>
              </Stack>

              {/* CENTER: LOGO */}
              <Typography
                variant="h4"
                component={RouterLink}
                to="/"
                sx={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontWeight: "bold",
                  letterSpacing: { xs: 2, md: 4 },
                  textTransform: "uppercase",
                  color: "text.primary",
                  textDecoration: "none",
                  fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                  whiteSpace: "nowrap",
                  zIndex: 1,
                  "&:hover": { color: "text.primary" }
                }}
              >
                MAJewelry
              </Typography>

              {/* RIGHT */}
              <Stack direction="row" alignItems="center" spacing={{ xs: 0, md: 1 }} sx={{ flex: 1, justifyContent: "flex-end", minWidth: 0 }}>
                <Box sx={{ display: { xs: "none", lg: "flex" }, gap: 1 }}>
                  <IconButton component={RouterLink} to="/appointment" color="inherit" sx={{ p: 0.75 }}>
                    <Calendar size={18} strokeWidth={1.5} />
                  </IconButton>

                  {/* User Icon */}
                  <Box
                    sx={{ position: 'relative', display: 'inline-block' }}
                    onMouseLeave={handleUserMouseLeave}
                    onMouseEnter={handleUserMouseEnter}
                  >
                    <IconButton
                      color={isUserOpen ? "primary" : "inherit"}
                      onClick={handleUserClick}
                      sx={{ color: isUserOpen ? TIFFANY_BLUE : 'inherit', p: 0.75 }}
                    >
                      <User size={18} strokeWidth={1.5} />
                    </IconButton>

                    <Popper
                      open={isUserOpen}
                      anchorEl={userAnchorEl}
                      placement="bottom-end"
                      transition
                      sx={{ zIndex: 1300, pt: 1.5 }}
                      onMouseEnter={handleUserMenuEnter}
                      onMouseLeave={handleUserMenuLeave}
                    >
                      {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                          <Paper
                            elevation={4}
                            sx={{
                              width: 320, p: 4, borderRadius: 0,
                              bgcolor: 'background.paper',
                              borderTop: `3px solid ${TIFFANY_BLUE}`,
                              display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left'
                            }}
                          >
                            {isLoggedIn ? (
                              <>
                                <Typography variant="h6" sx={{ fontFamily: 'serif', mb: 3, fontSize: '1.25rem' }}>
                                  My Account
                                </Typography>
                                <Stack spacing={2} width="100%">
                                  <Link
                                    component={RouterLink}
                                    to="/account"
                                    underline="hover"
                                    onClick={() => setUserAnchorEl(null)}
                                    sx={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      fontWeight: 600,
                                      color: 'text.primary',
                                      fontSize: '0.95rem',
                                      cursor: 'pointer',
                                      '&:hover': { color: TIFFANY_BLUE }
                                    }}
                                  >
                                    Xem thông tin cá nhân <ChevronRight size={16} style={{ marginLeft: 4 }} />
                                  </Link>
                                  <Link
                                    component={RouterLink}
                                    to="/account/change-password"
                                    underline="hover"
                                    onClick={() => setUserAnchorEl(null)}
                                    sx={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      fontWeight: 600,
                                      color: 'text.primary',
                                      fontSize: '0.95rem',
                                      cursor: 'pointer',
                                      '&:hover': { color: TIFFANY_BLUE }
                                    }}
                                  >
                                    Đổi mật khẩu <ChevronRight size={16} style={{ marginLeft: 4 }} />
                                  </Link>
                                  <Link 
                                    component={RouterLink} 
                                    to="/orders" 
                                    underline="hover" 
                                    onClick={() => setUserAnchorEl(null)}
                                    sx={{ 
                                      display: 'flex', 
                                      alignItems: 'center', 
                                      fontWeight: 600, 
                                      color: 'text.primary', 
                                      fontSize: '0.95rem', 
                                      cursor: 'pointer',
                                      '&:hover': { color: TIFFANY_BLUE } 
                                    }}
                                  >
                                    Lịch sử đơn hàng <ChevronRight size={16} style={{ marginLeft: 4 }} />
                                  </Link>
                                  <Link 
                                    component="button"
                                    onClick={handleLogout}
                                    underline="hover"
                                    sx={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      fontWeight: 600,
                                      color: 'text.primary',
                                      fontSize: '0.95rem',
                                      cursor: 'pointer',
                                      border: 'none',
                                      background: 'none',
                                      padding: 0,
                                      textAlign: 'left',
                                      '&:hover': { color: TIFFANY_BLUE }
                                    }}
                                  >
                                    Đăng xuất <ChevronRight size={16} style={{ marginLeft: 4 }} />
                                  </Link>
                                </Stack>
                              </>
                            ) : (
                              <>
                                <Typography variant="h6" sx={{ fontFamily: 'serif', mb: 2, fontSize: '1.25rem' }}>
                                  Sign in or create an account
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                                  With an account you can check out faster, view your online order history and access your shopping bag or saved items from any device.
                                </Typography>
                                <Stack spacing={2} width="100%">
                                  <Link component={RouterLink} to="/register" underline="hover" sx={{ display: 'flex', alignItems: 'center', fontWeight: 600, color: 'text.primary', fontSize: '0.95rem', '&:hover': { color: TIFFANY_BLUE } }}>
                                    Create an Account <ChevronRight size={16} style={{ marginLeft: 4 }} />
                                  </Link>
                                  <Link component={RouterLink} to="/login" underline="hover" sx={{ display: 'flex', alignItems: 'center', fontWeight: 600, color: 'text.primary', fontSize: '0.95rem', '&:hover': { color: TIFFANY_BLUE } }}>
                                    Sign In <ChevronRight size={16} style={{ marginLeft: 4 }} />
                                  </Link>
                                </Stack>
                              </>
                            )}
                          </Paper>
                        </Fade>
                      )}
                    </Popper>
                  </Box>
                </Box>
                {/* Wishlist Icon with Dropdown */}
                <Box
                  sx={{ position: 'relative', display: 'inline-block' }}
                  onMouseLeave={handleWishlistMouseLeave}
                  onMouseEnter={handleWishlistMouseEnter}
                >
                  <IconButton
                    color={isWishlistOpen ? "primary" : "inherit"}
                    onClick={() => navigate('/wishlist')}
                    sx={{ color: isWishlistOpen ? TIFFANY_BLUE : 'inherit' }}
                  >
                    <Badge badgeContent={wishlistCount} sx={{ "& .MuiBadge-badge": { fontSize: 9, height: 16, minWidth: 16, bgcolor: TIFFANY_BLUE, color: "#fff" } }}>
                      <Heart size={20} strokeWidth={1.5} />
                    </Badge>
                  </IconButton>

                  <Popper
                    open={isWishlistOpen && wishlistCount > 0}
                    anchorEl={wishlistAnchorEl}
                    placement="bottom-end"
                    transition
                    sx={{ zIndex: 1300, pt: 1.5 }}
                    onMouseEnter={handleWishlistMenuEnter}
                    onMouseLeave={handleWishlistMenuLeave}
                  >
                    {({ TransitionProps }) => (
                      <Fade {...TransitionProps} timeout={350}>
                        <Paper
                          elevation={4}
                          sx={{
                            width: 320, p: 4, borderRadius: 0,
                            bgcolor: 'background.paper',
                            borderTop: `3px solid ${TIFFANY_BLUE}`,
                            display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left'
                          }}
                        >
                          <Typography variant="h6" sx={{ fontFamily: 'serif', mb: 3, fontSize: '1.25rem' }}>
                            Saved Items
                          </Typography>
                          {wishlistCount > 0 ? (
                            <>
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                                You have {wishlistCount} {wishlistCount === 1 ? 'item' : 'items'} saved.
                              </Typography>
                              <Stack spacing={2} width="100%">
                                {wishlist.slice(0, 3).map((item) => (
                                  <Box key={item.id} sx={{ display: 'flex', gap: 2, alignItems: 'center', width: '100%' }}>
                                    <Box
                                      component="img"
                                      src={item.image}
                                      alt={item.name}
                                      loading="lazy"
                                      decoding="async"
                                      width="60"
                                      height="60"
                                      sx={{
                                        width: 60,
                                        height: 60,
                                        objectFit: 'cover',
                                        bgcolor: '#f5f5f5',
                                      }}
                                    />
                                    <Box sx={{ flex: 1, minWidth: 0 }}>
                                      <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.875rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {item.name}
                                      </Typography>
                                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                                        {item.price}
                                      </Typography>
                                    </Box>
                                  </Box>
                                ))}
                                {wishlistCount > 3 && (
                                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem', textAlign: 'center', width: '100%' }}>
                                    +{wishlistCount - 3} more {wishlistCount - 3 === 1 ? 'item' : 'items'}
                                  </Typography>
                                )}
                              </Stack>
                              <Link
                                component={RouterLink}
                                to="/wishlist"
                                underline="hover"
                                onClick={() => setWishlistAnchorEl(null)}
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  fontWeight: 600,
                                  color: 'text.primary',
                                  fontSize: '0.95rem',
                                  cursor: 'pointer',
                                  mt: 2,
                                  '&:hover': { color: TIFFANY_BLUE }
                                }}
                              >
                                View All Saved Items <ChevronRight size={16} style={{ marginLeft: 4 }} />
                              </Link>
                            </>
                          ) : (
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                              You haven't saved any items yet.
                            </Typography>
                          )}
                        </Paper>
                      </Fade>
                    )}
                  </Popper>
                </Box>
                <IconButton
                  color="inherit"
                  onClick={handleUserClick}
                  sx={{ display: { xs: "flex", lg: "none" } }}
                >
                  <User size={20} strokeWidth={1.5} />
                </IconButton>

                {/* Cart Icon with Hover Popup */}
                <Box
                  sx={{ position: 'relative', display: 'inline-block' }}
                  onMouseEnter={handleCartMouseEnter}
                  onMouseLeave={handleCartMouseLeave}
                >
                  <IconButton
                    color={isCartOpen ? "primary" : "inherit"}
                    onClick={handleViewCart}
                    sx={{ color: isCartOpen ? TIFFANY_BLUE : 'inherit' }}
                  >
                    <Badge
                      badgeContent={cartItems.length || 0}
                      sx={{ "& .MuiBadge-badge": { fontSize: 9, height: 16, minWidth: 16, bgcolor: TIFFANY_BLUE, color: "#fff" } }}
                    >
                      <ShoppingBag size={20} strokeWidth={1.5} />
                    </Badge>
                  </IconButton>

                  <Popper
                    open={isCartOpen}
                    anchorEl={cartAnchorEl}
                    placement="bottom-end"
                    transition
                    sx={{ zIndex: 1300, pt: 1.5 }}
                    onMouseEnter={handleCartMenuEnter}
                    onMouseLeave={handleCartMenuLeave}
                  >
                    {({ TransitionProps }) => (
                      <Fade {...TransitionProps} timeout={350}>
                        <Paper
                          elevation={4}
                          sx={{
                            width: 320, p: 3, borderRadius: 0,
                            bgcolor: 'background.paper',
                            borderTop: `3px solid ${TIFFANY_BLUE}`,
                          }}
                        >
                          <Typography variant="h6" sx={{ fontFamily: 'serif', mb: 2, fontSize: '1.1rem' }}>
                            Shopping Bag
                          </Typography>

                          {!isLoggedIn ? (
                            <Box sx={{ textAlign: 'center', py: 2 }}>
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                Sign in to view your cart
                              </Typography>
                              <Button
                                variant="outlined"
                                size="small"
                                onClick={() => { setCartAnchorEl(null); navigate('/login'); }}
                                sx={{ borderColor: '#000', color: '#000', borderRadius: 0 }}
                              >
                                Sign In
                              </Button>
                            </Box>
                          ) : cartLoading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
                              <CircularProgress size={24} sx={{ color: TIFFANY_BLUE }} />
                            </Box>
                          ) : cartItems.length === 0 ? (
                            <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
                              Your bag is empty
                            </Typography>
                          ) : (
                            <Stack spacing={2}>
                              {cartItems.map((item) => (
                                <Box key={item.productId} sx={{ display: 'flex', gap: 2 }}>
                                  <Box
                                    sx={{
                                      width: 50, height: 50, bgcolor: '#f5f5f5',
                                      overflow: 'hidden', flexShrink: 0,
                                    }}
                                  >
                                    <img
                                      src={item.urlImg}
                                      alt={item.name}
                                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                  </Box>
                                  <Box sx={{ flex: 1, minWidth: 0 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.85rem' }} noWrap>
                                      {item.name}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                      Qty: {item.quantity} • {item.price?.toLocaleString('vi-VN')} VNĐ
                                    </Typography>
                                  </Box>
                                </Box>
                              ))}
                              {cartItems.length > 0 && (
                                <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center' }}>
                                  {cartItems.length >= 3 ? '+ more items in cart' : ''}
                                </Typography>
                              )}
                            </Stack>
                          )}

                          <Divider sx={{ my: 2 }} />

                          <Button
                            fullWidth
                            variant="contained"
                            onClick={handleViewCart}
                            sx={{
                              bgcolor: '#000', color: '#fff', borderRadius: 0,
                              py: 1.2, fontSize: '0.85rem', letterSpacing: '0.05em',
                              '&:hover': { bgcolor: '#333' },
                            }}
                          >
                            VIEW CART
                          </Button>
                        </Paper>
                      </Fade>
                    )}
                  </Popper>
                </Box>
              </Stack>
            </Toolbar>

            {/* --- DESKTOP NAVIGATION --- */}
            {isDesktop && (
              <Box
                component="nav"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  py: 1.5,
                  borderTop: "none",
                  position: "relative",
                  zIndex: 1400,
                }}
              >
                <Stack direction="row" spacing={6}>
                  {navLinks.map((link) => {
                    const isActive = location.pathname === link.href;
                    const isHovering = activeMenu === link.label;

                    return (
                      <Link
                        key={link.label}
                        component={RouterLink}
                        to={link.href}
                        underline="none"
                        data-text={link.label}
                        onMouseEnter={() => handleNavMouseEnter(link.label)}
                        onMouseLeave={handleNavMouseLeave}
                        sx={{
                          position: "relative",
                          cursor: "pointer",
                          color: "text.primary",
                          display: "inline-block",
                          textAlign: "center",
                          textDecoration: "none",
                          verticalAlign: "middle",
                          padding: 0,
                          lineHeight: 1.5,
                          fontSize: "14px",
                          fontWeight: isActive ? 700 : 300,
                          transition: "font-weight 0s",
                          "&::before": {
                            display: "block",
                            content: "attr(data-text)",
                            fontWeight: 700,
                            height: 0,
                            overflow: "hidden",
                            visibility: "hidden",
                          },
                          "&::after": {
                            content: '""',
                            position: "absolute",
                            width: (isActive || isHovering) ? "100%" : "0%",
                            height: "2px",
                            bottom: -4,
                            left: 0,
                            backgroundColor: TIFFANY_BLUE,
                            transition: "width 0.3s ease-in-out",
                          },
                          "&:hover": {
                            fontWeight: 700,
                            color: "text.primary",
                            "&::after": { width: "100%" }
                          }
                        }}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </Stack>
              </Box>
            )}
          </Container>

          {/* --- MEGA MENU --- */}
          <Fade in={activeMenu === "Jewelry"} timeout={300}>
            <Paper
              onMouseEnter={handleMegaMenuEnter}
              onMouseLeave={handleMegaMenuLeave}
              elevation={0}
              sx={{
                position: "absolute",
                top: "100%",
                left: 0,
                width: "100%",
                bgcolor: "background.paper",
                zIndex: 1200,
                borderTop: "1px solid #e0e0e0",
                py: 6,
              }}
            >
              <Container
                maxWidth={false}
                sx={{
                  width: "100%",
                  px: { xs: 4, md: 8, lg: 15, xl: 25 },
                  boxSizing: "border-box",
                }}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" },
                    gap: 4,
                    width: "100%",
                  }}
                >

                  {/* --- CỘT 1: Browse by Category --- */}
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, fontSize: "0.85rem", letterSpacing: 1 }}>
                      Browse by Category
                    </Typography>
                    <Stack spacing={1.5}>
                      {JEWELRY_MENU_DATA.categories.map((item, index) => (
                        <Link
                          key={index}
                          component={RouterLink}
                          to={item.href} // Dùng trực tiếp href từ object
                          underline="none"
                          sx={{
                            color: "text.secondary",
                            fontSize: "0.85rem",
                            fontWeight: item.label.includes("Explore") ? 600 : 400,
                            display: "block",
                            width: "fit-content",
                            position: "relative",
                            whiteSpace: "normal",
                            wordWrap: "break-word",
                            transition: "color 0.3s",
                            "&::after": {
                              content: '""',
                              position: "absolute",
                              bottom: -2,
                              left: 0,
                              width: "0%",
                              height: "1px",
                              backgroundColor: "#81d8d0",
                              transition: "width 0.3s ease-in-out",
                            },
                            "&:hover::after": { width: "100%" },
                            "&:hover": { color: "text.secondary" }
                          }}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </Stack>
                  </Box>

                  {/* --- CỘT 2: Collections --- */}
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, fontSize: "0.85rem", letterSpacing: 1 }}>
                      Collections
                    </Typography>
                    <Stack spacing={1.5}>
                      {JEWELRY_MENU_DATA.collections.map((item, index) => (
                        <Link
                          key={index}
                          component={RouterLink}
                          to={item.href} // Dùng trực tiếp href từ object
                          underline="none"
                          sx={{
                            color: "text.secondary",
                            fontSize: "0.85rem",
                            fontWeight: item.label.includes("Explore") ? 600 : 400,
                            display: "block",
                            width: "fit-content",
                            position: "relative",
                            whiteSpace: "normal",
                            wordWrap: "break-word",
                            "&::after": {
                              content: '""',
                              position: "absolute",
                              bottom: -2,
                              left: 0,
                              width: "0%",
                              height: "1px",
                              backgroundColor: "#81d8d0",
                              transition: "width 0.3s ease-in-out",
                            },
                            "&:hover::after": { width: "100%" },
                            "&:hover": { color: "text.secondary" }
                          }}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </Stack>
                  </Box>

                  {/* --- CỘT 3: Featured --- */}
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, fontSize: "0.85rem", letterSpacing: 1 }}>
                      Featured
                    </Typography>
                    <Stack spacing={1.5}>
                      {JEWELRY_MENU_DATA.featured.map((item, index) => (
                        <Link
                          key={index}
                          component={RouterLink}
                          to={item.href} // Dùng trực tiếp href từ object
                          underline="none"
                          sx={{
                            color: "text.secondary",
                            fontSize: "0.85rem",
                            display: "block",
                            width: "fit-content",
                            position: "relative",
                            whiteSpace: "normal",
                            overflowWrap: "break-word",
                            wordWrap: "break-word",
                            lineHeight: 1.5,
                            "&::after": {
                              content: '""',
                              position: "absolute",
                              bottom: -2,
                              left: 0,
                              width: "0%",
                              height: "1px",
                              backgroundColor: "#81d8d0",
                              transition: "width 0.3s ease-in-out",
                            },
                            "&:hover::after": { width: "100%" },
                            "&:hover": { color: "text.secondary" }
                          }}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </Stack>
                  </Box>

                  {/* --- CỘT 4: IMAGE (Không đổi) --- */}
                  <Box sx={{ minWidth: 0, display: "flex", flexDirection: "column" }}>
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        overflow: "hidden",
                        cursor: "pointer",
                      }}
                    >
                        <Box
                          component="img"
                          src={JEWELRY_MENU_DATA.image}
                          alt="Featured Jewelry"
                          loading="lazy"
                          decoding="async"
                          sx={{
                            width: "100%",
                            objectFit: "cover",
                            display: "block",
                            transition: "transform 0.5s ease",
                            "&:hover": { transform: "scale(1.05)" },
                          }}
                        />
                    </Box>

                    <Box sx={{ textAlign: "left", mt: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 300, fontSize: ".875rem", letterSpacing: 0.5 }}>
                        Gifts for Her
                      </Typography>
                      <Link
                        component={RouterLink}
                        to="/jewelry/shop"
                        underline="none"
                        sx={{
                          display: "flex", alignItems: "center", width: "fit-content", mt: 0.5, fontWeight: 600, cursor: "pointer", position: "relative", color: "text.secondary",
                          "&::after": { content: '""', position: "absolute", bottom: -2, left: 0, width: "0%", height: "1px", backgroundColor: "#81d8d0", transition: "width 0.3s ease-in-out" },
                          "&:hover::after": { width: "100%" },
                          "&:hover": { color: "text.secondary" },
                        }}
                      >
                        Shop Now <ChevronRight size={16} style={{ marginLeft: 4 }} />
                      </Link>
                    </Box>
                  </Box>

                </Box>
              </Container>
            </Paper>
          </Fade>

          {/* Search Drawer */}
          <Slide in={searchOpen} direction="down" mountOnEnter unmountOnExit>
            <Box
              sx={{
                position: "absolute",
                top: "100%", left: 0, width: "100%",
                bgcolor: "background.paper", borderBottom: "1px solid", borderColor: "divider",
                boxShadow: 3, zIndex: -1, py: 3,
              }}
            >
              <Container maxWidth="md">
                <Stack direction="row" alignItems="center" spacing={2} sx={{ borderBottom: "1px solid", borderColor: "text.disabled", pb: 1 }}>
                  <Search size={20} color="gray" />
                  <InputBase autoFocus placeholder="Search..." fullWidth sx={{ fontSize: "1rem" }} />
                  <IconButton onClick={() => setSearchOpen(false)} size="small">
                    <CloseIcon size={20} />
                  </IconButton>
                </Stack>
              </Container>
            </Box>
          </Slide>
        </AppBar>
      </HideOnScroll>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 300 },
        }}
      >
        {drawerContent}
      </Drawer>

      <Toolbar sx={{ height: isDesktop ? 128 : 82 }} />
    </>
  );
};

export default Header;