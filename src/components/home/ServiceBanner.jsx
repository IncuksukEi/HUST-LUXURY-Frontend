import React from 'react';
import { Box, Grid, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const BANNER_IMAGE = "//media.tiffany.com/is/image/tiffanydm/2025_HOLIDAY_STILL_FWMH_BB1_Desktop-1?$tile$&wid=2992&fmt=webp";

const ServiceBanner = () => {
  return (
    <Box component="section" sx={{ width: '100%', bgcolor: '#ffffff', overflow: 'hidden' }}>
      <Grid container alignItems="stretch">
        
        {/* --- CỘT TRÁI: HÌNH ẢNH --- */}
        <Grid 
          size={{ xs: 12, md: 6 }} 
          sx={{ 
            position: 'relative', 
            // --- FIX: Tăng chiều cao khung ảnh thực tế ---
            // md: '750px' -> Giúp ảnh hiển thị cao, to, rõ ràng như poster
            minHeight: { xs: '450px', md: '750px' }, 
          }}
        >
          <Box
            component="img"
            src={BANNER_IMAGE}
            alt="Tiffany Blue Boxes"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              // Giữ nguyên left center để thấy hộp quà
              objectPosition: 'left center', 
              display: 'block',
              position: 'absolute',
              inset: 0,
              // Đã xóa transform: scale(...)
            }}
          />
        </Grid>

        {/* --- CỘT PHẢI: NỘI DUNG (Giãn theo chiều cao ảnh) --- */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              height: '100%',
              bgcolor: '#ffffff',
              // Padding vừa phải để nội dung tập trung ở giữa
              p: { xs: 6, md: 8 }, 
            }}
          >
            <Typography 
              variant="h4" 
              sx={{ 
                fontSize: { xs: '1rem', md: '1.5rem', lg: '1.5rem' }, // Tăng cỡ chữ lên cho cân xứng với ảnh to
                color: 'text.primary',
                mb: 3,
                fontWeight: 600,
                lineHeight: 1.2
              }}
            >
              Discover Our Gifting <br /> Services
            </Typography>

            <Typography 
              variant="body1" 
              sx={{ 
                fontSize: { xs: '1rem', md: '1.1rem' },
                color: 'text.secondary',
                mb: 5,
                lineHeight: 1.8,
                maxWidth: '500px'
              }}
            >
              From finding the perfect present to product personalization, 
              master the art of holiday gifting with a one-on-one in-store or 
              virtual appointment with a MAJewelry client advisor.
            </Typography>

            <Link 
              component={RouterLink} 
              to="/appointment" 
              underline="hover" 
              sx={{
                fontSize: '1.1rem',
                fontWeight: 500,
                color: 'text.primary',
                display: 'flex',
                alignItems: 'center',
                transition: 'color 0.3s',
                '&:hover': { color: '#81d8d0' }
              }}
            >
              Book an Appointment <ChevronRightIcon sx={{ fontSize: '1.2em', ml: 0.5 }} />
            </Link>
          </Box>
        </Grid>

      </Grid>
    </Box>
  );
};

export default ServiceBanner;