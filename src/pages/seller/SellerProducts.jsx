import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    CardActions,
    Button,
    IconButton,
    TextField,
    InputAdornment,
    Chip,
    Rating,
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
    Fab,
    Snackbar,
    Alert,
    useTheme,
    useMediaQuery
} from '@mui/material';
import {
    Add,
    Edit,
    Delete,
    Search,
    FilterList,
    Visibility,
    VisibilityOff,
    GridView,
    ViewList,
    Inventory,
    TrendingUp,
    TrendingDown,
    Upload,
    Save,
    Cancel
} from '@mui/icons-material';

// Mock product data for seller
const mockSellerProducts = [
    {
        id: 1,
        name: 'Samsung Galaxy S24 Ultra 256GB',
        price: 180000,
        originalPrice: 200000,
        image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop',
        category: 'Electronics',
        subcategory: 'Smartphones',
        brand: 'Samsung',
        stock: 15,
        status: 'active',
        sales: 23,
        revenue: 4140000,
        rating: 4.8,
        reviews: 12,
        createdAt: '2024-01-15',
        lastUpdated: '2024-02-01'
    },
    {
        id: 2,
        name: 'Apple MacBook Air M3 13-inch',
        price: 220000,
        originalPrice: 250000,
        image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop',
        category: 'Electronics',
        subcategory: 'Laptops',
        brand: 'Apple',
        stock: 8,
        status: 'active',
        sales: 15,
        revenue: 3300000,
        rating: 4.9,
        reviews: 8,
        createdAt: '2024-01-10',
        lastUpdated: '2024-01-28'
    },
    {
        id: 3,
        name: 'Sony WH-1000XM5 Headphones',
        price: 45000,
        originalPrice: 50000,
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop',
        category: 'Electronics',
        subcategory: 'Audio',
        brand: 'Sony',
        stock: 0,
        status: 'inactive',
        sales: 8,
        revenue: 360000,
        rating: 4.7,
        reviews: 5,
        createdAt: '2024-01-05',
        lastUpdated: '2024-01-25'
    },
    {
        id: 4,
        name: 'iPad Pro 12.9-inch M4',
        price: 280000,
        originalPrice: 300000,
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
        category: 'Electronics',
        subcategory: 'Tablets',
        brand: 'Apple',
        stock: 12,
        status: 'active',
        sales: 6,
        revenue: 1680000,
        rating: 4.6,
        reviews: 3,
        createdAt: '2024-01-20',
        lastUpdated: '2024-02-02'
    }
];

const categories = [
    { value: 'Electronics', label: 'Electronics' },
    { value: 'Fashion', label: 'Fashion' },
    { value: 'Home & Garden', label: 'Home & Garden' },
    { value: 'Sports', label: 'Sports' },
    { value: 'Books', label: 'Books' }
];

const subcategories = {
    Electronics: ['Smartphones', 'Laptops', 'Tablets', 'Audio', 'Cameras'],
    Fashion: ['Clothing', 'Shoes', 'Accessories'],
    'Home & Garden': ['Furniture', 'Kitchen', 'Decor'],
    Sports: ['Fitness', 'Outdoor', 'Team Sports'],
    Books: ['Fiction', 'Non-Fiction', 'Educational']
};

const SellerProducts = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [products, setProducts] = useState(mockSellerProducts);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Dialog states
    const [openProductDialog, setOpenProductDialog] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [productForm, setProductForm] = useState({
        name: '',
        price: '',
        originalPrice: '',
        category: '',
        subcategory: '',
        brand: '',
        stock: '',
        status: 'active',
        description: '',
        images: []
    });

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
            day: 'numeric'
        });
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !filterCategory || product.category === filterCategory;
        const matchesStatus = !filterStatus || product.status === filterStatus;

        return matchesSearch && matchesCategory && matchesStatus;
    });

    const handleOpenProductDialog = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setProductForm({
                name: product.name,
                price: product.price.toString(),
                originalPrice: product.originalPrice.toString(),
                category: product.category,
                subcategory: product.subcategory,
                brand: product.brand,
                stock: product.stock.toString(),
                status: product.status,
                description: product.description || '',
                images: []
            });
        } else {
            setEditingProduct(null);
            setProductForm({
                name: '',
                price: '',
                originalPrice: '',
                category: '',
                subcategory: '',
                brand: '',
                stock: '',
                status: 'active',
                description: '',
                images: []
            });
        }
        setOpenProductDialog(true);
    };

    const handleCloseProductDialog = () => {
        setOpenProductDialog(false);
        setEditingProduct(null);
    };

    const handleSaveProduct = () => {
        if (!productForm.name || !productForm.price || !productForm.category) {
            setSnackbar({
                open: true,
                message: 'Please fill in all required fields',
                severity: 'error'
            });
            return;
        }

        const productData = {
            ...productForm,
            price: parseInt(productForm.price),
            originalPrice: parseInt(productForm.originalPrice) || parseInt(productForm.price),
            stock: parseInt(productForm.stock) || 0,
            id: editingProduct ? editingProduct.id : Date.now(),
            sales: editingProduct ? editingProduct.sales : 0,
            revenue: editingProduct ? editingProduct.revenue : 0,
            rating: editingProduct ? editingProduct.rating : 0,
            reviews: editingProduct ? editingProduct.reviews : 0,
            createdAt: editingProduct ? editingProduct.createdAt : new Date().toISOString().split('T')[0],
            lastUpdated: new Date().toISOString().split('T')[0],
            image: editingProduct ? editingProduct.image : 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop'
        };

        if (editingProduct) {
            setProducts(products.map(p => p.id === editingProduct.id ? productData : p));
            setSnackbar({
                open: true,
                message: 'Product updated successfully',
                severity: 'success'
            });
        } else {
            setProducts([productData, ...products]);
            setSnackbar({
                open: true,
                message: 'Product created successfully',
                severity: 'success'
            });
        }

        handleCloseProductDialog();
    };

    const handleDeleteProduct = (productId) => {
        setProducts(products.filter(p => p.id !== productId));
        setSnackbar({
            open: true,
            message: 'Product deleted successfully',
            severity: 'success'
        });
    };

    const handleToggleStatus = (productId) => {
        setProducts(products.map(p =>
            p.id === productId
                ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' }
                : p
        ));
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getTotalStats = () => {
        const totalProducts = products.length;
        const activeProducts = products.filter(p => p.status === 'active').length;
        const totalRevenue = products.reduce((sum, p) => sum + p.revenue, 0);
        const totalSales = products.reduce((sum, p) => sum + p.sales, 0);

        return { totalProducts, activeProducts, totalRevenue, totalSales };
    };

    const stats = getTotalStats();

    return (
        <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, py: { xs: 3, md: 4 } }}>
            {/* Header */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Box>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Product Management
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Manage your product catalog and inventory
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    size="large"
                    onClick={() => handleOpenProductDialog()}
                >
                    Add Product
                </Button>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Box sx={{ color: 'primary.main' }}>
                                    <Inventory fontSize="large" />
                                </Box>
                                <Box>
                                    <Typography variant="h4">{stats.totalProducts}</Typography>
                                    <Typography variant="body2" color="text.secondary">Total Products</Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Box sx={{ color: 'success.main' }}>
                                    <Visibility fontSize="large" />
                                </Box>
                                <Box>
                                    <Typography variant="h4">{stats.activeProducts}</Typography>
                                    <Typography variant="body2" color="text.secondary">Active Products</Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Box sx={{ color: 'info.main' }}>
                                    <TrendingUp fontSize="large" />
                                </Box>
                                <Box>
                                    <Typography variant="h4">{stats.totalSales}</Typography>
                                    <Typography variant="body2" color="text.secondary">Total Sales</Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Box sx={{ color: 'warning.main' }}>
                                    <TrendingUp fontSize="large" />
                                </Box>
                                <Box>
                                    <Typography variant="h4">{formatPrice(stats.totalRevenue)}</Typography>
                                    <Typography variant="body2" color="text.secondary">Total Revenue</Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Filters and Search */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            placeholder="Search products..."
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
                    <Grid item xs={12} sm={6} md={2}>
                        <FormControl fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={filterCategory}
                                label="Category"
                                onChange={(e) => setFilterCategory(e.target.value)}
                            >
                                <MenuItem value="">All Categories</MenuItem>
                                {categories.map(cat => (
                                    <MenuItem key={cat.value} value={cat.value}>{cat.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <FormControl fullWidth>
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={filterStatus}
                                label="Status"
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <MenuItem value="">All Status</MenuItem>
                                <MenuItem value="active">Active</MenuItem>
                                <MenuItem value="inactive">Inactive</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                            <IconButton
                                onClick={() => setViewMode('grid')}
                                color={viewMode === 'grid' ? 'primary' : 'default'}
                            >
                                <GridView />
                            </IconButton>
                            <IconButton
                                onClick={() => setViewMode('table')}
                                color={viewMode === 'table' ? 'primary' : 'default'}
                            >
                                <ViewList />
                            </IconButton>
                        </Stack>
                    </Grid>
                </Grid>
            </Paper>

            {/* Products Display */}
            {viewMode === 'grid' ? (
                <Grid container spacing={3}>
                    {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(product => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={product.image}
                                    alt={product.name}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" noWrap gutterBottom>
                                        {product.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        {product.brand} • {product.category}
                                    </Typography>
                                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                                        <Typography variant="h6" color="primary">
                                            {formatPrice(product.price)}
                                        </Typography>
                                        {product.originalPrice > product.price && (
                                            <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
                                                {formatPrice(product.originalPrice)}
                                            </Typography>
                                        )}
                                    </Stack>
                                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                                        <Rating value={product.rating} readOnly size="small" />
                                        <Typography variant="body2" color="text.secondary">
                                            ({product.reviews})
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                                        <Chip
                                            label={product.status === 'active' ? 'Active' : 'Inactive'}
                                            color={product.status === 'active' ? 'success' : 'default'}
                                            size="small"
                                        />
                                        <Chip
                                            label={`Stock: ${product.stock}`}
                                            color={product.stock > 10 ? 'success' : product.stock > 0 ? 'warning' : 'error'}
                                            size="small"
                                        />
                                    </Stack>
                                    <Typography variant="body2" color="text.secondary">
                                        Sales: {product.sales} • Revenue: {formatPrice(product.revenue)}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size="small"
                                        startIcon={<Edit />}
                                        onClick={() => handleOpenProductDialog(product)}
                                    >
                                        Edit
                                    </Button>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleToggleStatus(product.id)}
                                        color={product.status === 'active' ? 'success' : 'default'}
                                    >
                                        {product.status === 'active' ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={() => handleDeleteProduct(product.id)}
                                    >
                                        <Delete />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Product</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Stock</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Sales</TableCell>
                                <TableCell>Revenue</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(product => (
                                <TableRow key={product.id}>
                                    <TableCell>
                                        <Stack direction="row" spacing={2} alignItems="center">
                                            <Box
                                                component="img"
                                                src={product.image}
                                                alt={product.name}
                                                sx={{ width: 50, height: 50, borderRadius: 1 }}
                                            />
                                            <Box>
                                                <Typography variant="subtitle2">{product.name}</Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {product.brand}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2">{formatPrice(product.price)}</Typography>
                                        {product.originalPrice > product.price && (
                                            <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
                                                {formatPrice(product.originalPrice)}
                                            </Typography>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={product.stock}
                                            color={product.stock > 10 ? 'success' : product.stock > 0 ? 'warning' : 'error'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={product.status === 'active' ? 'Active' : 'Inactive'}
                                            color={product.status === 'active' ? 'success' : 'default'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>{product.sales}</TableCell>
                                    <TableCell>{formatPrice(product.revenue)}</TableCell>
                                    <TableCell>
                                        <Stack direction="row" spacing={1}>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleOpenProductDialog(product)}
                                            >
                                                <Edit />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleToggleStatus(product.id)}
                                                color={product.status === 'active' ? 'success' : 'default'}
                                            >
                                                {product.status === 'active' ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                color="error"
                                                onClick={() => handleDeleteProduct(product.id)}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={filteredProducts.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            )}

            {/* Product Dialog */}
            <Dialog
                open={openProductDialog}
                onClose={handleCloseProductDialog}
                maxWidth="md"
                fullWidth
                fullScreen={isMobile}
            >
                <DialogTitle>
                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={3} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Product Name *"
                                value={productForm.name}
                                onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Price (DZD) *"
                                type="number"
                                value={productForm.price}
                                onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Original Price (DZD)"
                                type="number"
                                value={productForm.originalPrice}
                                onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Category *</InputLabel>
                                <Select
                                    value={productForm.category}
                                    label="Category *"
                                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value, subcategory: '' })}
                                >
                                    {categories.map(cat => (
                                        <MenuItem key={cat.value} value={cat.value}>{cat.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth disabled={!productForm.category}>
                                <InputLabel>Subcategory</InputLabel>
                                <Select
                                    value={productForm.subcategory}
                                    label="Subcategory"
                                    onChange={(e) => setProductForm({ ...productForm, subcategory: e.target.value })}
                                >
                                    {productForm.category && subcategories[productForm.category]?.map(subcat => (
                                        <MenuItem key={subcat} value={subcat}>{subcat}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Brand"
                                value={productForm.brand}
                                onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Stock Quantity"
                                type="number"
                                value={productForm.stock}
                                onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={productForm.status === 'active'}
                                        onChange={(e) => setProductForm({ ...productForm, status: e.target.checked ? 'active' : 'inactive' })}
                                    />
                                }
                                label="Active Product"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Description"
                                multiline
                                rows={4}
                                value={productForm.description}
                                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="outlined"
                                startIcon={<Upload />}
                                fullWidth
                                sx={{ height: 100, borderStyle: 'dashed' }}
                            >
                                Upload Product Images
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseProductDialog} startIcon={<Cancel />}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSaveProduct}
                        variant="contained"
                        startIcon={<Save />}
                    >
                        {editingProduct ? 'Update Product' : 'Create Product'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Floating Action Button for Mobile */}
            {isMobile && (
                <Fab
                    color="primary"
                    aria-label="add"
                    sx={{ position: 'fixed', bottom: 16, right: 16 }}
                    onClick={() => handleOpenProductDialog()}
                >
                    <Add />
                </Fab>
            )}

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

export default SellerProducts;
