import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
  Stack,
  Chip,
  Fade,
  Zoom,
  Paper
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { 
  ShoppingBag, 
  Store, 
  Security, 
  TrendingUp,
  LocalShipping,
  Verified,
  Star,
  Language
} from '@mui/icons-material';
import { ROUTES } from '../constants/index.js';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [adminAccessVisible, setAdminAccessVisible] = useState(false);
  const [keySequence, setKeySequence] = useState([]);

  // Hidden admin access - press A-D-M-I-N in sequence
  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key.toLowerCase();
      const targetSequence = ['a', 'd', 'm', 'i', 'n'];
      
      setKeySequence(prev => {
        const newSequence = [...prev, key].slice(-5); // Keep only last 5 keys
        
        if (newSequence.join('') === targetSequence.join('')) {
          setAdminAccessVisible(true);
          // Hide after 10 seconds
          setTimeout(() => setAdminAccessVisible(false), 10000);
        }
        
        return newSequence;
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const userTypes = [
    {
      title: 'Shop as Customer',
      description: 'Browse thousands of products at amazing prices from trusted Algerian sellers',
      icon: <ShoppingBag sx={{ fontSize: { xs: 48, sm: 60 } }} />,
      color: 'primary',
      link: ROUTES.SHOP,
      gradient: 'linear-gradient(135deg, #FF6B35 0%, #F39C12 100%)',
      features: ['✓ Best Prices in DZD', '✓ Local & International Products', '✓ Secure Payment Options']
    },
    {
      title: 'Sell Your Products',
      description: 'Join thousands of successful sellers and grow your business across Algeria',
      icon: <Store sx={{ fontSize: { xs: 48, sm: 60 } }} />,
      color: 'success',
      link: ROUTES.LOGIN,
      gradient: 'linear-gradient(135deg, #00B894 0%, #00A085 100%)',
      features: ['✓ Easy Product Listing', '✓ Wide Customer Reach', '✓ Seller Support Tools']
    }
  ];

  const stats = [
    { number: '10K+', label: 'Happy Customers' },
    { number: '500+', label: 'Active Sellers' },
    { number: '50K+', label: 'Products Available' },
    { number: '48', label: 'Provinces Covered' }
  ];

  const features = [
    {
      icon: <Verified sx={{ fontSize: 40 }} />,
      title: 'Made for Algeria',
      description: 'Built specifically for the Algerian market with local payment options and Arabic/French support'
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      title: 'Best Prices Guaranteed',
      description: 'Competitive prices from local and international sellers with transparent pricing in DZD'
    },
    {
      icon: <LocalShipping sx={{ fontSize: 40 }} />,
      title: 'Flexible Delivery',
      description: 'Multiple delivery options including cash on delivery for your convenience'
    },
    {
      icon: <Language sx={{ fontSize: 40 }} />,
      title: 'Bilingual Support',
      description: 'Full support in Arabic and French languages for better user experience'
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', overflow: 'hidden' }}>
      {/* Hero Section with Background Image */}
      <Box
        sx={{
          position: 'relative',
          minHeight: { xs: '80vh', md: '90vh' },
          background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&h=1080&fit=crop&crop=center')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: { xs: 'scroll', md: 'fixed' },
          display: 'flex',
          alignItems: 'center',
          color: 'white',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.3) 0%, rgba(74, 144, 226, 0.3) 100%)',
            zIndex: 1
          }
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 2, px: { xs: 1.5, sm: 2, md: 3 }, maxWidth: '100%', width: '100%' }}>
          <Fade in={true} timeout={1000}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' }, maxWidth: { md: '60%' } }}>

              <Typography 
                variant="h1" 
                component="h1" 
                gutterBottom
                sx={{
                  fontWeight: 900,
                  mb: 1.5,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                  lineHeight: 1.1
                }}
              >
                Algeria's Premier
                <br />
                <Box 
                  component="span" 
                  sx={{ 
                    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))'
                  }}
                >
                  E-Commerce
                </Box>
                <br />
                Marketplace
              </Typography>

              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 2,
                  fontWeight: 400,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                  lineHeight: 1.4,
                  maxWidth: { md: '500px' }
                }}
              >
                Connect with thousands of sellers, discover amazing products, and shop with confidence across all 48 provinces of Algeria
              </Typography>

              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={2} 
                sx={{ mb: 2 }}
              >
                <Button
                  component={RouterLink}
                  to={ROUTES.SHOP}
                  variant="contained"
                  size="large"
                  sx={{
                    py: 2,
                    px: 4,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    borderRadius: 1,
                    background: 'linear-gradient(135deg, #FF6B35 0%, #F39C12 100%)',
                    boxShadow: '0 8px 32px rgba(255, 107, 53, 0.4)',
                    textTransform: 'none',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #E55A2B 0%, #E68910 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 40px rgba(255, 107, 53, 0.6)'
                    }
                  }}
                >
                  Start Shopping Now
                </Button>
                
                <Button
                  component={RouterLink}
                  to={ROUTES.LOGIN}
                  variant="outlined"
                  size="large"
                  sx={{
                    py: 2,
                    px: 4,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 1,
                    borderColor: 'white',
                    color: 'white',
                    borderWidth: 2,
                    textTransform: 'none',
                    backdropFilter: 'blur(10px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      borderWidth: 2,
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Sign In
                </Button>
              </Stack>

              {/* Stats */}
              <Grid container spacing={1.5} sx={{ mt: 1 }}>
                {stats.map((stat, index) => (
                  <Grid item xs={6} sm={3} key={index}>
                    <Zoom in={true} style={{ transitionDelay: `${(index + 1) * 200}ms` }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography 
                          variant="h4" 
                          sx={{ 
                            fontWeight: 800,
                            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                            color: '#FFD700'
                          }}
                        >
                          {stat.number}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontWeight: 500,
                            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                            opacity: 0.9
                          }}
                        >
                          {stat.label}
                        </Typography>
                      </Box>
                    </Zoom>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Fade>
        </Box>
      </Box>

      {/* User Types Section */}
      <Box sx={{ py: { xs: 4, md: 6 }, px: { xs: 1.5, sm: 2, md: 3 }, maxWidth: '100%', width: '100%' }}>
        <Fade in={true} timeout={1200}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography 
              variant="h2" 
              component="h2" 
              gutterBottom
              sx={{
                fontWeight: 700,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Choose Your Role
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto', fontWeight: 400 }}
            >
              Select how you want to use our platform and join thousands of satisfied users
            </Typography>
          </Box>
        </Fade>

        <Grid container spacing={2} justifyContent="center">
          {userTypes.map((type, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Zoom in={true} style={{ transitionDelay: `${(index + 1) * 300}ms` }}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 4,
                    border: 'none',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-12px)',
                      boxShadow: theme.shadows[8],
                      '& .card-icon': {
                        transform: 'scale(1.1) rotate(5deg)'
                      }
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: type.gradient,
                      zIndex: 1
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 2 }}>
                    <Box
                      className="card-icon"
                      sx={{
                        color: `${type.color}.main`,
                        mb: 1.5,
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {type.icon}
                    </Box>
                    
                    <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: 700 }}>
                      {type.title}
                    </Typography>
                    
                    <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 1.5 }}>
                      {type.description}
                    </Typography>

                    <Stack spacing={0.5} sx={{ mb: 1.5 }}>
                      {type.features.map((feature, idx) => (
                        <Typography 
                          key={idx}
                          variant="body2" 
                          sx={{ 
                            color: `${type.color}.main`,
                            fontWeight: 500,
                            fontSize: '0.9rem'
                          }}
                        >
                          {feature}
                        </Typography>
                      ))}
                    </Stack>
                  </CardContent>
                  
                  <CardActions sx={{ justifyContent: 'center', p: 2, pt: 0 }}>
                    <Button
                      component={RouterLink}
                      to={type.link}
                      variant="contained"
                      size="large"
                      sx={{
                        background: type.gradient,
                        px: 4,
                        py: 1.5,
                        fontSize: '1rem',
                        fontWeight: 600,
                        borderRadius: 1,
                        textTransform: 'none',
                        boxShadow: theme.shadows[3],
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: theme.shadows[6]
                        }
                      }}
                    >
                      Get Started
                    </Button>
                  </CardActions>
                </Card>
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Features Section */}
      <Box sx={{ backgroundColor: theme.palette.background.secondary, py: { xs: 4, md: 6 } }}>
        <Box sx={{ px: { xs: 1.5, sm: 2, md: 3 }, maxWidth: '100%', width: '100%' }}>
          <Fade in={true} timeout={1400}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography 
                variant="h2" 
                component="h2" 
                gutterBottom
                sx={{
                  fontWeight: 700,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Why Choose Algeria Commerce?
              </Typography>
              <Typography 
                variant="h6" 
                color="text.secondary"
                sx={{ maxWidth: 700, mx: 'auto', fontWeight: 400 }}
              >
                We're committed to providing the best e-commerce experience tailored for Algeria
              </Typography>
            </Box>
          </Fade>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {features.map((feature, index) => (
              <Box key={index} sx={{ flex: '1 1 calc(50% - 8px)', minWidth: 'calc(50% - 8px)' }}>
                <Zoom in={true} style={{ transitionDelay: `${(index + 1) * 150}ms` }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      height: 220,
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      borderRadius: 1,
                      border: `1px solid ${theme.palette.divider}`,
                      transition: 'all 0.3s ease',
                      boxSizing: 'border-box',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: theme.shadows[6],
                        '& .feature-icon': {
                          color: theme.palette.primary.main,
                          transform: 'scale(1.1)'
                        }
                      },
                      '@media (max-width: 600px)': {
                        flex: '1 1 100%',
                        minWidth: '100%'
                      }
                    }}
                  >
                    {/* Icon Section */}
                    <Box
                      className="feature-icon"
                      sx={{
                        color: theme.palette.text.secondary,
                        mb: 2,
                        transition: 'all 0.3s ease',
                        flex: '0 0 auto'
                      }}
                    >
                      {feature.icon}
                    </Box>
                    
                    {/* Title Section */}
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 600, 
                        mb: 1.5,
                        flex: '0 0 auto'
                      }}
                    >
                      {feature.title}
                    </Typography>
                    
                    {/* Description Section */}
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        lineHeight: 1.5,
                        flex: '1 1 auto',
                        display: 'flex',
                        alignItems: 'center',
                        textAlign: 'center'
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </Paper>
                </Zoom>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Call to Action Section */}
      <Box sx={{ py: { xs: 4, md: 6 }, px: { xs: 1.5, sm: 2, md: 3 }, maxWidth: '100%', width: '100%' }}>
        <Fade in={true} timeout={1600}>
          <Paper
            elevation={0}
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              color: 'white',
              p: { xs: 2, md: 4 },
              textAlign: 'center',
              borderRadius: 2,
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                opacity: 0.3
              }
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
                Ready to Start Your Journey?
              </Typography>
              <Typography variant="h6" sx={{ mb: 2, opacity: 0.9, maxWidth: 600, mx: 'auto' }}>
                Join thousands of Algerians who are already shopping and selling on our platform
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                <Button
                  component={RouterLink}
                  to={ROUTES.SHOP}
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: 'white',
                    color: theme.palette.primary.main,
                    px: 4,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    borderRadius: 1,
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Start Shopping
                </Button>
                <Button
                  component={RouterLink}
                  to={ROUTES.LOGIN}
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    px: 4,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 1,
                    borderWidth: 2,
                    textTransform: 'none',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderWidth: 2,
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Sign In
                </Button>
              </Stack>
            </Box>
          </Paper>
        </Fade>
      </Box>

      {/* Hidden Admin Access - appears when typing "ADMIN" */}
      {adminAccessVisible && (
        <Zoom in={true}>
          <Box
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              zIndex: 1000
            }}
          >
            <Tooltip title="Admin Access (10s timeout)" arrow>
              <IconButton
                component={RouterLink}
                to={ROUTES.ADMIN_LOGIN}
                sx={{
                  backgroundColor: 'error.main',
                  color: 'white',
                  width: 64,
                  height: 64,
                  borderRadius: 2,
                  boxShadow: theme.shadows[6],
                  animation: 'pulse 2s infinite',
                  '&:hover': {
                    backgroundColor: 'error.dark',
                    transform: 'scale(1.1)'
                  },
                  '@keyframes pulse': {
                    '0%': {
                      opacity: 1,
                      transform: 'scale(1)'
                    },
                    '50%': {
                      opacity: 0.7,
                      transform: 'scale(1.05)'
                    },
                    '100%': {
                      opacity: 1,
                      transform: 'scale(1)'
                    }
                  }
                }}
              >
                <Security sx={{ fontSize: 28 }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Zoom>
      )}
    </Box>
  );
};

export default Home;