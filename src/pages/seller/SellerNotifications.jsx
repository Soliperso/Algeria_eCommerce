import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardActions,
    Button,
    IconButton,
    Avatar,
    Badge,
    Stack,
    Chip,
    Divider,
    Paper,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction,
    Switch,
    FormControlLabel,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Tabs,
    Tab,
    useTheme
} from '@mui/material';
import {
    Notifications,
    NotificationsActive,
    NotificationsOff,
    ShoppingCart,
    Inventory,
    LocalShipping,
    Star,
    TrendingUp,
    Warning,
    CheckCircle,
    Email,
    Sms,
    Settings,
    MarkEmailRead,
    Delete,
    Archive,
    Circle
} from '@mui/icons-material';

// Mock notifications data
const mockNotifications = [
    {
        id: 1,
        type: 'new_order',
        title: 'New Order Received',
        message: 'Order #ORD-2024-001 from Ahmed Benali for Samsung Galaxy S24 Ultra',
        timestamp: '2024-02-01T10:30:00Z',
        isRead: false,
        priority: 'high',
        data: { orderId: 'ORD-2024-001', customerName: 'Ahmed Benali', amount: 180000 }
    },
    {
        id: 2,
        type: 'low_stock',
        title: 'Low Stock Alert',
        message: 'Sony WH-1000XM5 Headphones is running low on stock (2 remaining)',
        timestamp: '2024-02-01T09:15:00Z',
        isRead: false,
        priority: 'medium',
        data: { productId: 3, productName: 'Sony WH-1000XM5 Headphones', stock: 2 }
    },
    {
        id: 3,
        type: 'review',
        title: 'New Product Review',
        message: 'Fatima Cherifi left a 5-star review for MacBook Air M3',
        timestamp: '2024-01-31T16:45:00Z',
        isRead: true,
        priority: 'low',
        data: { productId: 2, customerName: 'Fatima Cherifi', rating: 5 }
    },
    {
        id: 4,
        type: 'payment',
        title: 'Payment Received',
        message: 'Payment confirmed for Order #ORD-2024-002 (DZD 220,000)',
        timestamp: '2024-01-31T14:20:00Z',
        isRead: true,
        priority: 'medium',
        data: { orderId: 'ORD-2024-002', amount: 220000 }
    },
    {
        id: 5,
        type: 'shipping',
        title: 'Order Shipped',
        message: 'Order #ORD-2024-003 has been shipped via Ylidz Express',
        timestamp: '2024-01-30T11:00:00Z',
        isRead: true,
        priority: 'low',
        data: { orderId: 'ORD-2024-003', trackingNumber: 'ALG123456789' }
    },
    {
        id: 6,
        type: 'system',
        title: 'Account Verification',
        message: 'Your seller account documents have been approved',
        timestamp: '2024-01-29T08:30:00Z',
        isRead: true,
        priority: 'high',
        data: {}
    },
    {
        id: 7,
        type: 'promotion',
        title: 'Sales Performance',
        message: 'Congratulations! You\'ve reached 50 sales this month',
        timestamp: '2024-01-28T17:15:00Z',
        isRead: true,
        priority: 'low',
        data: { salesCount: 50, period: 'month' }
    }
];

const notificationTypes = [
    { value: 'new_order', label: 'New Orders', icon: <ShoppingCart />, color: 'primary' },
    { value: 'low_stock', label: 'Low Stock', icon: <Inventory />, color: 'warning' },
    { value: 'review', label: 'Reviews', icon: <Star />, color: 'success' },
    { value: 'payment', label: 'Payments', icon: <CheckCircle />, color: 'info' },
    { value: 'shipping', label: 'Shipping', icon: <LocalShipping />, color: 'secondary' },
    { value: 'system', label: 'System', icon: <Settings />, color: 'default' },
    { value: 'promotion', label: 'Promotions', icon: <TrendingUp />, color: 'success' }
];

const SellerNotifications = () => {
    const theme = useTheme();
    const [notifications, setNotifications] = useState(mockNotifications);
    const [activeTab, setActiveTab] = useState(0);
    const [selectedType, setSelectedType] = useState('all');
    const [openSettings, setOpenSettings] = useState(false);

    // Notification settings
    const [settings, setSettings] = useState({
        emailNotifications: true,
        smsNotifications: false,
        browserNotifications: true,
        types: {
            new_order: { email: true, sms: false, browser: true },
            low_stock: { email: true, sms: false, browser: true },
            review: { email: false, sms: false, browser: true },
            payment: { email: true, sms: false, browser: true },
            shipping: { email: false, sms: false, browser: true },
            system: { email: true, sms: false, browser: true },
            promotion: { email: false, sms: false, browser: false }
        }
    });

    const formatTimestamp = (timestamp) => {
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

        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
        });
    };

    const getNotificationIcon = (type) => {
        const notificationType = notificationTypes.find(t => t.value === type);
        return notificationType ? notificationType.icon : <Notifications />;
    };

    const getNotificationColor = (type) => {
        const notificationType = notificationTypes.find(t => t.value === type);
        return notificationType ? notificationType.color : 'default';
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'error';
            case 'medium': return 'warning';
            case 'low': return 'success';
            default: return 'default';
        }
    };

    const filteredNotifications = notifications.filter(notification => {
        if (activeTab === 0) return true; // All
        if (activeTab === 1) return !notification.isRead; // Unread
        if (activeTab === 2) return notification.isRead; // Read
        if (selectedType !== 'all') return notification.type === selectedType;
        return true;
    });

    const unreadCount = notifications.filter(n => !n.isRead).length;

    const handleMarkAsRead = (notificationId) => {
        setNotifications(notifications.map(n =>
            n.id === notificationId ? { ...n, isRead: true } : n
        ));
    };

    const handleMarkAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    };

    const handleDeleteNotification = (notificationId) => {
        setNotifications(notifications.filter(n => n.id !== notificationId));
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleSettingsChange = (path, value) => {
        setSettings(prev => {
            const newSettings = { ...prev };
            const keys = path.split('.');
            let current = newSettings;

            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]];
            }

            current[keys[keys.length - 1]] = value;
            return newSettings;
        });
    };

    // Request browser notification permission
    useEffect(() => {
        if ('Notification' in window && settings.browserNotifications) {
            Notification.requestPermission();
        }
    }, [settings.browserNotifications]);

    return (
        <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, py: { xs: 3, md: 4 } }}>
            {/* Header */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Badge badgeContent={unreadCount} color="error">
                        <NotificationsActive color="primary" sx={{ fontSize: 32 }} />
                    </Badge>
                    <Box>
                        <Typography variant="h4" component="h1">
                            Notifications
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Stay updated with your store activity
                        </Typography>
                    </Box>
                </Box>
                <Stack direction="row" spacing={1}>
                    <Button
                        variant="outlined"
                        onClick={handleMarkAllAsRead}
                        disabled={unreadCount === 0}
                    >
                        Mark All Read
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<Settings />}
                        onClick={() => setOpenSettings(true)}
                    >
                        Settings
                    </Button>
                </Stack>
            </Box>

            {/* Quick Stats */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>Notification Summary</Typography>
                <Stack direction="row" spacing={4} flexWrap="wrap">
                    {notificationTypes.map(type => {
                        const count = notifications.filter(n => n.type === type.value).length;
                        const unreadCount = notifications.filter(n => n.type === type.value && !n.isRead).length;

                        return (
                            <Stack key={type.value} alignItems="center" spacing={1}>
                                <Badge badgeContent={unreadCount} color="error">
                                    <Avatar sx={{ bgcolor: `${type.color}.main` }}>
                                        {type.icon}
                                    </Avatar>
                                </Badge>
                                <Typography variant="body2" textAlign="center">
                                    {type.label}
                                </Typography>
                                <Typography variant="h6">{count}</Typography>
                            </Stack>
                        );
                    })}
                </Stack>
            </Paper>

            {/* Tabs */}
            <Paper sx={{ mb: 3 }}>
                <Tabs value={activeTab} onChange={handleTabChange}>
                    <Tab label={`All (${notifications.length})`} />
                    <Tab
                        label={
                            <Badge badgeContent={unreadCount} color="error">
                                <span>Unread</span>
                            </Badge>
                        }
                    />
                    <Tab label={`Read (${notifications.length - unreadCount})`} />
                </Tabs>
            </Paper>

            {/* Notifications List */}
            <Paper>
                <List sx={{ p: 0 }}>
                    {filteredNotifications.length === 0 ? (
                        <ListItem>
                            <ListItemText
                                primary="No notifications"
                                secondary="You're all caught up!"
                                sx={{ textAlign: 'center', py: 4 }}
                            />
                        </ListItem>
                    ) : (
                        filteredNotifications.map((notification, index) => (
                            <React.Fragment key={notification.id}>
                                <ListItem
                                    sx={{
                                        bgcolor: notification.isRead ? 'transparent' : 'action.hover',
                                        '&:hover': { bgcolor: 'action.selected' }
                                    }}
                                >
                                    <ListItemAvatar>
                                        <Badge
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                            badgeContent={
                                                !notification.isRead ? (
                                                    <Circle sx={{ fontSize: 12, color: 'primary.main' }} />
                                                ) : null
                                            }
                                        >
                                            <Avatar sx={{ bgcolor: `${getNotificationColor(notification.type)}.main` }}>
                                                {getNotificationIcon(notification.type)}
                                            </Avatar>
                                        </Badge>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{ fontWeight: notification.isRead ? 400 : 600 }}
                                                >
                                                    {notification.title}
                                                </Typography>
                                                <Chip
                                                    label={notification.priority}
                                                    color={getPriorityColor(notification.priority)}
                                                    size="small"
                                                    variant="outlined"
                                                />
                                            </Stack>
                                        }
                                        secondary={
                                            <Box>
                                                <Typography variant="body2" sx={{ mb: 0.5 }}>
                                                    {notification.message}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {formatTimestamp(notification.timestamp)}
                                                </Typography>
                                            </Box>
                                        }
                                    />
                                    <ListItemSecondaryAction>
                                        <Stack spacing={1}>
                                            {!notification.isRead && (
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleMarkAsRead(notification.id)}
                                                >
                                                    <MarkEmailRead />
                                                </IconButton>
                                            )}
                                            <IconButton
                                                size="small"
                                                color="error"
                                                onClick={() => handleDeleteNotification(notification.id)}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </Stack>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                {index < filteredNotifications.length - 1 && <Divider />}
                            </React.Fragment>
                        ))
                    )}
                </List>
            </Paper>

            {/* Settings Dialog */}
            <Dialog open={openSettings} onClose={() => setOpenSettings(false)} maxWidth="md" fullWidth>
                <DialogTitle>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Settings />
                        <Typography variant="h6">Notification Settings</Typography>
                    </Stack>
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={4} sx={{ mt: 2 }}>
                        {/* General Settings */}
                        <Box>
                            <Typography variant="h6" gutterBottom>General Settings</Typography>
                            <Stack spacing={2}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={settings.emailNotifications}
                                            onChange={(e) => handleSettingsChange('emailNotifications', e.target.checked)}
                                        />
                                    }
                                    label={
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <Email />
                                            <span>Email Notifications</span>
                                        </Stack>
                                    }
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={settings.smsNotifications}
                                            onChange={(e) => handleSettingsChange('smsNotifications', e.target.checked)}
                                        />
                                    }
                                    label={
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <Sms />
                                            <span>SMS Notifications</span>
                                        </Stack>
                                    }
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={settings.browserNotifications}
                                            onChange={(e) => handleSettingsChange('browserNotifications', e.target.checked)}
                                        />
                                    }
                                    label={
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <Notifications />
                                            <span>Browser Notifications</span>
                                        </Stack>
                                    }
                                />
                            </Stack>
                        </Box>

                        <Divider />

                        {/* Type-specific Settings */}
                        <Box>
                            <Typography variant="h6" gutterBottom>Notification Types</Typography>
                            <Stack spacing={3}>
                                {notificationTypes.map(type => (
                                    <Card key={type.value} variant="outlined">
                                        <CardContent>
                                            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                                                <Avatar sx={{ bgcolor: `${type.color}.main` }}>
                                                    {type.icon}
                                                </Avatar>
                                                <Typography variant="subtitle1">{type.label}</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={4}>
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={settings.types[type.value]?.email || false}
                                                            onChange={(e) =>
                                                                handleSettingsChange(`types.${type.value}.email`, e.target.checked)
                                                            }
                                                            disabled={!settings.emailNotifications}
                                                        />
                                                    }
                                                    label="Email"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={settings.types[type.value]?.sms || false}
                                                            onChange={(e) =>
                                                                handleSettingsChange(`types.${type.value}.sms`, e.target.checked)
                                                            }
                                                            disabled={!settings.smsNotifications}
                                                        />
                                                    }
                                                    label="SMS"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={settings.types[type.value]?.browser || false}
                                                            onChange={(e) =>
                                                                handleSettingsChange(`types.${type.value}.browser`, e.target.checked)
                                                            }
                                                            disabled={!settings.browserNotifications}
                                                        />
                                                    }
                                                    label="Browser"
                                                />
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Stack>
                        </Box>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenSettings(false)}>Cancel</Button>
                    <Button variant="contained" onClick={() => setOpenSettings(false)}>
                        Save Settings
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default SellerNotifications;
