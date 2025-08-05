import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardMedia,
    Button,
    Chip,
    Rating,
    Stack,
    Divider,
    IconButton,
    Tabs,
    Tab,
    Paper,
    Avatar,
    useTheme,
    useMediaQuery,
    Fade,
    Breadcrumbs,
    Link,
    Snackbar,
    Alert
} from '@mui/material';
import {
    ShoppingCart,
    Favorite,
    FavoriteBorder,
    Share,
    Add,
    Remove,
    LocalShipping,
    Security,
    NavigateNext
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, selectCartItemById } from '../../store/slices/cartSlice.js';
import { selectIsAuthenticated } from '../../store/slices/authSlice.js';
import { ROUTES } from '../../constants/index.js';

// Mock product data with detailed information
const mockProductDetails = {
    1: {
        id: 1,
        name: 'Samsung Galaxy S24 Ultra 256GB',
        price: 180000,
        originalPrice: 200000,
        images: [
            'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&h=600&fit=crop&crop=center'
        ],
        rating: 4.8,
        reviews: 342,
        discount: 10,
        category: 'Electronics',
        brand: 'Samsung',
        inStock: true,
        stockCount: 15,
        description: 'The most powerful Galaxy smartphone ever, featuring an advanced camera system, the fastest Galaxy processor, and a long-lasting battery.',
        features: [
            '6.8" Dynamic AMOLED 2X Display',
            '200MP Ultra Wide Camera',
            'Snapdragon 8 Gen 3 Processor',
            '5000mAh Battery with Fast Charging',
            'S Pen Included',
            '256GB Storage + 12GB RAM',
            '5G Connectivity'
        ],
        specifications: {
            'Display': '6.8" Dynamic AMOLED 2X, 3120 x 1440',
            'Processor': 'Snapdragon 8 Gen 3',
            'Memory': '12GB RAM, 256GB Storage',
            'Camera': '200MP Main + 50MP Periscope + 12MP Ultra Wide + 12MP Front',
            'Battery': '5000mAh with 45W Fast Charging',
            'OS': 'Android 14 with One UI 6.1',
            'Connectivity': '5G, Wi-Fi 7, Bluetooth 5.3',
            'Dimensions': '162.3 x 79.0 x 8.6 mm',
            'Weight': '232g'
        },
        seller: {
            name: 'TechZone Algeria',
            rating: 4.9,
            reviewCount: 1250,
            responseTime: '< 1 hour',
            location: 'Algiers, Algeria'
        },
        shipping: {
            free: true,
            estimatedDays: '2-3 business days',
            methods: ['Standard Delivery', 'Express Delivery']
        },
        warranty: '2 years international warranty',
        customerReviews: [
            {
                id: 1,
                user: 'Ahmed B.',
                rating: 5,
                date: '2024-01-15',
                comment: 'Excellent phone! Camera quality is outstanding and performance is very smooth.',
                helpful: 23,
                verified: true
            },
            {
                id: 2,
                user: 'Fatima K.',
                rating: 5,
                date: '2024-01-10',
                comment: 'Fast delivery and great customer service. The S Pen is very useful for taking notes.',
                helpful: 18,
                verified: true
            },
            {
                id: 3,
                user: 'Mohamed R.',
                rating: 4,
                date: '2024-01-08',
                comment: 'Great phone overall, battery life could be better with heavy usage.',
                helpful: 12,
                verified: true
            }
        ]
    },
    2: {
        id: 2,
        name: 'Apple MacBook Air M3 13-inch',
        price: 220000,
        originalPrice: 250000,
        images: [
            'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop&crop=center'
        ],
        rating: 4.9,
        reviews: 128,
        discount: 12,
        category: 'Electronics',
        brand: 'Apple',
        inStock: true,
        stockCount: 8,
        description: 'The new MacBook Air with M3 chip delivers incredible performance and up to 18 hours of battery life.',
        features: [
            'Apple M3 chip with 8-core CPU',
            '13.6-inch Liquid Retina display',
            '8GB unified memory',
            '256GB SSD storage',
            'Up to 18 hours battery life',
            'Touch ID security',
            'Two Thunderbolt ports'
        ],
        specifications: {
            'Display': '13.6-inch Liquid Retina',
            'Processor': 'Apple M3 chip',
            'Memory': '8GB unified memory',
            'Storage': '256GB SSD',
            'Battery': 'Up to 18 hours',
            'OS': 'macOS Sonoma',
            'Connectivity': 'Wi-Fi 6E, Bluetooth 5.3',
            'Dimensions': '30.41 x 21.5 x 1.13 cm',
            'Weight': '1.24 kg'
        },
        seller: {
            name: 'Apple Store Algeria',
            rating: 4.8,
            reviewCount: 850,
            responseTime: '< 2 hours',
            location: 'Algiers, Algeria'
        },
        shipping: {
            free: true,
            estimatedDays: '1-2 business days',
            methods: ['Express Delivery', 'Same Day Delivery']
        },
        warranty: '1 year limited warranty',
        customerReviews: [
            {
                id: 1,
                user: 'Yasmine A.',
                rating: 5,
                date: '2024-01-20',
                comment: 'Perfect for my design work. Fast, silent, and great battery life.',
                helpful: 31,
                verified: true
            },
            {
                id: 2,
                user: 'Karim M.',
                rating: 5,
                date: '2024-01-18',
                comment: 'Amazing performance and the display quality is stunning.',
                helpful: 24,
                verified: true
            }
        ]
    }
};

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const isAuthenticated = useSelector(selectIsAuthenticated);
    const cartItem = useSelector(selectCartItemById(parseInt(id)));

    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        const productData = mockProductDetails[id];
        if (productData) {
            setProduct(productData);
        } else {
            navigate('/404');
        }
    }, [id, navigate]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('ar-DZ', {
            style: 'currency',
            currency: 'DZD',
            minimumFractionDigits: 0
        }).format(price);
    };

    const handleAddToCart = () => {
        if (!isAuthenticated) {
            navigate(ROUTES.LOGIN);
            return;
        }

        const productToAdd = { ...product, quantity };
        dispatch(addToCart(productToAdd));
        setSnackbar({
            open: true,
            message: `${product.name} added to cart!`,
            severity: 'success'
        });
    };

    const handleQuantityChange = (change) => {
        const newQuantity = quantity + change;
        if (newQuantity >= 1 && newQuantity <= product.stockCount) {
            setQuantity(newQuantity);
        }
    };

    const toggleFavorite = () => {
        if (!isAuthenticated) {
            navigate(ROUTES.LOGIN);
            return;
        }
        setIsFavorite(!isFavorite);
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    if (!product) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <Typography>Loading...</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ py: { xs: 3, md: 4 }, px: { xs: 2, sm: 3, md: 4 } }}>
            {/* Breadcrumbs */}
            <Fade in={true}>
                <Box sx={{ mb: 3 }}>
                    <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
                        <Link color="inherit" onClick={() => navigate(ROUTES.HOME)} sx={{ cursor: 'pointer' }}>
                            Home
                        </Link>
                        <Link color="inherit" onClick={() => navigate(ROUTES.SHOP)} sx={{ cursor: 'pointer' }}>
                            Shop
                        </Link>
                        <Typography color="text.primary">{product.name}</Typography>
                    </Breadcrumbs>
                </Box>
            </Fade>

            <Grid container spacing={4}>
                {/* Product Images */}
                <Grid item xs={12} md={6}>
                    <Fade in={true} timeout={800}>
                        <Box>
                            <Card elevation={0} sx={{ mb: 2, border: `1px solid ${theme.palette.divider}` }}>
                                <CardMedia
                                    component="img"
                                    height={isMobile ? "300" : "500"}
                                    image={product.images[selectedImage]}
                                    alt={product.name}
                                    sx={{ objectFit: 'cover' }}
                                />
                            </Card>
                            <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 1 }}>
                                {product.images.map((image, index) => (
                                    <Card
                                        key={index}
                                        elevation={selectedImage === index ? 2 : 0}
                                        sx={{
                                            minWidth: 80,
                                            height: 80,
                                            cursor: 'pointer',
                                            border: selectedImage === index
                                                ? `2px solid ${theme.palette.primary.main}`
                                                : `1px solid ${theme.palette.divider}`,
                                        }}
                                        onClick={() => setSelectedImage(index)}
                                    >
                                        <CardMedia
                                            component="img"
                                            height="100%"
                                            image={image}
                                            sx={{ objectFit: 'cover' }}
                                        />
                                    </Card>
                                ))}
                            </Stack>
                        </Box>
                    </Fade>
                </Grid>

                {/* Product Information */}
                <Grid item xs={12} md={6}>
                    <Fade in={true} timeout={1000}>
                        <Box>
                            <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
                                {product.name}
                            </Typography>

                            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                                <Rating value={product.rating} readOnly precision={0.1} />
                                <Typography variant="body2" color="text.secondary">
                                    {product.rating} ({product.reviews} reviews)
                                </Typography>
                            </Stack>

                            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
                                <Chip label={product.category} color="primary" size="small" />
                                <Chip label={product.brand} variant="outlined" size="small" />
                                {product.discount > 0 && (
                                    <Chip label={`${product.discount}% OFF`} color="error" size="small" />
                                )}
                            </Stack>

                            <Box sx={{ mb: 3 }}>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
                                        {formatPrice(product.price)}
                                    </Typography>
                                    {product.originalPrice > product.price && (
                                        <Typography variant="h6" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
                                            {formatPrice(product.originalPrice)}
                                        </Typography>
                                    )}
                                </Stack>
                            </Box>

                            <Box sx={{ mb: 3 }}>
                                {product.inStock ? (
                                    <Chip label={`✓ In Stock (${product.stockCount} available)`} color="success" variant="outlined" />
                                ) : (
                                    <Chip label="✗ Out of Stock" color="error" variant="outlined" />
                                )}
                            </Box>

                            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                                {product.description}
                            </Typography>

                            <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>Quantity</Typography>
                                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <IconButton
                                            onClick={() => handleQuantityChange(-1)}
                                            disabled={quantity <= 1}
                                            sx={{ border: `1px solid ${theme.palette.divider}` }}
                                        >
                                            <Remove />
                                        </IconButton>
                                        <Typography variant="h6" sx={{ minWidth: 50, textAlign: 'center', fontWeight: 600 }}>
                                            {quantity}
                                        </Typography>
                                        <IconButton
                                            onClick={() => handleQuantityChange(1)}
                                            disabled={quantity >= product.stockCount}
                                            sx={{ border: `1px solid ${theme.palette.divider}` }}
                                        >
                                            <Add />
                                        </IconButton>
                                    </Stack>
                                    {cartItem && (
                                        <Typography variant="body2" color="text.secondary">
                                            ({cartItem.quantity} in cart)
                                        </Typography>
                                    )}
                                </Stack>

                                <Stack direction="row" spacing={2}>
                                    <Button
                                        variant="contained"
                                        startIcon={<ShoppingCart />}
                                        size="large"
                                        disabled={!product.inStock}
                                        onClick={handleAddToCart}
                                        sx={{ flex: 1, py: 2, fontWeight: 600, textTransform: 'none' }}
                                    >
                                        {product.inStock ? (isAuthenticated ? 'Add to Cart' : 'Login to Buy') : 'Out of Stock'}
                                    </Button>

                                    <IconButton
                                        color={isFavorite ? 'error' : 'default'}
                                        onClick={toggleFavorite}
                                        sx={{ border: `1px solid ${theme.palette.divider}`, p: 2 }}
                                    >
                                        {isFavorite ? <Favorite /> : <FavoriteBorder />}
                                    </IconButton>

                                    <IconButton sx={{ border: `1px solid ${theme.palette.divider}`, p: 2 }}>
                                        <Share />
                                    </IconButton>
                                </Stack>
                            </Box>

                            <Paper elevation={0} sx={{ p: 3, border: `1px solid ${theme.palette.divider}` }}>
                                <Stack spacing={2}>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <LocalShipping color="primary" />
                                        <Box>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                {product.shipping.free ? 'Free Shipping' : 'Paid Shipping'}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Delivery in {product.shipping.estimatedDays}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Security color="primary" />
                                        <Box>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Warranty</Typography>
                                            <Typography variant="body2" color="text.secondary">{product.warranty}</Typography>
                                        </Box>
                                    </Stack>
                                </Stack>
                            </Paper>
                        </Box>
                    </Fade>
                </Grid>
            </Grid>

            {/* Product Details Tabs */}
            <Box sx={{ mt: 6 }}>
                <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
                    <Tab label="Specifications" />
                    <Tab label="Features" />
                    <Tab label="Reviews" />
                </Tabs>

                {activeTab === 0 && (
                    <Paper elevation={0} sx={{ p: 3, border: `1px solid ${theme.palette.divider}` }}>
                        <Grid container spacing={2}>
                            {Object.entries(product.specifications).map(([key, value]) => (
                                <Grid item xs={12} sm={6} key={key}>
                                    <Stack direction="row" spacing={2}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 600, minWidth: 120 }}>
                                            {key}:
                                        </Typography>
                                        <Typography variant="body2">{value}</Typography>
                                    </Stack>
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                )}

                {activeTab === 1 && (
                    <Paper elevation={0} sx={{ p: 3, border: `1px solid ${theme.palette.divider}` }}>
                        <Grid container spacing={2}>
                            {product.features.map((feature, index) => (
                                <Grid item xs={12} sm={6} key={index}>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Typography color="primary">•</Typography>
                                        <Typography variant="body2">{feature}</Typography>
                                    </Stack>
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                )}

                {activeTab === 2 && (
                    <Paper elevation={0} sx={{ p: 3, border: `1px solid ${theme.palette.divider}` }}>
                        <Stack spacing={3}>
                            {product.customerReviews.map((review) => (
                                <Box key={review.id}>
                                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
                                        <Avatar sx={{ width: 40, height: 40 }}>{review.user.charAt(0)}</Avatar>
                                        <Box>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                {review.user}
                                                {review.verified && (
                                                    <Chip label="Verified" size="small" color="success" sx={{ ml: 1 }} />
                                                )}
                                            </Typography>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Rating value={review.rating} readOnly size="small" />
                                                <Typography variant="caption" color="text.secondary">{review.date}</Typography>
                                            </Stack>
                                        </Box>
                                    </Stack>
                                    <Typography variant="body2" sx={{ mb: 1 }}>{review.comment}</Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {review.helpful} people found this helpful
                                    </Typography>
                                    {review !== product.customerReviews[product.customerReviews.length - 1] && <Divider sx={{ mt: 2 }} />}
                                </Box>
                            ))}
                        </Stack>
                    </Paper>
                )}
            </Box>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled">
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ProductDetail;
