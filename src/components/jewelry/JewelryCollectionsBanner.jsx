import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Link } from '@mui/material';
import { ChevronRight } from 'lucide-react';

const JewelryCollectionsBanner = ({ data }) => {
    const { title, description, linkText, href, image } = data;

    return (
        <Box
            sx={{
                position: 'relative', 
                width: '100%',
                height: { xs: 'auto', lg: '500px' },
                overflow: 'hidden',
                mt: { xs: 2, lg: 6.5 }
            }}
        >
            <Box
                component="img"
                src={image}
                alt={title}
                sx={{
                    position: { xs: 'relative', lg: 'absolute' },
                    top: 0, 
                    left: 0,
                    width: '100%',
                    height: { xs: 'auto', lg: '100%' },
                    aspectRatio: { xs: '16/9', lg: 'unset' },
                    objectFit: 'cover',
                    objectPosition: 'center',
                    zIndex: 0
                }}
            />

            <Box
                sx={{
                    position: { xs: 'relative', lg: 'absolute' },
                    zIndex: 1,
                    height: { xs: 'auto', lg: '100%' },
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: { xs: 'center', lg: 'flex-start' },
                    textAlign: { xs: 'center', lg: 'left' },
                    bgcolor: { xs: '#fff', lg: 'transparent' },
                    p: { xs: 6, lg: 0 },
                    pl: { lg: 15 },
                    pb: { xs: 8, lg: 0 }
                }}
            >
                <Box sx={{ maxWidth: '450px', textAlign: 'center', mx: { xs: 'auto', lg: 0 } }}>
                    <Typography variant="h3" component="h2" sx={{ 
                        fontSize: { xs: '1rem', md: '1.5rem' }, 
                        lineHeight: 1.2, 
                        color: '#000', 
                        fontWeight: 600 
                    }}>
                        {title}
                    </Typography>
                    <Typography variant="body1" sx={{ 
                        color: 'text.secondary', 
                        mb: 1.75, 
                        mt: 1.25, 
                        fontSize: { xs: '0.875rem', md: '0.875rem' }, 
                        lineHeight: 1.7 
                    }}>
                        {description}
                    </Typography>
                    <Link 
                        component={RouterLink} 
                        to={href} 
                        underline="none" 
                        sx={{
                            color: '#000', 
                            fontSize: '0.875rem', 
                            fontWeight: 500, 
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
        </Box>
    );
};

export default JewelryCollectionsBanner;

