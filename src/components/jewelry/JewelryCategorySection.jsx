import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const JewelryCategorySection = ({ data }) => {
    if (!data) return null;

    return (
        <Box sx={{ mb: 10, textAlign: 'center' }}>
            {/* 1. Tiêu đề Category Lớn */}
            <Typography 
                variant="h4" 
                sx={{ 
                    fontFamily: 'Sterling Display A', 
                    fontSize: { xs: '1.75rem', md: '2.5rem' }, 
                    mb: 5 
                }}
            >
                {data.label}
            </Typography>

            {/* 2. Grid Sub-items */}
            <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                justifyContent: 'center', 
                gap: { xs: 2, md: 4 } 
            }}>
                {data.subItems.map((item, index) => (
                    <Box 
                        key={index}
                        component={RouterLink} 
                        to={item.href || '#'}
                        sx={{ 
                            textDecoration: 'none',
                            color: 'text.primary',
                            width: { xs: '45%', sm: '200px', md: '220px' }, 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center',
                            cursor: 'pointer',
                            
                            // CHỈ CÒN HIỆU ỨNG GẠCH CHÂN CHỮ
                            '&:hover .name-underline': { width: '100%' }
                        }}
                    >
                        {/* Ảnh vuông (Không còn zoom) */}
                        <Box sx={{ 
                            width: '100%', 
                            paddingBottom: '100%', 
                            position: 'relative', 
                            bgcolor: '#f5f5f5', 
                            mb: 2, 
                            overflow: 'hidden' 
                        }}>
                            <Box 
                                component="img" 
                                src={item.image} 
                                alt={item.name} 
                                sx={{ 
                                    position: 'absolute', top: 0, left: 0, 
                                    width: '100%', height: '100%', 
                                    objectFit: 'cover'
                                }} 
                            />
                        </Box>

                        {/* Tên Sub-item (Có gạch chân động) */}
                        <Box sx={{ position: 'relative', display: 'inline-block', pb: 0.5 }}>
                            <Typography 
                                variant="body1" 
                                align="center" 
                                sx={{ 
                                    fontWeight: 600, 
                                    fontSize: { xs: '0.9rem', md: '1rem' },
                                    color: 'text.primary' 
                                }}
                            >
                                {item.name}
                            </Typography>

                            {/* Đường gạch chân Tiffany Blue */}
                            <Box 
                                className="name-underline"
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    height: '1px',
                                    bgcolor: '#81d8d0',    // MÀU TIFFANY BLUE
                                    width: '0%',           // Ban đầu ẩn
                                    transition: 'width 0.3s ease-in-out' // Hiện dần ra
                                }}
                            />
                        </Box>

                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default JewelryCategorySection;