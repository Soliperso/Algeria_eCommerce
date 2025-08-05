import React, { useState } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Box,
  Chip,
  Rating,
  TextField,
  InputAdornment,
  IconButton,
  useTheme,
  useMediaQuery,
  Paper,
  Fab,
  Stack,
  Skeleton,
  Zoom,
  Fade,
  Divider,
  Snackbar,
  Alert
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  Favorite, 
  FavoriteBorder,
  Visibility, 
  Search,
  FilterList,
  Sort,
  GridView,
  ViewList,
  LocalOffer
} from '@mui/icons-material';
import { selectIsAuthenticated } from '../../store/slices/authSlice.js';
import { addToCart, selectCartItemCount } from '../../store/slices/cartSlice.js';
import { ROUTES } from '../../constants/index.js';

// Enhanced mock product data with high-quality images
const mockProducts = [
  {
    id: 1,
    name: 'Samsung Galaxy S24 Ultra 256GB',
    price: 180000,
    originalPrice: 200000,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=300&fit=crop&crop=center',
    rating: 4.8,
    reviews: 342,
    discount: 10,
    category: 'Electronics',
    inStock: true,
    isFavorite: false,
    badges: ['Best Seller', 'Fast Shipping']
  },
  {
    id: 2,
    name: 'MacBook Pro 14" M3 Pro',
    price: 320000,
    originalPrice: 360000,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop&crop=center',
    rating: 4.9,
    reviews: 128,
    discount: 11,
    category: 'Electronics',
    inStock: true,
    isFavorite: true,
    badges: ['Premium Quality']
  },
  {
    id: 3,
    name: 'Traditional Algerian Kaftan - Premium',
    price: 25000,
    originalPrice: 35000,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=300&fit=crop&crop=center',
    rating: 4.7,
    reviews: 89,
    discount: 29,
    category: 'Fashion',
    inStock: true,
    isFavorite: false,
    badges: ['Handmade', 'Local Product']
  },
  {
    id: 4,
    name: 'Sony WH-1000XM5 Noise Canceling',
    price: 45000,
    originalPrice: 52000,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&crop=center',
    rating: 4.6,
    reviews: 234,
    discount: 13,
    category: 'Electronics',
    inStock: true,
    isFavorite: false,
    badges: ['Top Rated']
  },
  {
    id: 5,
    name: 'Apple Watch Series 9 GPS + Cellular',
    price: 85000,
    originalPrice: 95000,
    image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=300&fit=crop&crop=center',
    rating: 4.5,
    reviews: 156,
    discount: 11,
    category: 'Electronics',
    inStock: false,
    isFavorite: true,
    badges: ['Limited Stock']
  },
  {
    id: 6,
    name: 'Nike Air Jordan 1 High OG',
    price: 32000,
    originalPrice: 38000,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop&crop=center',
    rating: 4.4,
    reviews: 298,
    discount: 16,
    category: 'Fashion',
    inStock: true,
    isFavorite: false,
    badges: ['Trending']
  },
  {
    id: 7,
    name: 'iPad Pro 12.9" M2 WiFi 256GB',
    price: 190000,
    originalPrice: 210000,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop&crop=center',
    rating: 4.7,
    reviews: 167,
    discount: 10,
    category: 'Electronics',
    inStock: true,
    isFavorite: false,
    badges: ['New Arrival']
  },
  {
    id: 8,
    name: 'Premium Algerian Olive Oil 1L',
    price: 3500,
    originalPrice: 4200,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=300&fit=crop&crop=center',
    rating: 4.9,
    reviews: 456,
    discount: 17,
    category: 'Food',
    inStock: true,
    isFavorite: true,
    badges: ['Organic', 'Local Product']
  }
];

const Shop = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const cartItemCount = useSelector(selectCartItemCount);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [favorites, setFavorites] = useState(new Set([2, 5, 8]));
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ar-DZ', {
      style: 'currency',
      currency: 'DZD',
      minimumFractionDigits: 0
    }).format(price);
  };

  const toggleFavorite = (productId) => {
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN);
      return;
    }
    
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN);
      return;
    }
    
    dispatch(addToCart(product));
    setSnackbar({
      open: true,
      message: `${product.name} added to cart!`,
      severity: 'success'
    });
  };

  const handleViewProduct = (productId) => {
    navigate(ROUTES.PRODUCT.replace(':id', productId));
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const ProductCard = ({ product, index }) => (
    <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
      <Card 
        elevation={0}
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          borderRadius: 2,
          border: `1px solid ${theme.palette.divider}`,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-12px)',
            boxShadow: theme.shadows[8],
            '& .product-image': {
              transform: 'scale(1.08)'
            },
            '& .product-actions': {
              opacity: 1,
              transform: 'translateY(0)'
            }
          }
        }}
      >
        {/* Product Image Container */}
        <Box sx={{ 
          position: 'relative', 
          overflow: 'hidden',
          height: { xs: 200, sm: 220, md: 240 },
          background: 'linear-gradient(45deg, #f5f5f5 0%, #ffffff 100%)'
        }}>
          <CardMedia
            component="img"
            height="100%"
            image={product.image}
            alt={product.name}
            className="product-image"
            sx={{
              objectFit: 'cover',
              transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              width: '100%'
            }}
          />
          
          {/* Discount Badge */}
          {product.discount > 0 && (
            <Chip
              icon={<LocalOffer sx={{ fontSize: '0.8rem' }} />}
              label={`-${product.discount}%`}
              color="error"
              size="small"
              sx={{
                position: 'absolute',
                top: 12,
                left: 12,
                fontWeight: 700,
                fontSize: '0.75rem',
                boxShadow: theme.shadows[3],
                '& .MuiChip-icon': {
                  fontSize: '0.8rem'
                }
              }}
            />
          )}

          {/* Product Badges */}
          {product.badges && product.badges.length > 0 && (
            <Stack 
              spacing={0.5}
              sx={{
                position: 'absolute',
                top: 12,
                right: 12
              }}
            >
              {product.badges.slice(0, 2).map((badge, idx) => (
                <Chip
                  key={idx}
                  label={badge}
                  size="small"
                  sx={{
                    fontSize: '0.65rem',
                    height: 20,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    fontWeight: 600
                  }}
                />
              ))}
            </Stack>
          )}
          
          {/* Favorite Button */}
          <IconButton
            onClick={() => toggleFavorite(product.id)}
            sx={{
              position: 'absolute',
              bottom: 12,
              right: 12,
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              boxShadow: theme.shadows[2],
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
                color: 'white',
                transform: 'scale(1.1)'
              }
            }}
            size="small"
          >
            {favorites.has(product.id) ? (
              <Favorite sx={{ color: 'red', fontSize: '1.1rem' }} />
            ) : (
              <FavoriteBorder sx={{ fontSize: '1.1rem' }} />
            )}
          </IconButton>

          {/* Stock Status */}
          {!product.inStock && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(2px)'
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: 'white',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}
              >
                Out of Stock
              </Typography>
            </Box>
          )}

          {/* Quick Actions Overlay */}
          <Box
            className="product-actions"
            sx={{
              position: 'absolute',
              bottom: 12,
              left: 12,
              opacity: 0,
              transform: 'translateY(20px)',
              transition: 'all 0.3s ease',
              display: { xs: 'none', sm: 'flex' },
              gap: 1
            }}
          >
            <IconButton
              size="small"
              onClick={() => handleViewProduct(product.id)}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  backgroundColor: theme.palette.info.main,
                  color: 'white'
                }
              }}
            >
              <Visibility fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        
        {/* Product Info */}
        <CardContent sx={{ 
          flexGrow: 1, 
          p: { xs: 2, sm: 2.5 },
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5
        }}>
          {/* Category */}
          <Typography 
            variant="caption" 
            sx={{ 
              color: theme.palette.primary.main,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            {product.category}
          </Typography>

          {/* Product Name */}
          <Typography 
            variant={isMobile ? "subtitle1" : "h6"} 
            component="h3"
            sx={{
              fontWeight: 600,
              lineHeight: 1.3,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              minHeight: { xs: 'auto', sm: '2.6em' }
            }}
          >
            {product.name}
          </Typography>
          
          {/* Rating */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Rating 
              value={product.rating} 
              readOnly 
              size="small"
              precision={0.1}
              sx={{
                '& .MuiRating-iconFilled': {
                  color: '#FFD700'
                }
              }}
            />
            <Typography variant="body2" color="text.secondary">
              {product.rating} ({product.reviews.toLocaleString()})
            </Typography>
          </Box>
          
          {/* Price */}
          <Box sx={{ mt: 'auto' }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography 
                variant={isMobile ? "h6" : "h5"} 
                component="span"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.primary.main
                }}
              >
                {formatPrice(product.price)}
              </Typography>
              {product.originalPrice > product.price && (
                <Typography 
                  variant="body2" 
                  component="span"
                  sx={{ 
                    textDecoration: 'line-through',
                    color: 'text.secondary'
                  }}
                >
                  {formatPrice(product.originalPrice)}
                </Typography>
              )}
            </Stack>
          </Box>
        </CardContent>
        
        {/* Actions */}
        <CardActions sx={{ 
          p: { xs: 2, sm: 2.5 }, 
          pt: 0,
          gap: 1
        }}>
          <Button
            variant="contained"
            startIcon={<ShoppingCart />}
            fullWidth
            disabled={!product.inStock}
            onClick={() => handleAddToCart(product)}
            sx={{
              borderRadius: 2,
              fontWeight: 600,
              py: 1.5,
              fontSize: { xs: '0.875rem', sm: '1rem' },
              textTransform: 'none',
              background: product.inStock 
                ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`
                : undefined,
              '&:hover': {
                background: product.inStock 
                  ? `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`
                  : undefined,
                transform: product.inStock ? 'translateY(-1px)' : 'none'
              }
            }}
          >
            {product.inStock ? (isAuthenticated ? 'Add to Cart' : 'Login to Buy') : 'Out of Stock'}
          </Button>
        </CardActions>
      </Card>
    </Zoom>
  );

  return (
    <Box sx={{ py: { xs: 3, md: 4 }, px: { xs: 2, sm: 3, md: 4 }, width: '100%', maxWidth: '100%' }}>
      {/* Header Section */}
      <Fade in={true} timeout={800}>
        <Box sx={{ mb: { xs: 4, md: 6 }, textAlign: 'center' }}>
          <Typography 
            variant="h2"
            component="h1" 
            gutterBottom
            sx={{
              fontWeight: 800,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2
            }}
          >
            Shop Algeria 🇩🇿
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ 
              maxWidth: 600,
              mx: 'auto',
              fontWeight: 400
            }}
          >
            Discover premium products at unbeatable prices from trusted sellers across Algeria
          </Typography>
        </Box>
      </Fade>

      {/* Search and Filter Bar */}
      <Fade in={true} timeout={1000}>
        <Paper 
          elevation={0}
          sx={{ 
            p: { xs: 3, md: 4 }, 
            mb: { xs: 4, md: 6 },
            background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.secondary} 100%)`,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2
          }}
        >
          <Stack 
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            alignItems={{ xs: 'stretch', sm: 'center' }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search for products, brands, or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="action" />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 1,
                  backgroundColor: theme.palette.background.paper,
                  fontSize: '1rem'
                }
              }}
              sx={{ flex: 1 }}
            />
            
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                startIcon={<FilterList />}
                sx={{ 
                  borderRadius: 1,
                  fontWeight: 600,
                  minWidth: { xs: 'auto', sm: 120 },
                  px: { xs: 2, sm: 3 }
                }}
              >
                {isMobile ? '' : 'Filter'}
              </Button>
              
              <Button
                variant="outlined"
                startIcon={<Sort />}
                sx={{ 
                  borderRadius: 1,
                  fontWeight: 600,
                  minWidth: { xs: 'auto', sm: 100 },
                  px: { xs: 2, sm: 3 }
                }}
              >
                {isMobile ? '' : 'Sort'}
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Fade>

      {/* Products Grid */}
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        {mockProducts.map((product, index) => (
          <Grid 
            item 
            xs={6} 
            sm={6} 
            md={4} 
            lg={3} 
            xl={3}
            key={product.id}
          >
            <ProductCard product={product} index={index} />
          </Grid>
        ))}
      </Grid>

      {/* Floating Action Button for Mobile */}
      {isMobile && (
        <Fab
          color="primary"
          onClick={() => navigate(ROUTES.CART)}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            boxShadow: theme.shadows[6],
            '&:hover': {
              background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
              transform: 'scale(1.1)'
            }
          }}
        >
          <Badge badgeContent={cartItemCount} color="error">
            <ShoppingCart />
          </Badge>
        </Fab>
      )}

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Shop;