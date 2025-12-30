import React from 'react';
import { Box, Typography } from '@mui/material';

const JewelryPageHeader = ({ title, description }) => {
    return (
        <Box sx={{
            mb: 4,
            px: { xs: 2, sm: 6.5, md: 6.5 }
        }}>
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" component="h1" sx={{ 
                    fontFamily: 'Sterling Display A', 
                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }, 
                    mb: 1.5 
                }}>
                    {title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ 
                    mx: 'auto', 
                    fontSize: { xs: '0.75rem', md: '0.875rem' }, 
                    mb: 1.75, 
                    maxWidth: '600px' 
                }}>
                    {description}
                </Typography>
            </Box>
        </Box>
    );
};

export default JewelryPageHeader;

