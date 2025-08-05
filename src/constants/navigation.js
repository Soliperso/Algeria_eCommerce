import { 
  Home, 
  ShoppingCart, 
  Store, 
  Dashboard, 
  People, 
  Analytics,
  Campaign,
  Inventory,
  Receipt
} from '@mui/icons-material';
import { USER_ROLES, ROUTES } from './index.js';

export const NAVIGATION_ITEMS = {
  // Public navigation for non-authenticated users
  PUBLIC: [
    {
      label: 'Home',
      path: ROUTES.HOME,
      icon: Home
    },
    {
      label: 'Shop',
      path: ROUTES.SHOP,
      icon: Store
    }
  ],
  
  [USER_ROLES.CUSTOMER]: [
    {
      label: 'Shop',
      path: ROUTES.SHOP,
      icon: Home
    },
    {
      label: 'Cart',
      path: ROUTES.CART,
      icon: ShoppingCart
    },
    {
      label: 'Profile',
      path: ROUTES.PROFILE,
      icon: People
    }
  ],
  
  [USER_ROLES.SELLER]: [
    {
      label: 'Dashboard',
      path: ROUTES.SELLER_DASHBOARD,
      icon: Dashboard
    },
    {
      label: 'Products',
      path: ROUTES.SELLER_PRODUCTS,
      icon: Inventory
    },
    {
      label: 'Orders',
      path: ROUTES.SELLER_ORDERS,
      icon: Receipt
    },
    {
      label: 'Analytics',
      path: ROUTES.SELLER_ANALYTICS,
      icon: Analytics
    }
  ],
  
  [USER_ROLES.ADMIN]: [
    {
      label: 'Dashboard',
      path: ROUTES.ADMIN_DASHBOARD,
      icon: Dashboard
    },
    {
      label: 'Users',
      path: ROUTES.ADMIN_USERS,
      icon: People
    },
    {
      label: 'Products',
      path: ROUTES.ADMIN_PRODUCTS,
      icon: Store
    },
    {
      label: 'Advertisements',
      path: ROUTES.ADMIN_ADS,
      icon: Campaign
    }
  ]
};