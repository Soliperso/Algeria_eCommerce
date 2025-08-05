import React, { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    TextField,
    Button,
    Stepper,
    Step,
    StepLabel,
    Paper,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Divider,
    Stack,
    Chip,
    Alert,
    useTheme,
    useMediaQuery,
    Fade,
    Collapse,
    IconButton
} from '@mui/material';
import {
    ShoppingCart,
    LocalShipping,
    Payment,
    CheckCircle,
    Edit,
    Add,
    CreditCard,
    AccountBalance,
    MonetizationOn,
    Security,
    ArrowBack,
    ExpandMore,
    ExpandLess
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectCartTotal, selectCartItemCount, clearCart } from '../../store/slices/cartSlice.js';
import { selectUser } from '../../store/slices/authSlice.js';
import { ROUTES } from '../../constants/index.js';
import { COMMERCE_CONFIG } from '../../config/environment.js';

const steps = ['Shipping', 'Payment', 'Review & Place Order'];

const Checkout = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    const itemCount = useSelector(selectCartItemCount);
    const user = useSelector(selectUser);

    const [activeStep, setActiveStep] = useState(0);
    const [shippingInfo, setShippingInfo] = useState({
        firstName: user?.name?.split(' ')[0] || '',
        lastName: user?.name?.split(' ')[1] || '',
        email: user?.email || '',
        phone: '',
        address: '',
        city: '',
        wilaya: '',
        postalCode: ''
    });
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [cardInfo, setCardInfo] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: ''
    });
    const [orderSummaryExpanded, setOrderSummaryExpanded] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('ar-DZ', {
            style: 'currency',
            currency: 'DZD',
            minimumFractionDigits: 0
        }).format(price);
    };

    const shippingCost = cartTotal > COMMERCE_CONFIG.freeShippingThreshold ? 0 : 2000; // Free shipping threshold from config
    const tax = Math.round(cartTotal * COMMERCE_CONFIG.taxRate); // Tax rate from config
    const finalTotal = cartTotal + shippingCost + tax;

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            handlePlaceOrder();
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleShippingInfoChange = (field, value) => {
        setShippingInfo(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleCardInfoChange = (field, value) => {
        setCardInfo(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handlePlaceOrder = async () => {
        setIsProcessing(true);

        // Simulate order processing
        setTimeout(() => {
            const orderId = 'ORD-' + Date.now();

            // Clear cart
            dispatch(clearCart());

            // Navigate to order confirmation with order details
            navigate(ROUTES.ORDER_CONFIRMATION, {
                state: {
                    orderId,
                    total: finalTotal,
                    items: cartItems,
                    shippingInfo,
                    paymentMethod
                }
            });
        }, 2000);
    };

    const isStepValid = (step) => {
        switch (step) {
            case 0:
                return shippingInfo.firstName && shippingInfo.lastName &&
                    shippingInfo.email && shippingInfo.phone &&
                    shippingInfo.address && shippingInfo.city &&
                    shippingInfo.wilaya && shippingInfo.postalCode;
            case 1:
                if (paymentMethod === 'card') {
                    return cardInfo.cardNumber && cardInfo.expiryDate &&
                        cardInfo.cvv && cardInfo.cardholderName;
                }
                return true;
            case 2:
                return true;
            default:
                return false;
        }
    };

    if (cartItems.length === 0) {
        return (
            <Box sx={{ py: 8, px: 4, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Your cart is empty
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Add some items to your cart before proceeding to checkout
                </Typography>
                <Button variant="contained" onClick={() => navigate(ROUTES.SHOP)}>
                    Continue Shopping
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ py: { xs: 3, md: 4 }, px: { xs: 2, sm: 3, md: 4 } }}>
            {/* Header */}
            <Fade in={true}>
                <Box sx={{ mb: 4 }}>
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                        <IconButton onClick={() => navigate(ROUTES.CART)}>
                            <ArrowBack />
                        </IconButton>
                        <Typography variant="h3" sx={{ fontWeight: 700 }}>
                            Checkout
                        </Typography>
                    </Stack>

                    {/* Stepper */}
                    <Stepper activeStep={activeStep} sx={{ mt: 3 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
            </Fade>

            <Grid container spacing={4}>
                {/* Main Content */}
                <Grid item xs={12} lg={8}>
                    <Fade in={true} timeout={800}>
                        <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, border: `1px solid ${theme.palette.divider}` }}>
                            {/* Step 1: Shipping Information */}
                            {activeStep === 0 && (
                                <Box>
                                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                                        Shipping Information
                                    </Typography>

                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="First Name"
                                                required
                                                value={shippingInfo.firstName}
                                                onChange={(e) => handleShippingInfoChange('firstName', e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Last Name"
                                                required
                                                value={shippingInfo.lastName}
                                                onChange={(e) => handleShippingInfoChange('lastName', e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Email"
                                                type="email"
                                                required
                                                value={shippingInfo.email}
                                                onChange={(e) => handleShippingInfoChange('email', e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Phone Number"
                                                required
                                                placeholder="+213 555 123 456"
                                                value={shippingInfo.phone}
                                                onChange={(e) => handleShippingInfoChange('phone', e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Street Address"
                                                required
                                                value={shippingInfo.address}
                                                onChange={(e) => handleShippingInfoChange('address', e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                fullWidth
                                                label="City"
                                                required
                                                value={shippingInfo.city}
                                                onChange={(e) => handleShippingInfoChange('city', e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                fullWidth
                                                label="Wilaya"
                                                required
                                                select
                                                SelectProps={{ native: true }}
                                                value={shippingInfo.wilaya}
                                                onChange={(e) => handleShippingInfoChange('wilaya', e.target.value)}
                                            >
                                                <option value="">Select Wilaya</option>
                                                <option value="Algiers">Algiers</option>
                                                <option value="Oran">Oran</option>
                                                <option value="Constantine">Constantine</option>
                                                <option value="Annaba">Annaba</option>
                                                <option value="Blida">Blida</option>
                                                {/* Add more wilayas */}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                fullWidth
                                                label="Postal Code"
                                                required
                                                value={shippingInfo.postalCode}
                                                onChange={(e) => handleShippingInfoChange('postalCode', e.target.value)}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            )}

                            {/* Step 2: Payment Method */}
                            {activeStep === 1 && (
                                <Box>
                                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                                        Payment Method
                                    </Typography>

                                    <FormControl component="fieldset" fullWidth>
                                        <RadioGroup
                                            value={paymentMethod}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        >
                                            <FormControlLabel
                                                value="card"
                                                control={<Radio />}
                                                label={
                                                    <Stack direction="row" spacing={1} alignItems="center">
                                                        <CreditCard />
                                                        <Typography>Credit/Debit Card</Typography>
                                                    </Stack>
                                                }
                                            />
                                            <FormControlLabel
                                                value="bank"
                                                control={<Radio />}
                                                label={
                                                    <Stack direction="row" spacing={1} alignItems="center">
                                                        <AccountBalance />
                                                        <Typography>Bank Transfer</Typography>
                                                    </Stack>
                                                }
                                            />
                                            <FormControlLabel
                                                value="cod"
                                                control={<Radio />}
                                                label={
                                                    <Stack direction="row" spacing={1} alignItems="center">
                                                        <MonetizationOn />
                                                        <Typography>Cash on Delivery</Typography>
                                                    </Stack>
                                                }
                                            />
                                        </RadioGroup>
                                    </FormControl>

                                    {/* Credit Card Form */}
                                    <Collapse in={paymentMethod === 'card'}>
                                        <Box sx={{ mt: 3, p: 3, border: `1px solid ${theme.palette.divider}`, borderRadius: 2 }}>
                                            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
                                                <Security color="primary" />
                                                <Typography variant="subtitle2">
                                                    Your payment information is secure and encrypted
                                                </Typography>
                                            </Stack>

                                            <Grid container spacing={3}>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="Cardholder Name"
                                                        value={cardInfo.cardholderName}
                                                        onChange={(e) => handleCardInfoChange('cardholderName', e.target.value)}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="Card Number"
                                                        placeholder="1234 5678 9012 3456"
                                                        value={cardInfo.cardNumber}
                                                        onChange={(e) => handleCardInfoChange('cardNumber', e.target.value)}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        fullWidth
                                                        label="Expiry Date"
                                                        placeholder="MM/YY"
                                                        value={cardInfo.expiryDate}
                                                        onChange={(e) => handleCardInfoChange('expiryDate', e.target.value)}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        fullWidth
                                                        label="CVV"
                                                        placeholder="123"
                                                        value={cardInfo.cvv}
                                                        onChange={(e) => handleCardInfoChange('cvv', e.target.value)}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Collapse>

                                    {/* Bank Transfer Info */}
                                    <Collapse in={paymentMethod === 'bank'}>
                                        <Alert severity="info" sx={{ mt: 3 }}>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                                Bank Transfer Instructions
                                            </Typography>
                                            <Typography variant="body2">
                                                You will receive bank transfer details after placing your order.
                                                Your order will be processed once payment is confirmed.
                                            </Typography>
                                        </Alert>
                                    </Collapse>

                                    {/* Cash on Delivery Info */}
                                    <Collapse in={paymentMethod === 'cod'}>
                                        <Alert severity="warning" sx={{ mt: 3 }}>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                                Cash on Delivery
                                            </Typography>
                                            <Typography variant="body2">
                                                Please have the exact amount ready when the order is delivered.
                                                Additional delivery fee of 500 DZD applies.
                                            </Typography>
                                        </Alert>
                                    </Collapse>
                                </Box>
                            )}

                            {/* Step 3: Review & Place Order */}
                            {activeStep === 2 && (
                                <Box>
                                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                                        Review Your Order
                                    </Typography>

                                    {/* Shipping Details */}
                                    <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, mb: 3 }}>
                                        <CardContent>
                                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                    Shipping Address
                                                </Typography>
                                                <IconButton size="small" onClick={() => setActiveStep(0)}>
                                                    <Edit />
                                                </IconButton>
                                            </Stack>
                                            <Typography variant="body2">
                                                {shippingInfo.firstName} {shippingInfo.lastName}
                                            </Typography>
                                            <Typography variant="body2">
                                                {shippingInfo.address}
                                            </Typography>
                                            <Typography variant="body2">
                                                {shippingInfo.city}, {shippingInfo.wilaya} {shippingInfo.postalCode}
                                            </Typography>
                                            <Typography variant="body2">
                                                {shippingInfo.phone}
                                            </Typography>
                                        </CardContent>
                                    </Card>

                                    {/* Payment Method */}
                                    <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, mb: 3 }}>
                                        <CardContent>
                                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                    Payment Method
                                                </Typography>
                                                <IconButton size="small" onClick={() => setActiveStep(1)}>
                                                    <Edit />
                                                </IconButton>
                                            </Stack>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                {paymentMethod === 'card' && <CreditCard />}
                                                {paymentMethod === 'bank' && <AccountBalance />}
                                                {paymentMethod === 'cod' && <MonetizationOn />}
                                                <Typography variant="body2">
                                                    {paymentMethod === 'card' && 'Credit/Debit Card'}
                                                    {paymentMethod === 'bank' && 'Bank Transfer'}
                                                    {paymentMethod === 'cod' && 'Cash on Delivery'}
                                                </Typography>
                                            </Stack>
                                            {paymentMethod === 'card' && cardInfo.cardNumber && (
                                                <Typography variant="body2" color="text.secondary">
                                                    **** **** **** {cardInfo.cardNumber.slice(-4)}
                                                </Typography>
                                            )}
                                        </CardContent>
                                    </Card>

                                    {/* Order Items */}
                                    <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}` }}>
                                        <CardContent>
                                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                                Order Items ({itemCount})
                                            </Typography>
                                            <Stack spacing={2}>
                                                {cartItems.map((item) => (
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
                                        </CardContent>
                                    </Card>
                                </Box>
                            )}

                            {/* Navigation Buttons */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                                <Button
                                    onClick={handleBack}
                                    disabled={activeStep === 0}
                                    variant="outlined"
                                >
                                    Back
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    disabled={!isStepValid(activeStep) || isProcessing}
                                    sx={{ minWidth: 120 }}
                                >
                                    {isProcessing ? 'Processing...' : (
                                        activeStep === steps.length - 1 ? 'Place Order' : 'Next'
                                    )}
                                </Button>
                            </Box>
                        </Paper>
                    </Fade>
                </Grid>

                {/* Order Summary Sidebar */}
                <Grid item xs={12} lg={4}>
                    <Fade in={true} timeout={1000}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                border: `1px solid ${theme.palette.divider}`,
                                position: 'sticky',
                                top: 20
                            }}
                        >
                            {isMobile && (
                                <Box
                                    onClick={() => setOrderSummaryExpanded(!orderSummaryExpanded)}
                                    sx={{ cursor: 'pointer', mb: 2 }}
                                >
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                            Order Summary
                                        </Typography>
                                        {orderSummaryExpanded ? <ExpandLess /> : <ExpandMore />}
                                    </Stack>
                                </Box>
                            )}

                            <Collapse in={!isMobile || orderSummaryExpanded}>
                                <Stack spacing={2}>
                                    {!isMobile && (
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                            Order Summary
                                        </Typography>
                                    )}

                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography variant="body2">
                                            Subtotal ({itemCount} items)
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                            {formatPrice(cartTotal)}
                                        </Typography>
                                    </Stack>

                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography variant="body2">Shipping</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                            {shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}
                                        </Typography>
                                    </Stack>

                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography variant="body2">Tax ({Math.round(COMMERCE_CONFIG.taxRate * 100)}%)</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                            {formatPrice(tax)}
                                        </Typography>
                                    </Stack>

                                    {paymentMethod === 'cod' && (
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="body2">COD Fee</Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                {formatPrice(500)}
                                            </Typography>
                                        </Stack>
                                    )}

                                    <Divider />

                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                            Total
                                        </Typography>
                                        <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                                            {formatPrice(finalTotal + (paymentMethod === 'cod' ? 500 : 0))}
                                        </Typography>
                                    </Stack>

                                    {cartTotal > COMMERCE_CONFIG.freeShippingThreshold && (
                                        <Alert severity="success" sx={{ mt: 2 }}>
                                            You've qualified for free shipping! 🎉
                                        </Alert>
                                    )}
                                </Stack>
                            </Collapse>
                        </Paper>
                    </Fade>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Checkout;
