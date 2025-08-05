export const USER_ROLES = {
  ADMIN: 'admin',
  SELLER: 'seller',
  CUSTOMER: 'customer'
};

export const ROUTE_PERMISSIONS = {
  [USER_ROLES.ADMIN]: ['/admin', '/dashboard'],
  [USER_ROLES.SELLER]: ['/seller', '/products', '/orders'],
  [USER_ROLES.CUSTOMER]: ['/shop', '/cart', '/profile']
};