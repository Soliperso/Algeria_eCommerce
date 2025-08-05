import React, { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Paper,
    Stack,
    LinearProgress,
    Chip,
    IconButton,
    useTheme,
    useMediaQuery,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Divider,
    Avatar,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import {
    TrendingUp,
    TrendingDown,
    People,
    Store,
    AttachMoney,
    LocalMall,
    Timeline,
    Analytics,
    DateRange,
    Refresh,
    Download,
    Star,
    ShoppingCart,
    Visibility,
    ThumbUp
} from '@mui/icons-material';

// Mock analytics data
const analyticsData = {
    overview: {
        totalRevenue: 15670000,
        revenueChange: 12.5,
        totalUsers: 8547,
        usersChange: 8.2,
        totalSellers: 234,
        sellersChange: 15.7,
        totalOrders: 2341,
        ordersChange: -2.1
    },
    monthlyRevenue: [
        { month: 'Jan', revenue: 1200000 },
        { month: 'Feb', revenue: 1350000 },
        { month: 'Mar', revenue: 1180000 },
        { month: 'Apr', revenue: 1420000 },
        { month: 'May', revenue: 1580000 },
        { month: 'Jun', revenue: 1340000 },
        { month: 'Jul', revenue: 1690000 },
        { month: 'Aug', revenue: 1750000 },
        { month: 'Sep', revenue: 1620000 },
        { month: 'Oct', revenue: 1840000 },
        { month: 'Nov', revenue: 1920000 },
        { month: 'Dec', revenue: 2100000 }
    ],
    topCategories: [
        { name: 'Electronics', revenue: 4500000, orders: 567, growth: 15.2 },
        { name: 'Fashion', revenue: 3200000, orders: 432, growth: 8.7 },
        { name: 'Home & Garden', revenue: 2800000, orders: 389, growth: 12.1 },
        { name: 'Sports', revenue: 1900000, orders: 234, growth: -3.4 },
        { name: 'Books', revenue: 1200000, orders: 187, growth: 6.8 }
    ],
    topSellers: [
        {
            id: 1,
            name: 'Fatima Electronics',
            revenue: 890000,
            orders: 156,
            rating: 4.8,
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332d88c?w=100&h=100&fit=crop&crop=face'
        },
        {
            id: 2,
            name: 'Ahmed Tech Store',
            revenue: 720000,
            orders: 134,
            rating: 4.6,
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
        },
        {
            id: 3,
            name: 'Yasmine Fashion',
            revenue: 650000,
            orders: 98,
            rating: 4.4,
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
        }
    ],
    recentActivity: [
        { type: 'new_user', message: 'Ahmed Benali joined as a customer', time: '2 minutes ago' },
        { type: 'new_order', message: 'Order #1234 placed for 45,000 DZD', time: '5 minutes ago' },
        { type: 'new_seller', message: 'Tech Hub Algeria became a seller', time: '15 minutes ago' },
        { type: 'review', message: 'New 5-star review for Electronics Store', time: '23 minutes ago' },
        { type: 'payment', message: 'Payment processed: 125,000 DZD', time: '1 hour ago' }
    ],
    userGrowth: [
        { period: 'Jan', users: 5200 },
        { period: 'Feb', users: 5680 },
        { period: 'Mar', users: 6150 },
        { period: 'Apr', users: 6420 },
        { period: 'May', users: 6890 },
        { period: 'Jun', users: 7150 },
        { period: 'Jul', users: 7580 },
        { period: 'Aug', users: 7920 },
        { period: 'Sep', users: 8240 },
        { period: 'Oct', users: 8547 }
    ]
};

const AdminAnalytics = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [timePeriod, setTimePeriod] = useState('30');

    const formatPrice = (price) => {
        return new Intl.NumberFormat('ar-DZ', {
            style: 'currency',
            currency: 'DZD',
            minimumFractionDigits: 0
        }).format(price);
    };

    const formatNumber = (num) => {
        return new Intl.NumberFormat('en-US').format(num);
    };

    const getChangeColor = (change) => {
        return change >= 0 ? 'success.main' : 'error.main';
    };

    const getChangeIcon = (change) => {
        return change >= 0 ? <TrendingUp /> : <TrendingDown />;
    };

    const getActivityIcon = (type) => {
        switch (type) {
            case 'new_user': return <People color="primary" />;
            case 'new_order': return <ShoppingCart color="success" />;
            case 'new_seller': return <Store color="info" />;
            case 'review': return <Star color="warning" />;
            case 'payment': return <AttachMoney color="success" />;
            default: return <Analytics />;
        }
    };

    return (
        <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, py: { xs: 3, md: 4 } }}>
            {/* Header */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Box>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Analytics Dashboard
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Platform performance insights and metrics
                    </Typography>
                </Box>
                <Stack direction="row" spacing={2}>
                    <FormControl size="small">
                        <InputLabel>Time Period</InputLabel>
                        <Select
                            value={timePeriod}
                            label="Time Period"
                            onChange={(e) => setTimePeriod(e.target.value)}
                            sx={{ minWidth: 120 }}
                        >
                            <MenuItem value="7">Last 7 days</MenuItem>
                            <MenuItem value="30">Last 30 days</MenuItem>
                            <MenuItem value="90">Last 3 months</MenuItem>
                            <MenuItem value="365">Last year</MenuItem>
                        </Select>
                    </FormControl>
                    <IconButton color="primary" onClick={() => window.location.reload()}>
                        <Refresh />
                    </IconButton>
                    <IconButton color="primary">
                        <Download />
                    </IconButton>
                </Stack>
            </Box>

            {/* Overview Stats */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                                <AttachMoney color="success" sx={{ fontSize: 40 }} />
                                <Box sx={{ color: getChangeColor(analyticsData.overview.revenueChange), display: 'flex', alignItems: 'center' }}>
                                    {getChangeIcon(analyticsData.overview.revenueChange)}
                                    <Typography variant="caption" sx={{ ml: 0.5 }}>
                                        {Math.abs(analyticsData.overview.revenueChange)}%
                                    </Typography>
                                </Box>
                            </Stack>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                                {formatPrice(analyticsData.overview.totalRevenue)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Total Revenue
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                                <People color="primary" sx={{ fontSize: 40 }} />
                                <Box sx={{ color: getChangeColor(analyticsData.overview.usersChange), display: 'flex', alignItems: 'center' }}>
                                    {getChangeIcon(analyticsData.overview.usersChange)}
                                    <Typography variant="caption" sx={{ ml: 0.5 }}>
                                        {Math.abs(analyticsData.overview.usersChange)}%
                                    </Typography>
                                </Box>
                            </Stack>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                                {formatNumber(analyticsData.overview.totalUsers)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Total Users
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                                <Store color="info" sx={{ fontSize: 40 }} />
                                <Box sx={{ color: getChangeColor(analyticsData.overview.sellersChange), display: 'flex', alignItems: 'center' }}>
                                    {getChangeIcon(analyticsData.overview.sellersChange)}
                                    <Typography variant="caption" sx={{ ml: 0.5 }}>
                                        {Math.abs(analyticsData.overview.sellersChange)}%
                                    </Typography>
                                </Box>
                            </Stack>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                                {formatNumber(analyticsData.overview.totalSellers)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Active Sellers
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                                <LocalMall color="warning" sx={{ fontSize: 40 }} />
                                <Box sx={{ color: getChangeColor(analyticsData.overview.ordersChange), display: 'flex', alignItems: 'center' }}>
                                    {getChangeIcon(analyticsData.overview.ordersChange)}
                                    <Typography variant="caption" sx={{ ml: 0.5 }}>
                                        {Math.abs(analyticsData.overview.ordersChange)}%
                                    </Typography>
                                </Box>
                            </Stack>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                                {formatNumber(analyticsData.overview.totalOrders)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Total Orders
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                {/* Revenue Chart */}
                <Grid item xs={12} lg={8}>
                    <Card sx={{ height: '400px' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Monthly Revenue Trend
                            </Typography>
                            <Box sx={{ height: '320px', display: 'flex', alignItems: 'end', gap: 1, mt: 3 }}>
                                {analyticsData.monthlyRevenue.map((data, index) => {
                                    const maxRevenue = Math.max(...analyticsData.monthlyRevenue.map(d => d.revenue));
                                    const height = (data.revenue / maxRevenue) * 280;

                                    return (
                                        <Box key={data.month} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    height: `${height}px`,
                                                    backgroundColor: theme.palette.primary.main,
                                                    borderRadius: '4px 4px 0 0',
                                                    transition: 'all 0.3s ease',
                                                    cursor: 'pointer',
                                                    '&:hover': {
                                                        backgroundColor: theme.palette.primary.dark,
                                                        transform: 'scale(1.05)'
                                                    }
                                                }}
                                                title={`${data.month}: ${formatPrice(data.revenue)}`}
                                            />
                                            <Typography variant="caption" sx={{ mt: 1 }}>
                                                {data.month}
                                            </Typography>
                                        </Box>
                                    );
                                })}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Top Categories */}
                <Grid item xs={12} lg={4}>
                    <Card sx={{ height: '400px' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Top Categories
                            </Typography>
                            <Stack spacing={3} sx={{ mt: 2 }}>
                                {analyticsData.topCategories.map((category, index) => (
                                    <Box key={category.name}>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                                            <Typography variant="subtitle2">{category.name}</Typography>
                                            <Stack direction="row" alignItems="center" spacing={1}>
                                                <Chip
                                                    label={`${category.growth >= 0 ? '+' : ''}${category.growth}%`}
                                                    size="small"
                                                    color={category.growth >= 0 ? 'success' : 'error'}
                                                />
                                                <Typography variant="body2" color="text.secondary">
                                                    {formatPrice(category.revenue)}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                        <LinearProgress
                                            variant="determinate"
                                            value={(category.revenue / analyticsData.topCategories[0].revenue) * 100}
                                            sx={{
                                                height: 8,
                                                borderRadius: 4,
                                                backgroundColor: theme.palette.grey[200],
                                                '& .MuiLinearProgress-bar': {
                                                    borderRadius: 4
                                                }
                                            }}
                                        />
                                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                                            {category.orders} orders
                                        </Typography>
                                    </Box>
                                ))}
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Top Sellers */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ height: '350px' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Top Performing Sellers
                            </Typography>
                            <TableContainer>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Seller</TableCell>
                                            <TableCell align="right">Revenue</TableCell>
                                            <TableCell align="right">Orders</TableCell>
                                            <TableCell align="right">Rating</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {analyticsData.topSellers.map((seller, index) => (
                                            <TableRow key={seller.id}>
                                                <TableCell>
                                                    <Stack direction="row" spacing={2} alignItems="center">
                                                        <Chip
                                                            label={`#${index + 1}`}
                                                            size="small"
                                                            color={index === 0 ? 'primary' : 'default'}
                                                        />
                                                        <Avatar src={seller.avatar} sx={{ width: 32, height: 32 }}>
                                                            {seller.name.charAt(0)}
                                                        </Avatar>
                                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                            {seller.name}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                        {formatPrice(seller.revenue)}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Typography variant="body2">
                                                        {seller.orders}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={0.5}>
                                                        <Star sx={{ fontSize: 16, color: 'warning.main' }} />
                                                        <Typography variant="body2">
                                                            {seller.rating}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Recent Activity */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ height: '350px' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Recent Activity
                            </Typography>
                            <List sx={{ mt: 1 }}>
                                {analyticsData.recentActivity.map((activity, index) => (
                                    <ListItem key={index} sx={{ px: 0 }}>
                                        <ListItemAvatar>
                                            <Avatar sx={{ width: 32, height: 32, bgcolor: 'transparent' }}>
                                                {getActivityIcon(activity.type)}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <Typography variant="body2">
                                                    {activity.message}
                                                </Typography>
                                            }
                                            secondary={
                                                <Typography variant="caption" color="text.secondary">
                                                    {activity.time}
                                                </Typography>
                                            }
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AdminAnalytics;
