import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUserRole } from '../../store/slices/authSlice.js';
import { ROUTE_PERMISSIONS, ROUTES } from '../../constants/index.js';

const ProtectedRoute = ({ children, requiredRole = null, allowedRoles = [] }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userRole = useSelector(selectUserRole);
  const location = useLocation();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  // Check if route requires specific role
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // Check if user role is in allowed roles
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  // Check if user has permission for current path
  const currentPath = location.pathname;
  const userPermissions = ROUTE_PERMISSIONS[userRole] || [];
  
  // Check if current path or its base path is allowed
  const hasPermission = userPermissions.some(permission => 
    currentPath.startsWith(permission) || permission === currentPath
  );

  if (!hasPermission && currentPath !== '/') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;