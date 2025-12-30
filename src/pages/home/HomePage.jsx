import React from 'react';
import { Box } from '@mui/material';

// Import các component con
import VideoTeaser from '../../components/home/VideoTeaser';
import HighlightCategories from '../../components/home/HighlightCategories';
import ServiceBanner from '../../components/home/ServiceBanner';
import Experience from '../../components/home/Experience';

const HomePage = () => {
  return (
    <Box sx={{ bgcolor: '#fff', minHeight: '100vh', pb: 0 }}>
      <VideoTeaser />

      <HighlightCategories />

      <ServiceBanner />

      {/* <Experience /> */}
    </Box>
  );
};

export default HomePage;