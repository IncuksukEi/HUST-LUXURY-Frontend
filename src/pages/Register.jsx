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
} from '@mui/material';
import { Eye, EyeOff } from 'lucide-react';
import axiosClient from '../api/axiosClient';

function Register() {
  const navigate = useNavigate();

  // Register form state
  const [registerData, setRegisterData] = useState({
    email: '',
    fullName: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
    setError('');
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
      await axiosClient.post('/auth/signup', {
        email: registerData.email,
        password: registerData.password,
        phone: registerData.phone,
        fullName: registerData.fullName,
      });

      setSuccess('Đăng ký thành công! Đang chuyển hướng...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error('Register error:', err);
      setError(
        err.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại!'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box
        sx={{
          flex: 1,
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
                  fontFamily: '"Times New Roman", Times, serif',
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
            display: 'flex',
            flexDirection: 'column',
            p: { xs: 2, sm: 4, md: 6 },
            position: 'relative',
          }}
        >
          {/* Title */}
          <Box sx={{ mb: { xs: 3, md: 4 } }}>
            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Times New Roman", Times, serif',
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                fontWeight: 400,
                color: '#000',
                pb: 1.5,
                borderBottom: '2px solid #000',
                display: 'inline-block',
              }}
            >
              Create an account
            </Typography>
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

          {/* Create Account Form */}
          <Box 
            component="form" 
            onSubmit={handleRegisterSubmit}
          >
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              type="text"
              value={registerData.fullName}
              onChange={handleRegisterChange}
              required
              variant="standard"
              sx={{ mb: 4 }}
              InputLabelProps={{
                sx: { color: '#666' },
              }}
            />
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              type="tel"
              value={registerData.phone}
              onChange={handleRegisterChange}
              required
              variant="standard"
              sx={{ mb: 4 }}
              InputLabelProps={{
                sx: { color: '#666' },
              }}
            />
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

            {/* Sign In Link */}
            <Box sx={{ mt: 6, pt: 4, borderTop: '1px solid #eee' }}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Already have an account?
              </Typography>
              <Button
                fullWidth
                variant="outlined"
                size="large"
                component={RouterLink}
                to="/login"
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
                SIGN IN
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Register;