import React, { useState } from "react";
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
} from "lucide-react";

// --- CẤU HÌNH MENU ---
const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "High Jewelry", href: "/high-jewelry" },
  { label: "Jewelry", href: "/jewelry" },
  { label: "Contact", href: "/contact" },
];

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    sx: {
      backgroundColor: "background.paper",
      borderBottom: trigger ? "none" : "1px solid",
      borderColor: "divider",
      transition: "all 0.3s ease",
    },
  });
}

const Header = (props) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  // Check if user is logged in
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

  const drawerContent = (
    <Box sx={{ width: 300, pt: 2, height: "100%", position: "relative" }} role="presentation">
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 3, pb: 2, borderBottom: 1, borderColor: "divider" }}>
        <Typography variant="h6" sx={{ fontFamily: "serif", textTransform: "uppercase", letterSpacing: 1 }}>
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
              color: "text.primary",
              textDecoration: "none",
              "&:hover": { bgcolor: "action.hover", color: "primary.main" },
            }}
          >
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontSize: "0.875rem",
                textTransform: "uppercase",
                letterSpacing: 1,
                fontWeight: 500,
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <ElevationScroll {...props}>
        <AppBar position="fixed" color="default" sx={{ bgcolor: "background.paper" }}>
          <Container maxWidth="xl">
            <Toolbar
              disableGutters
              sx={{
                height: 70,
                justifyContent: "space-between",
                position: "relative",
              }}
            >
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
                  <Search size={22} strokeWidth={1.5} />
                </IconButton>
                <Box sx={{ display: { xs: "none", lg: "flex" }, alignItems: "center", gap: 2, ml: 1 }}>
                  <IconButton component={RouterLink} to="/stores" color="inherit">
                    <MapPin size={22} strokeWidth={1.5} />
                  </IconButton>
                  <Button
                    component={RouterLink}
                    to="/contact"
                    startIcon={<MessageCircle size={20} strokeWidth={1.5} />}
                    sx={{
                      display: { xs: "none", xl: "flex" },
                      color: "text.primary",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      letterSpacing: 1,
                      "&:hover": { color: "primary.main", bgcolor: "transparent" },
                    }}
                  >
                    Client Care
                  </Button>
                </Box>
              </Stack>

              <Typography
                variant="h4"
                component={RouterLink}
                to="/"
                sx={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontFamily: "serif",
                  fontWeight: "bold",
                  letterSpacing: 4,
                  textTransform: "uppercase",
                  color: "text.primary",
                  textDecoration: "none",
                  fontSize: { xs: "1.5rem", md: "1.75rem" },
                  whiteSpace: "nowrap",
                }}
              >
                MAJewelry
              </Typography>

              <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, lg: 2 }} sx={{ flex: 1, justifyContent: "flex-end" }}>
                <Box sx={{ display: { xs: "none", lg: "flex" }, gap: 2 }}>
                  <IconButton component={RouterLink} to="/appointment" color="inherit">
                    <Calendar size={22} strokeWidth={1.5} />
                  </IconButton>
                  <IconButton 
                    color="inherit"
                    onClick={handleUserClick}
                  >
                    <User size={22} strokeWidth={1.5} />
                  </IconButton>
                </Box>
                <IconButton component={RouterLink} to="/wishlist" color="inherit">
                  <Heart size={22} strokeWidth={1.5} />
                </IconButton>
                <IconButton 
                  color="inherit"
                  onClick={handleUserClick}
                  sx={{ display: { xs: "flex", lg: "none" } }}
                >
                  <User size={22} strokeWidth={1.5} />
                </IconButton>
                <IconButton component={RouterLink} to="/cart" color="inherit">
                  <Badge badgeContent={2} color="primary" sx={{ "& .MuiBadge-badge": { fontSize: 9, height: 16, minWidth: 16 } }}>
                    <ShoppingBag size={22} strokeWidth={1.5} />
                  </Badge>
                </IconButton>
              </Stack>
            </Toolbar>

            {isDesktop && (
              <Box
                component="nav"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  py: 1.5,
                  borderTop: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Stack direction="row" spacing={6}>
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      component={RouterLink}
                      to={link.href}
                      underline="none"
                      sx={{
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        textTransform: "uppercase",
                        letterSpacing: 2,
                        color: location.pathname === link.href ? "primary.main" : "text.primary",
                        position: "relative",
                        transition: "color 0.3s",
                        "&:hover": { color: "primary.main" },
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          width: location.pathname === link.href ? "100%" : "0%",
                          height: "2px",
                          bottom: -4,
                          left: 0,
                          backgroundColor: "primary.main",
                          transition: "width 0.3s ease-in-out",
                        },
                        "&:hover::after": { width: "100%" },
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
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
      </ElevationScroll>
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
      <Toolbar sx={{ height: isDesktop ? 120 : 70 }} />
    </>
  );
};

export default Header;