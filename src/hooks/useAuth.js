import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  selectIsAuthenticated, 
  selectUser, 
  selectUserRole,
  selectIsAdmin,
  selectIsSeller,
  selectIsCustomer,
  loginStart,
  loginSuccess,
  loginFailure,
  logout
} from '../store/slices/authSlice.js';
import { ROUTES } from '../constants/index.js';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const userRole = useSelector(selectUserRole);
  const isAdmin = useSelector(selectIsAdmin);
  const isSeller = useSelector(selectIsSeller);
  const isCustomer = useSelector(selectIsCustomer);

  const login = async (credentials) => {
    try {
      dispatch(loginStart());
      
      // Mock login - replace with actual authentication logic
      let mockUser;
      
      // Special handling for admin login
      if (credentials.role === 'admin') {
        // Admin authentication with special validation
        if (credentials.adminKey === 'ALGERIA_ADMIN_2025') {
          mockUser = {
            id: 'admin-1',
            email: credentials.email,
            name: 'Administrator',
            role: 'admin'
          };
        } else {
          throw new Error('Invalid admin access key');
        }
      } else {
        // Regular user login
        mockUser = {
          id: Date.now().toString(),
          email: credentials.email,
          name: 'Test User',
          role: credentials.role || 'customer'
        };
      }
      
      dispatch(loginSuccess({ 
        user: mockUser, 
        role: mockUser.role 
      }));
      
      // Navigate based on role
      const roleRoutes = {
        admin: ROUTES.ADMIN_DASHBOARD,
        seller: ROUTES.SELLER_DASHBOARD,
        customer: ROUTES.SHOP
      };
      
      navigate(roleRoutes[mockUser.role] || ROUTES.HOME);
      
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.HOME);
  };

  const register = async (userData) => {
    try {
      dispatch(loginStart());
      
      // Mock registration - replace with actual registration logic
      const newUser = {
        id: Date.now().toString(),
        ...userData
      };
      
      dispatch(loginSuccess({ 
        user: newUser, 
        role: userData.role 
      }));
      
      // Navigate based on role
      const roleRoutes = {
        admin: ROUTES.ADMIN_DASHBOARD,
        seller: ROUTES.SELLER_DASHBOARD,
        customer: ROUTES.SHOP
      };
      
      navigate(roleRoutes[userData.role] || ROUTES.HOME);
      
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

  return {
    isAuthenticated,
    user,
    userRole,
    isAdmin,
    isSeller,
    isCustomer,
    login,
    logout: handleLogout,
    register
  };
};