import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';

const HeroSection = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '85vh', // Chiếm 85% chiều cao màn hình
        backgroundImage: 'url("https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2075&auto=format&fit=crop")', // Ảnh mẫu Luxury
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        '&::before': { // Lớp phủ tối để chữ dễ đọc hơn
          content: '""',
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.2)'
        }
      }}
    >
      <Container sx={{ position: 'relative', zIndex: 1, textAlign: 'center', color: '#fff' }}>
        <Typography 
            variant="h2" 
            sx={{ 
                fontFamily: 'MyLuxuryFont, serif', 
                fontWeight: 'bold', 
                mb: 2,
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)' 
            }}
        >
          ETERNAL ELEGANCE
        </Typography>
        <Typography 
            variant="h6" 
            sx={{ 
                fontFamily: 'serif', 
                mb: 4, 
                letterSpacing: 2,
                fontWeight: 300
            }}
        >
          Discover the new collection
        </Typography>
        <Button 
            variant="contained" 
            sx={{ 
                bgcolor: 'white', 
                color: 'black',
                borderRadius: 0,
                px: 5, py: 1.5,
                fontFamily: 'serif',
                letterSpacing: 1,
                '&:hover': { bgcolor: 'grey.200' }
            }}
        >
            EXPLORE NOW
        </Button>
      </Container>
    </Box>
  );
};

export default HeroSection;