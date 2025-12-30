import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Link, Grid } from '@mui/material';
import { ChevronRight } from 'lucide-react';

const JewelryBannerSection = ({ data }) => {
    const { title, description, linkText, href, image, imageMobile } = data;
    const displayImage = imageMobile || image; // Fallback to image if imageMobile not provided

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: { xs: 'auto', md: '700px' },
                overflow: 'hidden',
                bgcolor: '#fff'
            }}
        >
            {/* Desktop: Ảnh full-width làm background */}
            <Box
                component="img"
                src={image}
                alt={title}
                loading="lazy"
                decoding="async"
                sx={{
                    display: { xs: 'none', md: 'block' },
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '100%',
                    objectFit: 'cover', 
                    objectPosition: 'center',
                    zIndex: 0
                }}
            />

            {/* Mobile: Ảnh ở trên */}
            <Box
                component="img"
                src={displayImage}
                alt={title}
                loading="lazy"
                decoding="async"
                sx={{
                    display: { xs: 'block', md: 'none' },
                    width: '100%',
                    height: 'auto',
                    aspectRatio: '4/3',
                    objectFit: 'cover',
                    objectPosition: 'center'
                }}
            />

            {/* Desktop: Text overlay trên phần màu trắng trong ảnh */}
            <Box
                sx={{
                    display: { xs: 'none', md: 'flex' },
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 1,
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                }}
            >
                <Box
                    sx={{
                        maxWidth: { md: '450px', lg: '500px' },
                        textAlign: 'center',
                        pl: { md: 6, lg: 8, xl: 10 },
                        pr: { md: 4, lg: 6 },
                        py: { md: 4, lg: 6 }
                    }}
                >
                    <Typography
                        variant="h3"
                        component="h2"
                        sx={{
                            fontSize: { md: '1.5rem', lg: '2rem' },
                            fontWeight: 600,
                            mb: { md: 1.25, lg: 1.5 },
                            lineHeight: 1.2,
                            color: '#000'
                        }}
                    >
                        {title}
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            color: 'text.secondary',
                            mb: { md: 1.75, lg: 2 },
                            fontSize: { md: '0.875rem', lg: '1rem' },
                            lineHeight: 1.7
                        }}
                    >
                        {description}
                    </Typography>

                    <Link
                        component={RouterLink}
                        to={href}
                        underline="none"
                        sx={{
                            color: '#000',
                            fontSize: { md: '0.95rem', lg: '1rem' },
                            fontWeight: 600,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 0.5,
                            position: 'relative',
                            '&::after': {
                                content: '""', 
                                position: 'absolute', 
                                bottom: -2, 
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
                            '& svg': { transition: 'transform 0.3s' },
                            '&:hover svg': { transform: 'translateX(4px)' }
                        }}
                    >
                        {linkText} <ChevronRight size={18} strokeWidth={2} />
                    </Link>
                </Box>
            </Box>

            {/* Mobile: Text ở dưới ảnh */}
            <Box
                sx={{
                    display: { xs: 'block', md: 'none' },
                    bgcolor: '#fff',
                    px: 4,
                    py: 4,
                    textAlign: 'center'
                }}
            >
                <Typography
                    variant="h3"
                    component="h2"
                    sx={{
                        fontSize: '1rem',
                        fontWeight: 600,
                        mb: 1.25,
                        lineHeight: 1.2,
                        color: '#000'
                    }}
                >
                    {title}
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        color: 'text.secondary',
                        mb: 1.75,
                        fontSize: '0.875rem',
                        lineHeight: 1.7
                    }}
                >
                    {description}
                </Typography>

                <Link
                    component={RouterLink}
                    to={href}
                    underline="none"
                    sx={{
                        color: '#000',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 0.5,
                        position: 'relative',
                        '&::after': {
                            content: '""', 
                            position: 'absolute', 
                            bottom: -2, 
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
                        '& svg': { transition: 'transform 0.3s' },
                        '&:hover svg': { transform: 'translateX(4px)' }
                    }}
                >
                    {linkText} <ChevronRight size={18} strokeWidth={2} />
                </Link>
            </Box>
        </Box>
    );
};

export default JewelryBannerSection;

