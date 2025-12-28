import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Link } from '@mui/material';
import { ChevronRight } from 'lucide-react';

const JewelryCategoryDescription = ({ categoryData, otherCategories }) => {
    const { label, description, browseLinks } = categoryData;

    return (
        <Box sx={{ 
            px: { xs: 2, sm: 6.5, md: 6.5 }, 
            py: { xs: 4, sm: 6, md: 8 },
            bgcolor: '#fff'
        }}>
            <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
                {/* Heading */}
                <Typography 
                    variant="h2" 
                    component="h2" 
                    sx={{ 
                        fontFamily: 'Sterling Display A',
                        fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
                        fontWeight: 400,
                        mb: 3,
                        color: '#000',
                        lineHeight: 1.2
                    }}
                >
                    {label}
                </Typography>

                {/* Description */}
                {description && (
                    <Typography 
                        variant="body1" 
                        sx={{ 
                            fontSize: { xs: '0.875rem', md: '1rem' },
                            lineHeight: 1.8,
                            color: '#333',
                            mb: 4,
                            maxWidth: '900px'
                        }}
                    >
                        {description}
                    </Typography>
                )}

                {/* Browse Other Categories Links */}
                {browseLinks && browseLinks.length > 0 && (
                    <Box sx={{ 
                        display: 'flex', 
                        flexWrap: 'wrap',
                        gap: { xs: 2, md: 3 },
                        mt: 4,
                        pt: 3,
                        borderTop: '1px solid #e0e0e0'
                    }}>
                        {browseLinks.map((link, index) => (
                            <Link
                                key={index}
                                component={RouterLink}
                                to={link.href}
                                underline="none"
                                sx={{
                                    fontSize: { xs: '0.875rem', md: '0.95rem' },
                                    fontWeight: 400,
                                    color: '#000',
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
                                        '&::after': {
                                            width: '100%'
                                        }
                                    },
                                    '& svg': { 
                                        transition: 'transform 0.3s',
                                        marginLeft: 2
                                    },
                                    '&:hover svg': { 
                                        transform: 'translateX(4px)' 
                                    }
                                }}
                            >
                                {link.label}
                                <ChevronRight size={16} strokeWidth={2} />
                            </Link>
                        ))}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default JewelryCategoryDescription;

