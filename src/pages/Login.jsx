import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
  CircularProgress,
  IconButton,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Eye, EyeOff, X, Check } from 'lucide-react';
import axiosClient from '../api/axiosClient';

function Login() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  
  // Register form state
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axiosClient.post('/auth/login', {
        email: loginData.email,
        password: loginData.password,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setError(
        err.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại!'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      await axiosClient.post('/auth/register', {
        email: registerData.email,
        password: registerData.password,
      });

      setSuccess('Đăng ký thành công! Vui lòng đăng nhập.');
      setActiveTab(0);
      setRegisterData({ email: '', password: '', confirmPassword: '' });
    } catch (err) {
      console.error('Register error:', err);
      setError(
        err.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại!'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    navigate('/');
  };

  const benefits = [
    'Faster Checkout',
    'Access your order history',
    'View saved addresses & payments',
    'Receive email communications',
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        bgcolor: '#fff',
      }}
    >
      {/* Left Side - Image */}
      <Box
        sx={{
          width: { xs: '0%', md: '50%' },
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#E8F5F4',
          p: { md: 4, lg: 6 },
          position: 'fixed',
          left: 0,
          top: 0,
          height: '100vh',
        }}
      >
        <Box
          sx={{
            maxWidth: 500,
            textAlign: 'center',
          }}
        >
          {/* Tiffany-style gift boxes image placeholder */}
          <Box
            sx={{
              width: '100%',
              height: 500,
              background: 'linear-gradient(135deg, #81D8D0 0%, #0ABAB5 100%)',
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 20px 60px rgba(10, 186, 181, 0.3)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Decorative ribbon */}
            <Box
              sx={{
                position: 'absolute',
                width: '100%',
                height: 40,
                bgcolor: 'rgba(255,255,255,0.9)',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                width: 40,
                height: '100%',
                bgcolor: 'rgba(255,255,255,0.9)',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            />
            {/* Bow */}
            <Box
              sx={{
                position: 'absolute',
                top: '45%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 80,
                height: 80,
                bgcolor: 'rgba(255,255,255,0.95)',
                borderRadius: '50%',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              }}
            />
            <Typography
              variant="h4"
              sx={{
                position: 'absolute',
                bottom: 60,
                color: 'white',
                fontFamily: 'var(--font-serif)',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textShadow: '0 2px 10px rgba(0,0,0,0.2)',
              }}
            >
              HUST LUXURY
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Right Side - Form */}
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          marginLeft: { xs: 0, md: '50%' },
          display: 'flex',
          flexDirection: 'column',
          p: { xs: 2, sm: 4, md: 6 },
          position: 'relative',
          minHeight: '100vh',
          overflowY: 'auto',
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: { xs: 10, md: 20 },
            left: { xs: 10, md: 20 },
            border: '1px solid #e0e0e0',
            borderRadius: '50%',
            p: 1,
            '&:hover': { bgcolor: '#f5f5f5' },
          }}
        >
          <X size={20} />
        </IconButton>

        {/* Tabs */}
        <Box sx={{ mt: { xs: 6, md: 8 }, mb: { xs: 3, md: 4 } }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => {
              setActiveTab(newValue);
              setError('');
              setSuccess('');
            }}
            TabIndicatorProps={{
              style: {
                backgroundColor: '#000',
                height: 2,
              }
            }}
            sx={{
              minHeight: 'auto',
              '& .MuiTabs-flexContainer': {
                gap: 4,
              },
            }}
          >
            <Tab
              label="Sign In"
              disableRipple
              disableFocusRipple
              sx={{
                textTransform: 'none',
                fontFamily: '"Times New Roman", Times, serif',
                fontSize: { xs: '1rem', md: '1.25rem' },
                fontWeight: 400,
                color: '#000',
                minWidth: 'auto',
                px: 0,
                pb: 1.5,
                '&.Mui-selected': { 
                  color: '#000',
                  fontWeight: 400,
                },
                '&:focus': {
                  outline: 'none',
                },
                '&.Mui-focusVisible': {
                  outline: 'none',
                  backgroundColor: 'transparent',
                },
              }}
            />
            <Tab
              label="Create an account"
              disableRipple
              disableFocusRipple
              sx={{
                textTransform: 'none',
                fontFamily: '"Times New Roman", Times, serif',
                fontSize: { xs: '1rem', md: '1.25rem' },
                fontWeight: 400,
                color: '#000',
                minWidth: 'auto',
                px: 0,
                pb: 1.5,
                '&.Mui-selected': { 
                  color: '#000',
                  fontWeight: 400,
                },
                '&:focus': {
                  outline: 'none',
                },
                '&.Mui-focusVisible': {
                  outline: 'none',
                  backgroundColor: 'transparent',
                },
              }}
            />
          </Tabs>
        </Box>

        {/* Alerts */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {success}
          </Alert>
        )}

        {/* Form Container - Fixed height to prevent jumping */}
        <Box sx={{ position: 'relative', minHeight: 500 }}>
          {/* Sign In Tab */}
          <Box 
            component="form" 
            onSubmit={handleLoginSubmit}
            sx={{
              display: activeTab === 0 ? 'block' : 'none',
            }}
          >
            <TextField
              fullWidth
              label="Email address"
              name="email"
              type="email"
              value={loginData.email}
              onChange={handleLoginChange}
              required
              variant="standard"
              sx={{ mb: 4 }}
              InputLabelProps={{
                sx: { color: '#666' },
              }}
            />

            <Box sx={{ position: 'relative' }}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={loginData.password}
                onChange={handleLoginChange}
                required
                variant="standard"
                sx={{ mb: 2 }}
                InputLabelProps={{
                  sx: { color: '#666' },
                }}
              />
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                sx={{
                  position: 'absolute',
                  right: 0,
                  top: 16,
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </IconButton>
            </Box>

            <Box sx={{ textAlign: 'right', mb: 4 }}>
              <Link
                component={RouterLink}
                to="/forgot-password"
                sx={{
                  color: '#000',
                  fontSize: '0.875rem',
                  textDecoration: 'underline',
                  '&:hover': { color: '#0ABAB5' },
                }}
              >
                Forgot password
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                py: 2,
                bgcolor: '#000',
                color: '#fff',
                borderRadius: 0,
                fontSize: '0.875rem',
                letterSpacing: '0.1em',
                '&:hover': { bgcolor: '#333' },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'SIGN IN'
              )}
            </Button>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              *Required Fields
            </Typography>

            {/* Create Account Section */}
            <Box sx={{ mt: 8, pt: 4, borderTop: '1px solid #eee' }}>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: '"Times New Roman", Times, serif',
                  fontWeight: 400,
                  mb: 4,
                  fontSize: '1.5rem',
                }}
              >
                Create an Account
              </Typography>

              <List dense sx={{ mb: 4 }}>
                {benefits.map((benefit, index) => (
                  <ListItem key={index} sx={{ px: 0, py: 0.75 }}>
                    <ListItemIcon sx={{ minWidth: 30 }}>
                      <Check size={16} />
                    </ListItemIcon>
                    <ListItemText
                      primary={benefit}
                      primaryTypographyProps={{ fontSize: '0.875rem' }}
                    />
                  </ListItem>
                ))}
              </List>

              <Button
                fullWidth
                variant="outlined"
                size="large"
                onClick={() => setActiveTab(1)}
                sx={{
                  py: 2,
                  borderColor: '#000',
                  color: '#000',
                  borderRadius: 0,
                  fontSize: '0.875rem',
                  letterSpacing: '0.1em',
                  '&:hover': {
                    borderColor: '#0ABAB5',
                    bgcolor: 'transparent',
                  },
                }}
              >
                CREATE AN ACCOUNT
              </Button>
            </Box>
          </Box>

          {/* Create Account Tab */}
          <Box 
            component="form" 
            onSubmit={handleRegisterSubmit}
            sx={{
              display: activeTab === 1 ? 'block' : 'none',
            }}
          >
            <TextField
              fullWidth
              label="Email address"
              name="email"
              type="email"
              value={registerData.email}
              onChange={handleRegisterChange}
              required
              variant="standard"
              sx={{ mb: 4 }}
              InputLabelProps={{
                sx: { color: '#666' },
              }}
            />

            <Box sx={{ position: 'relative', mb: 4 }}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={registerData.password}
                onChange={handleRegisterChange}
                required
                variant="standard"
                InputLabelProps={{
                  sx: { color: '#666' },
                }}
              />
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                sx={{
                  position: 'absolute',
                  right: 0,
                  top: 16,
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </IconButton>
            </Box>

            <Box sx={{ position: 'relative', mb: 4 }}>
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={registerData.confirmPassword}
                onChange={handleRegisterChange}
                required
                variant="standard"
                InputLabelProps={{
                  sx: { color: '#666' },
                }}
              />
              <IconButton
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                sx={{
                  position: 'absolute',
                  right: 0,
                  top: 16,
                }}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </IconButton>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                py: 2,
                bgcolor: '#000',
                color: '#fff',
                borderRadius: 0,
                fontSize: '0.875rem',
                letterSpacing: '0.1em',
                '&:hover': { bgcolor: '#333' },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'CREATE ACCOUNT'
              )}
            </Button>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              *Required Fields
            </Typography>

            <Typography variant="body2" sx={{ mt: 3, color: '#666' }}>
              By creating an account, you agree to our{' '}
              <Link href="#" sx={{ color: '#000' }}>
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="#" sx={{ color: '#000' }}>
                Privacy Policy
              </Link>
              .
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
