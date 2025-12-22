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
      {/* 1. Video Teaser Section */}
      <VideoTeaser />

      {/* 2. Highlight Categories Section */}
      <HighlightCategories />

      {/* 3. Service Banner Section */}
      <ServiceBanner />

      {/* 4. Experience Section */}
      <Experience />
    </Box>
  );
};

export default HomePage;