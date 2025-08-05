import React, { useState, useEffect } from 'react';
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
  Alert,
  Container,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Slider,
  FormControlLabel,
  Switch,
  Drawer,
  AppBar,
  Toolbar,
  Badge
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
  LocalOffer,
  ArrowBackIos,
  ArrowForwardIos,
  Circle,
  Close,
  Clear,
  TuneOutlined,
  KeyboardArrowDown
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

// Promotional slider data
const sliderData = [
  {
    id: 1,
    title: 'Summer Electronics Sale',
    subtitle: 'Up to 30% off on smartphones and laptops',
    buttonText: 'Shop Electronics',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop&crop=center',
    backgroundColor: '#2196f3',
    textColor: '#ffffff'
  },
  {
    id: 2,
    title: 'Traditional Algerian Fashion',
    subtitle: 'Authentic handmade kaftans and traditional wear',
    buttonText: 'Explore Fashion',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=1200&h=400&fit=crop&crop=center',
    backgroundColor: '#ff9800',
    textColor: '#ffffff'
  },
  {
    id: 3,
    title: 'Home & Garden Collection',
    subtitle: 'Transform your space with premium furniture',
    buttonText: 'Shop Home',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=400&fit=crop&crop=center',
    backgroundColor: '#4caf50',
    textColor: '#ffffff'
  },
  {
    id: 4,
    title: 'Local Artisan Products',
    subtitle: 'Support local crafters and find unique items',
    buttonText: 'Discover Local',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&h=400&fit=crop&crop=center',
    backgroundColor: '#9c27b0',
    textColor: '#ffffff'
  }
];

// Promotional Slider Component
const PromotionalSlider = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto advance slides
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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Container maxWidth="lg">
              <Box sx={{
                textAlign: 'center',
                color: slide.textColor,
                px: { xs: 2, sm: 4 }
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
    dispatch(addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    }));
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
            },
            '& .product-actions': {
              opacity: 1,
              transform: 'translateY(0)'
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
                {new Intl.NumberFormat('ar-DZ', {
                  style: 'currency',
                  currency: 'DZD',
                  minimumFractionDigits: 0
                }).format(product.price)}
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
                  {new Intl.NumberFormat('ar-DZ', {
                    style: 'currency',
                    currency: 'DZD',
                    minimumFractionDigits: 0
                  }).format(product.originalPrice)}
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
};

const Shop = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const cartItems = useSelector(state => state.cart.items);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Box sx={{ py: { xs: 3, md: 4 }, px: { xs: 2, sm: 3, md: 4 }, width: '100%', maxWidth: '100%' }}>
    {/* Promotional Slider */}
    <Fade in={true} timeout={800}>
      <Box>
        <PromotionalSlider />
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
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setSearchQuery('')}
                    edge="end"
                  >
                    <Clear />
                  </IconButton>
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
              variant={getActiveFilterCount() > 0 ? "contained" : "outlined"}
              startIcon={<FilterList />}
              endIcon={getActiveFilterCount() > 0 && <Badge badgeContent={getActiveFilterCount()} color="error" />}
              onClick={handleFilterMenuOpen}
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
              endIcon={<KeyboardArrowDown />}
              onClick={handleSortMenuOpen}
              sx={{
                borderRadius: 1,
                fontWeight: 600,
                minWidth: { xs: 'auto', sm: 100 },
                px: { xs: 2, sm: 3 }
              }}
            >
              {isMobile ? '' : 'Sort'}
            </Button>

            <IconButton
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 1
              }}
            >
              {viewMode === 'grid' ? <ViewList /> : <GridView />}
            </IconButton>
          </Stack>
        </Stack>

        {/* Active Filters Display */}
        {(getActiveFilterCount() > 0 || searchQuery) && (
          <Box sx={{ mt: 2 }}>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {searchQuery && (
                <Chip
                  label={`Search: "${searchQuery}"`}
                  onDelete={() => setSearchQuery('')}
                  color="primary"
                  variant="outlined"
                  size="small"
                />
              )}
              {filters.category && (
                <Chip
                  label={`Category: ${filters.category}`}
                  onDelete={() => handleFilterChange('category', '')}
                  color="primary"
                  variant="outlined"
                  size="small"
                />
              )}
              {(priceRange[0] > 0 || priceRange[1] < 500000) && (
                <Chip
                  label={`Price: ${formatPrice(priceRange[0])} - ${formatPrice(priceRange[1])}`}
                  onDelete={() => setPriceRange([0, 500000])}
                  color="primary"
                  variant="outlined"
                  size="small"
                />
              )}
              {filters.rating > 0 && (
                <Chip
                  label={`${filters.rating}+ Stars`}
                  onDelete={() => handleFilterChange('rating', 0)}
                  color="primary"
                  variant="outlined"
                  size="small"
                />
              )}
              {filters.inStock && (
                <Chip
                  label="In Stock Only"
                  onDelete={() => handleFilterChange('inStock', false)}
                  color="primary"
                  variant="outlined"
                  size="small"
                />
              )}
              {filters.onSale && (
                <Chip
                  label="On Sale Only"
                  onDelete={() => handleFilterChange('onSale', false)}
                  color="primary"
                  variant="outlined"
                  size="small"
                />
              )}
              {(getActiveFilterCount() > 0 || searchQuery) && (
                <Button
                  size="small"
                  onClick={clearFilters}
                  startIcon={<Clear />}
                  sx={{ ml: 1 }}
                >
                  Clear All
                </Button>
              )}
            </Stack>
          </Box>
        )}
      </Paper>
    </Fade>

    {/* Filter Menu */}
    <Menu
      anchorEl={filterAnchorEl}
      open={Boolean(filterAnchorEl)}
      onClose={handleMenuClose}
      PaperProps={{
        sx: {
          mt: 1,
          minWidth: 320,
          maxWidth: 400,
          borderRadius: 2,
          boxShadow: theme.shadows[8]
        }
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Filter Products
        </Typography>

        {/* Category Filter */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={filters.category}
            label="Category"
            onChange={(e) => handleFilterChange('category', e.target.value)}
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map(category => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Price Range Filter */}
        <Typography variant="subtitle2" gutterBottom>
          Price Range
        </Typography>
        <Box sx={{ px: 1, mb: 3 }}>
          <Slider
            value={priceRange}
            onChange={handlePriceRangeChange}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => formatPrice(value)}
            min={0}
            max={500000}
            step={5000}
            marks={[
              { value: 0, label: '0 DZD' },
              { value: 100000, label: '100K' },
              { value: 250000, label: '250K' },
              { value: 500000, label: '500K+' }
            ]}
          />
          <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
            <Typography variant="caption">
              {formatPrice(priceRange[0])}
            </Typography>
            <Typography variant="caption">
              {formatPrice(priceRange[1])}
            </Typography>
          </Stack>
        </Box>

        {/* Rating Filter */}
        <Typography variant="subtitle2" gutterBottom>
          Minimum Rating
        </Typography>
        <Box sx={{ mb: 3 }}>
          <Rating
            value={filters.rating}
            onChange={(event, newValue) => handleFilterChange('rating', newValue || 0)}
            precision={1}
          />
        </Box>

        {/* Switch Filters */}
        <Stack spacing={1}>
          <FormControlLabel
            control={
              <Switch
                checked={filters.inStock}
                onChange={(e) => handleFilterChange('inStock', e.target.checked)}
              />
            }
            label="In Stock Only"
          />
          <FormControlLabel
            control={
              <Switch
                checked={filters.onSale}
                onChange={(e) => handleFilterChange('onSale', e.target.checked)}
              />
            }
            label="On Sale Only"
          />
        </Stack>

        {/* Filter Actions */}
        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <Button
            variant="outlined"
            onClick={clearFilters}
            fullWidth
          >
            Clear All
          </Button>
          <Button
            variant="contained"
            onClick={handleMenuClose}
            fullWidth
          >
            Apply Filters
          </Button>
        </Stack>
      </Box>
    </Menu>

    {/* Sort Menu */}
    <Menu
      anchorEl={sortAnchorEl}
      open={Boolean(sortAnchorEl)}
      onClose={handleMenuClose}
      PaperProps={{
        sx: {
          mt: 1,
          minWidth: 200,
          borderRadius: 2,
          boxShadow: theme.shadows[8]
        }
      }}
    >
      {sortOptions.map((option) => (
        <MenuItem
          key={option.value}
          onClick={() => handleSortChange(option.value)}
          selected={filters.sortBy === option.value}
          sx={{
            fontWeight: filters.sortBy === option.value ? 600 : 400,
            color: filters.sortBy === option.value ? theme.palette.primary.main : 'inherit'
          }}
        >
          {option.label}
        </MenuItem>
      ))}
    </Menu>

    {/* Results Summary */}
    <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="body2" color="text.secondary">
        Showing {sortedProducts.length} of {mockProducts.length} products
        {searchQuery && ` for "${searchQuery}"`}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Sort by: {sortOptions.find(opt => opt.value === filters.sortBy)?.label}
      </Typography>
    </Box>

    {/* Products Grid */}
    <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
      {sortedProducts.length > 0 ? (
        sortedProducts.map((product, index) => (
          <Grid
            item
            xs={6}
            sm={6}
            md={viewMode === 'grid' ? 4 : 6}
            lg={viewMode === 'grid' ? 3 : 4}
            xl={viewMode === 'grid' ? 3 : 3}
            key={product.id}
          >
            <ProductCard product={product} index={index} />
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Paper sx={{ p: 6, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No products found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Try adjusting your search terms or filters to find what you're looking for.
            </Typography>
            <Button variant="contained" onClick={clearFilters}>
              Clear All Filters
            </Button>
          </Paper>
        </Grid>
      )}
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