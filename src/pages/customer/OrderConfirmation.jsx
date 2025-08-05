import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Divider,
  Paper,
  Grid,
  Chip,
  useTheme,
  Fade
} from '@mui/material';
import {
  CheckCircle,
  LocalShipping,
  Print,
  Download,
  Home,
  ShoppingBag
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/index.js';

const OrderConfirmation = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get order details from navigation state
  const orderData = location.state;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ar-DZ', {
      style: 'currency',
      currency: 'DZD',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (!orderData) {
    // Redirect if no order data
    navigate(ROUTES.SHOP);
    return null;
  }

  return (
    <Box sx={{ py: { xs: 4, md: 6 }, px: { xs: 2, sm: 3, md: 4 } }}>
      <Fade in={true}>
        <Box sx={{ maxWidth: 800, mx: 'auto', textAlign: 'center' }}>
          {/* Success Icon and Message */}
          <CheckCircle 
            sx={{ 
              fontSize: 80, 
              color: 'success.main', 
              mb: 3 
            }} 
          />
          
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
            Order Confirmed! 🎉
          </Typography>
          
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Thank you for your purchase. Your order has been successfully placed.
          </Typography>

          {/* Order Details Card */}
          <Paper elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, mb: 4 }}>
            <CardContent sx={{ p: 4 }}>
              <Grid container spacing={4}>
                {/* Order Info */}
                <Grid item xs={12} md={6}>
                  <Stack spacing={2} alignItems="flex-start">
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Order Details
                    </Typography>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Order Number
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {orderData.orderId}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Order Date
                      </Typography>
                      <Typography variant="body1">
                        {new Date().toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Total Amount
                      </Typography>
                      <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                        {formatPrice(orderData.total)}
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>

                {/* Shipping Info */}
                <Grid item xs={12} md={6}>
                  <Stack spacing={2} alignItems="flex-start">
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Shipping Address
                    </Typography>
                    <Box>
                      <Typography variant="body1">
                        {orderData.shippingInfo.firstName} {orderData.shippingInfo.lastName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {orderData.shippingInfo.address}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {orderData.shippingInfo.city}, {orderData.shippingInfo.wilaya} {orderData.shippingInfo.postalCode}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {orderData.shippingInfo.phone}
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              {/* Shipping Status */}
              <Stack spacing={2} alignItems="center" sx={{ py: 3 }}>
                <LocalShipping sx={{ fontSize: 40, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Estimated Delivery
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Your order will be delivered within 2-3 business days
                </Typography>
                <Chip label="Free Shipping" color="success" />
              </Stack>

              <Divider sx={{ my: 3 }} />

              {/* Order Items */}
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Order Items ({orderData.items.length})
                </Typography>
                <Stack spacing={2}>
                  {orderData.items.map((item) => (
                    <Stack key={item.id} direction="row" spacing={2} alignItems="center">
                      <Box
                        component="img"
                        src={item.image}
                        alt={item.name}
                        sx={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 1 }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Quantity: {item.quantity}
                        </Typography>
                      </Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {formatPrice(item.price * item.quantity)}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            </CardContent>
          </Paper>

          {/* Action Buttons */}
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2} 
            justifyContent="center"
            sx={{ mb: 4 }}
          >
            <Button
              variant="contained"
              startIcon={<ShoppingBag />}
              onClick={() => navigate(ROUTES.SHOP)}
              sx={{ minWidth: 200 }}
            >
              Continue Shopping
            </Button>
            <Button
              variant="outlined"
              startIcon={<Print />}
              onClick={() => window.print()}
            >
              Print Order
            </Button>
            <Button
              variant="outlined"
              startIcon={<Download />}
              onClick={() => {
                // Generate and download order receipt
                console.log('Download receipt');
              }}
            >
              Download Receipt
            </Button>
          </Stack>

          {/* Additional Info */}
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              backgroundColor: theme.palette.background.default,
              border: `1px solid ${theme.palette.divider}`
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              What's Next?
            </Typography>
            <Stack spacing={1} sx={{ textAlign: 'left' }}>
              <Typography variant="body2">
                📧 You'll receive an order confirmation email shortly
              </Typography>
              <Typography variant="body2">
                📦 We'll send you tracking information once your order ships
              </Typography>
              <Typography variant="body2">
                🚚 Delivery will be within 2-3 business days
              </Typography>
              <Typography variant="body2">
                📞 Contact customer service if you have any questions: +213 555 123 456
              </Typography>
            </Stack>
          </Paper>
        </Box>
      </Fade>
    </Box>
  );
};

export default OrderConfirmation;
