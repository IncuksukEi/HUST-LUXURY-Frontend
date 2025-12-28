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
    image: 'https://media.tiffany.com/is/image/tiffanydm/2025_HOLIDAY_STILL_1x1_37-1?$tile$&wid=988&hei=988&fmt=webp' 
  },
  { 
    title: 'Diamond Jewelry', 
    image: 'https://media.tiffany.com/is/image/tiffanydm/2025_HOLIDAY_STILL_1x1_11-2?$tile$&wid=988&hei=988&fmt=webp' 
  },
  { 
    title: 'Gold Jewelry', 
    image: 'https://media.tiffany.com/is/image/tiffanydm/2025_HOLIDAY_STILL_1x1_4-3?$tile$&wid=988&hei=988&fmt=webp' 
  },
];

const HighlightCategories = () => {
  return (
    <Container maxWidth="xl" sx={{ mb: 10, mt: 8 }}>
      <Typography variant="h4" align="center" sx={{ mb: 6, fontWeight: 600, fontSize: { xs: '1rem', sm: '1.5rem' } }}>
        Find the Perfect Gift
      </Typography>
      
      <Grid container spacing={4}>
        {ITEMS.map((item) => (
          <Grid size={{ xs: 12, md: 4 }} key={item.title}>
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
                  mb: 2,
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
              <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                <Typography 
                  className="title-text" 
                  variant="h6" 
                  sx={{
                    fontWeight: 400,
                    fontSize: { xs: '0.5rem', sm: '0.875rem' },
                    letterSpacing: 1,
                    position: 'relative', 
                    width: 'fit-content', 
                    pb: 0.5,
                    
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
                  sx={{ transition: 'color 0.3s' }} 
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