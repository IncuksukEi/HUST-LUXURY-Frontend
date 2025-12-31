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

function Login() {
  const navigate = useNavigate();

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
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
            {/* Tiffany-style diamond rings image */}
            <Box
              component="img"
              src="https://www.international.tiffany.com/shared/images/checkout/blue-box.jpg"
              alt="Tiffany Diamond Rings"
              sx={{
                width: '100%',
                maxWidth: 450,
                height: 'auto',
                objectFit: 'cover',
                borderRadius: 2,
                boxShadow: '0 20px 60px rgba(10, 186, 181, 0.3)',
              }}
            />
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
              Đăng nhập
            </Typography>
          </Box>

          {/* Alerts */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Sign In Form */}
          <Box
            component="form"
            onSubmit={handleLoginSubmit}
          >
            <TextField
              fullWidth
              label="Địa chỉ email"
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
                label="Mật khẩu"
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
                Quên mật khẩu
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
                'ĐĂNG NHẬP'
              )}
            </Button>

            {/* Create Account Button */}
            <Button
              fullWidth
              variant="outlined"
              size="large"
              component={RouterLink}
              to="/register"
              sx={{
                mt: 3,
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
              TẠO TÀI KHOẢN
            </Button>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              *Các trường bắt buộc
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
