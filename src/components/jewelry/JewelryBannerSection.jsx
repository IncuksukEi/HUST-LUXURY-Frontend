import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Link, Grid } from '@mui/material';
import { ChevronRight } from 'lucide-react';

const JewelryBannerSection = ({ data }) => {
    const { title, description, linkText, href, image } = data;

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
            {/* 1. Ảnh nền (Chỉ hiển thị full-width trên Desktop) */}
            <Box
                component="img"
                src={image}
                alt={title}
                sx={{
                    display: { xs: 'none', md: 'block' },
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '100%',
                    objectFit: 'cover', 
                    objectPosition: 'center right', 
                    zIndex: 0
                }}
            />

            {/* 2. Ảnh riêng cho Mobile */}
            <Box
                component="img"
                src={image}
                alt={title}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    width: '100%',
                    height: 'auto',
                    aspectRatio: '4/3',
                    objectFit: 'cover',
                    objectPosition: 'center right'
                }}
            />

            {/* 3. Grid container chứa Text */}
            <Grid
                container
                sx={{
                    position: { xs: 'static', md: 'relative' },
                    zIndex: 1,
                    height: '100%',
                    alignItems: 'center'
                }}
            >
                {/* Cột Text */}
                <Grid
                    item
                    xs={12} md={6}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: { xs: 'center', md: 'center' },
                        p: { xs: 4, md: 4 },
                        pr: { md: 8 },
                        bgcolor: { xs: '#fff', md: 'transparent' }
                    }}
                >
                    <Box sx={{
                        maxWidth: '450px',
                        textAlign: { xs: 'center', md: 'center' },
                        width: '100%'
                    }}>
                        <Typography
                            variant="h3"
                            component="h2"
                            sx={{
                                fontSize: { xs: '1rem', md: '1.5rem' },
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
                                fontSize: { xs: '0.875rem', md: '0.875rem' },
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
                </Grid>

                {/* Cột trống bên phải (Desktop only) */}
                <Grid item xs={0} md={6} sx={{ display: { xs: 'none', md: 'block' } }} />
            </Grid>
        </Box>
    );
};

export default JewelryBannerSection;

