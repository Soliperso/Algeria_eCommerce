import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton,
  Rating,
  Chip,
  TextField,
  InputAdornment,
  Fade,
  Zoom,
  Paper,
  Stack,
  Container,
  Fab,
  Alert,
  Snackbar,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Slider,
  FormControlLabel,
  Switch,
  Badge
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Favorite,
  FavoriteBorder,
  Search,
  FilterList,
  Sort,
  Clear,
  TuneOutlined,
  KeyboardArrowDown,
  ArrowBackIos,
  ArrowForwardIos,
  Circle
} from '@mui/icons-material';
import { selectIsAuthenticated } from '../../store/slices/authSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { ROUTES } from '../../constants/routes';

// Mock data for products
const mockProducts = [
  {
    id: 1,
    name: 'Traditional Algerian Carpet',
    price: 45000,
    originalPrice: 50000,
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=300&h=300&fit=crop',
    rating: 4.5,
    reviews: 32,
    category: 'Home Decor',
    inStock: true,
    badges: ['Sale', 'Popular'],
    description: 'Beautiful handwoven carpet from traditional Algerian artisans'
  },
  {
    id: 2,
    name: 'Artisan Pottery Set',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
    rating: 4.8,
    reviews: 18,
    category: 'Pottery',
    inStock: true,
    badges: ['Handmade'],
    description: 'Handcrafted pottery set by local Algerian artisans'
  },
  {
    id: 3,
    name: 'Olive Oil - Premium',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=300&fit=crop',
    rating: 4.7,
    reviews: 45,
    category: 'Food',
    inStock: false,
    description: 'Extra virgin olive oil from Algerian olive groves'
  },
  {
    id: 4,
    name: 'Berber Jewelry',
    price: 8500,
    originalPrice: 10000,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop',
    rating: 4.6,
    reviews: 23,
    category: 'Jewelry',
    inStock: true,
    badges: ['Sale', 'Authentic'],
    description: 'Traditional Berber silver jewelry handcrafted'
  },
  {
    id: 5,
    name: 'Leather Handbag',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
    rating: 4.4,
    reviews: 28,
    category: 'Fashion',
    inStock: true,
    description: 'Genuine leather handbag crafted by local artisans'
  },
  {
    id: 6,
    name: 'Spice Collection',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop',
    rating: 4.9,
    reviews: 67,
    category: 'Food',
    inStock: true,
    badges: ['Premium', 'Organic'],
    description: 'Authentic Algerian spice collection for traditional cooking'
  }
];

// Slider data
const sliderData = [
  {
    id: 1,
    title: 'Discover Algeria',
    subtitle: 'Authentic products from local artisans',
    buttonText: 'Shop Now',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=500&fit=crop',
    backgroundColor: '#2196f3',
    textColor: '#ffffff'
  },
  {
    id: 2,
    title: 'Handcrafted Excellence',
    subtitle: 'Supporting local communities through traditional crafts',
    buttonText: 'Explore Collection',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=500&fit=crop',
    backgroundColor: '#ff9800',
    textColor: '#ffffff'
  },
  {
    id: 3,
    title: 'Taste of Algeria',
    subtitle: 'Premium food products from our rich culinary heritage',
    buttonText: 'Discover Flavors',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=500&fit=crop',
    backgroundColor: '#4caf50',
    textColor: '#ffffff'
  },
  {
    id: 4,
    title: 'Local Artisans',
    subtitle: 'Connect directly with skilled craftspeople',
    buttonText: 'Discover Local',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&h=500&fit=crop',
    backgroundColor: '#9c27b0',
    textColor: '#ffffff'
  }
];

// Categories for filtering
const categories = ['All', 'Home Decor', 'Pottery', 'Food', 'Jewelry', 'Fashion'];

// Sort options
const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Customer Rating' },
  { value: 'newest', label: 'Newest' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'discount', label: 'Biggest Discount' }
];

// Promotional Slider Component
const PromotionalSlider = ({ currentSlide, nextSlide, prevSlide, goToSlide }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{
      position: 'relative',
      width: '100%',
      height: { xs: 300, sm: 400, md: 500 },
      mb: { xs: 4, md: 6 },
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: 3
    }}>
      {/* Slider Container */}
      <Box sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      }}>
        {sliderData.map((slide, index) => (
          <Box
            key={slide.id}
            sx={{
              position: 'absolute',
              top: 0,
              left: `${(index - currentSlide) * 100}%`,
              width: '100%',
              height: '100%',
              transition: 'left 0.5s ease-in-out',
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: slide.backgroundColor, // Fallback color
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Container maxWidth="lg">
              <Box sx={{
                textAlign: 'center',
                color: slide.textColor,
                px: { xs: 2, sm: 4 },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%'
              }}>
                <Typography
                  variant={isMobile ? 'h4' : 'h2'}
                  component="h1"
                  gutterBottom
                  sx={{
                    fontWeight: 800,
                    mb: 2,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                  }}
                >
                  {slide.title}
                </Typography>
                <Typography
                  variant={isMobile ? 'body1' : 'h5'}
                  sx={{
                    mb: 4,
                    opacity: 0.9,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                    maxWidth: 600,
                    mx: 'auto'
                  }}
                >
                  {slide.subtitle}
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: 'white',
                    color: slide.backgroundColor,
                    fontWeight: 'bold',
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    boxShadow: 3,
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.9)',
                      transform: 'translateY(-2px)',
                      boxShadow: 6
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  {slide.buttonText}
                </Button>
              </Box>
            </Container>
          </Box>
        ))}
      </Box>

      {/* Navigation Arrows */}
      <IconButton
        onClick={prevSlide}
        sx={{
          position: 'absolute',
          left: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(255,255,255,0.2)',
          color: 'white',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            bgcolor: 'rgba(255,255,255,0.3)',
            transform: 'translateY(-50%) scale(1.1)'
          },
          transition: 'all 0.3s ease',
          zIndex: 2
        }}
      >
        <ArrowBackIos />
      </IconButton>

      <IconButton
        onClick={nextSlide}
        sx={{
          position: 'absolute',
          right: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(255,255,255,0.2)',
          color: 'white',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            bgcolor: 'rgba(255,255,255,0.3)',
            transform: 'translateY(-50%) scale(1.1)'
          },
          transition: 'all 0.3s ease',
          zIndex: 2
        }}
      >
        <ArrowForwardIos />
      </IconButton>

      {/* Slide Indicators */}
      <Box sx={{
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 1,
        zIndex: 2
      }}>
        {sliderData.map((_, index) => (
          <IconButton
            key={index}
            onClick={() => goToSlide(index)}
            sx={{
              p: 0.5,
              color: index === currentSlide ? 'white' : 'rgba(255,255,255,0.5)',
              '&:hover': {
                color: 'white',
                transform: 'scale(1.2)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            <Circle sx={{ fontSize: index === currentSlide ? 12 : 8 }} />
          </IconButton>
        ))}
      </Box>
    </Box>
  );
};

// Product Card Component
const ProductCard = ({ product }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [favorites, setFavorites] = useState(new Set());

  const toggleFavorite = (productId) => {
    if (!isAuthenticated) {
      return;
    }
    
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      return;
    }
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    }));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ar-DZ', {
      style: 'currency',
      currency: 'DZD',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <Zoom in={true}>
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
            }
          }
        }}
      >
        {/* Product Image Container */}
        <Box
          sx={{
            position: 'relative',
            height: { xs: 200, sm: 220, md: 240 },
            overflow: 'hidden',
            cursor: 'pointer'
          }}
          onClick={() => navigate(ROUTES.PRODUCT.replace(':id', product.id))}
        >
          <Box
            className="product-image"
            component="img"
            src={product.image}
            alt={product.name}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease'
            }}
          />

          {/* Badges */}
          {product.badges && product.badges.length > 0 && (
            <Stack
              direction="row"
              spacing={0.5}
              sx={{
                position: 'absolute',
                top: 12,
                left: 12,
                zIndex: 2
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
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(product.id);
            }}
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
                zIndex: 3
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: 'white',
                  fontWeight: 'bold',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                }}
              >
                Out of Stock
              </Typography>
            </Box>
          )}
        </Box>

        {/* Product Content */}
        <CardContent sx={{
          p: { xs: 2, sm: 2.5 },
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1
        }}>
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontWeight: 600,
              fontSize: { xs: '1rem', sm: '1.1rem' },
              lineHeight: 1.3,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: { xs: '2.6rem', sm: '2.86rem' }
            }}
          >
            {product.name}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 0.5 }}>
            <Rating value={product.rating} readOnly size="small" precision={0.1} />
            <Typography variant="body2" color="text.secondary">
              ({product.reviews})
            </Typography>
          </Box>

          <Box sx={{ mt: 'auto' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                variant="h6"
                color="primary"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '1.1rem', sm: '1.25rem' }
                }}
              >
                {formatPrice(product.price)}
              </Typography>
              {product.originalPrice && product.originalPrice > product.price && (
                <Typography
                  variant="body2"
                  sx={{
                    textDecoration: 'line-through',
                    color: 'text.secondary',
                    fontSize: '0.9rem'
                  }}
                >
                  {formatPrice(product.originalPrice)}
                </Typography>
              )}
            </Box>
          </Box>
        </CardContent>

        {/* Product Actions */}
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
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(product);
            }}
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
};

const Shop = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const cartItems = useSelector(state => state.cart.items);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // States
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [sortBy, setSortBy] = useState('featured');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    rating: 0,
    inStock: false,
    onSale: false
  });
  const [priceRange, setPriceRange] = useState([0, 500000]);

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderData.length) % sliderData.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Filter and sort products
  const filteredAndSortedProducts = mockProducts
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !filters.category || filters.category === 'All' || product.category === filters.category;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesRating = filters.rating === 0 || product.rating >= filters.rating;
      const matchesStock = !filters.inStock || product.inStock;
      const matchesOnSale = !filters.onSale || (product.originalPrice && product.originalPrice > product.price);

      return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesStock && matchesOnSale;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.id - a.id;
        case 'popular':
          return b.reviews - a.reviews;
        case 'discount': {
          const aDiscount = a.originalPrice ? ((a.originalPrice - a.price) / a.originalPrice) * 100 : 0;
          const bDiscount = b.originalPrice ? ((b.originalPrice - b.price) / b.originalPrice) * 100 : 0;
          return bDiscount - aDiscount;
        }
        default:
          return 0;
      }
    });

  // Get active filter count
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.category && filters.category !== 'All') count++;
    if (priceRange[0] > 0 || priceRange[1] < 500000) count++;
    if (filters.rating > 0) count++;
    if (filters.inStock) count++;
    if (filters.onSale) count++;
    return count;
  };

  // Format price for display
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ar-DZ', {
      style: 'currency',
      currency: 'DZD',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Filter handlers
  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleSortClick = (event) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setSortAnchorEl(null);
  };

  const handleSortOptionSelect = (sortValue) => {
    setSortBy(sortValue);
    handleSortClose();
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      rating: 0,
      inStock: false,
      onSale: false
    });
    setPriceRange([0, 500000]);
    setSearchTerm('');
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 4 } }}>
      <Box sx={{ width: '100%' }}>
      {/* Promotional Slider */}
      <Fade in={true} timeout={800}>
        <Box>
          <PromotionalSlider
            currentSlide={currentSlide}
            nextSlide={nextSlide}
            prevSlide={prevSlide}
            goToSlide={goToSlide}
          />
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
            borderRadius: 3,
            position: 'relative'
          }}
        >
          {/* Main Search Bar */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            mb: 3,
            flexDirection: { xs: 'column', sm: 'row' }
          }}>
            {/* Search Input */}
            <Box sx={{
              position: 'relative',
              flex: 1,
              width: { xs: '100%', sm: 'auto' },
              maxWidth: { xs: '100%', sm: '400px' }
            }}>
              <TextField
                placeholder="Search for products..."
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: searchTerm && (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setSearchTerm('')} size="small">
                        <Clear />
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: 3,
                    bgcolor: 'background.paper',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'divider'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main'
                    }
                  }
                }}
              />
            </Box>

            {/* Filter and Sort Buttons */}
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 1,
              width: { xs: '100%', sm: 'auto' }
            }}>
              <Button
                variant="outlined"
                startIcon={<TuneOutlined />}
                endIcon={<Badge badgeContent={getActiveFilterCount()} color="primary" />}
                onClick={handleFilterClick}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  minWidth: { xs: '50%', sm: 'auto' },
                  flex: { xs: 1, sm: 'none' }
                }}
              >
                Filter
              </Button>
              <Button
                variant="outlined"
                startIcon={<Sort />}
                endIcon={<KeyboardArrowDown />}
                onClick={handleSortClick}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  minWidth: { xs: '50%', sm: 'auto' },
                  flex: { xs: 1, sm: 'none' }
                }}
              >
                Sort
              </Button>
            </Box>
          </Box>

          {/* Active Filters Display */}
          {getActiveFilterCount() > 0 && (
            <Box sx={{ mb: 3, textAlign: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Active Filters:
                </Typography>
                <Button 
                  size="small" 
                  onClick={clearFilters}
                  sx={{ textTransform: 'none', fontSize: '0.75rem' }}
                >
                  Clear All
                </Button>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
                {filters.category && filters.category !== 'All' && (
                  <Chip
                    label={`Category: ${filters.category}`}
                    onDelete={() => setFilters(prev => ({ ...prev, category: '' }))}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                )}
                {(priceRange[0] > 0 || priceRange[1] < 500000) && (
                  <Chip
                    label={`Price: ${formatPrice(priceRange[0])} - ${formatPrice(priceRange[1])}`}
                    onDelete={() => setPriceRange([0, 500000])}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                )}
                {filters.rating > 0 && (
                  <Chip
                    label={`Rating: ${filters.rating}+ stars`}
                    onDelete={() => setFilters(prev => ({ ...prev, rating: 0 }))}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                )}
                {filters.inStock && (
                  <Chip
                    label="In Stock Only"
                    onDelete={() => setFilters(prev => ({ ...prev, inStock: false }))}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                )}
                {filters.onSale && (
                  <Chip
                    label="On Sale Only"
                    onDelete={() => setFilters(prev => ({ ...prev, onSale: false }))}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                )}
              </Box>
            </Box>
          )}

          {/* Results Summary */}
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
            {filteredAndSortedProducts.length} product{filteredAndSortedProducts.length !== 1 ? 's' : ''} found
            {searchTerm && ` for "${searchTerm}"`}
          </Typography>
        </Paper>
      </Fade>

      {/* Filter Menu */}
      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={handleFilterClose}
        PaperProps={{
          sx: {
            width: 300,
            maxHeight: 500,
            p: 2
          }
        }}
      >
        <Box sx={{ mb: 2, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
            Filters
          </Typography>
          
          {/* Category Filter */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
              label="Category"
              size="small"
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category === 'All' ? '' : category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Price Range Filter */}
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Typography gutterBottom sx={{ textAlign: 'center' }}>
              Price Range
            </Typography>
            <Slider
              value={priceRange}
              onChange={(e, newValue) => setPriceRange(newValue)}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => formatPrice(value)}
              min={0}
              max={500000}
              step={5000}
              sx={{ mt: 2 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {formatPrice(priceRange[0])}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatPrice(priceRange[1])}
              </Typography>
            </Box>
          </Box>

          {/* Rating Filter */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Minimum Rating</InputLabel>
            <Select
              value={filters.rating}
              onChange={(e) => setFilters(prev => ({ ...prev, rating: e.target.value }))}
              label="Minimum Rating"
              size="small"
            >
              <MenuItem value={0}>Any Rating</MenuItem>
              <MenuItem value={1}>1+ Stars</MenuItem>
              <MenuItem value={2}>2+ Stars</MenuItem>
              <MenuItem value={3}>3+ Stars</MenuItem>
              <MenuItem value={4}>4+ Stars</MenuItem>
              <MenuItem value={5}>5 Stars</MenuItem>
            </Select>
          </FormControl>

          {/* Stock Filter */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={filters.inStock}
                  onChange={(e) => setFilters(prev => ({ ...prev, inStock: e.target.checked }))}
                />
              }
              label="In Stock Only"
            />
          </Box>

          {/* Sale Filter */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={filters.onSale}
                  onChange={(e) => setFilters(prev => ({ ...prev, onSale: e.target.checked }))}
                />
              }
              label="On Sale Only"
            />
          </Box>

          <Button
            variant="outlined"
            fullWidth
            onClick={clearFilters}
            sx={{ mt: 1 }}
          >
            Clear All Filters
          </Button>
        </Box>
      </Menu>

      {/* Sort Menu */}
      <Menu
        anchorEl={sortAnchorEl}
        open={Boolean(sortAnchorEl)}
        onClose={handleSortClose}
      >
        {sortOptions.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => handleSortOptionSelect(option.value)}
            selected={sortBy === option.value}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>

      {/* Products Grid */}
      <Box sx={{ width: '100%', minHeight: '60vh', display: 'flex', justifyContent: 'center' }}>
        <Grid container spacing={{ xs: 2, md: 3 }} sx={{ justifyContent: 'center', maxWidth: '1400px' }}>
          {filteredAndSortedProducts.map((product) => (
            <Grid item xs={6} sm={6} md={4} lg={3} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* No Results Message */}
      {filteredAndSortedProducts.length === 0 && (
        <Box sx={{ width: '100%', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper
                elevation={0}
                sx={{
                  p: 6,
                  textAlign: 'center',
                  background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.secondary} 100%)`,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 3
                }}
              >
                <Search 
                  sx={{ 
                    fontSize: 64, 
                    color: 'text.secondary', 
                    mb: 2,
                    opacity: 0.5 
                  }} 
                />
                <Typography variant="h5" gutterBottom color="text.secondary">
                  No products found
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Try adjusting your search terms or filters to find what you're looking for.
                </Typography>
                <Button variant="contained" onClick={clearFilters}>
                  Clear All Filters
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}

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
    </Container>
  );
};

export default Shop;
