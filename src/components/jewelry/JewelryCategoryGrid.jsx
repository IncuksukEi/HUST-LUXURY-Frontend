import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Link } from '@mui/material';
import { ChevronRight } from 'lucide-react';

const JewelryCategoryGrid = ({ categories, title = "Browse by Category", description = "Explore our iconic jewelry designs." }) => {
    return (
        <Box sx={{ px: { xs: 2, sm: 6.5, md: 6.5 }, py: { xs: 2, sm: 6.5, md: 6.5 } }}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography variant="h3" component="h2" sx={{ 
                    fontSize: { xs: '0.875rem', sm: '1rem', md: '1.5rem' }, 
                    mb: 1.5, 
                    fontWeight: 600 
                }}>
                    {title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ 
                    mx: 'auto', 
                    fontSize: { xs: '0.875rem', md: '1rem' }, 
                    maxWidth: 600 
                }}>
                    {description}
                </Typography>
            </Box>

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(4, 1fr)' },
                gap: 3,
            }}>
                {categories.map((cat, index) => (
                    <Box
                        key={index}
                        component={RouterLink}
                        to={cat.href}
                        sx={{
                            textDecoration: 'none',
                            color: 'text.primary',
                            display: 'block',
                            '&:hover .cat-underline': { width: '100%' }
                        }}
                    >
                        <Box sx={{
                            width: '100%',
                            paddingBottom: '100%',
                            position: 'relative',
                            overflow: 'hidden',
                            mb: 2,
                            bgcolor: '#f5f5f5'
                        }}>
                            <Box
                                component="img"
                                src={cat.image}
                                alt={cat.label}
                                sx={{
                                    position: 'absolute',
                                    top: 0, left: 0, width: '100%', height: '100%',
                                    objectFit: 'cover',
                                    transition: 'transform 0.6s'
                                }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography
                                variant="h6"
                                align="center"
                                sx={{
                                    fontWeight: 600,
                                    fontSize: { xs: '1rem', md: '1.125rem' },
                                    pb: 1.125,
                                    color: 'text.primary'
                                }}
                            >
                                {cat.label}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Link
                                component={RouterLink}
                                to={cat.href}
                                underline="none"
                                sx={{
                                    fontSize: '0.875rem',
                                    fontWeight: 400,
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
                                        color: 'text.primary',
                                        '&::after': {
                                            width: '100%'
                                        }
                                    },
                                    '& svg': { transition: 'transform 0.3s' },
                                    '&:hover svg': { transform: 'translateX(3px)' }
                                }}
                            >
                                Browse Now <ChevronRight size={16} strokeWidth={2} />
                            </Link>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default JewelryCategoryGrid;

