import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  Divider
} from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        py: 6,
        mt: 'auto',
        borderTop: 1,
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Algeria E-Commerce
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Affordable shopping for Algeria. Connect sellers and customers across the country.
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              For Customers
            </Typography>
            <Link href="/shop" variant="body2" color="text.secondary" display="block">
              Browse Products
            </Link>
            <Link href="/cart" variant="body2" color="text.secondary" display="block">
              Shopping Cart
            </Link>
            <Link href="/help" variant="body2" color="text.secondary" display="block">
              Help & Support
            </Link>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              For Sellers
            </Typography>
            <Link href="/seller/register" variant="body2" color="text.secondary" display="block">
              Become a Seller
            </Link>
            <Link href="/seller" variant="body2" color="text.secondary" display="block">
              Seller Dashboard
            </Link>
            <Link href="/seller/help" variant="body2" color="text.secondary" display="block">
              Seller Support
            </Link>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Legal
            </Typography>
            <Link href="/privacy" variant="body2" color="text.secondary" display="block">
              Privacy Policy
            </Link>
            <Link href="/terms" variant="body2" color="text.secondary" display="block">
              Terms of Service
            </Link>
            <Link href="/cookies" variant="body2" color="text.secondary" display="block">
              Cookie Policy
            </Link>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 3 }} />
        
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © 2025 Algeria E-Commerce. All rights reserved.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Made with ❤️ in Algeria
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;