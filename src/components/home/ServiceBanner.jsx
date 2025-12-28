import React from 'react';
import { Box, Grid, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const BANNER_IMAGE = "//media.tiffany.com/is/image/tiffanydm/2025_HOLIDAY_STILL_FWMH_BB1_Desktop-1?$tile$&wid=2992&fmt=webp";
const TIFFANY_BLUE = "#81d8d0"; // Khai báo biến màu cho tiện dùng

const ServiceBanner = () => {
  return (
    <Box component="section" sx={{ width: '100%', bgcolor: '#ffffff', overflow: 'hidden' }}>
      <Grid container alignItems="stretch">
        
        {/* --- CỘT TRÁI: HÌNH ẢNH --- */}
        <Grid 
          size={{ xs: 12, md: 6 }} 
          sx={{ 
            position: 'relative', 
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
              objectPosition: 'left center', 
              display: 'block',
              position: 'absolute',
              inset: 0,
            }}
          />
        </Grid>

        {/* --- CỘT PHẢI: NỘI DUNG --- */}
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
              p: { xs: 6, md: 8 }, 
            }}
          >
            <Typography 
              variant="h4" 
              sx={{ 
                fontSize: { xs: '1rem', md: '1.5rem', lg: '1.5rem' },
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

            {/* --- PHẦN LINK ĐÃ SỬA --- */}
            <Link 
              component={RouterLink} 
              to="/appointment" 
              underline="none" // 1. Tắt gạch chân mặc định
              sx={{
                fontSize: '1.1rem',
                fontWeight: 500,
                color: 'text.primary',
                display: 'inline-flex', // Dùng inline-flex để gạch chân vừa khít với nội dung
                alignItems: 'center',
                position: 'relative', // 2. Để định vị đường kẻ
                transition: 'color 0.3s',
                
                // 3. Tạo đường gạch chân ảo
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: '0%', // Ban đầu độ rộng bằng 0
                  height: '2px', // Độ dày
                  bottom: '-2px', // Khoảng cách so với chữ (chỉnh số âm để đẩy xuống)
                  left: 0,
                  backgroundColor: TIFFANY_BLUE, // Màu xanh Tiffany
                  transition: 'width 0.3s ease-in-out', // Hiệu ứng trượt
                },

                // 4. Khi Hover
                '&:hover': { 
                  color: '#000', // Đổi màu chữ (nếu muốn)
                  '&::after': {
                    width: '100%', // Đường gạch chân chạy ra 100%
                  }
                }
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