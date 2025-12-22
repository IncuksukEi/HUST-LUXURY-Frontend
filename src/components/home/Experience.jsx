import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { 
  Inventory2Outlined,      
  RoomServiceOutlined,     
  CalendarTodayOutlined,   
  CardGiftcardOutlined     
} from '@mui/icons-material';

// --- FIX 1: Dùng Named Import từ @mui/icons-material ---
// Cách này đảm bảo lấy đúng Component function, tránh lỗi "got: object"
const TIFFANY_BLUE = '#81d8d0'; 

// Icon mũi tên nhỏ
const ArrowIcon = () => (
  <Box component="span" sx={{ fontSize: '0.8em', ml: 0.5 }}>›</Box>
);

const EXPERIENCES = [
  { 
    title: 'Complimentary Shipping & Returns', 
    desc: 'We offer complimentary shipping and returns on all MAJewelry orders.', 
    icon: Inventory2Outlined, 
    linkText: 'Learn More',
    path: '/shipping'
  },
  { 
    title: 'MAJewelry At Your Service', 
    desc: 'Our client care experts are always here to help.', 
    icon: RoomServiceOutlined, 
    linkText: 'Contact Us',
    path: '/contact'
  },
  { 
    title: 'Book an Appointment', 
    desc: 'We’re happy to help with in-store or virtual appointments.', 
    icon: CalendarTodayOutlined, 
    linkText: 'Book Now',
    path: '/appointment'
  },
  { 
    title: 'The Iconic Blue Box', 
    desc: 'Your purchase comes wrapped in our Blue Box packaging.', 
    icon: CardGiftcardOutlined, 
    linkText: 'Explore All Gifts',
    path: '/gifts'
  },
];

const Experience = () => {
  return (
    <Box sx={{ py: 10, bgcolor: '#ffffff' }}>
      <Container maxWidth="xl">
        <Typography 
          variant="h4" 
          align="center" 
          sx={{
            mb: 8,
            fontFamily: 'Santral W01, sans-serif',
            fontSize: { xs: '1rem', md: '1.5rem' },
            fontWeight: 600,
            fontStyle: 'normal'
          }}
        >
          The MAJewelry Experience
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {EXPERIENCES.map((exp, index) => {
            const IconComponent = exp.icon;
            
            return (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <Box
                  component={RouterLink}
                  to={exp.path}
                  sx={{
                    textDecoration: 'none', 
                    color: 'text.primary',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    cursor: 'pointer',
                    height: '100%',
                    px: 2,
                    
                    // --- PARENT HOVER EFFECTS ---
                    // Khi hover vào khối cha (Box này):
                    transition: 'all 0.3s ease',
                    
                    // 1. Icon nhảy lên
                    '&:hover .experience-icon': { 
                      transform: 'translateY(-5px)', 
                      color: TIFFANY_BLUE // (Tuỳ chọn) Đổi màu icon luôn nếu thích
                    },
                    
                    // 2. Kích hoạt hiệu ứng gạch chân của .link-text
                    '&:hover .link-text::after': { 
                      width: '100%', // Dãn ra toàn bộ
                    }
                  }}
                >
                  {/* Icon */}
                  <Box sx={{ mb: 3, height: 60, display: 'flex', alignItems: 'center' }}>
                    {IconComponent && (
                      <IconComponent 
                        className="experience-icon"
                        sx={{ 
                          fontSize: 50, 
                          color: 'text.primary',
                          transition: 'all 0.3s ease'
                        }} 
                      />
                    )}
                  </Box>
                  
                  {/* Title */}
                  <Typography 
                    variant="h6" 
                    sx={{
                      fontWeight: 600, 
                      fontSize: '.875rem', 
                      mb: 2,
                      letterSpacing: 0.5
                    }}
                  >
                    {exp.title}
                  </Typography>

                  {/* Description */}
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      mb: 3,
                      maxWidth: '280px', 
                      lineHeight: 1.6,
                      flexGrow: 1 
                    }}
                  >
                    {exp.desc}
                  </Typography>

                  {/* Link Text - Chứa hiệu ứng gạch chân */}
                  <Typography 
                    className="link-text"
                    variant="body1"
                    sx={{
                      fontWeight: 500,
                      fontSize: '0.95rem',
                      color: 'text.primary',
                      display: 'flex',
                      alignItems: 'center',
                      position: 'relative', // Bắt buộc để định vị đường gạch chân
                      width: 'fit-content', // Chỉ gạch chân đúng độ dài chữ
                      
                      // Tạo đường gạch chân giả
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '0%', // Ban đầu ẩn (độ rộng 0)
                        height: '1px', // Độ dày
                        bgcolor: TIFFANY_BLUE, // Màu #81d8d0
                        transition: 'width 0.4s ease-in-out', // Chạy từ từ
                      }
                    }}
                  >
                    {exp.linkText} <ArrowIcon />
                  </Typography>
                </Box>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default Experience;