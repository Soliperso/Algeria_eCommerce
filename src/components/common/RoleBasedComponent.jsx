import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../store/slices/authSlice.js';

const RoleBasedComponent = ({ 
  allowedRoles = [], 
  requiredRole = null, 
  children, 
  fallback = null 
}) => {
  const userRole = useSelector(selectUserRole);

  // Check if user has required role
  if (requiredRole && userRole !== requiredRole) {
    return fallback;
  }

  // Check if user role is in allowed roles
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return fallback;
  }

  return children;
};

export default RoleBasedComponent;