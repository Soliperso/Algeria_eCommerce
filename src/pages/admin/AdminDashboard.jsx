import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  Stack,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  People,
  Store,
  AttachMoney,
  TrendingUp,
  Edit,
  Block,
  Delete,
  Visibility,
  Business,
  ManageAccounts,
  Dashboard,
  Analytics,
  Category
} from '@mui/icons-material';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      change: '+15%',
      changeType: 'positive',
      icon: <People />
    },
    {
      title: 'Active Sellers',
      value: '89',
      change: '+8%',
      changeType: 'positive',
      icon: <Store />
    },
    {
      title: 'Revenue',
      value: 'DZD 2.5M',
      change: '+22%',
      changeType: 'positive',
      icon: <TrendingUp />
    },
    {
      title: 'Ad Revenue',
      value: 'DZD 125K',
      change: '+18%',
      changeType: 'positive',
      icon: <Campaign />
    }
  ];

  const recentUsers = [
    { id: 1, name: 'Ahmed Benali', email: 'ahmed@email.com', role: 'Customer', status: 'Active' },
    { id: 2, name: 'Fatima Store', email: 'fatima@store.com', role: 'Seller', status: 'Active' },
    { id: 3, name: 'Mohamed Cherifi', email: 'mohamed@email.com', role: 'Customer', status: 'Pending' },
    { id: 4, name: 'Amina Electronics', email: 'amina@electronics.com', role: 'Seller', status: 'Suspended' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Pending': return 'warning';
      case 'Suspended': return 'error';
      default: return 'default';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin': return 'error';
      case 'Seller': return 'primary';
      case 'Customer': return 'info';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, py: { xs: 3, md: 4 }, width: '100%', maxWidth: '100%' }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Admin Dashboard
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Platform overview and management tools
          </Typography>
        </Box>
        <Button variant="contained" color="primary">
          Platform Settings
        </Button>
      </Box>

      {/* Quick Actions */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              cursor: 'pointer',
              '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 },
              transition: 'all 0.2s'
            }}
            onClick={() => navigate('/admin/users')}
          >
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <ManageAccounts sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                User Management
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage customers, sellers and admins
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              cursor: 'pointer',
              '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 },
              transition: 'all 0.2s'
            }}
          >
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Category sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Product Management
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Oversee products and categories
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              cursor: 'pointer',
              '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 },
              transition: 'all 0.2s'
            }}
            onClick={() => navigate('/admin/analytics')}
          >
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Analytics sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Analytics
              </Typography>
              <Typography variant="body2" color="text.secondary">
                View platform performance metrics
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              cursor: 'pointer',
              '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 },
              transition: 'all 0.2s'
            }}
          >
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Business sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Business Settings
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Configure platform settings
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ color: 'primary.main', mr: 2 }}>
                    {stat.icon}
                  </Box>
                  <Typography variant="h6" component="div">
                    {stat.title}
                  </Typography>
                </Box>
                <Typography variant="h4" component="div" sx={{ mb: 1 }}>
                  {stat.value}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: stat.changeType === 'positive' ? 'success.main' : 'error.main'
                  }}
                >
                  {stat.change} from last month
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Users Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recent User Activity
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.role}
                        color={getRoleColor(user.role)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.status}
                        color={getStatusColor(user.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" color="primary">
                        <Edit />
                      </IconButton>
                      <IconButton size="small" color="warning">
                        <Block />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminDashboard;