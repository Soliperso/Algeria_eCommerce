import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    IconButton,
    TextField,
    InputAdornment,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack,
    Divider,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Avatar,
    Snackbar,
    Alert,
    Badge,
    Tooltip,
    useTheme,
    useMediaQuery,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    List,
    ListItem,
    ListItemText,
    ListItemIcon
} from '@mui/material';
import {
    Search,
    FilterList,
    Visibility,
    Edit,
    LocalShipping,
    CheckCircle,
    Cancel,
    AccessTime,
    Phone,
    Email,
    LocationOn,
    Notifications,
    NotificationsActive,
    Print,
    Download,
    Message,
    Update,
    Archive
} from '@mui/icons-material';

// Mock order data for seller
const mockSellerOrders = [
    {
        id: 'ORD-2024-001',
        customerName: 'Ahmed Benali',
        customerEmail: 'ahmed.benali@email.com',
        customerPhone: '+213 555 123 456',
        customerAddress: '15 Rue Didouche Mourad, Algiers 16000',
        orderDate: '2024-02-01T10:30:00Z',
        status: 'pending',
        priority: 'high',
        total: 180000,
        items: [
            {
                id: 1,
                name: 'Samsung Galaxy S24 Ultra 256GB',
                price: 180000,
                quantity: 1,
                image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=100&h=100&fit=crop'
            }
        ],
        shippingMethod: 'Express Delivery',
        paymentMethod: 'CIB Card',
        paymentStatus: 'paid',
        notes: 'Customer requested expedited shipping',
        timeline: [
            { status: 'placed', date: '2024-02-01T10:30:00Z', note: 'Order placed by customer' },
            { status: 'confirmed', date: '2024-02-01T11:00:00Z', note: 'Order confirmed by seller' }
        ]
    },
    {
        id: 'ORD-2024-002',
        customerName: 'Fatima Cherifi',
        customerEmail: 'fatima.cherifi@email.com',
        customerPhone: '+213 555 987 654',
        customerAddress: '42 Boulevard Colonel Amirouche, Oran 31000',
        orderDate: '2024-01-30T14:15:00Z',
        status: 'processing',
        priority: 'medium',
        total: 220000,
        items: [
            {
                id: 2,
                name: 'Apple MacBook Air M3 13-inch',
                price: 220000,
                quantity: 1,
                image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=100&h=100&fit=crop'
            }
        ],
        shippingMethod: 'Standard Delivery',
        paymentMethod: 'Bank Transfer',
        paymentStatus: 'paid',
        notes: '',
        timeline: [
            { status: 'placed', date: '2024-01-30T14:15:00Z', note: 'Order placed by customer' },
            { status: 'confirmed', date: '2024-01-30T15:00:00Z', note: 'Order confirmed by seller' },
            { status: 'processing', date: '2024-01-31T09:00:00Z', note: 'Order processing started' }
        ]
    },
    {
        id: 'ORD-2024-003',
        customerName: 'Mohamed Slimani',
        customerEmail: 'mohamed.slimani@email.com',
        customerPhone: '+213 555 456 789',
        customerAddress: '78 Rue Ben M\'hidi Larbi, Constantine 25000',
        orderDate: '2024-01-28T16:45:00Z',
        status: 'shipped',
        priority: 'low',
        total: 45000,
        items: [
            {
                id: 3,
                name: 'Sony WH-1000XM5 Headphones',
                price: 45000,
                quantity: 1,
                image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=100&h=100&fit=crop'
            }
        ],
        shippingMethod: 'Standard Delivery',
        paymentMethod: 'Cash on Delivery',
        paymentStatus: 'pending',
        trackingNumber: 'ALG123456789',
        notes: 'Fragile item - handle with care',
        timeline: [
            { status: 'placed', date: '2024-01-28T16:45:00Z', note: 'Order placed by customer' },
            { status: 'confirmed', date: '2024-01-29T08:00:00Z', note: 'Order confirmed by seller' },
            { status: 'processing', date: '2024-01-29T10:00:00Z', note: 'Order processing started' },
            { status: 'shipped', date: '2024-01-30T14:00:00Z', note: 'Order shipped via Ylidz Express' }
        ]
    },
    {
        id: 'ORD-2024-004',
        customerName: 'Yasmine Kadri',
        customerEmail: 'yasmine.kadri@email.com',
        customerPhone: '+213 555 321 654',
        customerAddress: '23 Avenue de l\'Independence, Annaba 23000',
        orderDate: '2024-01-25T11:20:00Z',
        status: 'delivered',
        priority: 'medium',
        total: 280000,
        items: [
            {
                id: 4,
                name: 'iPad Pro 12.9-inch M4',
                price: 280000,
                quantity: 1,
                image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100&h=100&fit=crop'
            }
        ],
        shippingMethod: 'Express Delivery',
        paymentMethod: 'CIB Card',
        paymentStatus: 'paid',
        trackingNumber: 'ALG987654321',
        deliveredDate: '2024-01-27T16:30:00Z',
        notes: '',
        timeline: [
            { status: 'placed', date: '2024-01-25T11:20:00Z', note: 'Order placed by customer' },
            { status: 'confirmed', date: '2024-01-25T12:00:00Z', note: 'Order confirmed by seller' },
            { status: 'processing', date: '2024-01-25T14:00:00Z', note: 'Order processing started' },
            { status: 'shipped', date: '2024-01-26T09:00:00Z', note: 'Order shipped via Ylidz Express' },
            { status: 'delivered', date: '2024-01-27T16:30:00Z', note: 'Order delivered successfully' }
        ]
    },
    {
        id: 'ORD-2024-005',
        customerName: 'Karim Bouteflika',
        customerEmail: 'karim.bouteflika@email.com',
        customerPhone: '+213 555 789 123',
        customerAddress: '56 Rue Emir Abdelkader, Tlemcen 13000',
        orderDate: '2024-01-20T09:15:00Z',
        status: 'cancelled',
        priority: 'low',
        total: 90000,
        items: [
            {
                id: 3,
                name: 'Sony WH-1000XM5 Headphones',
                price: 45000,
                quantity: 2,
                image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=100&h=100&fit=crop'
            }
        ],
        shippingMethod: 'Standard Delivery',
        paymentMethod: 'Bank Transfer',
        paymentStatus: 'refunded',
        cancelledDate: '2024-01-21T14:00:00Z',
        cancelReason: 'Customer requested cancellation - changed mind',
        notes: 'Refund processed on 2024-01-22',
        timeline: [
            { status: 'placed', date: '2024-01-20T09:15:00Z', note: 'Order placed by customer' },
            { status: 'confirmed', date: '2024-01-20T10:00:00Z', note: 'Order confirmed by seller' },
            { status: 'cancelled', date: '2024-01-21T14:00:00Z', note: 'Order cancelled at customer request' }
        ]
    }
];

const orderStatuses = [
    { value: 'pending', label: 'Pending', color: 'warning' },
    { value: 'confirmed', label: 'Confirmed', color: 'info' },
    { value: 'processing', label: 'Processing', color: 'primary' },
    { value: 'shipped', label: 'Shipped', color: 'secondary' },
    { value: 'delivered', label: 'Delivered', color: 'success' },
    { value: 'cancelled', label: 'Cancelled', color: 'error' }
];

const priorities = [
    { value: 'low', label: 'Low', color: 'default' },
    { value: 'medium', label: 'Medium', color: 'warning' },
    { value: 'high', label: 'High', color: 'error' }
];

const SellerOrders = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [orders, setOrders] = useState(mockSellerOrders);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterPriority, setFilterPriority] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Dialog states
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [openOrderDialog, setOpenOrderDialog] = useState(false);
    const [openStatusDialog, setOpenStatusDialog] = useState(false);
    const [newStatus, setNewStatus] = useState('');
    const [statusNote, setStatusNote] = useState('');

    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const formatPrice = (price) => {
        return new Intl.NumberFormat('ar-DZ', {
            style: 'currency',
            currency: 'DZD',
            minimumFractionDigits: 0
        }).format(price);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status) => {
        const statusObj = orderStatuses.find(s => s.value === status);
        return statusObj ? statusObj.color : 'default';
    };

    const getPriorityColor = (priority) => {
        const priorityObj = priorities.find(p => p.value === priority);
        return priorityObj ? priorityObj.color : 'default';
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = !filterStatus || order.status === filterStatus;
        const matchesPriority = !filterPriority || order.priority === filterPriority;

        return matchesSearch && matchesStatus && matchesPriority;
    });

    const handleViewOrder = (order) => {
        setSelectedOrder(order);
        setOpenOrderDialog(true);
    };

    const handleUpdateStatus = (order) => {
        setSelectedOrder(order);
        setNewStatus(order.status);
        setStatusNote('');
        setOpenStatusDialog(true);
    };

    const handleSaveStatus = () => {
        if (!newStatus) return;

        const updatedOrder = {
            ...selectedOrder,
            status: newStatus,
            timeline: [
                ...selectedOrder.timeline,
                {
                    status: newStatus,
                    date: new Date().toISOString(),
                    note: statusNote || `Status updated to ${newStatus}`
                }
            ]
        };

        // Add tracking number if shipping
        if (newStatus === 'shipped' && !selectedOrder.trackingNumber) {
            updatedOrder.trackingNumber = `ALG${Date.now().toString().slice(-9)}`;
        }

        // Add delivered date if delivered
        if (newStatus === 'delivered') {
            updatedOrder.deliveredDate = new Date().toISOString();
        }

        setOrders(orders.map(order =>
            order.id === selectedOrder.id ? updatedOrder : order
        ));

        setSnackbar({
            open: true,
            message: `Order ${selectedOrder.id} status updated to ${newStatus}`,
            severity: 'success'
        });

        setOpenStatusDialog(false);
        setSelectedOrder(null);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getOrderStats = () => {
        const totalOrders = orders.length;
        const pendingOrders = orders.filter(o => o.status === 'pending').length;
        const processingOrders = orders.filter(o => o.status === 'processing').length;
        const shippedOrders = orders.filter(o => o.status === 'shipped').length;
        const deliveredOrders = orders.filter(o => o.status === 'delivered').length;
        const totalRevenue = orders
            .filter(o => o.status === 'delivered')
            .reduce((sum, o) => sum + o.total, 0);

        return {
            totalOrders,
            pendingOrders,
            processingOrders,
            shippedOrders,
            deliveredOrders,
            totalRevenue
        };
    };

    const stats = getOrderStats();

    return (
        <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, py: { xs: 3, md: 4 } }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Order Management
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Track and manage customer orders
                </Typography>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={2}>
                    <Card>
                        <CardContent>
                            <Stack alignItems="center" spacing={1}>
                                <Badge badgeContent={stats.pendingOrders} color="warning">
                                    <AccessTime color="warning" fontSize="large" />
                                </Badge>
                                <Typography variant="h4">{stats.totalOrders}</Typography>
                                <Typography variant="body2" color="text.secondary" textAlign="center">
                                    Total Orders
                                </Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <Card>
                        <CardContent>
                            <Stack alignItems="center" spacing={1}>
                                <Badge badgeContent={stats.pendingOrders} color="warning">
                                    <NotificationsActive color="warning" fontSize="large" />
                                </Badge>
                                <Typography variant="h4">{stats.pendingOrders}</Typography>
                                <Typography variant="body2" color="text.secondary" textAlign="center">
                                    Pending Orders
                                </Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <Card>
                        <CardContent>
                            <Stack alignItems="center" spacing={1}>
                                <Edit color="primary" fontSize="large" />
                                <Typography variant="h4">{stats.processingOrders}</Typography>
                                <Typography variant="body2" color="text.secondary" textAlign="center">
                                    Processing
                                </Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <Card>
                        <CardContent>
                            <Stack alignItems="center" spacing={1}>
                                <LocalShipping color="secondary" fontSize="large" />
                                <Typography variant="h4">{stats.shippedOrders}</Typography>
                                <Typography variant="body2" color="text.secondary" textAlign="center">
                                    Shipped
                                </Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <Card>
                        <CardContent>
                            <Stack alignItems="center" spacing={1}>
                                <CheckCircle color="success" fontSize="large" />
                                <Typography variant="h4">{stats.deliveredOrders}</Typography>
                                <Typography variant="body2" color="text.secondary" textAlign="center">
                                    Delivered
                                </Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <Card>
                        <CardContent>
                            <Stack alignItems="center" spacing={1}>
                                <Box sx={{ color: 'success.main' }}>💰</Box>
                                <Typography variant="h6">{formatPrice(stats.totalRevenue)}</Typography>
                                <Typography variant="body2" color="text.secondary" textAlign="center">
                                    Revenue
                                </Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Filters and Search */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            placeholder="Search orders by ID, customer name, or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={filterStatus}
                                label="Status"
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <MenuItem value="">All Status</MenuItem>
                                {orderStatuses.map(status => (
                                    <MenuItem key={status.value} value={status.value}>
                                        {status.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel>Priority</InputLabel>
                            <Select
                                value={filterPriority}
                                label="Priority"
                                onChange={(e) => setFilterPriority(e.target.value)}
                            >
                                <MenuItem value="">All Priorities</MenuItem>
                                {priorities.map(priority => (
                                    <MenuItem key={priority.value} value={priority.value}>
                                        {priority.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>

            {/* Orders Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Customer</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Priority</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(order => (
                            <TableRow key={order.id} hover>
                                <TableCell>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                        {order.id}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {order.items.length} item(s)
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Avatar sx={{ width: 40, height: 40 }}>
                                            {order.customerName.charAt(0)}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="subtitle2">{order.customerName}</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {order.customerEmail}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">
                                        {formatDate(order.orderDate)}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={orderStatuses.find(s => s.value === order.status)?.label}
                                        color={getStatusColor(order.status)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={priorities.find(p => p.value === order.priority)?.label}
                                        color={getPriorityColor(order.priority)}
                                        size="small"
                                        variant="outlined"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                        {formatPrice(order.total)}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={1}>
                                        <Tooltip title="View Details">
                                            <IconButton
                                                size="small"
                                                onClick={() => handleViewOrder(order)}
                                            >
                                                <Visibility />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Update Status">
                                            <IconButton
                                                size="small"
                                                color="primary"
                                                onClick={() => handleUpdateStatus(order)}
                                            >
                                                <Update />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Contact Customer">
                                            <IconButton
                                                size="small"
                                                color="info"
                                            >
                                                <Message />
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredOrders.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>

            {/* Order Details Dialog */}
            <Dialog
                open={openOrderDialog}
                onClose={() => setOpenOrderDialog(false)}
                maxWidth="lg"
                fullWidth
                fullScreen={isMobile}
            >
                {selectedOrder && (
                    <>
                        <DialogTitle>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Box>
                                    <Typography variant="h6">Order Details</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {selectedOrder.id}
                                    </Typography>
                                </Box>
                                <Stack direction="row" spacing={1}>
                                    <IconButton>
                                        <Print />
                                    </IconButton>
                                    <IconButton>
                                        <Download />
                                    </IconButton>
                                </Stack>
                            </Stack>
                        </DialogTitle>
                        <DialogContent>
                            <Grid container spacing={3}>
                                {/* Customer Information */}
                                <Grid item xs={12} md={6}>
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>Customer Information</Typography>
                                            <Stack spacing={2}>
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <Avatar>{selectedOrder.customerName.charAt(0)}</Avatar>
                                                    <Box>
                                                        <Typography variant="subtitle2">{selectedOrder.customerName}</Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {selectedOrder.customerEmail}
                                                        </Typography>
                                                    </Box>
                                                </Stack>
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <Phone fontSize="small" color="action" />
                                                    <Typography variant="body2">{selectedOrder.customerPhone}</Typography>
                                                </Stack>
                                                <Stack direction="row" spacing={1} alignItems="flex-start">
                                                    <LocationOn fontSize="small" color="action" />
                                                    <Typography variant="body2">{selectedOrder.customerAddress}</Typography>
                                                </Stack>
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                {/* Order Summary */}
                                <Grid item xs={12} md={6}>
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>Order Summary</Typography>
                                            <Stack spacing={2}>
                                                <Stack direction="row" justifyContent="space-between">
                                                    <Typography variant="body2">Order Date:</Typography>
                                                    <Typography variant="body2">{formatDate(selectedOrder.orderDate)}</Typography>
                                                </Stack>
                                                <Stack direction="row" justifyContent="space-between">
                                                    <Typography variant="body2">Status:</Typography>
                                                    <Chip
                                                        label={orderStatuses.find(s => s.value === selectedOrder.status)?.label}
                                                        color={getStatusColor(selectedOrder.status)}
                                                        size="small"
                                                    />
                                                </Stack>
                                                <Stack direction="row" justifyContent="space-between">
                                                    <Typography variant="body2">Priority:</Typography>
                                                    <Chip
                                                        label={priorities.find(p => p.value === selectedOrder.priority)?.label}
                                                        color={getPriorityColor(selectedOrder.priority)}
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                </Stack>
                                                <Stack direction="row" justifyContent="space-between">
                                                    <Typography variant="body2">Payment Method:</Typography>
                                                    <Typography variant="body2">{selectedOrder.paymentMethod}</Typography>
                                                </Stack>
                                                <Stack direction="row" justifyContent="space-between">
                                                    <Typography variant="body2">Shipping Method:</Typography>
                                                    <Typography variant="body2">{selectedOrder.shippingMethod}</Typography>
                                                </Stack>
                                                {selectedOrder.trackingNumber && (
                                                    <Stack direction="row" justifyContent="space-between">
                                                        <Typography variant="body2">Tracking Number:</Typography>
                                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                            {selectedOrder.trackingNumber}
                                                        </Typography>
                                                    </Stack>
                                                )}
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                {/* Order Items */}
                                <Grid item xs={12}>
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>Order Items</Typography>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Product</TableCell>
                                                        <TableCell>Price</TableCell>
                                                        <TableCell>Quantity</TableCell>
                                                        <TableCell>Total</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {selectedOrder.items.map(item => (
                                                        <TableRow key={item.id}>
                                                            <TableCell>
                                                                <Stack direction="row" spacing={2} alignItems="center">
                                                                    <Box
                                                                        component="img"
                                                                        src={item.image}
                                                                        alt={item.name}
                                                                        sx={{ width: 50, height: 50, borderRadius: 1 }}
                                                                    />
                                                                    <Typography variant="subtitle2">{item.name}</Typography>
                                                                </Stack>
                                                            </TableCell>
                                                            <TableCell>{formatPrice(item.price)}</TableCell>
                                                            <TableCell>{item.quantity}</TableCell>
                                                            <TableCell sx={{ fontWeight: 600 }}>
                                                                {formatPrice(item.price * item.quantity)}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                    <TableRow>
                                                        <TableCell colSpan={3}>
                                                            <Typography variant="h6">Total</Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="h6" color="primary">
                                                                {formatPrice(selectedOrder.total)}
                                                            </Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                {/* Order Timeline */}
                                <Grid item xs={12}>
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>Order Timeline</Typography>
                                            <List>
                                                {selectedOrder.timeline.map((event, index) => (
                                                    <ListItem key={index}>
                                                        <ListItemIcon>
                                                            <Chip
                                                                label=""
                                                                color={getStatusColor(event.status)}
                                                                sx={{ width: 12, height: 12, minWidth: 12 }}
                                                            />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={orderStatuses.find(s => s.value === event.status)?.label}
                                                            secondary={
                                                                <Box>
                                                                    <Typography variant="body2" color="text.secondary">
                                                                        {event.note}
                                                                    </Typography>
                                                                    <Typography variant="caption" color="text.secondary">
                                                                        {formatDate(event.date)}
                                                                    </Typography>
                                                                </Box>
                                                            }
                                                        />
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                {/* Notes */}
                                {selectedOrder.notes && (
                                    <Grid item xs={12}>
                                        <Card variant="outlined">
                                            <CardContent>
                                                <Typography variant="h6" gutterBottom>Order Notes</Typography>
                                                <Typography variant="body2">{selectedOrder.notes}</Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                )}
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenOrderDialog(false)}>Close</Button>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    setOpenOrderDialog(false);
                                    handleUpdateStatus(selectedOrder);
                                }}
                            >
                                Update Status
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>

            {/* Status Update Dialog */}
            <Dialog
                open={openStatusDialog}
                onClose={() => setOpenStatusDialog(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Update Order Status</DialogTitle>
                <DialogContent>
                    <Stack spacing={3} sx={{ mt: 1 }}>
                        <FormControl fullWidth>
                            <InputLabel>New Status</InputLabel>
                            <Select
                                value={newStatus}
                                label="New Status"
                                onChange={(e) => setNewStatus(e.target.value)}
                            >
                                {orderStatuses.map(status => (
                                    <MenuItem key={status.value} value={status.value}>
                                        {status.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            label="Status Note (Optional)"
                            multiline
                            rows={3}
                            value={statusNote}
                            onChange={(e) => setStatusNote(e.target.value)}
                            placeholder="Add a note about this status update..."
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenStatusDialog(false)}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={handleSaveStatus}
                        disabled={!newStatus}
                    >
                        Update Status
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    variant="filled"
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default SellerOrders;
