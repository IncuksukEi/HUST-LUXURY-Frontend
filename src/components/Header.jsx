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

// --- CẤU HÌNH MENU ---
const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "High Jewelry", href: "/high-jewelry" },
  { label: "Jewelry", href: "/jewelry" },
  { label: "Contact", href: "/contact" },
];

const TIFFANY_BLUE = "#81d8d0";

// --- COMPONENT ẨN HEADER KHI CUỘN XUỐNG ---
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
  
  // --- STATE & REF CHO USER POPUP ---
  const [userAnchorEl, setUserAnchorEl] = useState(null);
  const userTimeoutRef = useRef(null);
  const isUserOpen = Boolean(userAnchorEl);

  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const isLoggedIn = !!localStorage.getItem('token');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleUserClick = () => {
    if (isLoggedIn) {
      navigate('/account');
    } else {
      navigate('/login');
    }
  };

  // --- LOGIC HOVER USER ---
  const handleUserMouseEnter = (event) => {
    if (userTimeoutRef.current) {
      clearTimeout(userTimeoutRef.current);
    }
    setUserAnchorEl(event.currentTarget);
  };

  const handleUserMouseLeave = () => {
    userTimeoutRef.current = setTimeout(() => {
      setUserAnchorEl(null);
    }, 200);
  };

  const handleMenuMouseEnter = () => {
    if (userTimeoutRef.current) {
      clearTimeout(userTimeoutRef.current);
    }
  };

  const handleMenuMouseLeave = () => {
    userTimeoutRef.current = setTimeout(() => {
      setUserAnchorEl(null);
    }, 200);
  };

  const drawerContent = (
    <Box sx={{ width: 300, pt: 2, height: "100%", position: "relative" }} role="presentation">
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
              textDecoration: "none",
              bgcolor: location.pathname === item.href ? "action.hover" : "transparent",
              "&:hover": { bgcolor: "action.hover", color: "text.primary" },
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
      <HideOnScroll {...props}>
        <AppBar 
          position="fixed" 
          color="default" 
          elevation={0}
          sx={{ 
            bgcolor: "background.paper",
            boxShadow: "none",
            borderBottom: "none",
          }}
        >
          <Container maxWidth="xl">
            {/* --- TOP TOOLBAR: GIẢM HEIGHT XUỐNG 50px --- */}
            <Toolbar
              disableGutters
              sx={{
                height: 50, // Cập nhật height nhỏ hơn (Cũ: 70)
                minHeight: "50px !important", // Đảm bảo override mặc định của MUI
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              {/* --- LEFT --- */}
              <Stack direction="row" alignItems="center" spacing={1} sx={{ flex: 1 }}>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleDrawerToggle}
                  sx={{ display: { lg: "none" } }}
                >
                  <MenuIcon size={24} strokeWidth={1.5} />
                </IconButton>
                <IconButton color="inherit" onClick={() => setSearchOpen(!searchOpen)}>
                  <Search size={20} strokeWidth={1.5} /> {/* Giảm size icon chút cho cân đối */}
                </IconButton>
                <Box sx={{ display: { xs: "none", lg: "flex" }, alignItems: "center", gap: 2, ml: 1 }}>
                  <IconButton component={RouterLink} to="/stores" color="inherit">
                    <MapPin size={20} strokeWidth={1.5} />
                  </IconButton>
                  <Button
                    component={RouterLink}
                    to="/contact"
                    startIcon={<MessageCircle size={18} strokeWidth={1.5} />}
                    sx={{
                      display: { xs: "none", xl: "flex" },
                      color: "text.primary",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      letterSpacing: 1,
                      "&:hover": { color: TIFFANY_BLUE, bgcolor: "transparent" },
                    }}
                  >
                    Client Care
                  </Button>
                </Box>
              </Stack>

              {/* --- CENTER: LOGO --- */}
              <Typography
                variant="h4"
                component={RouterLink}
                to="/"
                sx={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontWeight: "bold",
                  letterSpacing: 4,
                  textTransform: "uppercase",
                  color: "text.primary",
                  textDecoration: "none",
                  // Giảm font size logo một chút cho phù hợp header nhỏ
                  fontSize: { xs: "1.25rem", md: "1.5rem" }, 
                  whiteSpace: "nowrap",
                  "&:hover": {
                    color: "text.primary",
                    textDecoration: "none",
                    cursor: "pointer"
                  }
                }}
              >
                MAJewelry
              </Typography>

              {/* --- RIGHT: ICONS --- */}
              <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, lg: 2 }} sx={{ flex: 1, justifyContent: "flex-end" }}>
                <Box sx={{ display: { xs: "none", lg: "flex" }, gap: 2 }}>
                  <IconButton component={RouterLink} to="/appointment" color="inherit">
                    <Calendar size={20} strokeWidth={1.5} />
                  </IconButton>
                  
                  {/* USER ICON */}
                  <Box 
                    sx={{ position: 'relative', display: 'inline-block' }}
                    onMouseLeave={handleUserMouseLeave}
                    onMouseEnter={handleUserMouseEnter}
                  >
                    <IconButton 
                      color={isUserOpen ? "primary" : "inherit"}
                      onClick={handleUserClick}
                      sx={{ color: isUserOpen ? TIFFANY_BLUE : 'inherit' }}
                    >
                      <User size={20} strokeWidth={1.5} />
                    </IconButton>

                    <Popper
                      open={isUserOpen}
                      anchorEl={userAnchorEl}
                      placement="bottom-end"
                      transition
                      sx={{ zIndex: 1300, pt: 1.5 }}
                      onMouseEnter={handleMenuMouseEnter}
                      onMouseLeave={handleMenuMouseLeave}
                    >
                      {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                          <Paper 
                            elevation={4} 
                            sx={{ 
                              width: 320, 
                              p: 4, 
                              borderRadius: 0,
                              bgcolor: 'background.paper',
                              borderTop: `3px solid ${TIFFANY_BLUE}`,
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'flex-start',
                              textAlign: 'left'
                            }}
                          >
                            <Typography variant="h6" sx={{ fontFamily: 'serif', mb: 2, fontSize: '1.25rem' }}>
                              Sign in or create an account
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                              With an account you can check out faster, view your online order history and access your shopping bag or saved items from any device.
                            </Typography>
                            <Stack spacing={2} width="100%">
                              <Link 
                                component={RouterLink} 
                                to="/register" 
                                underline="hover"
                                sx={{ 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  fontWeight: 600, 
                                  color: 'text.primary',
                                  fontSize: '0.95rem',
                                  '&:hover': { color: TIFFANY_BLUE }
                                }}
                              >
                                Create an Account <ChevronRight size={16} style={{ marginLeft: 4 }} />
                              </Link>
                              <Link 
                                component={RouterLink} 
                                to="/login" 
                                underline="hover"
                                sx={{ 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  fontWeight: 600, 
                                  color: 'text.primary',
                                  fontSize: '0.95rem',
                                  '&:hover': { color: TIFFANY_BLUE }
                                }}
                              >
                                Sign In <ChevronRight size={16} style={{ marginLeft: 4 }} />
                              </Link>
                            </Stack>
                          </Paper>
                        </Fade>
                      )}
                    </Popper>
                  </Box>
                </Box>
                <IconButton component={RouterLink} to="/wishlist" color="inherit">
                  <Heart size={20} strokeWidth={1.5} />
                </IconButton>
                <IconButton 
                  color="inherit"
                  onClick={handleUserClick}
                  sx={{ display: { xs: "flex", lg: "none" } }}
                >
                  <User size={20} strokeWidth={1.5} />
                </IconButton>
                <IconButton component={RouterLink} to="/cart" color="inherit">
                  <Badge badgeContent={2} sx={{ 
                      "& .MuiBadge-badge": { 
                        fontSize: 9, 
                        height: 16, 
                        minWidth: 16, 
                        bgcolor: TIFFANY_BLUE, 
                        color: "#fff" 
                      } 
                    }}>
                    <ShoppingBag size={20} strokeWidth={1.5} />
                  </Badge>
                </IconButton>
              </Stack>
            </Toolbar>

            {/* --- DESKTOP MENU --- */}
            {isDesktop && (
              <Box
                component="nav"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  py: 1.5,
                  borderTop: "none"
                }}
              >
                <Stack direction="row" spacing={6}>
                  {navLinks.map((link) => {
                    const isActive = location.pathname === link.href;
                    return (
                      <Link
                        key={link.label}
                        component={RouterLink}
                        to={link.href}
                        underline="none"
                        data-text={link.label} 
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
                          
                          // --- CHỈNH FONT SIZE VỀ 14px ---
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
                            width: isActive ? "100%" : "0%",
                            height: "2px",
                            bottom: -4, 
                            left: 0,
                            backgroundColor: TIFFANY_BLUE,
                            transition: "width 0.3s ease-in-out",
                          },
                          
                          "&:hover": {
                            fontWeight: 700,
                            color: "text.primary",
                            "&::after": {
                              width: "100%",
                            }
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

          <Slide in={searchOpen} direction="down" mountOnEnter unmountOnExit>
            <Box
              sx={{
                position: "absolute",
                top: "100%",
                left: 0,
                width: "100%",
                bgcolor: "background.paper",
                borderBottom: "1px solid",
                borderColor: "divider",
                boxShadow: 3,
                zIndex: -1,
                py: 3,
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
      
      {/* Cập nhật chiều cao Toolbar đệm: Desktop = 96px (50 + menu), Mobile = 50px */}
      <Toolbar sx={{ height: isDesktop ? 96 : 50 }} />
    </>
  );
};

export default Header;