import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    Button,
    Grid,
    Stack,
    TextField,
    Divider,
    CircularProgress,
    Alert,
    Snackbar,
} from '@mui/material';
import axiosClient from '../api/axiosClient';

function Checkout() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [checkoutItems, setCheckoutItems] = useState([]);
    const [address, setAddress] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    // Load checkout items from sessionStorage
    useEffect(() => {
        const items = sessionStorage.getItem('checkoutItems');
        if (!items) {
            navigate('/cart');
            return;
        }

        try {
            const parsedItems = JSON.parse(items);
            if (parsedItems.length === 0) {
                navigate('/cart');
                return;
            }
            setCheckoutItems(parsedItems);
        } catch (err) {
            console.error('Error parsing checkout items:', err);
            navigate('/cart');
        }

        setLoading(false);
    }, [navigate]);

    // Calculate totals
    const subtotal = checkoutItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const shipping = 0;
    const total = subtotal + shipping;

    // Handle order submission
    const handlePlaceOrder = async () => {
        if (!address.trim()) {
            setSnackbar({
                open: true,
                message: 'Please enter a delivery address',
                severity: 'warning',
            });
            return;
        }

        setSubmitting(true);

        try {
            // Prepare order data for API
            const orderData = {
                address: address.trim(),
                items: checkoutItems.map((item) => ({
                    productId: item.id,
                    name: item.name,
                    description: item.description || '',
                    urlImg: item.image,
                    quantity: item.quantity,
                    price: item.price,
                })),
            };

            await axiosClient.post('/orders', orderData);

            // Clear checkout items from session
            sessionStorage.removeItem('checkoutItems');

            setSnackbar({
                open: true,
                message: 'Order placed successfully!',
                severity: 'success',
            });

            // Redirect to orders page after delay
            setTimeout(() => {
                navigate('/account/orders');
            }, 2000);
        } catch (err) {
            console.error('Error placing order:', err);
            setSnackbar({
                open: true,
                message: 'Failed to place order. Please try again.',
                severity: 'error',
            });
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: 400,
                }}
            >
                <CircularProgress sx={{ color: '#0ABAB5' }} />
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '60vh', bgcolor: '#fff', py: { xs: 3, md: 5 } }}>
            <Container maxWidth="lg">
                <Typography
                    variant="h4"
                    align="center"
                    sx={{
                        fontFamily: 'serif',
                        fontStyle: 'italic',
                        fontWeight: 400,
                        mb: { xs: 3, md: 5 },
                    }}
                >
                    Checkout
                </Typography>

                <Grid container spacing={4}>
                    {/* Left: Order Items & Delivery Address */}
                    <Grid item xs={12} md={7}>
                        {/* Order Items */}
                        <Typography variant="h6" sx={{ fontFamily: 'serif', mb: 2 }}>
                            Order Summary ({checkoutItems.reduce((sum, item) => sum + item.quantity, 0)} items)
                        </Typography>

                        <Stack spacing={2} sx={{ mb: 4 }}>
                            {checkoutItems.map((item) => (
                                <Box
                                    key={item.id}
                                    sx={{
                                        display: 'flex',
                                        gap: 2,
                                        p: 2,
                                        border: '1px solid',
                                        borderColor: 'divider',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            bgcolor: '#f5f5f5',
                                            overflow: 'hidden',
                                            flexShrink: 0,
                                        }}
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Qty: {item.quantity}
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 500, mt: 1 }}>
                                            {(item.price * item.quantity).toLocaleString('vi-VN')} VNĐ
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Stack>

                        {/* Delivery Address */}
                        <Typography variant="h6" sx={{ fontFamily: 'serif', mb: 2 }}>
                            Delivery Address
                        </Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            placeholder="Enter your full delivery address..."
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 0,
                                },
                            }}
                        />
                    </Grid>

                    {/* Right: Payment Summary */}
                    <Grid item xs={12} md={5}>
                        <Box
                            sx={{
                                bgcolor: '#f7f7f7',
                                p: 3,
                                position: { md: 'sticky' },
                                top: { md: 100 },
                            }}
                        >
                            <Typography variant="h6" sx={{ fontFamily: 'serif', mb: 3 }}>
                                Payment Summary
                            </Typography>

                            <Stack spacing={2}>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="body2">Subtotal</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        {subtotal.toLocaleString('vi-VN')} VNĐ
                                    </Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="body2">Delivery</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#0ABAB5' }}>
                                        Free
                                    </Typography>
                                </Stack>
                            </Stack>

                            <Divider sx={{ my: 2 }} />

                            <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    Total
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    {total.toLocaleString('vi-VN')} VNĐ
                                </Typography>
                            </Stack>

                            <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                onClick={handlePlaceOrder}
                                disabled={submitting}
                                sx={{
                                    py: 1.5,
                                    bgcolor: '#000',
                                    color: '#fff',
                                    borderRadius: 0,
                                    fontSize: '0.9rem',
                                    letterSpacing: '0.1em',
                                    '&:hover': { bgcolor: '#333' },
                                    '&:disabled': { bgcolor: '#ccc' },
                                }}
                            >
                                {submitting ? 'PROCESSING...' : 'PLACE ORDER'}
                            </Button>

                            <Button
                                fullWidth
                                variant="text"
                                onClick={() => navigate('/cart')}
                                sx={{
                                    mt: 2,
                                    color: 'text.secondary',
                                    textDecoration: 'underline',
                                    '&:hover': { color: 'text.primary' },
                                }}
                            >
                                Back to Cart
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            {/* Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default Checkout;
