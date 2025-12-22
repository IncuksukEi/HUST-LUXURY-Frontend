import React, { useState, useCallback, memo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Grid, Typography, Button, IconButton } from '@mui/material';
import { Play } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// --- ASSETS ---
// Sử dụng đúng link bạn cung cấp
const pearlNecklace = "https://jewel-react-preview.netlify.app/assets/pearl-necklace-B7UzmUJz.webp";
const rubyPendant = "https://jewel-react-preview.netlify.app/assets/ruby-pendant-BdKCyIs4.webp";
const videoSrc = "https://jewel-react-preview.netlify.app/assets/video-C7lmDvZ0.mp4";

// --- CONSTANTS ---
const GOLD_COLOR = '#D4AF37';

const About = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Scroll Animation Refs
  const titleRef = useScrollAnimation();
  const contentRef = useScrollAnimation();
  const visualRef = useScrollAnimation();

  const handlePlay = useCallback(() => setIsPlaying(true), []);

  return (
    <Box 
      component="section" 
      id="about" 
      sx={{ 
        py: { xs: 8, md: 12 }, 
        bgcolor: '#ffffff' // Nền trắng sạch
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={8} alignItems="center">
          
          {/* --- LEFT COLUMN: TEXT CONTENT --- */}
          {/* Sửa Grid item thành size cho MUI v6 */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box 
              ref={titleRef} 
              className="scroll-animate"
              sx={{ textAlign: { xs: 'center', md: 'left' } }}
            >
              <Typography 
                variant="overline" 
                sx={{ 
                  color: GOLD_COLOR, 
                  fontWeight: 600, 
                  letterSpacing: 3, 
                  mb: 2, 
                  display: 'block',
                  fontSize: '0.85rem'
                }}
              >
                OUR STORY
              </Typography>
              
              <Typography 
                variant="h2" 
                sx={{
                  fontFamily: 'MyLuxuryFont, serif',
                  fontWeight: 'bold', 
                  lineHeight: 1.2, 
                  mb: 4,
                  color: 'text.primary',
                  fontSize: { xs: '2.5rem', md: '3.5rem' }
                }}
              >
                TRADITION
                <br />
                CARED FOR
                <br />
                SINCE <Box component="span" sx={{ color: GOLD_COLOR }}>1998</Box>
              </Typography>

              <Box ref={contentRef} className="scroll-animate stagger-2">
                <Typography 
                  variant="body1" 
                  color="text.secondary" 
                  paragraph 
                  sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}
                >
                  Nam porttitor et felis ut dictum. Donec sapien ante, ultrices
                  nec urna ut, tempor tempus erat. Curabitur pharetra non libero
                  nec auctor.
                </Typography>
                <Typography 
                  variant="body1" 
                  color="text.secondary" 
                  paragraph 
                  sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}
                >
                  Sed quis molestie mauris.
                </Typography>
                
                <Button
                  component={RouterLink}
                  to="/about"
                  variant="outlined"
                  sx={{
                    mt: 3,
                    color: 'text.primary',
                    borderColor: GOLD_COLOR,
                    borderRadius: 0,
                    borderWidth: '1px',
                    px: 5, py: 1.2,
                    fontFamily: 'serif',
                    fontWeight: 600,
                    letterSpacing: 2,
                    '&:hover': { 
                      bgcolor: GOLD_COLOR, 
                      color: 'white', 
                      borderColor: GOLD_COLOR 
                    }
                  }}
                >
                  READ MORE
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* --- RIGHT COLUMN: VIDEO & IMAGE --- */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box 
              ref={visualRef}
              className="scroll-animate stagger-4" 
              sx={{ position: 'relative', mt: { xs: 4, md: 0 } }}
            >
              
              {/* Main Video Area */}
              <Box 
                onClick={!isPlaying ? handlePlay : undefined}
                sx={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '4/5',
                  bgcolor: '#f5f5f5',
                  borderRadius: 2,
                  overflow: 'hidden',
                  cursor: isPlaying ? 'default' : 'pointer',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)', // Đổ bóng sang trọng
                  '&:hover .play-button': { transform: 'scale(1.1)' }
                }}
              >
                {!isPlaying ? (
                  // --- TRẠNG THÁI CHỜ (THUMBNAIL) ---
                  <>
                    <Box 
                      component="img" 
                      src={pearlNecklace} 
                      alt="Heritage Video Thumbnail"
                      sx={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        transition: 'transform 0.5s',
                        '&:hover': { transform: 'scale(1.05)' }
                      }}
                    />
                    {/* Overlay tối */}
                    <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', bgcolor: 'rgba(0,0,0,0.2)' }} />
                    
                    {/* Nút Play */}
                    <Box 
                      sx={{ 
                        position: 'absolute', 
                        top: 0, left: 0, 
                        width: '100%', height: '100%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                      }}
                    >
                      <Box 
                        className="play-button"
                        sx={{ 
                          width: 80, height: 80, 
                          bgcolor: 'rgba(255,255,255,0.9)', 
                          borderRadius: '50%', 
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          transition: 'transform 0.3s ease',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                        }}
                      >
                        <Play size={32} fill={GOLD_COLOR} color={GOLD_COLOR} style={{ marginLeft: 4 }} />
                      </Box>
                    </Box>
                  </>
                ) : (
                  // --- TRẠNG THÁI PLAY (VIDEO HTML5) ---
                  // Sửa iframe thành video tag vì link là .mp4
                  <Box 
                    component="video"
                    src={videoSrc}
                    autoPlay
                    controls
                    loop
                    playsInline
                    sx={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover' 
                    }}
                  />
                )}
              </Box>

              {/* Decorative Overlay Image (Ảnh nhỏ chồng lên ở góc) */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -30,
                  right: { xs: 20, md: -40 }, // Lệch ra ngoài khung
                  width: { xs: 120, md: 180 },
                  height: { xs: 120, md: 180 },
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                  border: '6px solid white',
                  zIndex: 2
                }}
              >
                <Box 
                  component="img" 
                  src={rubyPendant} 
                  alt="Ruby Detail"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>

            </Box>
          </Grid>
        </Grid>

        {/* Divider cuối section */}
        <Box sx={{ mt: { xs: 8, md: 12 }, display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: 120, height: 2, bgcolor: GOLD_COLOR, opacity: 0.5 }} />
        </Box>
      </Container>
    </Box>
  );
};

export default memo(About);