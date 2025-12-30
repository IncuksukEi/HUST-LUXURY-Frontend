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
  MenuItem,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { User, Lock } from 'lucide-react';
import axiosClient from '../api/axiosClient';

const TIFFANY_BLUE = '#81d8d0';

function AccountPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('token');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [profileData, setProfileData] = useState({
    email: '',
    fullName: '',
    phone: '',
    gender: '',
    birthDate: '',
    address: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    fetchProfile();
  }, [isLoggedIn, navigate]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get('/user/profile');
      setProfileData({
        email: response.data.email || '',
        fullName: response.data.fullName || '',
        phone: response.data.phone || '',
        gender: response.data.gender || '',
        birthDate: response.data.birthDate || '',
        address: response.data.address || '',
      });
    } catch (err) {
      console.error('Fetch profile error:', err);
      setError(err.response?.data?.message || 'Không thể tải thông tin cá nhân. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
    setError('');
    setSuccess('');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      await axiosClient.post('/user/update', profileData);
      setSuccess('Cập nhật thông tin thành công!');
      setIsEditing(false);
    } catch (err) {
      console.error('Update profile error:', err);
      setError(err.response?.data?.message || 'Cập nhật thông tin thất bại. Vui lòng thử lại!');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    fetchProfile();
    setIsEditing(false);
    setError('');
    setSuccess('');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography
        variant="h4"
        sx={{
          fontSize: { xs: '1.5rem', md: '2rem' },
          fontWeight: 400,
          mb: 4,
          pb: 2,
          borderBottom: '2px solid #000',
        }}
      >
        Tài khoản của tôi
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        {/* Sidebar - Fixed left */}
        <Box
          sx={{
            width: { xs: '100%', md: 280 },
            flexShrink: 0,
          }}
        >
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
                    py: 2,
                    px: 3,
                    borderLeft: location.pathname === '/account' ? `3px solid ${TIFFANY_BLUE}` : '3px solid transparent',
                    '&.Mui-selected': {
                      bgcolor: 'rgba(129, 216, 208, 0.1)',
                      '&:hover': {
                        bgcolor: 'rgba(129, 216, 208, 0.15)',
                      },
                    },
                    '&:hover': {
                      bgcolor: 'rgba(129, 216, 208, 0.05)',
                    },
                  }}
                >
                  <User size={20} style={{ marginRight: 12, flexShrink: 0 }} />
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
                    py: 2,
                    px: 3,
                    borderLeft: location.pathname === '/account/change-password' ? `3px solid ${TIFFANY_BLUE}` : '3px solid transparent',
                    '&.Mui-selected': {
                      bgcolor: 'rgba(129, 216, 208, 0.1)',
                      '&:hover': {
                        bgcolor: 'rgba(129, 216, 208, 0.15)',
                      },
                    },
                    '&:hover': {
                      bgcolor: 'rgba(129, 216, 208, 0.05)',
                    },
                  }}
                >
                  <Lock size={20} style={{ marginRight: 12, flexShrink: 0 }} />
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
        </Box>

        {/* Main Content - Vertical layout */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              border: '1px solid #e0e0e0',
              borderRadius: 0,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: '1.25rem', md: '1.5rem' },
                  fontWeight: 400,
                }}
              >
                Thông tin cá nhân
              </Typography>
              {!isEditing && (
                <Button
                  variant="outlined"
                  onClick={() => setIsEditing(true)}
                  sx={{
                    fontFamily: 'Inter',
                    borderColor: '#000',
                    color: '#000',
                    borderRadius: 0,
                    fontSize: '0.875rem',
                    letterSpacing: '0.1em',
                    px: 3,
                    py: 1,
                    textTransform: 'uppercase',
                    '&:hover': {
                      borderColor: '#000',
                      color: '#000',
                      bgcolor: '#f5f5f5',
                    },
                  }}
                >
                  CHỈNH SỬA
                </Button>
              )}
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess('')}>
                {success}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSave}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={profileData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  variant="outlined"
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 0,
                      '&:hover fieldset': {
                        borderColor: '#000',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#000',
                      },
                    },
                    '& .MuiInputLabel-asterisk': {
                      color: '#d32f2f',
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Họ và tên"
                  name="fullName"
                  value={profileData.fullName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  variant="outlined"
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 0,
                      '&:hover fieldset': {
                        borderColor: '#000',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#000',
                      },
                    },
                    '& .MuiInputLabel-asterisk': {
                      color: '#d32f2f',
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Số điện thoại"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  variant="outlined"
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 0,
                      '&:hover fieldset': {
                        borderColor: '#000',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#000',
                      },
                    },
                    '& .MuiInputLabel-asterisk': {
                      color: '#d32f2f',
                    },
                  }}
                />

                <TextField
                  fullWidth
                  select
                  label="Giới tính"
                  name="gender"
                  value={profileData.gender}
                  onChange={handleChange}
                  disabled={!isEditing}
                  variant="outlined"
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 0,
                      '&:hover fieldset': {
                        borderColor: '#000',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#000',
                      },
                    },
                    '& .MuiInputLabel-asterisk': {
                      color: '#d32f2f',
                    },
                  }}
                >
                  <MenuItem value="MALE">Nam</MenuItem>
                  <MenuItem value="FEMALE">Nữ</MenuItem>
                  <MenuItem value="OTHER">Khác</MenuItem>
                </TextField>

                <TextField
                  fullWidth
                  label="Ngày sinh"
                  name="birthDate"
                  type="date"
                  value={profileData.birthDate}
                  onChange={handleChange}
                  disabled={!isEditing}
                  variant="outlined"
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 0,
                      '&:hover fieldset': {
                        borderColor: '#000',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#000',
                      },
                    },
                    '& .MuiInputLabel-asterisk': {
                      color: '#d32f2f',
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Địa chỉ"
                  name="address"
                  value={profileData.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                  variant="outlined"
                  required
                  multiline
                  rows={3}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 0,
                      '&:hover fieldset': {
                        borderColor: '#000',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#000',
                      },
                    },
                    '& .MuiInputLabel-asterisk': {
                      color: '#d32f2f',
                    },
                  }}
                />
              </Box>

              {isEditing && (
                <Box sx={{ display: 'flex', gap: 2, mt: 4, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    onClick={handleCancel}
                    disabled={saving}
                    sx={{
                      borderColor: '#000',
                      color: '#000',
                      borderRadius: 0,
                      fontSize: '0.875rem',
                      letterSpacing: '0.1em',
                      px: 4,
                      py: 1.5,
                      textTransform: 'uppercase',
                      '&:hover': {
                        borderColor: '#666',
                        bgcolor: 'transparent',
                      },
                    }}
                  >
                    HỦY
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={saving}
                    sx={{
                      bgcolor: '#000',
                      color: '#fff',
                      borderRadius: 0,
                      fontSize: '0.875rem',
                      letterSpacing: '0.1em',
                      px: 4,
                      py: 1.5,
                      textTransform: 'uppercase',
                      '&:hover': {
                        bgcolor: '#333',
                      },
                      '&:disabled': {
                        bgcolor: '#ccc',
                      },
                    }}
                  >
                    {saving ? <CircularProgress size={24} color="inherit" /> : 'LƯU THAY ĐỔI'}
                  </Button>
                </Box>
              )}
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}

export default AccountPage;

