import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
} from '@mui/material';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import axiosClient from '../api/axiosClient';

const TIFFANY_BLUE = '#81d8d0';

function ChangePasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('token');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('Mật khẩu mới và xác nhận mật khẩu không khớp');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError('Mật khẩu mới phải có ít nhất 6 ký tự');
      return;
    }

    setLoading(true);

    try {
      await axiosClient.post('/user/reset-password', {
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      });
      setSuccess('Đổi mật khẩu thành công!');
      setPasswordData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (err) {
      console.error('Change password error:', err);
      setError(err.response?.data?.message || 'Đổi mật khẩu thất bại. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography
        variant="h4"
        sx={{
          fontFamily: '"Times New Roman", Times, serif',
          fontSize: { xs: '1.5rem', md: '2rem' },
          fontWeight: 400,
          mb: 4,
          pb: 2,
          borderBottom: '2px solid #000',
        }}
      >
        My Account
      </Typography>

      <Grid container spacing={4}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Paper
            elevation={0}
            sx={{
              border: '1px solid #e0e0e0',
              borderRadius: 0,
            }}
          >
            <List sx={{ p: 0 }}>
              <ListItem disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to="/account"
                  selected={location.pathname === '/account'}
                  sx={{
                    borderLeft: location.pathname === '/account' ? `3px solid ${TIFFANY_BLUE}` : '3px solid transparent',
                    '&.Mui-selected': {
                      bgcolor: 'rgba(129, 216, 208, 0.1)',
                      '&:hover': {
                        bgcolor: 'rgba(129, 216, 208, 0.15)',
                      },
                    },
                  }}
                >
                  <User size={20} style={{ marginRight: 12 }} />
                  <ListItemText
                    primary="Thông tin cá nhân"
                    primaryTypographyProps={{
                      fontSize: '0.95rem',
                      fontWeight: location.pathname === '/account' ? 600 : 400,
                    }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to="/account/change-password"
                  selected={location.pathname === '/account/change-password'}
                  sx={{
                    borderLeft: location.pathname === '/account/change-password' ? `3px solid ${TIFFANY_BLUE}` : '3px solid transparent',
                    '&.Mui-selected': {
                      bgcolor: 'rgba(129, 216, 208, 0.1)',
                      '&:hover': {
                        bgcolor: 'rgba(129, 216, 208, 0.15)',
                      },
                    },
                  }}
                >
                  <Lock size={20} style={{ marginRight: 12 }} />
                  <ListItemText
                    primary="Đổi mật khẩu"
                    primaryTypographyProps={{
                      fontSize: '0.95rem',
                      fontWeight: location.pathname === '/account/change-password' ? 600 : 400,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={9}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              border: '1px solid #e0e0e0',
              borderRadius: 0,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontFamily: '"Times New Roman", Times, serif',
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                fontWeight: 400,
                mb: 4,
              }}
            >
              Đổi mật khẩu
            </Typography>

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

            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box sx={{ position: 'relative' }}>
                    <TextField
                      fullWidth
                      label="Mật khẩu hiện tại"
                      name="oldPassword"
                      type={showOldPassword ? 'text' : 'password'}
                      value={passwordData.oldPassword}
                      onChange={handleChange}
                      variant="standard"
                      required
                      InputLabelProps={{
                        sx: { color: '#666' },
                      }}
                    />
                    <IconButton
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      sx={{
                        position: 'absolute',
                        right: 0,
                        top: 16,
                      }}
                    >
                      {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </IconButton>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ position: 'relative' }}>
                    <TextField
                      fullWidth
                      label="Mật khẩu mới"
                      name="newPassword"
                      type={showNewPassword ? 'text' : 'password'}
                      value={passwordData.newPassword}
                      onChange={handleChange}
                      variant="standard"
                      required
                      InputLabelProps={{
                        sx: { color: '#666' },
                      }}
                    />
                    <IconButton
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      sx={{
                        position: 'absolute',
                        right: 0,
                        top: 16,
                      }}
                    >
                      {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </IconButton>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ position: 'relative' }}>
                    <TextField
                      fullWidth
                      label="Xác nhận mật khẩu mới"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={passwordData.confirmPassword}
                      onChange={handleChange}
                      variant="standard"
                      required
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
                </Grid>
              </Grid>

              <Box sx={{ display: 'flex', gap: 2, mt: 4, justifyContent: 'flex-end' }}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    bgcolor: '#000',
                    color: '#fff',
                    borderRadius: 0,
                    fontSize: '0.875rem',
                    letterSpacing: '0.1em',
                    px: 4,
                    '&:hover': {
                      bgcolor: '#333',
                    },
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Đổi mật khẩu'}
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ChangePasswordPage;

