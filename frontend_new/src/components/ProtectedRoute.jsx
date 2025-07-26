import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { hasPermission } from '../utils/rolePermissions';

const ProtectedRoute = ({ children, requiredPermission }) => {
  const { user } = useAuth();

  if (!user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (requiredPermission && !hasPermission(user.role, requiredPermission)) {
    // Logged in but no permission
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
