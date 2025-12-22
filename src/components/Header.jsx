import React, { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
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

const TIFFANY_BLUE = "#81d8d0"; // Màu xanh Tiffany

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
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
                // In đậm nếu đang active
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
                      "&:hover": { color: TIFFANY_BLUE, bgcolor: "transparent" },
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
                  fontWeight: "bold",
                  letterSpacing: 4,
                  textTransform: "uppercase",
                  color: "text.primary",
                  textDecoration: "none",
                  fontSize: { xs: "1.5rem", md: "1.75rem" },
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

              <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, lg: 2 }} sx={{ flex: 1, justifyContent: "flex-end" }}>
                <Box sx={{ display: { xs: "none", lg: "flex" }, gap: 2 }}>
                  <IconButton component={RouterLink} to="/appointment" color="inherit">
                    <Calendar size={22} strokeWidth={1.5} />
                  </IconButton>
                  <IconButton component={RouterLink} to="/account" color="inherit">
                    <User size={22} strokeWidth={1.5} />
                  </IconButton>
                </Box>
                <IconButton component={RouterLink} to="/wishlist" color="inherit">
                  <Heart size={22} strokeWidth={1.5} />
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
                          fontSize: "0.875rem",
                          color: "text.primary",
                          position: "relative",
                          display: "inline-flex",
                          flexDirection: "column",
                          alignItems: "center",
                          cursor: "pointer",
                          
                          // 1. Text chính thức
                          fontWeight: isActive ? 700 : 300,
                          transition: "color 0.3s ease",

                          "&::before": {
                            content: "attr(data-text)",
                            fontWeight: 700,
                            height: 0,
                            overflow: "hidden",
                            visibility: "hidden",
                            display: "block", 
                          },

                          "&:hover": { 
                            fontWeight: 700,
                            color: "text.primary" 
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

                          "&:hover::after": { 
                            width: "100%" 
                          },
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