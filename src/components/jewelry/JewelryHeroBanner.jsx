import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Link } from '@mui/material';
import { ChevronRight } from 'lucide-react';

const JewelryHeroBanner = ({ data }) => {
    const { title, subtitle, description, image, imageMobile, href } = data;
    const displayImage = imageMobile || image; // Fallback to image if imageMobile not provided

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: { xs: '60vh', md: '90vh' },
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start'
            }}
        >
            {/* Hình nền - Mobile */}
            {imageMobile && (
                <Box
                    component="img"
                    src={imageMobile}
                    alt={subtitle}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        width: '100%', 
                        height: '100%',
                        objectFit: 'cover', 
                        zIndex: 0
                    }}
                />
            )}
            
            {/* Hình nền - Desktop */}
            <Box
                component="img"
                src={image}
                alt={subtitle}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                sx={{
                    display: { xs: imageMobile ? 'none' : 'block', md: 'block' },
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '100%',
                    objectFit: 'cover', 
                    zIndex: 0
                }}
            />

            {/* Lớp phủ tối */}
            <Box
                sx={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    bgcolor: 'rgba(0, 0, 0, 0.2)', zIndex: 1
                }}
            />

            {/* Nội dung Text Overlay */}
            <Box
                sx={{
                    position: 'relative',
                    zIndex: 2,
                    textAlign: 'left',
                    color: '#fff',
                    pl: { xs: 4, sm: 6.5, md: 10, lg: 15 },
                    pr: 4,
                    maxWidth: '600px'
                }}
            >
                <Typography variant="overline" sx={{ 
                    letterSpacing: 2, 
                    mb: 1, 
                    display: 'block', 
                    fontSize: { xs: '0.7rem', md: '0.8rem' }, 
                    fontWeight: 600 
                }}>
                    {title}
                </Typography>
                <Typography variant="h2" sx={{ 
                    fontFamily: 'serif', 
                    mb: 2, 
                    fontSize: { xs: '2rem', md: '3rem' }, 
                    lineHeight: 1.1, 
                    fontWeight: 400 
                }}>
                    {subtitle}
                </Typography>
                <Typography variant="body1" sx={{ 
                    mb: 4, 
                    fontSize: { xs: '0.9rem', md: '1rem' }, 
                    lineHeight: 1.6, 
                    textShadow: '0px 2px 4px rgba(0,0,0,0.5)' 
                }}>
                    {description}
                </Typography>

                <Link
                    component={RouterLink}
                    to={href}
                    underline="none"
                    sx={{
                        color: '#000',
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: 1, 
                        position: 'relative',
                        fontWeight: 600, 
                        fontSize: '0.95rem', 
                        letterSpacing: 0.5, 
                        px: 0, 
                        py: 1,
                        '&::after': {
                            content: '""', 
                            position: 'absolute', 
                            bottom: 4, 
                            left: 0, 
                            width: '0%', 
                            height: '1px', 
                            bgcolor: '#81d8d0', 
                            transition: 'width 0.3s ease-in-out'
                        },
                        '&:hover': {
                            color: '#000',
                            '&::after': { width: '100%' }
                        },
                        '& svg': { transition: 'transform 0.3s ease' },
                        '&:hover svg': { transform: 'translateX(4px)' }
                    }}
                >
                    Shop the Collection <ChevronRight size={18} strokeWidth={2} />
                </Link>
            </Box>
        </Box>
    );
};

export default JewelryHeroBanner;

