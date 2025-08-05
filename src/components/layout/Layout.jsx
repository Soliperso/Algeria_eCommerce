import React from 'react';
import { Box, Toolbar, useTheme, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import Footer from './Footer.jsx';
import { selectIsAuthenticated } from '../../store/slices/authSlice.js';

const Layout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {isAuthenticated && <Header />}
      
      <Box sx={{ display: 'flex', flex: 1 }}>
        {isAuthenticated && <Sidebar />}
        
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            ml: isAuthenticated && !isMobile ? '240px' : 0,
            transition: theme.transitions.create(['margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            })
          }}
        >
          {isAuthenticated && <Toolbar />}
          
          <Box sx={{ 
            flex: 1, 
            p: isAuthenticated ? { xs: 1, sm: 2, md: 3 } : 0,
            backgroundColor: theme.palette.background.default
          }}>
            {children}
          </Box>
          
          {!isAuthenticated && <Footer />}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;