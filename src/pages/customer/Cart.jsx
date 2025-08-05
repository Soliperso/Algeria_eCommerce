import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  Divider,
  Stack,
  Grid,
  Paper,
  Chip,
  useTheme,
  useMediaQuery,
  Fade,
  Zoom
} from '@mui/material';
import {
  Add,
  Remove,
  Delete,
  ShoppingCartCheckout,
  ArrowBack,
  LocalOffer
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  selectCartItems,
  selectCartTotal,
  selectCartItemCount,
  updateQuantity,
  removeFromCart,
  clearCart
} from '../../store/slices/cartSlice.js';
import { ROUTES } from '../../constants/index.js';

const Cart = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const itemCount = useSelector(selectCartItemCount);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ar-DZ', {
      style: 'currency',
      currency: 'DZD',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleQuantityChange = (id, newQuantity) => {
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleContinueShopping = () => {
    navigate(ROUTES.SHOP);
  };

  const handleCheckout = () => {
    navigate(ROUTES.CHECKOUT);
  };

  if (cartItems.length === 0) {
    return (
      <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, py: { xs: 3, md: 4 }, width: '100%', maxWidth: '100%' }}>
        <Fade in={true}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 8 },
              textAlign: 'center',
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`
            }}
          >
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
              Your Cart is Empty
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              Looks like you haven't added any items to your cart yet
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={handleContinueShopping}
              sx={{
                py: 2,
                px: 4,
                borderRadius: 1,
                fontWeight: 600,
                textTransform: 'none'
              }}
            >
              Continue Shopping
            </Button>
          </Paper>
        </Fade>
      </Box>
    );
  }

  return (
    <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, py: { xs: 3, md: 4 }, width: '100%', maxWidth: '100%' }}>
      {/* Header */}
      <Fade in={true} timeout={800}>
        <Box sx={{ mb: 4 }}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
            <IconButton 
              onClick={handleContinueShopping}
              sx={{ borderRadius: 1 }}
            >
              <ArrowBack />
            </IconButton>
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
              Shopping Cart
            </Typography>
          </Stack>
          <Typography variant="h6" color="text.secondary">
            {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
          </Typography>
        </Box>
      </Fade>

      <Grid container spacing={3}>
        {/* Cart Items */}
        <Grid item xs={12} lg={8}>
          <Stack spacing={2}>
            {cartItems.map((item, index) => (
              <Zoom key={item.id} in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                <Card
                  elevation={0}
                  sx={{
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 2,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      boxShadow: theme.shadows[2]
                    }
                  }}
                >
                  <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <Grid container spacing={2} alignItems="center">
                      {/* Product Image */}
                      <Grid item xs={12} sm={3}>
                        <CardMedia
                          component="img"
                          height="120"
                          image={item.image}
                          alt={item.name}
                          sx={{
                            borderRadius: 1,
                            objectFit: 'cover'
                          }}
                        />
                      </Grid>

                      {/* Product Details */}
                      <Grid item xs={12} sm={5}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                          {item.name}
                        </Typography>
                        <Chip
                          label={item.category}
                          size="small"
                          sx={{ mb: 1 }}
                        />
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                            {formatPrice(item.price)}
                          </Typography>
                          {item.originalPrice > item.price && (
                            <Typography
                              variant="body2"
                              sx={{
                                textDecoration: 'line-through',
                                color: 'text.secondary'
                              }}
                            >
                              {formatPrice(item.originalPrice)}
                            </Typography>
                          )}
                        </Stack>
                      </Grid>

                      {/* Quantity Controls */}
                      <Grid item xs={12} sm={2}>
                        <Stack direction="row" alignItems="center" spacing={1} justifyContent="center">
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            sx={{ borderRadius: 1 }}
                          >
                            <Remove fontSize="small" />
                          </IconButton>
                          <Typography
                            variant="h6"
                            sx={{
                              minWidth: 40,
                              textAlign: 'center',
                              fontWeight: 600
                            }}
                          >
                            {item.quantity}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            sx={{ borderRadius: 1 }}
                          >
                            <Add fontSize="small" />
                          </IconButton>
                        </Stack>
                      </Grid>

                      {/* Total & Remove */}
                      <Grid item xs={12} sm={2}>
                        <Stack alignItems="center" spacing={1}>
                          <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            {formatPrice(item.price * item.quantity)}
                          </Typography>
                          <IconButton
                            color="error"
                            onClick={() => handleRemoveItem(item.id)}
                            sx={{ borderRadius: 1 }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Stack>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Zoom>
            ))}
          </Stack>

          {/* Clear Cart Button */}
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Button
              variant="outlined"
              color="error"
              onClick={handleClearCart}
              sx={{
                borderRadius: 1,
                textTransform: 'none'
              }}
            >
              Clear All Items
            </Button>
          </Box>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} lg={4}>
          <Fade in={true} timeout={1200}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
                position: 'sticky',
                top: 20
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                Order Summary
              </Typography>

              <Stack spacing={2} sx={{ mb: 3 }}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body1">
                    Subtotal ({itemCount} items)
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {formatPrice(cartTotal)}
                  </Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body1">Shipping</Typography>
                  <Typography variant="body1" color="success.main" sx={{ fontWeight: 600 }}>
                    Free
                  </Typography>
                </Stack>

                <Divider />

                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Total
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                    {formatPrice(cartTotal)}
                  </Typography>
                </Stack>
              </Stack>

              <Button
                variant="contained"
                fullWidth
                size="large"
                startIcon={<ShoppingCartCheckout />}
                onClick={handleCheckout}
                sx={{
                  py: 2,
                  borderRadius: 1,
                  fontWeight: 600,
                  textTransform: 'none',
                  mb: 2
                }}
              >
                Proceed to Checkout
              </Button>

              <Button
                variant="outlined"
                fullWidth
                onClick={handleContinueShopping}
                sx={{
                  py: 1.5,
                  borderRadius: 1,
                  fontWeight: 600,
                  textTransform: 'none'
                }}
              >
                Continue Shopping
              </Button>
            </Paper>
          </Fade>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cart;