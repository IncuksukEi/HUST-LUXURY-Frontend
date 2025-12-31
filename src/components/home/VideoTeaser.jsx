import React from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const MEDIA = {
  videoMp4: "video/VCA_DIAMOND BREEZE_MAJEURE DESKTOP_TEMPS 2_4000x2000.mp4",
  videoPoster: "https://media.tiffany.com/is/image/tiffanydm/2025_HOLIDAY_ATJ_AnthemVideo_16x9_1-2?$tile$&&hei=900",
};

const VideoTeaser = () => {
  return (
    <Box sx={{ width: '100%', overflow: 'hidden', bgcolor: '#fff', mb: 8 }}>
      <Grid container direction={{ xs: 'column', md: 'row' }}>
        {/* Video Section - Mobile: trên, Desktop: trái */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ position: 'relative', width: '100%', height: '100%', minHeight: { xs: '50vh', md: '75vh' } }}>
            {/* Hidden poster image for early LCP discovery */}
            <Box
              component="img"
              src={MEDIA.videoPoster}
              alt=""
              loading="eager"
              fetchPriority="high"
              decoding="async"
              aria-hidden="true"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '1px',
                height: '1px',
                opacity: 0,
                pointerEvents: 'none',
                zIndex: -1
              }}
            />
            <Box
              component="video"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              fetchPriority="high"
              poster={MEDIA.videoPoster}
              src={MEDIA.videoMp4}
              sx={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                display: 'block'
              }}
            />
          </Box>
        </Grid>

        {/* Text Section - Mobile: dưới, Desktop: phải */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box 
            sx={{ 
              height: { xs: 'auto', md: '100%' }, 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: { xs: 'flex-start', md: 'center' },
              alignItems: 'center',
              textAlign: 'center', 
              p: { xs: 4, sm: 6, md: 8 }, 
              bgcolor: '#fff',
              mx: 'auto',
              maxWidth: { md: '100%' }
            }}
          >
            <Typography 
              variant="h3" 
              sx={{ 
                mb: 2, 
                fontWeight: 600,
                fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem', lg: '3rem' },
                textAlign: 'center'
              }}
            >
              Nghệ Thuật Tặng Quà
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 4, 
                color: 'text.secondary', 
                lineHeight: 1.6,
                fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
                textAlign: 'center',
                maxWidth: '500px',
                mx: 'auto'
              }}
            >
              Tôn vinh mọi khía cạnh của những người bạn yêu thương với những thiết kế ý nghĩa trong dịp lễ này.
            </Typography>
            <Button
              component={RouterLink}
              to="/about"
              variant="outlined"
              sx={{
                borderColor: 'text.primary', 
                color: 'text.primary', 
                borderRadius: 0,
                px: { xs: 3, md: 4 }, 
                py: { xs: 1.25, md: 1.5 }, 
                textTransform: 'none', 
                fontSize: { xs: '0.875rem', md: '1rem' },
                '&:hover': { bgcolor: 'text.primary', color: 'white', borderColor: 'text.primary' }
              }}
            >
              Khám Phá Hướng Dẫn Quà Tặng
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VideoTeaser;