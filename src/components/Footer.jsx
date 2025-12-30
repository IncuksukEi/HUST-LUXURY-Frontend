import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Link,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Stack,
  useMediaQuery,
  useTheme,
  SvgIcon,
  TextField,
} from "@mui/material";
import { ChevronDown } from "lucide-react";

// --- CUSTOM SOCIAL ICONS ---
const InstagramIcon = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24"><path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M12,6.8A5.2,5.2 0 0,1 17.2,12A5.2,5.2 0 0,1 12,17.2A5.2,5.2 0 0,1 6.8,12A5.2,5.2 0 0,1 12,6.8M12,8.8A3.2,3.2 0 0,0 8.8,12A3.2,3.2 0 0,0 12,15.2A3.2,3.2 0 0,0 15.2,12A3.2,3.2 0 0,0 12,8.8M18,5A1.5,1.5 0 0,1 19.5,6.5A1.5,1.5 0 0,1 18,8A1.5,1.5 0 0,1 16.5,6.5A1.5,1.5 0 0,1 18,5Z" /></SvgIcon>
);
const FacebookIcon = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.15 5.96C15.21 5.96 16.12 6.04 16.12 6.04V8.51H15.01C13.77 8.51 13.38 9.28 13.38 10.07V12.06H16.15L15.71 14.96H13.38V21.96C18.16 21.21 21.82 17.06 21.82 12.06C21.82 6.53 17.32 2.04 12 2.04Z" /></SvgIcon>
);
const PinterestIcon = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24"><path d="M9.04,21.54C10,21.83 10.97,22 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2A10,10 0 0,0 2,12C2,16.25 4.67,19.9 8.44,21.34C8.35,20.56 8.26,19.27 8.44,18.38L9.59,13.44C9.59,13.44 9.3,12.86 9.3,11.94C9.3,10.56 10.16,9.53 11.14,9.53C12,9.53 12.4,10.16 12.4,10.97C12.4,11.83 11.83,13.06 11.54,14.24C11.37,15.22 12.1,16.08 13.1,16.08C15,16.08 16.46,14.08 16.46,11.05C16.46,8.39 14.5,6.5 11.77,6.5C8.65,6.5 6.77,8.84 6.77,11.39C6.77,12.34 7.16,13.38 7.61,13.92C7.76,14.09 7.73,14.3 7.66,14.6L7.34,15.89C7.26,16.15 7.06,16.2 6.81,16.08C5.25,15.36 4.31,13.06 4.31,11.36C4.31,8.08 6.69,3.85 12.15,3.85C16.55,3.85 19.9,7 19.9,11.32C19.9,15.85 17.06,19.5 13.44,19.5C12.21,19.5 11.08,18.84 10.66,18.05L9.9,20.94C9.62,22 8.94,23.3 8.4,24.08L9.04,21.54Z" /></SvgIcon>
);
const XIcon = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></SvgIcon>
);
const YoutubeIcon = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24"><path d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.66 21.94,11.44V12.56C21.94,13.34 21.91,14.13 21.84,14.93C21.78,15.73 21.69,16.36 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,18.94H10.41C9.31,18.94 8.12,18.91 6.82,18.84C5.5,18.78 4.64,18.69 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.34 2.06,12.56V11.44C2.06,10.66 2.09,9.87 2.16,9.07C2.22,8.27 2.31,7.64 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06H12H13.59C14.69,5.06 15.88,5.09 17.18,5.16C18.5,5.22 19.36,5.31 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z" /></SvgIcon>
);

const socialIcons = [
  { icon: InstagramIcon, href: "https://instagram.com" },
  { icon: FacebookIcon, href: "https://facebook.com" },
  { icon: PinterestIcon, href: "https://pinterest.com" },
  { icon: XIcon, href: "https://twitter.com" },
  { icon: YoutubeIcon, href: "https://youtube.com" },
];

const footerLinks = {
  clientCare: {
    title: "Chăm sóc khách hàng",
    links: [
      { label: "Liên hệ chúng tôi", href: "/contact" },
      { label: "Chăm sóc & Sửa chữa sản phẩm", href: "/care" },
      { label: "Câu hỏi thường gặp", href: "/faq" },
      { label: "Danh mục", href: "/catalogues" },
      { label: "Hướng dẫn quà tặng trang sức", href: "/gift-guide" },
      { label: "Đăng ký nhận email từ MAJewelry", href: "/newsletter" },
    ],
  },
  ourCompany: {
    title: "Công ty chúng tôi",
    links: [
      { label: "Thế giới MAJewelry", href: "/world" },
      { label: "Bền vững", href: "/sustainability" },
      { label: "Chính sách website", href: "/policy" },
      { label: "Điều khoản & Điều kiện dịch vụ toàn cầu MAJewelry", href: "/terms" },
      { label: "Mục lục trang", href: "/site-index" },
      { label: "An toàn sản phẩm", href: "/safety" },
    ],
  },
  relatedSites: {
    title: "Trang liên quan",
    links: [
      { label: "MAJewelry dành cho báo chí", href: "/press" },
      { label: "Quỹ MAJewelry", href: "/foundation" },
    ],
  },
};

// --- COMPONENTS ---

const LinkList = ({ links }) => (
  <Stack spacing={0.5} sx={{ mt: { xs: 0, lg: 2 }, mb: { xs: 1, lg: 0 }, width: '100%' }}>
    {links.map((link) => (
      <Link
        key={link.label}
        component={RouterLink}
        to={link.href}
        underline="none"
        sx={{
          color: "text.primary",
          fontSize: "0.75rem",
          display: "block",
          width: "fit-content",
          maxWidth: "100%",
          whiteSpace: "normal",
          wordBreak: "break-word",
          position: "relative",
          transition: "color 0.3s",
          py: 0.2,
          pl: { xs: 2, lg: 0 }, // Thụt đầu dòng ở mobile, không thụt ở desktop
          "&:hover": { color: "text.primary" },
          "&::after": {
            content: '""',
            position: "absolute",
            width: "0%",
            height: "1px",
            bottom: 0,
            left: { xs: 2, lg: 0 }, // Thụt đầu dòng ở mobile, không thụt ở desktop
            backgroundColor: "#81d8d0",
            transition: "width 0.3s",
          },
          "&:hover::after": { width: "100%" },
        }}
      >
        {link.label}
      </Link>
    ))}
  </Stack>
);

const SectionTitle = ({ children }) => (
  <Typography
    variant="subtitle2"
    sx={{
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: 1,
      mb: { xs: 0.5, lg: 2 },
      color: "text.primary",
      fontSize: "0.875rem",
    }}
  >
    {children}
  </Typography>
);

const NewsletterForm = () => (
  <Box sx={{ width: '100%' }}>
    <Typography 
      variant="body2" 
      sx={{ 
        mb: 3, 
        fontSize: '0.75rem', 
        lineHeight: 1.6,
        whiteSpace: "normal",
        wordBreak: "break-word",
      }}
    >
      Là người đầu tiên biết về các thiết kế mới thú vị, sự kiện đặc biệt, khai trương cửa hàng và nhiều hơn nữa.
    </Typography>
    <TextField
      fullWidth
      variant="standard"
      label="Email"
      InputLabelProps={{
        sx: {
            fontSize: '14px',
            color: 'text.secondary',
            "&.Mui-focused": {
                color: 'text.primary'
            }
        }
      }}
      sx={{
        mb: 3,
        '& .MuiInput-input': { fontSize: '14px' },
        '& .MuiInput-underline:before': { borderBottomColor: 'divider' },
        '& .MuiInput-underline:after': { borderBottomColor: 'text.primary' }
      }}
    />
    
    <Button
      variant="outlined"
      sx={{
        color: "text.primary",
        borderColor: "text.primary",
        textTransform: "none",
        borderRadius: 0,
        px: 5,
        py: 1,
        "&:hover": { bgcolor: "transparent", borderColor: "text.primary" },
      }}
    >
        Đăng ký
    </Button>
  </Box>
);

const SocialIconsStack = ({ mobileJustify = false }) => (
    <Stack
      direction="row"
      spacing={mobileJustify ? 0 : 3}
      sx={{
        width: "100%",
        justifyContent: mobileJustify ? "space-between" : "flex-start",
      }}
    >
      {socialIcons.map((item, index) => (
        <Link key={index} href={item.href} target="_blank" color="text.primary" sx={{ "&:hover": { color: "grey.600" } }}>
          <item.icon style={{ fontSize: 22 }} />
        </Link>
      ))}
    </Stack>
  );


// --- MAIN FOOTER ---
const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        borderTop: "8px solid",
        borderColor: "#81d8d0",
        color: "text.primary",
      }}
    >
      <Container maxWidth="xl" sx={{ pt: { xs: 2, md: 6 }, pb: 0, px: { xs: 2, md: 4 } }}>
        {isMobile ? (
          // --- MOBILE VIEW ---
           <Box sx={{ width: "100%" }}>
             <Box sx={{ mb: 1.5 }}>
               <SectionTitle>{footerLinks.clientCare.title}</SectionTitle>
               <LinkList links={footerLinks.clientCare.links} />
             </Box>
             {[footerLinks.ourCompany, footerLinks.relatedSites].map((section) => (
               <Accordion key={section.title} disableGutters elevation={0} square sx={{ bgcolor: "transparent", border: "none", "&:before": { display: "none" }, "&.Mui-expanded": { margin: 0 } }}>
                 <AccordionSummary expandIcon={<ChevronDown size={16} color="#000" />} sx={{ px: 0, minHeight: 36, "&.Mui-expanded": { minHeight: 36 }, "& .MuiAccordionSummary-content": { margin: "4px 0", flexGrow: 1, "&.Mui-expanded": { margin: "4px 0" } } }}>
                   <SectionTitle>{section.title}</SectionTitle>
                 </AccordionSummary>
                 <AccordionDetails sx={{ px: 0, pt: 0, pb: 1 }}>
                   <LinkList links={section.links} />
                 </AccordionDetails>
               </Accordion>
             ))}
           </Box>
        ) : (
          // --- DESKTOP VIEW ---
          <Box 
            sx={{ 
                display: 'flex', 
                flexDirection: 'row', 
                justifyContent: 'space-between',
                width: '100%',
            }}
          >
              
            {/* === LEFT WRAPPER === */}
            <Box 
                sx={{ 
                    width: '72%',
                    display: 'flex', 
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    gap: { md: 8, lg: 12, xl: 15 }
                }}
            >
                {Object.values(footerLinks).map((section) => (
                  <Box 
                    key={section.title} 
                    sx={{ 
                        width: '15%', 
                        flexShrink: 0,
                        minWidth: 0
                    }}
                  >
                    <SectionTitle>{section.title}</SectionTitle>
                    <LinkList links={section.links} />
                  </Box>
                ))}
            </Box>

            {/* === RIGHT WRAPPER === */}
            <Box 
              sx={{
                 width: '25%', 
                 display: 'flex',
                 flexDirection: 'column',
                 alignItems: 'flex-start',
                 flexShrink: 0 
              }}
            >
              <SectionTitle>Mới nhất từ MAJEWELRY</SectionTitle>
              <NewsletterForm />
               <Box sx={{ mt: 5, width: '100%' }}>
                 <SocialIconsStack mobileJustify={true} />
               </Box>
            </Box>

          </Box>
        )}
      </Container>

      {/* --- BOTTOM SECTION --- */}
      <Box sx={{ pb: 4 }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
          {isMobile ? (
             // --- MOBILE BOTTOM ---
              <Stack direction="column" alignItems="center" spacing={2}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', letterSpacing: 4, textTransform: 'uppercase', fontSize: '1.25rem', textAlign: 'center' }}>
                    MAJEWELRY
                </Typography>
                <Box sx={{ width: '100%' }}>
                    <SocialIconsStack mobileJustify={true} />
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: 1, fontSize: "0.7rem" }}>
                  © 2025 MAJEWELRY. All Rights Reserved.
                </Typography>
              </Stack>
          ) : (
              <Box 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    width: '100%',
                    mt: 8
                }}
              >
                  {/* Copyright (Center) */}
                  <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: 1, fontSize: "0.7rem" }}>
                     © MAJEWELRY. 2025
                  </Typography>
              </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;