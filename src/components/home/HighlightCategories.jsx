import React from 'react';
import { Box, Container, Grid, Typography, Stack, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const GOLD_COLOR = '#D4AF37'; // Vẫn giữ nếu cần dùng cho chỗ khác
const TIFFANY_BLUE = '#81d8d0'; // Màu xanh chủ đạo cho hover

// Dữ liệu ảnh
const ITEMS = [
  { 
    title: 'Gifts for Her', 
    image: '/image/gfh-hp.webp' 
  },
  { 
    title: 'Diamond Jewelry', 
    image: '/image/diamond-hp.webp' 
  },
  { 
    title: 'Gold Jewelry', 
    image: '/image/gold-hp.webp' 
  },
];

const HighlightCategories = () => {
  return (
    <Container 
      maxWidth="xl" 
      sx={{ 
        mb: { xs: 6, md: 10 }, 
        mt: { xs: 4, md: 8 },
        px: { xs: 2, sm: 3, md: 4 }
      }}
    >
      <Typography 
        variant="h4" 
        align="center" 
        sx={{ 
          mb: { xs: 4, md: 6 }, 
          fontWeight: 600, 
          fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem', lg: '2rem' },
          fontFamily: '"Times New Roman", Times, serif'
        }}
      >
        Find the Perfect Gift
      </Typography>
      
      <Grid container spacing={{ xs: 3, sm: 4, md: 4 }}>
        {ITEMS.map((item) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.title}>
            <Link 
              component={RouterLink} 
              to="/shop" 
              underline="none" 
              sx={{ 
                display: 'block', 
                color: 'text.primary',
                
                '&:hover .category-image': { transform: 'scale(1.05)' },
                
                '&:hover .arrow-icon': { color: TIFFANY_BLUE },
                
                '&:hover .title-text::after': { width: '100%' }
              }}
            >
              <Box 
                sx={{ 
                  position: 'relative', 
                  mb: { xs: 1.5, md: 2 },
                  width: '100%',
                  aspectRatio: '1/1', 
                  overflow: 'hidden', 
                  bgcolor: '#f5f5f5'
                }}
              >
                <Box 
                  component="img"
                  src={item.image}
                  alt={item.title}
                  className="category-image"
                  loading="lazy"
                  decoding="async"
                  sx={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover', 
                    display: 'block',
                    transition: 'transform 0.6s ease',
                  }} 
                />
              </Box>
              
              {/* Tiêu đề và mũi tên */}
              <Stack 
                direction="row" 
                justifyContent="center" 
                alignItems="center" 
                spacing={{ xs: 0.5, sm: 1 }}
              >
                <Typography 
                  className="title-text" 
                  variant="h6" 
                  sx={{
                    fontWeight: 400,
                    fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
                    letterSpacing: { xs: 0.5, sm: 1 },
                    position: 'relative', 
                    width: 'fit-content', 
                    pb: 0.5,
                    textAlign: 'center',
                    
                    // Đường gạch chân giả
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: '0%', 
                      height: '1px', 
                      bottom: 0,
                      left: 0,
                      backgroundColor: TIFFANY_BLUE, 
                      transition: 'width 0.4s ease-in-out', 
                    }
                  }}
                >
                  {item.title}
                </Typography>
                
                {/* Icon mũi tên */}
                <ChevronRightIcon 
                  className="arrow-icon" 
                  sx={{ 
                    transition: 'color 0.3s',
                    fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' }
                  }} 
                />
              </Stack>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HighlightCategories;