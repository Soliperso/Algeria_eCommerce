import React, { useState, useEffect } from 'react';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff, Security } from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth.js';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../store/slices/authSlice.js';
import { USER_ROLES } from '../../constants/index.js';

const AdminLogin = () => {
  const { login } = useAuth();
  const { loading, error } = useSelector(selectAuth);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    adminKey: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showAdminKey, setShowAdminKey] = useState(false);

  // Admin access key - in a real app, this should be from environment variables
  const ADMIN_ACCESS_KEY = 'ALGERIA_ADMIN_2025';

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate admin access key
    if (credentials.adminKey !== ADMIN_ACCESS_KEY) {
      alert('Invalid admin access key');
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