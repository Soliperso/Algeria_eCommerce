import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { useSelector } from 'react-redux';

// Store
import store from './store/index.js';

// Components
import Layout from './components/layout/Layout.jsx';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';

// Pages
import Home from './pages/Home.jsx';
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import AdminLogin from './pages/auth/AdminLogin.jsx';
import Shop from './pages/customer/Shop.jsx';
import Cart from './pages/customer/Cart.jsx';
import ProductDetail from './pages/customer/ProductDetail.jsx';
import Profile from './pages/customer/Profile.jsx';
import Checkout from './pages/customer/Checkout.jsx';
import OrderConfirmation from './pages/customer/OrderConfirmation.jsx';
import SellerDashboard from './pages/seller/SellerDashboard.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';

// Constants
import { ROUTES, USER_ROLES } from './constants/index.js';

// Selectors
import { selectDarkMode, selectIsAuthenticated, selectUserRole } from './store/slices/index.js';
import { loadCartFromStorage } from './store/slices/cartSlice.js';

// Theme
import { lightTheme, darkTheme } from './theme/index.js';

// Utils
import { loadCartFromStorage as loadCart, setupCartStorageListener } from './utils/cartPersistence.js';

// Cart persistence initialization
const CartPersistenceWrapper = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load cart from localStorage on app start
    const savedCart = loadCart();
    if (savedCart) {
      dispatch(loadCartFromStorage(savedCart));
    }

    // Setup listener for cart changes in other tabs
    const cleanup = setupCartStorageListener(dispatch, loadCartFromStorage);

    return cleanup;
  }, [dispatch]);

  return children;
};

// Theme configuration
const AppTheme = ({ children }) => {
  const darkMode = useSelector(selectDarkMode);
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

// Main App Router
const AppRouter = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userRole = useSelector(selectUserRole);

  // Redirect authenticated users to their dashboard
  const getDefaultRoute = () => {
    if (!isAuthenticated) return ROUTES.HOME;
    
    switch (userRole) {
      case USER_ROLES.ADMIN:
        return ROUTES.ADMIN_DASHBOARD;
      case USER_ROLES.SELLER:
        return ROUTES.SELLER_DASHBOARD;
      case USER_ROLES.CUSTOMER:
        return ROUTES.SHOP;
      default:
        return ROUTES.HOME;
    }
  };

  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route 
            path={ROUTES.LOGIN} 
            element={
              isAuthenticated ? 
              <Navigate to={getDefaultRoute()} replace /> : 
              <Login />
            } 
          />
          <Route 
            path={ROUTES.REGISTER} 
            element={
              isAuthenticated ? 
              <Navigate to={getDefaultRoute()} replace /> : 
              <Register />
            } 
          />
          <Route 
            path={ROUTES.ADMIN_LOGIN} 
            element={
              isAuthenticated ? 
              <Navigate to={getDefaultRoute()} replace /> : 
              <AdminLogin />
            } 
          />

          {/* Public Shop Route - accessible to everyone */}
          <Route path={ROUTES.SHOP} element={<Shop />} />
          <Route path={ROUTES.PRODUCT} element={<ProductDetail />} />

          {/* Customer Routes */}
          <Route
            path={ROUTES.CART}
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.CUSTOMER]}>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.CHECKOUT}
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.CUSTOMER]}>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.PROFILE}
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.CUSTOMER]}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.ORDER_CONFIRMATION}
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.CUSTOMER]}>
                <OrderConfirmation />
              </ProtectedRoute>
            }
          />

          {/* Seller Routes */}
          <Route
            path={ROUTES.SELLER_DASHBOARD}
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.SELLER]}>
                <SellerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.SELLER_PRODUCTS}
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.SELLER]}>
                <div>Seller Products - Coming Soon</div>
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.SELLER_ORDERS}
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.SELLER]}>
                <div>Seller Orders - Coming Soon</div>
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.SELLER_ANALYTICS}
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.SELLER]}>
                <div>Seller Analytics - Coming Soon</div>
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path={ROUTES.ADMIN_DASHBOARD}
            element={
              <ProtectedRoute requiredRole={USER_ROLES.ADMIN}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.ADMIN_USERS}
            element={
              <ProtectedRoute requiredRole={USER_ROLES.ADMIN}>
                <div>Admin Users - Coming Soon</div>
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.ADMIN_PRODUCTS}
            element={
              <ProtectedRoute requiredRole={USER_ROLES.ADMIN}>
                <div>Admin Products - Coming Soon</div>
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.ADMIN_ADS}
            element={
              <ProtectedRoute requiredRole={USER_ROLES.ADMIN}>
                <div>Admin Ads - Coming Soon</div>
              </ProtectedRoute>
            }
          />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

// Main App Component
function App() {
  return (
    <Provider store={store}>
      <AppTheme>
        <CartPersistenceWrapper>
          <AppRouter />
        </CartPersistenceWrapper>
      </AppTheme>
    </Provider>
  );
}

export default App;
