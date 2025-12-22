import React from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const MEDIA = {
  videoMp4: "//media.tiffany.com/is/content/tiffanydm/2025_HOLIDAY_ATJ_AnthemVideo_16x9_1-3",
  videoPoster: "//media.tiffany.com/is/image/tiffanydm/2025_HOLIDAY_ATJ_AnthemVideo_16x9_1-2?$tile$&&hei=900",
};

const VideoTeaser = () => {
  return (
    <Box sx={{ width: '100%', overflow: 'hidden', bgcolor: '#fff', mb: 8 }}>
      <Grid container>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ position: 'relative', width: '100%', height: '100%', minHeight: { xs: '50vh', md: '75vh' } }}>
            <Box
              component="video"
              autoPlay
              muted
              loop
              playsInline
              poster={MEDIA.videoPoster}
              src={MEDIA.videoMp4}
              sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Box 
            sx={{ 
              height: '100%', display: 'flex', flexDirection: 'column', 
              justifyContent: 'center', alignItems: { xs: 'center', md: 'flex-start' },
              textAlign: { xs: 'center', md: 'left' }, p: { xs: 6, md: 8 }, bgcolor: '#fff' 
            }}
          >
            <Typography variant="h3" sx={{ mb: 2, fontWeight: 600 }}>
              The Art of Gifting
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', lineHeight: 1.6 }}>
              Celebrate every facet of the ones you love with meaningful designs this holiday.
            </Typography>
            <Button
              component={RouterLink}
              to="/gifts"
              variant="outlined"
              sx={{
                borderColor: 'text.primary', color: 'text.primary', borderRadius: 0,
                px: 4, py: 1.5, textTransform: 'none', fontSize: '1rem',
                '&:hover': { bgcolor: 'text.primary', color: 'white', borderColor: 'text.primary' }
              }}
            >
              Explore the Gift Guide
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VideoTeaser;