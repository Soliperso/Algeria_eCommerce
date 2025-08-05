import React from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  Chip
} from '@mui/material';
import {
  TrendingUp,
  Inventory,
  ShoppingCart,
  AttachMoney,
  Add
} from '@mui/icons-material';

const SellerDashboard = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: 'DZD 125,000',
      change: '+12%',
      changeType: 'positive',
      icon: <AttachMoney />
    },
    {
      title: 'Products Listed',
      value: '24',
      change: '+3',
      changeType: 'positive',
      icon: <Inventory />
    },
    {
      title: 'Orders Today',
      value: '8',
      change: '+2',
      changeType: 'positive',
      icon: <ShoppingCart />
    },
    {
      title: 'Monthly Growth',
      value: '18%',
      change: '+5%',
      changeType: 'positive',
      icon: <TrendingUp />
    }
  ];

  const recentOrders = [
    { id: '#001', customer: 'Ahmed Benali', amount: 'DZD 2,500', status: 'Pending' },
    { id: '#002', customer: 'Fatima Cherifi', amount: 'DZD 1,800', status: 'Shipped' },
    { id: '#003', customer: 'Mohamed Slimani', amount: 'DZD 3,200', status: 'Delivered' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'warning';
      case 'Shipped': return 'info';
      case 'Delivered': return 'success';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, py: { xs: 3, md: 4 }, width: '100%', maxWidth: '100%' }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Typography variant="h3" component="h1" gutterBottom>
            Seller Dashboard
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Welcome back! Here's what's happening with your store.
          </Typography>
        </div>
        <Button
          variant="contained"
          startIcon={<Add />}
          size="large"
        >
          Add Product
        </Button>
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

      {/* Recent Orders */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Orders
              </Typography>
              <Box>
                {recentOrders.map((order) => (
                  <Box
                    key={order.id}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      py: 2,
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      '&:last-child': { borderBottom: 'none' }
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2">
                        Order {order.id}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {order.customer}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="subtitle2">
                        {order.amount}
                      </Typography>
                      <Chip
                        label={order.status}
                        color={getStatusColor(order.status)}
                        size="small"
                      />
                    </Box>
                  </Box>
                ))}
              </Box>
              <Button sx={{ mt: 2 }} fullWidth variant="outlined">
                View All Orders
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button variant="outlined" fullWidth>
                  Add New Product
                </Button>
                <Button variant="outlined" fullWidth>
                  View Analytics
                </Button>
                <Button variant="outlined" fullWidth>
                  Manage Inventory
                </Button>
                <Button variant="outlined" fullWidth>
                  Customer Messages
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SellerDashboard;