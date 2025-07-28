import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { hasPermission } from '../utils/rolePermissions';

const ProtectedRoute = ({ children, requiredPermission }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Not logged in, redirect to login with return path
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (requiredPermission && !hasPermission(user.role, requiredPermission)) {
    // Logged in but lacking permission
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
