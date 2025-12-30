import React from 'react';
import { Box, Grid, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const BANNER_IMAGE_MOBILE = "/image/holiday-still.webp";
const BANNER_IMAGE_DESKTOP = "/image/holiday-still-desktop.webp";
const TIFFANY_BLUE = "#81d8d0"; // Khai báo biến màu cho tiện dùng

const ServiceBanner = () => {
  return (
    <Box component="section" sx={{ width: '100%', bgcolor: '#ffffff', overflow: 'hidden' }}>
      {/* --- MOBILE: Ảnh ở trên, text ở dưới --- */}
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <Box 
          sx={{ 
            position: 'relative', 
            width: '100%',
            minHeight: '400px',
            overflow: 'hidden',
          }}
        >
          <Box
            component="img"
            src={BANNER_IMAGE_MOBILE}
            alt="Tiffany Blue Boxes"
            loading="lazy"
            decoding="async"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center center',
              display: 'block',
              minHeight: '400px',
            }}
          />
        </Box>

        {/* Text ở dưới ảnh cho mobile */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            bgcolor: '#ffffff',
            p: { xs: 4, sm: 5 },
            mx: 'auto',
          }}
        >
          <Typography 
            variant="h4" 
            sx={{ 
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              color: 'text.primary',
              mb: 2,
              fontWeight: 600,
              lineHeight: 1.2,
              fontFamily: '"Times New Roman", Times, serif',
            }}
          >
            Discover Our Gifting <br /> Services
          </Typography>

          <Typography 
            variant="body1" 
            sx={{ 
              fontSize: { xs: '0.875rem', sm: '1rem' },
              color: 'text.secondary',
              mb: 4,
              lineHeight: 1.8,
              maxWidth: '500px',
              px: 1
            }}
          >
            From finding the perfect present to product personalization, 
            master the art of holiday gifting with a one-on-one in-store or 
            virtual appointment with a MAJewelry client advisor.
          </Typography>

          <Link 
            component={RouterLink} 
            to="/appointment" 
            underline="none"
            sx={{
              fontSize: { xs: '0.875rem', sm: '1rem' },
              fontWeight: 500,
              color: 'text.primary',
              display: 'inline-flex',
              alignItems: 'center',
              position: 'relative',
              transition: 'color 0.3s',
              '&::after': {
                content: '""',
                position: 'absolute',
                width: '0%',
                height: '2px',
                bottom: '-2px',
                left: 0,
                backgroundColor: TIFFANY_BLUE,
                transition: 'width 0.3s ease-in-out',
              },
              '&:hover': { 
                color: '#000',
                '&::after': {
                  width: '100%',
                }
              }
            }}
          >
            Book an Appointment <ChevronRightIcon sx={{ fontSize: '1.2em', ml: 0.5 }} />
          </Link>
        </Box>
      </Box>

      {/* --- DESKTOP: Ảnh full width với text overlay vào phần màu trắng --- */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <Box 
          sx={{ 
            position: 'relative', 
            width: '100%',
            minHeight: { md: '600px', lg: '750px', xl: '800px' },
            overflow: 'hidden',
          }}
        >
              <Box
                component="img"
                src={BANNER_IMAGE_DESKTOP}
                alt="Tiffany Blue Boxes"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center center',
                  display: 'block',
                  minHeight: { md: '600px', lg: '750px', xl: '800px' },
                }}
              />

          {/* Text overlay vào phần màu trắng trong ảnh (bên phải) */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: { md: '50%', lg: '45%', xl: '40%' },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: { md: 'center', lg: 'flex-start' },
              textAlign: { md: 'center', lg: 'left' },
              p: { md: 4, lg: 6, xl: 8 },
              pl: { md: 4, lg: 6, xl: 8 },
            }}
          >
            <Box
              sx={{
                maxWidth: { md: '100%', lg: '480px', xl: '520px' },
                width: '100%',
              }}
            >
              <Typography 
                variant="h4" 
                sx={{ 
                  fontSize: { md: '1.5rem', lg: '1.75rem', xl: '2rem' },
                  color: 'text.primary',
                  mb: { md: 2, lg: 3 },
                  fontWeight: 600,
                  lineHeight: 1.2,
                  fontFamily: '"Times New Roman", Times, serif',
                }}
              >
                Discover Our Gifting <br /> Services
              </Typography>

              <Typography 
                variant="body1" 
                sx={{ 
                  fontSize: { md: '1rem', lg: '1.125rem', xl: '1.25rem' },
                  color: 'text.secondary',
                  mb: { md: 4, lg: 5 },
                  lineHeight: 1.8,
                  maxWidth: '100%',
                }}
              >
                From finding the perfect present to product personalization, 
                master the art of holiday gifting with a one-on-one in-store or 
                virtual appointment with a MAJewelry client advisor.
              </Typography>

              <Link 
                component={RouterLink} 
                to="/appointment" 
                underline="none"
                sx={{
                  fontSize: { md: '0.95rem', lg: '1rem', xl: '1.1rem' },
                  fontWeight: 500,
                  color: 'text.primary',
                  display: 'inline-flex',
                  alignItems: 'center',
                  position: 'relative',
                  transition: 'color 0.3s',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '0%',
                    height: '2px',
                    bottom: '-2px',
                    left: 0,
                    backgroundColor: TIFFANY_BLUE,
                    transition: 'width 0.3s ease-in-out',
                  },
                  '&:hover': { 
                    color: '#000',
                    '&::after': {
                      width: '100%',
                    }
                  }
                }}
              >
                Book an Appointment <ChevronRightIcon sx={{ fontSize: '1.2em', ml: 0.5 }} />
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ServiceBanner;