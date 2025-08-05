import React, { useState, useEffect } from 'react';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  InputAdornment,
  IconButton,
  Container,
  Stack
} from '@mui/material';
import { Visibility, VisibilityOff, Security, Block } from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth.js';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../store/slices/authSlice.js';
import { USER_ROLES } from '../../constants/index.js';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const { login } = useAuth();
  const { loading, error } = useSelector(selectAuth);
  const navigate = useNavigate();

  // SECURITY LOCKDOWN: Check if admin access is disabled
  const adminAccessEnabled = import.meta.env.VITE_ADMIN_ACCESS_ENABLED === 'true';
  const adminLockdown = import.meta.env.VITE_ADMIN_LOCKDOWN === 'true';

  // If admin access is disabled or in lockdown, show security message
  if (!adminAccessEnabled || adminLockdown) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center', bgcolor: 'error.light', color: 'white' }}>
          <Block sx={{ fontSize: 64, mb: 2, color: 'error.main' }} />
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'error.main' }}>
            🚨 ACCESS DENIED
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ color: 'error.dark' }}>
            SECURITY BREACH DETECTED
          </Typography>
          <Alert severity="error" sx={{ my: 3 }}>
            Administrative access has been disabled due to security concerns.
            All admin functionality is currently locked down.
          </Alert>
          <Stack spacing={2} sx={{ color: 'text.primary' }}>
            <Typography variant="body1">
              • All admin routes are blocked
            </Typography>
            <Typography variant="body1">
              • Access keys have been revoked
            </Typography>
            <Typography variant="body1">
              • Contact system administrator immediately
            </Typography>
          </Stack>
          <Button
            variant="contained"
            color="error"
            onClick={() => navigate('/')}
            sx={{ mt: 3, fontWeight: 'bold' }}
          >
            EXIT TO SAFE AREA
          </Button>
        </Paper>
      </Container>
    );
  }

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    adminKey: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showAdminKey, setShowAdminKey] = useState(false);

  // SECURITY: Get admin access key from environment variables
  const ADMIN_ACCESS_KEY = import.meta.env.VITE_ADMIN_ACCESS_KEY;

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Debug: Log the environment variable value
    console.log('ADMIN_ACCESS_KEY from env:', ADMIN_ACCESS_KEY);
    console.log('User entered key:', credentials.adminKey);

    // Validate admin access key against environment variable
    if (!ADMIN_ACCESS_KEY) {
      alert('Admin access is disabled. Contact system administrator.');
      return;
    }

    if (credentials.adminKey !== ADMIN_ACCESS_KEY) {
      alert(`Invalid admin access key. Expected: ${ADMIN_ACCESS_KEY}, Got: ${credentials.adminKey}`);
      return;
    }

    // Add admin role to credentials
    const adminCredentials = {
      ...credentials,
      role: USER_ROLES.ADMIN
    };

    login(adminCredentials);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowAdminKey = () => {
    setShowAdminKey(!showAdminKey);
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: 480,
        }}
      >
        <Paper elevation={8} sx={{ padding: 4, width: '100%', borderRadius: 3 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Security sx={{ fontSize: 60, color: 'error.main', mb: 2 }} />
            <Typography component="h1" variant="h4" gutterBottom>
              Admin Access
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Restricted access for platform administration
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Admin Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={credentials.email}
              onChange={handleChange}
              variant="outlined"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Admin Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={credentials.password}
              onChange={handleChange}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="adminKey"
              label="Admin Access Key"
              type={showAdminKey ? 'text' : 'password'}
              id="adminKey"
              value={credentials.adminKey}
              onChange={handleChange}
              variant="outlined"
              helperText="Special access key required for admin authentication"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle admin key visibility"
                      onClick={handleClickShowAdminKey}
                      edge="end"
                    >
                      {showAdminKey ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="error"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600
              }}
              disabled={loading}
            >
              {loading ? 'Authenticating...' : 'Access Admin Panel'}
            </Button>
          </Box>

          <Box sx={{ mt: 3, p: 2, backgroundColor: 'warning.light', borderRadius: 2 }}>
            <Typography variant="caption" color="warning.dark" display="block">
              ⚠️ This is a restricted access area. Only authorized personnel should attempt to log in.
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default AdminLogin;