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
    Switch,
    FormControlLabel,
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
    Tabs,
    Tab,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    ListItemSecondaryAction
} from '@mui/material';
import {
    Add,
    Edit,
    Delete,
    Search,
    FilterList,
    Visibility,
    VisibilityOff,
    Block,
    CheckCircle,
    Cancel,
    People,
    Store,
    AdminPanelSettings,
    Email,
    Phone,
    LocationOn,
    Business,
    VerifiedUser,
    Warning,
    Download,
    Upload
} from '@mui/icons-material';

// Mock user data
const mockUsers = [
    {
        id: 1,
        name: 'Ahmed Benali',
        email: 'ahmed.benali@email.com',
        phone: '+213 555 123 456',
        role: 'customer',
        status: 'active',
        joinDate: '2024-01-15',
        lastActive: '2024-02-01T10:30:00Z',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        location: 'Algiers, Algeria',
        verified: true,
        orders: 12,
        totalSpent: 450000,
        notes: 'Premium customer, excellent payment history'
    },
    {
        id: 2,
        name: 'Fatima Electronics Store',
        email: 'fatima@electronics.com',
        phone: '+213 555 987 654',
        role: 'seller',
        status: 'active',
        joinDate: '2024-01-10',
        lastActive: '2024-02-01T14:20:00Z',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332d88c?w=100&h=100&fit=crop&crop=face',
        location: 'Oran, Algeria',
        verified: true,
        businessName: 'Fatima Electronics',
        products: 45,
        totalSales: 1250000,
        rating: 4.8,
        notes: 'Top performing seller, excellent customer service'
    },
    {
        id: 3,
        name: 'Mohamed Cherifi',
        email: 'mohamed.cherifi@email.com',
        phone: '+213 555 456 789',
        role: 'customer',
        status: 'pending',
        joinDate: '2024-01-30',
        lastActive: '2024-02-01T09:15:00Z',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        location: 'Constantine, Algeria',
        verified: false,
        orders: 0,
        totalSpent: 0,
        notes: 'New user, pending email verification'
    },
    {
        id: 4,
        name: 'Yasmine Fashion Hub',
        email: 'yasmine@fashion.com',
        phone: '+213 555 321 654',
        role: 'seller',
        status: 'suspended',
        joinDate: '2023-12-20',
        lastActive: '2024-01-25T16:45:00Z',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        location: 'Annaba, Algeria',
        verified: true,
        businessName: 'Yasmine Fashion Hub',
        products: 23,
        totalSales: 680000,
        rating: 3.2,
        notes: 'Suspended due to customer complaints, under review'
    },
    {
        id: 5,
        name: 'System Administrator',
        email: 'admin@algeriacommerce.dz',
        phone: '+213 555 000 000',
        role: 'admin',
        status: 'active',
        joinDate: '2023-01-01',
        lastActive: '2024-02-01T11:00:00Z',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        location: 'Algiers, Algeria',
        verified: true,
        notes: 'Platform administrator'
    }
];

const userRoles = [
    { value: 'customer', label: 'Customer', icon: <People />, color: 'info' },
    { value: 'seller', label: 'Seller', icon: <Store />, color: 'primary' },
    { value: 'admin', label: 'Admin', icon: <AdminPanelSettings />, color: 'error' }
];

const userStatuses = [
    { value: 'active', label: 'Active', color: 'success' },
    { value: 'pending', label: 'Pending', color: 'warning' },
    { value: 'suspended', label: 'Suspended', color: 'error' },
    { value: 'banned', label: 'Banned', color: 'error' }
];

const AdminUsers = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [users, setUsers] = useState(mockUsers);
    const [activeTab, setActiveTab] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Dialog states
    const [selectedUser, setSelectedUser] = useState(null);
    const [openUserDialog, setOpenUserDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [userForm, setUserForm] = useState({
        name: '',
        email: '',
        phone: '',
        role: 'customer',
        status: 'active',
        location: '',
        businessName: '',
        notes: ''
    });

    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatLastActive = (timestamp) => {
        const now = new Date();
        const date = new Date(timestamp);
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;

        return formatDate(timestamp);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('ar-DZ', {
            style: 'currency',
            currency: 'DZD',
            minimumFractionDigits: 0
        }).format(price);
    };

    const getRoleColor = (role) => {
        const roleObj = userRoles.find(r => r.value === role);
        return roleObj ? roleObj.color : 'default';
    };

    const getStatusColor = (status) => {
        const statusObj = userStatuses.find(s => s.value === status);
        return statusObj ? statusObj.color : 'default';
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = !filterRole || user.role === filterRole;
        const matchesStatus = !filterStatus || user.status === filterStatus;

        // Tab filtering
        let matchesTab = true;
        if (activeTab === 1) matchesTab = user.role === 'customer';
        if (activeTab === 2) matchesTab = user.role === 'seller';
        if (activeTab === 3) matchesTab = user.role === 'admin';

        return matchesSearch && matchesRole && matchesStatus && matchesTab;
    });

    const handleViewUser = (user) => {
        setSelectedUser(user);
        setOpenUserDialog(true);
    };

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setUserForm({
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            status: user.status,
            location: user.location,
            businessName: user.businessName || '',
            notes: user.notes || ''
        });
        setOpenEditDialog(true);
    };

    const handleSaveUser = () => {
        const updatedUser = {
            ...selectedUser,
            ...userForm,
            lastUpdated: new Date().toISOString()
        };

        setUsers(users.map(user =>
            user.id === selectedUser.id ? updatedUser : user
        ));

        setSnackbar({
            open: true,
            message: `User ${updatedUser.name} updated successfully`,
            severity: 'success'
        });

        setOpenEditDialog(false);
        setSelectedUser(null);
    };

    const handleStatusChange = (userId, newStatus) => {
        setUsers(users.map(user =>
            user.id === userId ? { ...user, status: newStatus } : user
        ));

        const user = users.find(u => u.id === userId);
        setSnackbar({
            open: true,
            message: `${user.name} status changed to ${newStatus}`,
            severity: 'success'
        });
    };

    const handleDeleteUser = (userId) => {
        const user = users.find(u => u.id === userId);
        setUsers(users.filter(u => u.id !== userId));
        setSnackbar({
            open: true,
            message: `User ${user.name} deleted successfully`,
            severity: 'success'
        });
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
        setPage(0);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getUserStats = () => {
        const totalUsers = users.length;
        const activeUsers = users.filter(u => u.status === 'active').length;
        const customers = users.filter(u => u.role === 'customer').length;
        const sellers = users.filter(u => u.role === 'seller').length;
        const admins = users.filter(u => u.role === 'admin').length;
        const pendingUsers = users.filter(u => u.status === 'pending').length;

        return { totalUsers, activeUsers, customers, sellers, admins, pendingUsers };
    };

    const stats = getUserStats();

    return (
        <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, py: { xs: 3, md: 4 } }}>
            {/* Header */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Box>
                    <Typography variant="h4" component="h1" gutterBottom>
                        User Management
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Manage platform users and their permissions
                    </Typography>
                </Box>
                <Stack direction="row" spacing={2}>
                    <Button variant="outlined" startIcon={<Download />}>
                        Export Users
                    </Button>
                    <Button variant="contained" startIcon={<Add />}>
                        Add User
                    </Button>
                </Stack>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={2}>
                    <Card>
                        <CardContent>
                            <Stack alignItems="center" spacing={1}>
                                <People color="primary" fontSize="large" />
                                <Typography variant="h4">{stats.totalUsers}</Typography>
                                <Typography variant="body2" color="text.secondary" textAlign="center">
                                    Total Users
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
                                <Typography variant="h4">{stats.activeUsers}</Typography>
                                <Typography variant="body2" color="text.secondary" textAlign="center">
                                    Active Users
                                </Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <Card>
                        <CardContent>
                            <Stack alignItems="center" spacing={1}>
                                <People color="info" fontSize="large" />
                                <Typography variant="h4">{stats.customers}</Typography>
                                <Typography variant="body2" color="text.secondary" textAlign="center">
                                    Customers
                                </Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <Card>
                        <CardContent>
                            <Stack alignItems="center" spacing={1}>
                                <Store color="primary" fontSize="large" />
                                <Typography variant="h4">{stats.sellers}</Typography>
                                <Typography variant="body2" color="text.secondary" textAlign="center">
                                    Sellers
                                </Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <Card>
                        <CardContent>
                            <Stack alignItems="center" spacing={1}>
                                <AdminPanelSettings color="error" fontSize="large" />
                                <Typography variant="h4">{stats.admins}</Typography>
                                <Typography variant="body2" color="text.secondary" textAlign="center">
                                    Admins
                                </Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <Card>
                        <CardContent>
                            <Stack alignItems="center" spacing={1}>
                                <Badge badgeContent={stats.pendingUsers} color="warning">
                                    <Warning color="warning" fontSize="large" />
                                </Badge>
                                <Typography variant="h4">{stats.pendingUsers}</Typography>
                                <Typography variant="body2" color="text.secondary" textAlign="center">
                                    Pending
                                </Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Tabs */}
            <Paper sx={{ mb: 3 }}>
                <Tabs value={activeTab} onChange={handleTabChange}>
                    <Tab label={`All Users (${users.length})`} />
                    <Tab label={`Customers (${stats.customers})`} />
                    <Tab label={`Sellers (${stats.sellers})`} />
                    <Tab label={`Admins (${stats.admins})`} />
                </Tabs>
            </Paper>

            {/* Filters */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            placeholder="Search users by name or email..."
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
                            <InputLabel>Role</InputLabel>
                            <Select
                                value={filterRole}
                                label="Role"
                                onChange={(e) => setFilterRole(e.target.value)}
                            >
                                <MenuItem value="">All Roles</MenuItem>
                                {userRoles.map(role => (
                                    <MenuItem key={role.value} value={role.value}>
                                        {role.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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
                                {userStatuses.map(status => (
                                    <MenuItem key={status.value} value={status.value}>
                                        {status.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>

            {/* Users Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>User</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Join Date</TableCell>
                            <TableCell>Last Active</TableCell>
                            <TableCell>Performance</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(user => (
                            <TableRow key={user.id} hover>
                                <TableCell>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Badge
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            badgeContent={
                                                user.verified ? (
                                                    <VerifiedUser sx={{ fontSize: 16, color: 'success.main' }} />
                                                ) : null
                                            }
                                        >
                                            <Avatar src={user.avatar} sx={{ width: 48, height: 48 }}>
                                                {user.name.charAt(0)}
                                            </Avatar>
                                        </Badge>
                                        <Box>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                {user.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {user.email}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {user.location}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={userRoles.find(r => r.value === user.role)?.label}
                                        color={getRoleColor(user.role)}
                                        size="small"
                                        icon={userRoles.find(r => r.value === user.role)?.icon}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={userStatuses.find(s => s.value === user.status)?.label}
                                        color={getStatusColor(user.status)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">
                                        {formatDate(user.joinDate)}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">
                                        {formatLastActive(user.lastActive)}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    {user.role === 'customer' && (
                                        <Stack spacing={0.5}>
                                            <Typography variant="body2">
                                                {user.orders} orders
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {formatPrice(user.totalSpent)}
                                            </Typography>
                                        </Stack>
                                    )}
                                    {user.role === 'seller' && (
                                        <Stack spacing={0.5}>
                                            <Typography variant="body2">
                                                {user.products} products
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {formatPrice(user.totalSales)} • ★{user.rating}
                                            </Typography>
                                        </Stack>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={1}>
                                        <Tooltip title="View Details">
                                            <IconButton
                                                size="small"
                                                onClick={() => handleViewUser(user)}
                                            >
                                                <Visibility />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Edit User">
                                            <IconButton
                                                size="small"
                                                color="primary"
                                                onClick={() => handleEditUser(user)}
                                            >
                                                <Edit />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Suspend User">
                                            <IconButton
                                                size="small"
                                                color="warning"
                                                onClick={() => handleStatusChange(user.id, user.status === 'suspended' ? 'active' : 'suspended')}
                                            >
                                                <Block />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete User">
                                            <IconButton
                                                size="small"
                                                color="error"
                                                onClick={() => handleDeleteUser(user.id)}
                                            >
                                                <Delete />
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
                    count={filteredUsers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>

            {/* User Details Dialog */}
            <Dialog
                open={openUserDialog}
                onClose={() => setOpenUserDialog(false)}
                maxWidth="md"
                fullWidth
                fullScreen={isMobile}
            >
                {selectedUser && (
                    <>
                        <DialogTitle>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Avatar src={selectedUser.avatar} sx={{ width: 56, height: 56 }}>
                                    {selectedUser.name.charAt(0)}
                                </Avatar>
                                <Box>
                                    <Typography variant="h6">{selectedUser.name}</Typography>
                                    <Stack direction="row" spacing={1}>
                                        <Chip
                                            label={userRoles.find(r => r.value === selectedUser.role)?.label}
                                            color={getRoleColor(selectedUser.role)}
                                            size="small"
                                        />
                                        <Chip
                                            label={userStatuses.find(s => s.value === selectedUser.status)?.label}
                                            color={getStatusColor(selectedUser.status)}
                                            size="small"
                                        />
                                    </Stack>
                                </Box>
                            </Stack>
                        </DialogTitle>
                        <DialogContent>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>Contact Information</Typography>
                                            <Stack spacing={2}>
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <Email fontSize="small" color="action" />
                                                    <Typography variant="body2">{selectedUser.email}</Typography>
                                                </Stack>
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <Phone fontSize="small" color="action" />
                                                    <Typography variant="body2">{selectedUser.phone}</Typography>
                                                </Stack>
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <LocationOn fontSize="small" color="action" />
                                                    <Typography variant="body2">{selectedUser.location}</Typography>
                                                </Stack>
                                                {selectedUser.businessName && (
                                                    <Stack direction="row" spacing={1} alignItems="center">
                                                        <Business fontSize="small" color="action" />
                                                        <Typography variant="body2">{selectedUser.businessName}</Typography>
                                                    </Stack>
                                                )}
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>Account Information</Typography>
                                            <Stack spacing={2}>
                                                <Stack direction="row" justifyContent="space-between">
                                                    <Typography variant="body2">Join Date:</Typography>
                                                    <Typography variant="body2">{formatDate(selectedUser.joinDate)}</Typography>
                                                </Stack>
                                                <Stack direction="row" justifyContent="space-between">
                                                    <Typography variant="body2">Last Active:</Typography>
                                                    <Typography variant="body2">{formatLastActive(selectedUser.lastActive)}</Typography>
                                                </Stack>
                                                <Stack direction="row" justifyContent="space-between">
                                                    <Typography variant="body2">Verified:</Typography>
                                                    <Chip
                                                        label={selectedUser.verified ? 'Verified' : 'Not Verified'}
                                                        color={selectedUser.verified ? 'success' : 'warning'}
                                                        size="small"
                                                    />
                                                </Stack>
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                {selectedUser.notes && (
                                    <Grid item xs={12}>
                                        <Card variant="outlined">
                                            <CardContent>
                                                <Typography variant="h6" gutterBottom>Notes</Typography>
                                                <Typography variant="body2">{selectedUser.notes}</Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                )}
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenUserDialog(false)}>Close</Button>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    setOpenUserDialog(false);
                                    handleEditUser(selectedUser);
                                }}
                            >
                                Edit User
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>

            {/* Edit User Dialog */}
            <Dialog
                open={openEditDialog}
                onClose={() => setOpenEditDialog(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    <Grid container spacing={3} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Name"
                                value={userForm.name}
                                onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                value={userForm.email}
                                onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Phone"
                                value={userForm.phone}
                                onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Role</InputLabel>
                                <Select
                                    value={userForm.role}
                                    label="Role"
                                    onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                                >
                                    {userRoles.map(role => (
                                        <MenuItem key={role.value} value={role.value}>
                                            {role.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={userForm.status}
                                    label="Status"
                                    onChange={(e) => setUserForm({ ...userForm, status: e.target.value })}
                                >
                                    {userStatuses.map(status => (
                                        <MenuItem key={status.value} value={status.value}>
                                            {status.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Location"
                                value={userForm.location}
                                onChange={(e) => setUserForm({ ...userForm, location: e.target.value })}
                            />
                        </Grid>
                        {userForm.role === 'seller' && (
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Business Name"
                                    value={userForm.businessName}
                                    onChange={(e) => setUserForm({ ...userForm, businessName: e.target.value })}
                                />
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Admin Notes"
                                multiline
                                rows={3}
                                value={userForm.notes}
                                onChange={(e) => setUserForm({ ...userForm, notes: e.target.value })}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSaveUser}>
                        Save Changes
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

export default AdminUsers;
