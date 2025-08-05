import React from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton
} from '@mui/material';
import {
  People,
  Store,
  TrendingUp,
  Campaign,
  Edit,
  Delete,
  Block
} from '@mui/icons-material';

const AdminDashboard = () => {
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
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Platform overview and management tools
        </Typography>
      </Box>

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