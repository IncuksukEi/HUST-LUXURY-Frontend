import React from 'react';
import { Box, Container, Grid, Typography, Stack } from '@mui/material'; // Thêm Stack
import { Link as RouterLink } from 'react-router-dom';

import { 
  Inventory2Outlined,       
  RoomServiceOutlined,     
  CalendarTodayOutlined,   
  CardGiftcardOutlined     
} from '@mui/icons-material';

const TIFFANY_BLUE = '#81d8d0'; 

// Icon mũi tên nhỏ
const ArrowIcon = () => (
  <Box component="span" sx={{ fontSize: '1.2em', ml: 0.5, lineHeight: 1 }}>›</Box>
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
    // 1. GIẢM MARGIN: Giảm py từ 10 xuống 6 (hoặc 5 nếu muốn nhỏ hơn nữa)
    <Box component="section" sx={{ py: { xs: 5, md: 6 }, bgcolor: 'rgb(250, 250, 250)' }}>
      <Container maxWidth="xl">
        <Typography 
          variant="h4" 
          align="center" 
          sx={{
            mb: 6, // Giảm margin-bottom của tiêu đề cho gần nội dung hơn (cũ là 8)
            fontFamily: 'serif',
            fontSize: { xs: '1.5rem', md: '2rem' },
            fontWeight: 600,
            letterSpacing: 1
          }}
        >
          The MAJewelry Experience
        </Typography>

        {/* 2. CÂN BẰNG KHOẢNG CÁCH: spacing={4} giúp khoảng cách giữa 4 cột đều nhau */}
        <Grid container spacing={4} justifyContent="center" alignItems="stretch">
          {EXPERIENCES.map((exp, index) => {
            const IconComponent = exp.icon;
            
            return (
              <Grid item xs={12} sm={6} md={3} key={index} sx={{ display: 'flex' }}>
                <Box
                  component={RouterLink}
                  to={exp.path}
                  sx={{
                    textDecoration: 'none', 
                    color: 'text.primary',
                    width: '100%',
                    height: '100%',
                    cursor: 'pointer',
                    
                    // Sử dụng Flex column để canh chỉnh
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    
                    // Padding trong để nội dung không bị sát
                    p: 2, 
                    
                    '&:hover .link-text::after': { width: '100%' }
                  }}
                >
                  {/* Sử dụng Stack để kiểm soát khoảng cách dọc đều nhau */}
                  <Stack spacing={2} alignItems="center" sx={{ height: '100%', width: '100%' }}>
                    
                    {/* ICON: Cố định chiều cao để thẳng hàng */}
                    <Box sx={{ height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {IconComponent && (
                        <IconComponent sx={{ fontSize: 32, color: 'text.primary' }} />
                      )}
                    </Box>
                    
                    {/* TITLE */}
                    <Typography 
                      variant="h6" 
                      sx={{
                        fontWeight: 600, 
                        fontSize: '1rem', 
                        letterSpacing: 0.5,
                        minHeight: '2.5rem', // Giữ chỗ cho tiêu đề 2 dòng
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {exp.title}
                    </Typography>

                    {/* DESCRIPTION */}
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        fontWeight: 400,
                        lineHeight: 1.6,
                        maxWidth: '280px', 
                        flexGrow: 1, // Đẩy Link xuống đáy
                      }}
                    >
                      {exp.desc}
                    </Typography>

                    {/* LINK TEXT */}
                    <Box>
                      <Typography 
                        className="link-text"
                        variant="body1"
                        sx={{
                          fontWeight: 400,
                          fontSize: '0.875rem',
                          color: 'text.primary',
                          display: 'inline-flex',
                          alignItems: 'center',
                          position: 'relative',
                          transition: 'color 0.3s',
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: -2,
                            left: 0,
                            width: '0%', 
                            height: '1px', 
                            bgcolor: TIFFANY_BLUE, 
                            transition: 'width 0.3s ease-in-out',
                          }
                        }}
                      >
                        {exp.linkText} <ArrowIcon />
                      </Typography>
                    </Box>
                  </Stack>
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