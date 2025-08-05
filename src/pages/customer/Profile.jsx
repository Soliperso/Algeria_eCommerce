import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Avatar,
  IconButton,
  Tabs,
  Tab,
  Stack,
  Divider,
  Paper,
  Switch,
  FormControlLabel,
  Chip,
  Alert,
  useTheme,
  useMediaQuery,
  Fade,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Edit,
  PhotoCamera,
  Save,
  Cancel,
  LocationOn,
  Phone,
  Email,
  Security,
  Notifications,
  ShoppingBag,
  Favorite,
  Settings,
  Delete
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../store/slices/authSlice.js';

// Mock user data with extended profile information
const mockUserProfile = {
  id: 1,
  name: 'Ahmed Benali',
  email: 'ahmed.benali@example.com',
  phone: '+213 555 123 456',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  joinDate: '2023-06-15',
  location: {
    address: '123 Rue Didouche Mourad',
    city: 'Algiers',
    wilaya: 'Algiers',
    postalCode: '16000'
  },
  preferences: {
    notifications: {
      email: true,
      sms: false,
      push: true,
      marketing: false
    },
    privacy: {
      showProfile: true,
      showPurchases: false
    },
    language: 'en',
    currency: 'DZD'
  },
  stats: {
    totalOrders: 12,
    totalSpent: 450000,
    savedItems: 8,
    reviewsWritten: 5
  }
};

// Mock orders data
const mockOrders = [
  {
    id: 'ORD-2024-001',
    date: '2024-01-20',
    status: 'Delivered',
    total: 85000,
    items: 2,
    trackingNumber: 'ALG123456789'
  },
  {
    id: 'ORD-2024-002',
    date: '2024-01-15',
    status: 'In Transit',
    total: 45000,
    items: 1,
    trackingNumber: 'ALG123456790'
  },
  {
    id: 'ORD-2024-003',
    date: '2024-01-10',
    status: 'Processing',
    total: 125000,
    items: 3,
    trackingNumber: 'ALG123456791'
  }
];

const Profile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const user = useSelector(selectUser);
  
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(mockUserProfile);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ar-DZ', {
      style: 'currency',
      currency: 'DZD',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'success';
      case 'In Transit': return 'info';
      case 'Processing': return 'warning';
      case 'Cancelled': return 'error';
      default: return 'default';
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLocationChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        [field]: value
      }
    }));
  };

  const handlePreferenceChange = (category, field, value) => {
    setProfileData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [category]: {
          ...prev.preferences[category],
          [field]: value
        }
      }
    }));
  };

  const handleSaveProfile = () => {
    // Here you would make an API call to save the profile
    console.log('Saving profile:', profileData);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    // Reset to original data
    setProfileData(mockUserProfile);
    setIsEditing(false);
  };

  const handleDeleteAccount = () => {
    // Handle account deletion logic
    console.log('Deleting account...');
    setDeleteDialogOpen(false);
  };

  return (
    <Box sx={{ py: { xs: 3, md: 4 }, px: { xs: 2, sm: 3, md: 4 } }}>
      {/* Header */}
      <Fade in={true}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
            My Profile
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Manage your account settings and preferences
          </Typography>
        </Box>
      </Fade>

      <Grid container spacing={4}>
        {/* Profile Summary Card */}
        <Grid item xs={12} lg={4}>
          <Fade in={true} timeout={800}>
            <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, position: 'sticky', top: 20 }}>
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
                  <Avatar
                    src={profileData.avatar}
                    sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
                  />
                  {isEditing && (
                    <IconButton
                      sx={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
                        backgroundColor: theme.palette.primary.main,
                        color: 'white',
                        '&:hover': { backgroundColor: theme.palette.primary.dark }
                      }}
                      size="small"
                    >
                      <PhotoCamera fontSize="small" />
                    </IconButton>
                  )}
                </Box>

                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                  {profileData.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {profileData.email}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Member since {new Date(profileData.joinDate).toLocaleDateString()}
                </Typography>

                <Divider sx={{ my: 3 }} />

                {/* Quick Stats */}
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                        {profileData.stats.totalOrders}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Orders
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                        {formatPrice(profileData.stats.totalSpent)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Total Spent
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                        {profileData.stats.savedItems}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Saved Items
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                        {profileData.stats.reviewsWritten}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Reviews
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Button
                  variant={isEditing ? "outlined" : "contained"}
                  startIcon={isEditing ? <Cancel /> : <Edit />}
                  fullWidth
                  sx={{ mt: 3 }}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
              </CardContent>
            </Card>
          </Fade>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} lg={8}>
          <Fade in={true} timeout={1000}>
            <Paper elevation={0} sx={{ border: `1px solid ${theme.palette.divider}` }}>
              {/* Tabs */}
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                sx={{ borderBottom: `1px solid ${theme.palette.divider}`, px: 3 }}
                variant={isMobile ? "scrollable" : "standard"}
                scrollButtons="auto"
              >
                <Tab icon={<Settings />} label="General" iconPosition="start" />
                <Tab icon={<ShoppingBag />} label="Orders" iconPosition="start" />
                <Tab icon={<LocationOn />} label="Addresses" iconPosition="start" />
                <Tab icon={<Notifications />} label="Preferences" iconPosition="start" />
                <Tab icon={<Security />} label="Security" iconPosition="start" />
              </Tabs>

              {/* Tab Content */}
              <Box sx={{ p: 3 }}>
                {/* General Tab */}
                {activeTab === 0 && (
                  <Stack spacing={3}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Personal Information
                    </Typography>

                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Full Name"
                          value={profileData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          disabled={!isEditing}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          disabled={!isEditing}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Phone Number"
                          value={profileData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          disabled={!isEditing}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Language"
                          value={profileData.preferences.language}
                          onChange={(e) => handlePreferenceChange('preferences', 'language', e.target.value)}
                          disabled={!isEditing}
                          select
                          SelectProps={{ native: true }}
                        >
                          <option value="en">English</option>
                          <option value="ar">العربية</option>
                          <option value="fr">Français</option>
                        </TextField>
                      </Grid>
                    </Grid>

                    {isEditing && (
                      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                        <Button
                          variant="contained"
                          startIcon={<Save />}
                          onClick={handleSaveProfile}
                        >
                          Save Changes
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </Button>
                      </Stack>
                    )}
                  </Stack>
                )}

                {/* Orders Tab */}
                {activeTab === 1 && (
                  <Stack spacing={3}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Order History
                    </Typography>

                    {mockOrders.map((order) => (
                      <Card
                        key={order.id}
                        elevation={0}
                        sx={{ border: `1px solid ${theme.palette.divider}` }}
                      >
                        <CardContent>
                          <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} sm={3}>
                              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                {order.id}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {new Date(order.date).toLocaleDateString()}
                              </Typography>
                            </Grid>
                            <Grid item xs={6} sm={2}>
                              <Chip
                                label={order.status}
                                color={getStatusColor(order.status)}
                                size="small"
                              />
                            </Grid>
                            <Grid item xs={6} sm={2}>
                              <Typography variant="body2">
                                {order.items} item{order.items > 1 ? 's' : ''}
                              </Typography>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                              <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                                {formatPrice(order.total)}
                              </Typography>
                            </Grid>
                            <Grid item xs={6} sm={2}>
                              <Button size="small" variant="outlined">
                                View Details
                              </Button>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    ))}
                  </Stack>
                )}

                {/* Addresses Tab */}
                {activeTab === 2 && (
                  <Stack spacing={3}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Delivery Addresses
                    </Typography>

                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Street Address"
                          value={profileData.location.address}
                          onChange={(e) => handleLocationChange('address', e.target.value)}
                          disabled={!isEditing}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="City"
                          value={profileData.location.city}
                          onChange={(e) => handleLocationChange('city', e.target.value)}
                          disabled={!isEditing}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Wilaya"
                          value={profileData.location.wilaya}
                          onChange={(e) => handleLocationChange('wilaya', e.target.value)}
                          disabled={!isEditing}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Postal Code"
                          value={profileData.location.postalCode}
                          onChange={(e) => handleLocationChange('postalCode', e.target.value)}
                          disabled={!isEditing}
                        />
                      </Grid>
                    </Grid>

                    {isEditing && (
                      <Button variant="outlined" sx={{ alignSelf: 'flex-start' }}>
                        Add New Address
                      </Button>
                    )}
                  </Stack>
                )}

                {/* Preferences Tab */}
                {activeTab === 3 && (
                  <Stack spacing={4}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Notification Preferences
                    </Typography>

                    <Stack spacing={2}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={profileData.preferences.notifications.email}
                            onChange={(e) => handlePreferenceChange('notifications', 'email', e.target.checked)}
                          />
                        }
                        label="Email Notifications"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={profileData.preferences.notifications.sms}
                            onChange={(e) => handlePreferenceChange('notifications', 'sms', e.target.checked)}
                          />
                        }
                        label="SMS Notifications"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={profileData.preferences.notifications.push}
                            onChange={(e) => handlePreferenceChange('notifications', 'push', e.target.checked)}
                          />
                        }
                        label="Push Notifications"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={profileData.preferences.notifications.marketing}
                            onChange={(e) => handlePreferenceChange('notifications', 'marketing', e.target.checked)}
                          />
                        }
                        label="Marketing Communications"
                      />
                    </Stack>

                    <Divider />

                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Privacy Settings
                    </Typography>

                    <Stack spacing={2}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={profileData.preferences.privacy.showProfile}
                            onChange={(e) => handlePreferenceChange('privacy', 'showProfile', e.target.checked)}
                          />
                        }
                        label="Make my profile visible to other users"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={profileData.preferences.privacy.showPurchases}
                            onChange={(e) => handlePreferenceChange('privacy', 'showPurchases', e.target.checked)}
                          />
                        }
                        label="Show my purchase history"
                      />
                    </Stack>
                  </Stack>
                )}

                {/* Security Tab */}
                {activeTab === 4 && (
                  <Stack spacing={4}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Security Settings
                    </Typography>

                    <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, p: 3 }}>
                      <Stack spacing={2}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          Change Password
                        </Typography>
                        <TextField
                          fullWidth
                          label="Current Password"
                          type="password"
                          size="small"
                        />
                        <TextField
                          fullWidth
                          label="New Password"
                          type="password"
                          size="small"
                        />
                        <TextField
                          fullWidth
                          label="Confirm New Password"
                          type="password"
                          size="small"
                        />
                        <Button variant="contained" sx={{ alignSelf: 'flex-start' }}>
                          Update Password
                        </Button>
                      </Stack>
                    </Card>

                    <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, p: 3 }}>
                      <Stack spacing={2}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          Two-Factor Authentication
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Add an extra layer of security to your account
                        </Typography>
                        <Button variant="outlined" sx={{ alignSelf: 'flex-start' }}>
                          Enable 2FA
                        </Button>
                      </Stack>
                    </Card>

                    <Alert severity="error" sx={{ mt: 4 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                        Danger Zone
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        Once you delete your account, there is no going back. Please be certain.
                      </Typography>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<Delete />}
                        onClick={() => setDeleteDialogOpen(true)}
                      >
                        Delete Account
                      </Button>
                    </Alert>
                  </Stack>
                )}
              </Box>
            </Paper>
          </Fade>
        </Grid>
      </Grid>

      {/* Delete Account Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete your account? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteAccount} color="error" variant="contained">
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;
