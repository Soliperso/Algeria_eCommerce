import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  Avatar,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Chip,
  Button,
  Stack,
  Fade,
  Grow
} from '@mui/material';
import {
  Menu as MenuIcon,
  ShoppingCart,
  Notifications,
  AccountCircle,
  Brightness4,
  Brightness7,
  Search as SearchIcon,
  FavoriteBorder,
  MoreVert
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleSidebar, toggleDarkMode } from '../../store/slices/uiSlice.js';
import { logout, selectUser, selectUserRole } from '../../store/slices/authSlice.js';
import { selectDarkMode } from '../../store/slices/uiSlice.js';
import { selectCartItemCount } from '../../store/slices/cartSlice.js';
import { ROUTES } from '../../constants/index.js';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  const user = useSelector(selectUser);
  const userRole = useSelector(selectUserRole);
  const darkMode = useSelector(selectDarkMode);
  const cartItemCount = useSelector(selectCartItemCount);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
  };

  const handleSidebarToggle = () => {
    dispatch(toggleSidebar());
  };

  const handleThemeToggle = () => {
    dispatch(toggleDarkMode());
  };

  const handleCartClick = () => {
    navigate(ROUTES.CART);
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'error';
      case 'seller': return 'success';
      case 'customer': return 'primary';
      default: return 'default';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return '👑';
      case 'seller': return '🏪';
      case 'customer': return '🛍️';
      default: return '👤';
    }
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        background: darkMode
          ? 'rgba(22, 27, 34, 0.95)'
          : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${theme.palette.divider}`,
        color: theme.palette.text.primary
      }}
    >
      <Toolbar
        sx={{
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 1, sm: 1.5 },
          minHeight: { xs: 64, sm: 72 }
        }}
      >
        {/* Left Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <IconButton
            color="inherit"
            aria-label="toggle sidebar"
            onClick={handleSidebarToggle}
            edge="start"
            sx={{
              mr: { xs: 2, sm: 3 },
              p: { xs: 1, sm: 1.5 },
              borderRadius: 1,
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: theme.palette.primary.main + '15',
                transform: 'scale(1.05)'
              }
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo and Brand */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: { xs: 40, sm: 48 },
                height: { xs: 40, sm: 48 },
                borderRadius: 1,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: { xs: '1.2rem', sm: '1.4rem' },
                boxShadow: theme.shadows[3]
              }}
            >
              🇩🇿
            </Box>

            <Box>
              <Typography
                variant={isMobile ? 'h6' : 'h5'}
                component="div"
                sx={{
                  fontWeight: 800,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.02em',
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                Algeria Commerce
              </Typography>

              {userRole && !isMobile && (
                <Chip
                  icon={<span style={{ fontSize: '0.8rem' }}>{getRoleIcon(userRole)}</span>}
                  label={userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                  size="small"
                  color={getRoleColor(userRole)}
                  variant="outlined"
                  sx={{
                    mt: 0.5,
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    height: 24
                  }}
                />
              )}
            </Box>
          </Box>
        </Box>

        {/* Right Section */}
        <Stack direction="row" spacing={{ xs: 0.5, sm: 1 }} alignItems="center">
          {/* Search Button (Mobile) */}
          {isMobile && userRole === 'customer' && (
            <IconButton
              color="inherit"
              size="medium"
              sx={{
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: theme.palette.primary.main + '15'
                }
              }}
            >
              <SearchIcon />
            </IconButton>
          )}

          {/* Theme Toggle */}
          <IconButton
            color="inherit"
            onClick={handleThemeToggle}
            size="medium"
            sx={{
              borderRadius: 1,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                backgroundColor: theme.palette.primary.main + '15',
                transform: 'rotate(180deg)'
              }
            }}
          >
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          {/* Customer Actions */}
          {userRole === 'customer' && (
            <>
              {!isMobile && (
                <IconButton
                  color="inherit"
                  size="medium"
                  sx={{
                    borderRadius: 1,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.main + '15'
                    }
                  }}
                >
                  <FavoriteBorder />
                </IconButton>
              )}

              <IconButton
                color="inherit"
                size="medium"
                onClick={handleCartClick}
                sx={{
                  borderRadius: 1,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.main + '15'
                  }
                }}
              >
                <Badge
                  badgeContent={cartItemCount}
                  color="error"
                  sx={{
                    '& .MuiBadge-badge': {
                      fontSize: '0.7rem',
                      minWidth: 18,
                      height: 18,
                      fontWeight: 600
                    }
                  }}
                >
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </>
          )}

          {/* Notifications (Desktop) */}
          {!isMobile && (
            <IconButton
              color="inherit"
              size="medium"
              sx={{
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: theme.palette.primary.main + '15'
                }
              }}
            >
              <Badge
                badgeContent={5}
                color="error"
                sx={{
                  '& .MuiBadge-badge': {
                    fontSize: '0.7rem',
                    minWidth: 18,
                    height: 18,
                    fontWeight: 600
                  }
                }}
              >
                <Notifications />
              </Badge>
            </IconButton>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              color="inherit"
              onClick={handleMobileMenuOpen}
              sx={{
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: theme.palette.primary.main + '15'
                }
              }}
            >
              <MoreVert />
            </IconButton>
          )}

          {/* User Avatar */}
          <IconButton
            color="inherit"
            onClick={handleMenuOpen}
            aria-controls="user-menu"
            aria-haspopup="true"
            sx={{
              ml: { xs: 1, sm: 2 },
              p: 0.5,
              borderRadius: 1,
              border: `2px solid ${theme.palette.primary.main}`,
              '&:hover': {
                backgroundColor: theme.palette.primary.main + '15'
              }
            }}
          >
            {user?.avatar ? (
              <Avatar
                src={user.avatar}
                sx={{
                  width: { xs: 36, sm: 40 },
                  height: { xs: 36, sm: 40 }
                }}
              />
            ) : (
              <Avatar
                sx={{
                  width: { xs: 36, sm: 40 },
                  height: { xs: 36, sm: 40 },
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  fontWeight: 700
                }}
              >
                {user?.name?.charAt(0) || user?.email?.charAt(0) || '?'}
              </Avatar>
            )}
          </IconButton>
        </Stack>

        {/* User Menu */}
        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          onClick={handleMenuClose}
          TransitionComponent={Fade}
          PaperProps={{
            elevation: 12,
            sx: {
              mt: 2,
              minWidth: 220,
              borderRadius: 3,
              border: `1px solid ${theme.palette.divider}`,
              '& .MuiMenuItem-root': {
                px: 3,
                py: 1.5,
                borderRadius: 1,
                mx: 1,
                my: 0.5,
                fontWeight: 500,
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  transform: 'translateX(4px)'
                }
              }
            }
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Box sx={{ px: 2, py: 1, borderBottom: `1px solid ${theme.palette.divider}` }}>
            <Typography variant="subtitle2" fontWeight={600}>
              {user?.name || 'User'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user?.email}
            </Typography>
          </Box>

          <MenuItem onClick={handleMenuClose}>
            👤 Profile
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            ⚙️ Settings
          </MenuItem>
          {isMobile && (
            <MenuItem onClick={handleMenuClose}>
              🔔 Notifications
            </MenuItem>
          )}
          <MenuItem
            onClick={handleLogout}
            sx={{
              color: 'error.main',
              '&:hover': {
                backgroundColor: 'error.main',
                color: 'error.contrastText'
              }
            }}
          >
            🚪 Logout
          </MenuItem>
        </Menu>

        {/* Mobile Menu */}
        <Menu
          anchorEl={mobileMenuAnchor}
          open={Boolean(mobileMenuAnchor)}
          onClose={handleMobileMenuClose}
          TransitionComponent={Grow}
        >
          {userRole === 'customer' && (
            <MenuItem onClick={handleMobileMenuClose}>
              <FavoriteBorder sx={{ mr: 2 }} />
              Wishlist
            </MenuItem>
          )}
          <MenuItem onClick={handleMobileMenuClose}>
            <Badge badgeContent={5} color="error">
              <Notifications sx={{ mr: 2 }} />
            </Badge>
            Notifications
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;